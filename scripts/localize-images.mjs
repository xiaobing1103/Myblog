import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import sharp from 'sharp';

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(file); else if (/\.mdx?$/.test(file)) yield file;
  }
}
const files = [...walk('blog'), ...walk('docs')];
const urls = new Set();
function transform(text, replace) {
  let fence = null;
  return text.split('\n').map(line => {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {if (!fence) fence = marker[1][0]; else if (fence === marker[1][0]) fence = null; return line;}
    if (fence) return line;
    return line.replace(/<img\s+src="(https:\/\/s3\.ax1x\.com\/[^"\s]+)"\s+alt="([^"]*)"[^>]*\/>/g, (tag, url, alt) => replace(tag, url, alt));
  }).join('\n');
}
for (const file of files) transform(fs.readFileSync(file, 'utf8'), (tag, url) => {urls.add(url); return tag;});
fs.mkdirSync('static/img/remote', {recursive: true});
const mapping = {}, failures = [], queue = [...urls];
await Promise.all(Array.from({length: 4}, async () => {
  while (queue.length) {
    const url = queue.shift();
    try {
      const id = createHash('sha256').update(url).digest('hex').slice(0, 16);
      const file = `static/img/remote/${id}.webp`;
      if (!fs.existsSync(file)) {
        const response = await fetch(url, {signal: AbortSignal.timeout(20000)});
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = Buffer.from(await response.arrayBuffer());
        await sharp(data, {animated: /\.gif$/i.test(url)}).webp({quality: 85}).toFile(file);
      }
      mapping[url] = `/img/remote/${id}.webp`;
    } catch (error) {failures.push({url, error: error.message});}
  }
}));
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const next = transform(text, (tag, url, alt) => mapping[url] ? `![${alt}](${mapping[url]})` : tag);
  if (next !== text) fs.writeFileSync(file, next);
}
fs.writeFileSync('reports/image-sources.json', JSON.stringify({mapping, failures}, null, 2));
console.log({downloaded: Object.keys(mapping).length, failures});
