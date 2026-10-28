import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {strToU8, zipSync} from 'fflate';

const downloads = 'static/downloads';
await fs.mkdir(downloads, {recursive: true});

async function collect(dir, prefix, files = {}) {
  for (const entry of await fs.readdir(dir, {withFileTypes: true})) {
    if (['target', 'data', '.git'].includes(entry.name)) continue;
    if (entry.isDirectory()) await collect(path.join(dir, entry.name), `${prefix}/${entry.name}`, files);
    else files[`${prefix}/${entry.name}`] = new Uint8Array(await fs.readFile(path.join(dir, entry.name)));
  }
  return files;
}

const lab = await collect('examples/java/library-lab', 'library-lab');
await fs.writeFile(`${downloads}/java-library-lab.zip`, zipSync(lab, {level: 9}));

const manifestText = await fs.readFile('third_party/spring-guides/SOURCES.json', 'utf8');
const manifest = JSON.parse(manifestText);
const source = manifest.sources.find(item => item.name === 'gs-rest-service');
const root = path.resolve(source.localPath);
const archive = {};
for (const [name, hash] of Object.entries(source.files)) {
  const absolute = path.resolve(root, name);
  if (!absolute.startsWith(root + path.sep)) throw new Error(`Invalid upstream path: ${name}`);
  const bytes = await fs.readFile(absolute);
  if (createHash('sha256').update(bytes).digest('hex') !== hash) throw new Error(`Upstream snapshot changed: ${name}`);
  archive[`gs-rest-service/${name}`] = new Uint8Array(bytes);
}
archive['SOURCE-SNAPSHOT.json'] = strToU8(manifestText);
archive['ATTRIBUTION.md'] = new Uint8Array(await fs.readFile('third_party/spring-guides/README.md'));
await fs.writeFile(`${downloads}/spring-rest-service-source.zip`, zipSync(archive, {level: 9}));
const publicSource = 'static/open-source/spring-rest-service';
await fs.mkdir(publicSource, {recursive: true});
for (const name of ['README.adoc', 'LICENSE.txt', 'LICENSE.writing.txt']) {
  await fs.copyFile(path.join(root, name), `${publicSource}/${name}`);
}
await fs.writeFile(`${publicSource}/SOURCES.json`, manifestText);
await fs.copyFile('third_party/spring-guides/README.md', `${publicSource}/ATTRIBUTION.md`);
console.log(`Java lab packaged: ${Object.keys(lab).length} files; Spring source snapshot verified: ${Object.keys(source.files).length} files`);
