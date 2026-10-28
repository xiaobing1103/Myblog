import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

await sharp('static/img/logo.png').resize(96, 96, {fit: 'inside'}).webp({quality: 82}).toFile('static/img/logo.webp');
function* walk(dir) {
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p); else yield p;
  }
}
const changes = new Map();
for (const dir of ['static/img', 'blog', 'docs']) {
  for (const file of walk(dir)) {
    if (!/\.(png|jpe?g|gif)$/i.test(file) || file.endsWith('logo.png')) continue;
    const input = fs.statSync(file).size;
    if (input < 80000) continue;
    const target = file.replace(/\.[^.]+$/, '.webp');
    const data = await sharp(file, {animated: file.endsWith('.gif')}).webp({quality: 82, effort: 5}).toBuffer();
    if (data.length < input * .9) {
      fs.writeFileSync(target, data);
      changes.set(path.resolve(file), path.resolve(target));
      console.log(`${file}: ${input} -> ${data.length}`);
    }
  }
}
for (const dir of ['blog', 'docs']) for (const file of walk(dir)) {
  if (!/\.mdx?$/.test(file)) continue;
  let text = fs.readFileSync(file, 'utf8');
  for (const [oldPath, newPath] of changes) {
    const relative = path.relative(path.dirname(file), oldPath).replaceAll('\\', '/');
    const replacement = path.relative(path.dirname(file), newPath).replaceAll('\\', '/');
    text = text.replaceAll(relative, replacement);
    if (oldPath.includes(`${path.sep}static${path.sep}`)) {
      text = text.replaceAll(oldPath.split(`${path.sep}static${path.sep}`)[1].replaceAll('\\', '/'), newPath.split(`${path.sep}static${path.sep}`)[1].replaceAll('\\', '/'));
    }
  }
  fs.writeFileSync(file, text);
}
