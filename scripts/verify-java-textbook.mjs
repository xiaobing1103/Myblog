import fs from 'node:fs/promises';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {readTextbook} from './java-textbook.mjs';

const lessons = await readTextbook();
if (lessons.length !== 18) throw new Error('Expected 18 textbook lessons');
const examples = lessons.filter(lesson => lesson.code);
if (examples.length !== 14) throw new Error('Expected 14 standalone examples');
const normalize = value => value.replaceAll('\r\n', '\n').trimEnd();
for (const lesson of examples) {
  if (!lesson.expected) throw new Error(`Missing expected output: ${lesson.slug}`);
  const dir = path.resolve('.cache/java-textbook', lesson.slug);
  await fs.mkdir(dir, {recursive: true});
  await fs.writeFile(path.join(dir, 'Main.java'), lesson.code);
  const compiled = spawnSync('javac', ['-encoding', 'UTF-8', 'Main.java'], {cwd: dir, encoding: 'utf8', timeout: 20000});
  if (compiled.status !== 0) throw new Error(`${lesson.slug}: ${compiled.stderr || compiled.error}`);
  const run = spawnSync('java', ['-cp', dir, 'Main'], {cwd: dir, encoding: 'utf8', timeout: 20000});
  if (run.status !== 0) throw new Error(`${lesson.slug}: ${run.stderr || run.error}`);
  if (normalize(run.stdout) !== normalize(lesson.expected)) throw new Error(`${lesson.slug}: unexpected output\n${run.stdout}`);
  console.log(`PASS textbook ${lesson.slug}`);
}
console.log(`Verified ${examples.length} complete Java examples, including file IO and real loopback HTTP`);
