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
const sources = new Set();
for (const dir of ['blog', 'docs']) for (const file of walk(dir)) {
  const text = fs.readFileSync(file, 'utf8');
  const candidates = [...text.matchAll(/!\[[^\]]*\]\(([^\s)]+)(?:\s+[^)]*)?\)/g)].map(match => match[1]);
  for (const match of text.matchAll(/(?:useBaseUrl|require)\(['"]([^'"]+)['"]\)/g)) candidates.push(match[1]);
  for (const src of candidates) {
    if (/^(?:https?:|data:)/.test(src)) continue;
    const local = src.startsWith('/img/') || src.startsWith('img/') ? path.resolve('static', src.replace(/^\//, '')) : path.resolve(path.dirname(file), src);
    if (/\.(png|jpe?g|webp)$/i.test(local) && fs.existsSync(local)) sources.add(local);
  }
}
fs.mkdirSync('.cache', {recursive: true});
fs.mkdirSync('static/img/responsive', {recursive: true});
const cacheFile = '.cache/image-variants.json';
const previous = fs.existsSync(cacheFile) ? JSON.parse(fs.readFileSync(cacheFile, 'utf8')) : {};
const manifest = {};
let generated = 0;
for (const file of sources) {
  const key = path.relative(process.cwd(), file).replaceAll('\\', '/');
  const info = fs.statSync(file);
  const stamp = `${info.mtimeMs}:${info.size}`;
  if (previous[key]?.stamp === stamp && previous[key].variants.every(item => fs.existsSync(path.join('static', item.url))) && (!previous[key].poster || fs.existsSync(path.join('static', previous[key].poster)))) {manifest[key] = previous[key]; continue;}
  const meta = await sharp(file).metadata();
  if (info.size < 20000) continue;
  const hash = createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 16);
  if (meta.pages > 1) {
    // 原始动画保留；首帧封面只在用户播放前展示。
    const poster = `/img/responsive/poster.${hash}.webp`;
    if (!fs.existsSync(path.join('static', poster))) {await sharp(file).webp({quality: 86}).toFile(path.join('static', poster)); generated++;}
    manifest[key] = {stamp, width: meta.width, height: meta.pageHeight || meta.height, variants: [], poster};
    continue;
  }
  if (meta.width <= 640) continue;
  const variants = [];
  for (const width of [...new Set([480, 960, Math.min(meta.width, 1440)])].sort((a, b) => a - b).filter(width => width <= meta.width)) {
    const url = `/img/responsive/${width}.${hash}.webp`;
    const output = path.join('static', url);
    if (!fs.existsSync(output)) {await sharp(file).resize({width, withoutEnlargement: true}).webp({quality: 86, effort: 5}).toFile(output); generated++;}
    variants.push({url, width});
  }
  manifest[key] = {stamp, width: meta.width, height: meta.height, variants};
}
fs.writeFileSync(cacheFile, JSON.stringify(manifest));
console.log(`Responsive images: ${Object.keys(manifest).length} sources, ${generated} new variants`);
