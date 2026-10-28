import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {unzipSync} from 'fflate';

// 阅读器、核心和 Worker 必须从同一份官方发布包更新。
const version = '6.4.299';
const source = `https://github.com/mozilla/pdf.js/releases/download/v${version}/pdfjs-${version}-dist.zip`;
const sha256 = 'f2245eb7ef3f674c872fe568a177bfec15874f5c034613e55d8e307f93ebd86d';
let archive;
if (process.argv[2]) archive = fs.readFileSync(process.argv[2]);
else {
  const response = await fetch(source);
  if (!response.ok) throw new Error(`PDF.js download failed: ${response.status}`);
  archive = new Uint8Array(await response.arrayBuffer());
}
if (createHash('sha256').update(archive).digest('hex') !== sha256) throw new Error('PDF.js checksum mismatch');
const root = path.resolve('static/pdfjs');
for (const [name, data] of Object.entries(unzipSync(archive))) {
  if (name.endsWith('/') || name.endsWith('.map') || name.endsWith('.pdf')) continue;
  const destination = path.resolve(root, name);
  if (!destination.startsWith(root + path.sep)) throw new Error('Invalid archive path');
  fs.mkdirSync(path.dirname(destination), {recursive: true});
  if (name === 'web/viewer.html') {
    let html = new TextDecoder().decode(data);
    html = html.replace('<html ', '<html data-myblog-viewer="true" ')
      .replace('<script src="viewer.mjs"', '<script type="module" src="../../pdf-reader/config.mjs"></script>\n  <script src="viewer.mjs"')
      .replace('</head>', '  <link rel="stylesheet" href="../../pdf-reader/theme.css">\n</head>');
    fs.writeFileSync(destination, html);
  } else fs.writeFileSync(destination, data);
}
fs.writeFileSync(path.join(root, 'version.json'), JSON.stringify({version, source, sha256}, null, 2) + '\n');
console.log(`PDF.js ${version}: official viewer and worker synchronized`);
