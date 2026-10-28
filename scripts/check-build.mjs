import fs from 'node:fs';
import path from 'node:path';

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p); else yield p;
  }
}
const missing = [];
let pages = 0, images = 0;
for (const file of walk('build')) {
  if (!file.endsWith('.html')) continue;
  pages++;
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/<(?:img|script|link|iframe|a)\b[^>]*(?:src|href)=(?:"([^"?#]+)"|'([^'?#]+)'|([^\s>]+))/g)) {
    const url = match[1] || match[2] || match[3];
    if (!url.startsWith('/Myblog/')) continue;
    if (match[0].startsWith('<a') && !/\.pdf$/i.test(url)) continue;
    const p = path.join('build', decodeURIComponent(url.slice(8)));
    images++;
    if (!fs.existsSync(p)) missing.push({file, url});
  }
}
for (const route of ['index.html', 'css-flex-box-layout/index.html', 'tags/css/index.html', 'docs/css/box-model/box-model/index.html']) {
  if (!fs.existsSync(path.join('build', route))) missing.push({route});
}
for (const url of JSON.parse(fs.readFileSync('reports/previous-routes.json', 'utf8'))) {
  const file = path.join('build', decodeURIComponent(url.slice(8)), url.endsWith('.html') ? '' : 'index.html');
  if (!fs.existsSync(file)) missing.push({oldRoute: url});
}
if (fs.existsSync('.cache/image-variants.json')) {
  const variants = JSON.parse(fs.readFileSync('.cache/image-variants.json', 'utf8'));
  for (const entry of Object.values(variants)) for (const url of [...entry.variants.map(item => item.url), entry.poster].filter(Boolean)) {
    images++;
    if (!fs.existsSync(path.join('build', url))) missing.push({responsiveImage: url});
  }
}
console.log(JSON.stringify({pages, resources: images, missing}, null, 2));
if (missing.length) process.exitCode = 1;
