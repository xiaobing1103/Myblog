import path from 'node:path';
import fs from 'node:fs';
import sharp from 'sharp';

const metadataCache = new Map();
function imageMetadata(file) {
  const info = fs.statSync(file);
  const key = `${file}:${info.mtimeMs}:${info.size}`;
  if (!metadataCache.has(key)) metadataCache.set(key, sharp(file).metadata());
  return metadataCache.get(key);
}

// 在编译时补齐本地图片尺寸，浏览器无需等待图片下载即可预留空间。
export default function remarkImages() {
  const variants = fs.existsSync('.cache/image-variants.json') ? JSON.parse(fs.readFileSync('.cache/image-variants.json', 'utf8')) : {};
  function responsive(file) {
    const entry = variants[path.relative(process.cwd(), file).replaceAll('\\', '/')];
    if (!entry) return {};
    if (entry.poster) return {'data-motion-poster': `/Myblog${entry.poster}`};
    return {srcSet: entry.variants.map(item => `/Myblog${item.url} ${item.width}w`).join(', '), sizes: '(max-width: 600px) calc(100vw - 32px), 760px'};
  }
  return async function (tree, file) {
    const tasks = [];
    function visit(node) {
      // MDX 中跨行的原生 p 不应再包一层 Markdown 段落，否则会导致 hydration 失败。
      if (node.type === 'mdxJsxFlowElement' && ['p', 'span', 'strong', 'em', 'b', 'i', 'del'].includes(node.name)) {
        node.children = node.children.flatMap(child => child.type === 'paragraph' ? child.children : [child]);
      }
      if (node.type === 'image' && !/^(?:https?:|data:)/.test(node.url)) {
        tasks.push((async () => {
          const local = node.url.startsWith('/img/') ? path.join(process.cwd(), 'static', node.url) : path.resolve(path.dirname(file.path), node.url);
          if (!fs.existsSync(local)) return;
          const meta = await imageMetadata(local);
          node.data = {...node.data, hProperties: {...node.data?.hProperties, width: meta.width, height: meta.pageHeight || meta.height, loading: 'lazy', decoding: 'async', ...responsive(local)}};
        })());
      }
      if (['mdxJsxFlowElement', 'mdxJsxTextElement'].includes(node.type) && node.name === 'img') {
        const attrs = node.attributes;
        for (const [name, value] of [['loading', 'lazy'], ['decoding', 'async']]) {
          if (!attrs.some(a => a.name === name)) attrs.push({type: 'mdxJsxAttribute', name, value});
        }
        const src = attrs.find(a => a.name === 'src')?.value;
        const expression = typeof src === 'object' ? src?.value : '';
        const base = expression.match(/useBaseUrl\(['"]([^'"]+)['"]\)/);
        const required = expression.match(/require\(['"]([^'"]+)['"]\)/);
        const relative = base?.[1] || required?.[1]?.split('!').pop() || (typeof src === 'string' ? src : '');
        const local = base ? path.resolve('static', relative.replace(/^\//, '')) : path.resolve(path.dirname(file.path), relative);
        if (relative && !/^https?:/.test(relative) && fs.existsSync(local) && fs.statSync(local).isFile()) {
          tasks.push((async () => {
            const meta = await imageMetadata(local);
            for (const [name, value] of [['width', meta.width], ['height', meta.pageHeight || meta.height]]) {
              if (value && !attrs.some(a => a.name === name)) attrs.push({type: 'mdxJsxAttribute', name, value: String(value)});
            }
            for (const [name, value] of Object.entries(responsive(local))) {
              if (!attrs.some(a => a.name === name)) attrs.push({type: 'mdxJsxAttribute', name, value});
            }
          })());
        }
      }
      node.children?.forEach(visit);
    }
    visit(tree);
    await Promise.all(tasks);
  };
}
