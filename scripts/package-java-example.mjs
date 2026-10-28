import fs from 'node:fs/promises';
import path from 'node:path';
import {zipSync} from 'fflate';

const files = {};
async function walk(dir, relative = '') {
  for (const entry of await fs.readdir(dir, {withFileTypes: true})) {
    if (['target', 'data', '.git'].includes(entry.name)) continue;
    const name = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) await walk(path.join(dir, entry.name), name);
    else files[`todo-api/${name}`] = new Uint8Array(await fs.readFile(path.join(dir, entry.name)));
  }
}
await walk('examples/java/todo-api');
await fs.mkdir('static/downloads', {recursive: true});
await fs.writeFile('static/downloads/java-todo-api.zip', zipSync(files, {level: 9}));
console.log(`Java project packaged: ${Object.keys(files).length} files`);
