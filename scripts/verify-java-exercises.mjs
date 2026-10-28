import fs from 'node:fs/promises';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const source = await fs.readFile('src/data/java-course.js', 'utf8');
const {exercises} = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const normalize = value => value.replaceAll('\r\n', '\n').trimEnd();
for (const exercise of exercises) {
  const dir = path.resolve('.cache/java-exercises', exercise.id);
  await fs.mkdir(dir, {recursive: true});
  for (const variant of ['starter', 'solution']) {
    await fs.writeFile(path.join(dir, 'Main.java'), exercise[variant]);
    const compiled = spawnSync('javac', ['-encoding', 'UTF-8', 'Main.java'], {cwd: dir, encoding: 'utf8'});
    if (compiled.status !== 0) throw new Error(`${exercise.id}/${variant}: ${compiled.stderr}`);
    const result = spawnSync('java', ['-cp', dir, 'Main'], {encoding: 'utf8', timeout: 10000});
    if (result.status !== 0) throw new Error(`${exercise.id}/${variant}: ${result.stderr}`);
    const matches = normalize(result.stdout) === normalize(exercise.expected);
    if (matches !== (variant === 'solution')) throw new Error(`${exercise.id}/${variant}: unexpected output ${result.stdout}`);
  }
  console.log(`PASS ${exercise.id}: starter compiles; solution output verified`);
}
console.log(`${exercises.length} Java exercises verified with local JDK`);
