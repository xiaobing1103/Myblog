import fs from 'node:fs';
import path from 'node:path';
import {gzipSync} from 'node:zlib';

const html = fs.readFileSync('build/index.html', 'utf8');
const urls = [...new Set([...html.matchAll(/<script\b[^>]*\bsrc=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/g)].map(m => m[1] || m[2] || m[3]).filter(u => u.startsWith('/Myblog/')))];
const scripts = urls.map(url => {
  const data = fs.readFileSync(path.join('build', url.slice(8)));
  return {url, bytes: data.length, gzip: gzipSync(data).length};
});
const baseline = JSON.parse(fs.readFileSync('reports/baseline.json'));
const report = {scripts, totalGzip: scripts.reduce((n, s) => n + s.gzip, 0), htmlBytes: Buffer.byteLength(html)};
report.gzipReductionPercent = Number(((1 - report.totalGzip / baseline.totalGzip) * 100).toFixed(1));
report.entryGzipBudgetBytes = 112 * 1024;
report.htmlBudgetBytes = 20 * 1024;
fs.mkdirSync('reports', {recursive: true});
fs.writeFileSync('reports/current.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (!scripts.length || report.totalGzip > report.entryGzipBudgetBytes || report.htmlBytes > report.htmlBudgetBytes) process.exitCode = 1;
