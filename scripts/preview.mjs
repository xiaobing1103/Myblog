import http from 'node:http';
import fs from 'node:fs';
import {stat, readFile} from 'node:fs/promises';
import path from 'node:path';
import {promisify} from 'node:util';
import {brotliCompress, gzip} from 'node:zlib';

const root = path.resolve('build');
const types = {'.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript', '.mjs': 'application/javascript', '.wasm': 'application/wasm', '.ftl': 'text/plain; charset=utf-8', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif', '.ico': 'image/x-icon', '.pdf': 'application/pdf'};
const compressors = {br: promisify(brotliCompress), gzip: promisify(gzip)};
const cache = new Map();
const pending = new Map();
const cacheLimit = 16 * 1024 * 1024;
let cacheBytes = 0;

async function compressed(file, key, encoding) {
  if (cache.has(key)) return cache.get(key);
  if (pending.has(key)) return pending.get(key);
  const task = (async () => {
    const data = await compressors[encoding](await readFile(file));
    if (data.length <= cacheLimit) {
      while (cacheBytes + data.length > cacheLimit) {
        const oldest = cache.keys().next().value;
        cacheBytes -= cache.get(oldest).length;
        cache.delete(oldest);
      }
      cache.set(key, data);
      cacheBytes += data.length;
    }
    return data;
  })();
  pending.set(key, task);
  try {return await task;} finally {pending.delete(key);}
}

http.createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) {res.writeHead(405, {Allow: 'GET, HEAD'}); return res.end();}
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/') {res.writeHead(302, {Location: '/Myblog/'}); return res.end();}
    let pathname;
    try {pathname = decodeURIComponent(url.pathname);} catch {res.writeHead(400); return res.end();}
    if (pathname.includes('\0')) {res.writeHead(400); return res.end();}
    if (pathname === '/robots.txt') pathname = '/Myblog/robots.txt';
    if (!pathname.startsWith('/Myblog/')) {res.writeHead(404); return res.end();}
    let file = path.resolve(root, '.' + pathname.slice(7));
    if (!file.startsWith(root + path.sep) && file !== root) {res.writeHead(403); return res.end();}
    let info = await stat(file);
    if (info.isDirectory()) {
      if (!pathname.endsWith('/')) {res.writeHead(301, {Location: url.pathname + '/' + url.search}); return res.end();}
      file = path.join(file, 'index.html');
      info = await stat(file);
    }
    if (!info.isFile()) {res.writeHead(404); return res.end();}
    const type = types[path.extname(file)] || 'application/octet-stream';
    const hashed = /\.[a-f\d]{8,}\.(?:js|css|webp|png|svg|woff2?)$/i.test(file);
    const noStore = type.startsWith('text/html');
    const cacheControl = noStore ? 'no-store' : hashed ? 'public, max-age=31536000, immutable' : /javascript|css/.test(type) ? 'no-cache' : 'public, max-age=600';
    const etag = `W/"${info.size.toString(16)}-${info.mtimeMs.toString(16)}"`;
    const headers = {'Content-Type': type, 'Cache-Control': cacheControl, ETag: etag, Vary: 'Accept-Encoding'};
    if (!noStore && req.headers['if-none-match'] === etag) {res.writeHead(304, headers); return res.end();}
    let start = 0, end = info.size - 1, status = 200;
    if (type === 'application/pdf') {
      headers['Accept-Ranges'] = 'bytes';
      // 支持单段与后缀范围；浏览器 PDF 阅读器无需一次读取整个文件。
      if (req.headers.range && (!req.headers['if-range'] || req.headers['if-range'] === etag)) {
        const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
        if (range && (range[1] || range[2])) {
          start = range[1] ? Number(range[1]) : Math.max(0, info.size - Number(range[2]));
          end = range[1] && range[2] ? Math.min(Number(range[2]), end) : end;
        }
        if (!range || (!range[1] && !range[2]) || !Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= info.size) {
          res.writeHead(416, {...headers, 'Content-Range': `bytes */${info.size}`}); return res.end();
        }
        status = 206;
        headers['Content-Range'] = `bytes ${start}-${end}/${info.size}`;
      }
    }
    const encoding = status === 200 && /text|javascript|json|xml|svg|wasm/.test(type)
      ? ['br', 'gzip'].find(value => req.headers['accept-encoding']?.includes(value)) : undefined;
    if (encoding) {
      const data = await compressed(file, `${file}:${info.mtimeMs}:${encoding}`, encoding);
      res.writeHead(status, {...headers, 'Content-Encoding': encoding, 'Content-Length': data.length});
      return res.end(req.method === 'HEAD' ? undefined : data);
    }
    res.writeHead(status, {...headers, 'Content-Length': end - start + 1});
    if (req.method === 'HEAD' || !info.size) return res.end();
    const stream = fs.createReadStream(file, {start, end});
    res.on('close', () => stream.destroy());
    stream.on('error', () => res.destroy());
    stream.pipe(res);
  } catch (error) {
    if (!res.headersSent) res.writeHead(error.code === 'ENOENT' || error.code === 'ENOTDIR' ? 404 : 500);
    res.end('Not found');
  }
}).listen(Number(process.env.PORT || 3000), '127.0.0.1', () => console.log(`生产预览：http://127.0.0.1:${process.env.PORT || 3000}/Myblog/`));
