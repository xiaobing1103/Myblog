import fs from 'node:fs';

const dir = 'static/img/diagrams';
fs.mkdirSync(dir, {recursive: true});
const rect = (x, y, w, h, color = '#dce8ff') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${color}" stroke="#5c77a2"/>`;
const text = (x, y, value, size = 17) => `<text x="${x}" y="${y}" font-size="${size}" fill="#23334f">${value}</text>`;
function save(id, title, content, height = 420) {
  fs.writeFileSync(`${dir}/${id}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="${height}" viewBox="0 0 800 ${height}" role="img" aria-labelledby="title"><title id="title">${title}</title><rect width="800" height="${height}" rx="12" fill="#f8faff"/><g font-family="system-ui,sans-serif">${text(28, 40, title, 23)}${text(28, 68, '根据正文重绘的示意图，非原始截图', 13)}${content}</g></svg>`);
}
save('margin-collapse', '垂直外边距合并', rect(80, 100, 420, 70) + text(100, 143, '上方块：margin-bottom = 30px') + text(530, 195, '实际间隔 = 30px') + rect(80, 210, 420, 70) + text(100, 253, '下方块：margin-top = 20px') + text(80, 330, '相邻普通块的正外边距合并后取较大值，而不是 30 + 20。'));
save('child-margin', '子元素的顶部外边距', text(80, 125, '父元素没有 border / padding，未建立独立 BFC') + rect(80, 160, 620, 145, '#dcefdc') + rect(100, 160, 580, 145, '#ffe1df') + text(130, 220, '子元素 height: 100px') + text(130, 255, 'margin-top: 10px 可与父元素的外边距合并') + text(80, 350, '外边距位于父元素外侧；图中尺寸仅为示意。'));
save('parent-margin', '父元素高度与 BFC', rect(55, 140, 310, 120, '#dcefdc') + text(75, 180, '默认情况') + text(75, 215, '父高度 100px') + rect(420, 120, 320, 140, '#dcefdc') + text(440, 165, '建立 BFC：overflow: hidden') + text(440, 205, '包含子元素顶部外边距') + text(440, 235, '父高度 110px') + text(55, 320, '也可使用 display: flow-root 建立 BFC，而不裁切溢出内容。'));
const item = (x, y, w = 70, h = 32) => rect(x, y, w, h) + text(x + 25, y + 23, '项');
const flexRows = [
  ['flex-start', [220, 294, 368]], ['center', [345, 419, 493]], ['flex-end', [485, 559, 633]],
  ['space-between', [220, 425, 630]], ['space-around', [255, 425, 595]],
];
save('justify-content', 'justify-content：主轴对齐（row，LTR）', flexRows.map(([label, xs], i) => text(28, 115 + i * 55, label) + rect(205, 88 + i * 55, 530, 42, '#fff') + xs.map(x => item(x, 93 + i * 55)).join('')).join(''), 405);
save('align-items', 'align-items：交叉轴对齐（row）', ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'].map((label, i) => {
  const x = 24 + i * 155;
  let shapes = rect(x, 135, 145, 160, '#fff');
  for (let j = 0; j < 3; j++) {
    const h = [40, 65, 85][j];
    const y = i === 0 ? 140 : i === 1 ? 215 - h / 2 : i === 2 ? 290 - h : i === 3 ? 140 : 240 - h;
    shapes += rect(x + 8 + j * 43, y, 36, i === 3 ? 150 : h);
  }
  return text(x, 112, label, 15) + shapes;
}).join('') + text(28, 350, 'stretch 对交叉轴尺寸为 auto 的项目拉伸；baseline 按文字基线对齐。', 15));
save('flex-direction', 'flex-direction：项目排列方向（LTR）', ['row →', 'row-reverse ←', 'column ↓', 'column-reverse ↑'].map((label, i) => {
  const x = 30 + i * 192;
  return text(x, 112, label, 17) + rect(x, 130, 175, 210, '#fff') + [1, 2, 3].map((n, j) => {
    const k = i % 2 ? 2 - j : j;
    return rect(x + (i < 2 ? 10 + k * 53 : 50), 145 + (i < 2 ? 60 : k * 58), 48, 45) + text(x + (i < 2 ? 28 + k * 53 : 68), 174 + (i < 2 ? 60 : k * 58), n);
  }).join('');
}).join(''));
save('flex-wrap', 'flex-wrap：项目换行方式（row）', ['nowrap', 'wrap', 'wrap-reverse'].map((label, i) => {
  const x = 30 + i * 255;
  return text(x, 110, label) + rect(x, 130, 230, 190, '#fff') + [1, 2, 3, 4].map((n, j) => {
    const col = i === 0 ? j : j % 2;
    const row = i === 0 ? 0 : i === 1 ? Math.floor(j / 2) : 1 - Math.floor(j / 2);
    return rect(x + 8 + col * (i === 0 ? 54 : 108), 150 + row * 75, i === 0 ? 47 : 98, 55) + text(x + 23 + col * (i === 0 ? 54 : 108), 183 + row * 75, n);
  }).join('');
}).join('') + text(28, 370, 'nowrap 可按 flex-shrink 缩小项目；wrap-reverse 反转行堆叠方向。', 15));
const chain = (labels, caption) => labels.map((label, i) => rect(35 + i * 195, 150, 170, 70) + text(48 + i * 195, 192, label, 15) + (i < labels.length - 1 ? text(210 + i * 195, 192, '→', 22) : '')).join('') + text(35, 290, caption, 16);
save('prototype-chain', 'JavaScript 基础原型链', chain(['实例 obj', 'Foo.prototype', 'Object.prototype', 'null'], '查找属性时，沿对象的 [[Prototype]] 链逐级向上查找。'));
save('prototype-link', '构造函数与显式原型', chain(['构造函数 Foo', 'Foo.prototype', '原型对象'], 'Foo.prototype 指向原型对象；通常原型对象的 constructor 指回 Foo。'));
save('implicit-prototype', '实例的隐式原型', chain(['实例 obj', 'Foo.prototype', 'Object.prototype'], 'Object.getPrototypeOf(obj) === Foo.prototype（通过 new Foo 创建时）。'));
save('sorting-types', '常见排序算法分类', rect(30, 115, 350, 210) + text(50, 153, '比较排序', 22) + text(50, 200, '冒泡 · 选择 · 插入') + text(50, 240, '归并 · 堆排序 · 快速排序') + rect(420, 115, 350, 210, '#dcefdc') + text(440, 153, '非比较排序', 22) + text(440, 200, '计数排序 · 桶排序 · 基数排序') + text(440, 250, '利用值域、位数等额外信息') + text(30, 370, '比较排序在一般情况下需要 Ω(n log n) 次比较；非比较排序依赖数据条件。', 15));
const rows = [['冒泡', 'O(n²)', 'O(n²)', 'O(1)'], ['选择', 'O(n²)', 'O(n²)', 'O(1)'], ['插入', 'O(n²)', 'O(n²)', 'O(1)'], ['快速', 'O(n log n)', 'O(n²)', 'O(log n)*'], ['归并', 'O(n log n)', 'O(n log n)', 'O(n)'], ['堆排序', 'O(n log n)', 'O(n log n)', 'O(1)']];
save('sorting-cost', '常见排序算法复杂度', ['算法', '平均时间', '最坏时间', '额外空间'].map((s, i) => text(35 + i * 190, 110, s)).join('') + rows.map((row, i) => rect(25, 123 + i * 37, 750, 35, i % 2 ? '#fff' : '#e8effc') + row.map((s, j) => text(35 + j * 190, 148 + i * 37, s, 16)).join('')).join('') + text(30, 395, '*快速排序空间为平均递归栈；不平衡划分时可能退化到 O(n)。', 14), 425);
save('bubble-pass', '冒泡排序：一轮相邻比较', [[5, 3, 8, 4], [3, 5, 8, 4], [3, 5, 8, 4], [3, 5, 4, 8]].map((row, i) => text(28, 130 + i * 65, ['初始', '5 与 3 交换', '5 与 8 不交换', '8 与 4 交换'][i], 16) + row.map((n, j) => rect(240 + j * 115, 100 + i * 65, 95, 45, i === 3 && j === 3 ? '#dcefdc' : '#dce8ff') + text(278 + j * 115, 130 + i * 65, n, 21)).join('')).join('') + text(28, 405, '本轮结束后，最大值 8 已到达最右端；继续处理左侧未排序部分。', 15), 435);

const map = {'D0gQjH.png': ['margin-collapse', '垂直外边距合并示意'], 'D0Rn6e.png': ['child-margin', '子元素外边距示意'], 'D0RQ0A.png': ['parent-margin', '父元素与 BFC 示意'], 'DoHugH.png': ['justify-content', '主轴对齐示意'], 'DoHvqI.png': ['align-items', '交叉轴对齐示意'], 'DoqmXd.png': ['flex-direction', '排列方向示意'], 'DoqBNV.png': ['flex-wrap', '换行方式示意'], 'DBnKJg.png': ['prototype-chain', '基础原型链示意'], 'DBnLtS.png': ['implicit-prototype', '隐式原型示意'], 'DBrA6s.png': ['sorting-types', '排序分类示意'], 'DBrm7V.png': ['sorting-cost', '排序复杂度对比'], 'DBy7kV.gif': ['bubble-pass', '冒泡排序比较步骤']};
const file = 'docs/fontendInterview/Interview/01-Interview/index.md';
let source = fs.readFileSync(file, 'utf8');
source = source.replace(/<img src="https:\/\/s3\.ax1x\.com\/[^"\s]+\/([^/]+)"[^>]*\/>/g, (tag, filename) => map[filename] ? `![${map[filename][1]}（根据正文重绘）](/img/diagrams/${map[filename][0]}.svg)` : tag);
if (!source.includes('> 图片说明：')) source = source.replace('## 1.谈一谈你理解的盒子模型？', '> 图片说明：本文部分旧图床原图已失效，相关示意已依据正文重新绘制并保存在本站。\n\n## 1.谈一谈你理解的盒子模型？');
source = source.replace('对象显示原型', '对象显式原型').replace('对象显式原型\n', '对象显式原型\n\n![构造函数与显式原型（根据正文重绘）](/img/diagrams/prototype-link.svg)\n');
fs.writeFileSync(file, source);
const report = JSON.parse(fs.readFileSync('reports/image-sources.json', 'utf8'));
report.failures = report.failures.map(item => ({...item, replacement: map[item.url.split('/').pop()] ? `/img/diagrams/${map[item.url.split('/').pop()][0]}.svg` : null}));
fs.writeFileSync('reports/image-sources.json', JSON.stringify(report, null, 2));
console.log('已重绘并替换失效示意图。');
