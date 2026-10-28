import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import vm from 'node:vm';

const files = ['ant', 'pdd', 'written'];
function example(name) {
  for (const slug of files) {
    const markdown = fs.readFileSync(`docs/interview/${slug}.md`, 'utf8');
    for (const match of markdown.matchAll(/```js\n([\s\S]*?)```/g)) {
      if (match[1].includes(`function ${name}(`)) {
        return new Function('console', `${match[1]}\nreturn ${name};`)({log() {}});
      }
    }
  }
  throw new Error(`缺少示例 ${name}`);
}
const addDecimal = example('addDecimal');
assert.equal(addDecimal('999999999999999999999', '1'), '1000000000000000000000');
assert.equal(addDecimal('000', '000'), '0');
for (let i = 0; i < 200; i++) assert.equal(addDecimal(String(i * 127), String(i * 843)), String(i * 970));
assert.throws(() => addDecimal('-1', '2'), TypeError);
assert.throws(() => addDecimal('', '2'), TypeError);

const all = example('all');
assert.deepEqual(await all([]), []);
assert.deepEqual(await all(new Set([1, Promise.resolve(2)])), [1, 2]);
assert.deepEqual(await all([new Promise(resolve => setTimeout(() => resolve('slow'), 20)), 'fast']), ['slow', 'fast']);
assert.deepEqual(await all([{then(resolve) {resolve(3); resolve(4);}}]), [3]);
await assert.rejects(all([Promise.reject(new Error('test'))]), /test/);
await assert.rejects(all(null), TypeError);
await assert.rejects(all({[Symbol.iterator]() {throw new Error('iterator');}}), /iterator/);

const tree = example('arrayToTree');
const rows = [{id: 2, parentId: 1}, {id: 1, parentId: null}];
assert.equal(tree(rows)[0].children[0].id, 2);
assert.equal(rows[1].children, undefined);
assert.deepEqual(tree([]), []);
assert.throws(() => tree([{id: 1, parentId: 2}]), /缺失/);
assert.throws(() => tree([{id: 1, parentId: null}, {id: 1, parentId: null}]), /重复/);
assert.throws(() => tree([{id: 1, parentId: 2}, {id: 2, parentId: 1}]), /环/);
assert.throws(() => tree([{id: 1, parentId: 1}]), /环/);

const clone = example('cloneData');
const symbol = Symbol('key');
const original = {arr: new Array(3), date: new Date(0), map: new Map(), set: new Set(), [symbol]: 3};
original.self = original; original.map.set(original, original); original.set.add(original);
const copy = clone(original);
assert.notEqual(copy, original); assert.equal(copy.self, copy);
assert.equal(copy.map.get(copy), copy); assert.equal(copy.set.has(copy), true);
assert.equal(copy.date.getTime(), 0); assert.equal(copy[symbol], 3);
assert.equal(copy.arr.length, 3); assert.equal(0 in copy.arr, false);
const protoKey = JSON.parse('{"__proto__":{"polluted":true}}');
assert.equal(Object.hasOwn(clone(protoKey), '__proto__'), true);
assert.equal({}.polluted, undefined);
assert.throws(() => clone({get x() {throw new Error('must not run');}}), /访问器/);
assert.throws(() => clone(new RegExp('x')), /类型/);
assert.throws(() => clone(new (class extends Date {})()), /类型/);
assert.throws(() => clone(new (class extends Map {})()), /类型/);
assert.throws(() => clone(new (class extends Array {})()), /类型/);

const parse = example('parseFragment');
assert.equal(parse('<a x="1"><b>中文</b><c/></a>').children[0].children[0].children[0].text, '中文');
assert.throws(() => parse('<a></b>'), SyntaxError);
assert.throws(() => parse('<a>'), SyntaxError);
assert.throws(() => parse('<script>bad</script>'), SyntaxError);
assert.throws(() => parse('<a x="1" x="2"/>'), SyntaxError);
assert.throws(() => parse('&amp;'), SyntaxError);

const fibonacci = example('fibonacci');
assert.equal(fibonacci(0), 0n); assert.equal(fibonacci(1), 1n);
assert.equal(fibonacci(100), 354224848179261915075n);
assert.throws(() => fibonacci(-1), RangeError);
assert.throws(() => fibonacci(1.5), RangeError);
const list = example('bstToList');
assert.equal(list(null), null);
const root = {value: 2, left: {value: 1}, right: {value: 3}};
const linked = list(root);
assert.deepEqual([linked.value, linked.next.value, linked.next.next.value], [1, 2, 3]);
assert.equal(root.left.value, 1); assert.equal(linked.next.next.next, null);

// 原型污染题只在隔离 context 内运行，验证异常确实中断后续语句。
const output = vm.runInNewContext(`
  const logs = [];
  var FUN = function () { function a(){}; var a = function(){}; };
  Object.prototype.a = () => logs.push('a3');
  Function.prototype.b = () => logs.push('b3');
  FUN.prototype.c = () => logs.push('c3');
  const fun = new FUN();
  for (const [target, method] of [[fun,'a'],[fun,'b'],[fun,'c'],[FUN,'a'],[FUN,'b'],[FUN,'c']]) {
    try {target[method]();} catch(error) {logs.push(error.name);}
  }
  JSON.stringify(logs);
`);
assert.deepEqual(JSON.parse(output), ['a3', 'TypeError', 'c3', 'a3', 'b3', 'TypeError']);
assert.equal(Object.prototype.a, undefined);
const scope = vm.runInNewContext(`
  var z=10; const logs=[]; function foo(){logs.push(z);}
  (function(){var z=20;foo();})(); z=30;foo();
  (function(funArg){var z=40;funArg();})(foo);
  JSON.stringify(logs);
`);
assert.deepEqual(JSON.parse(scope), [10, 30, 30]);

const conversions = JSON.parse(fs.readFileSync('reports/interview-conversion.json', 'utf8'));
assert.equal(conversions.length, 6);
assert.equal(conversions.reduce((sum, record) => sum + record.pages, 0), 359);
for (const record of conversions) {
  const text = fs.readFileSync(record.markdown, 'utf8');
  assert.equal([...text.matchAll(/^## 原 PDF 第 \d+ 页 \{#page-\d+\}/gm)].length, record.pages);
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(record.source)).digest('hex'), record.sourceSha256);
  assert.ok(fs.statSync(record.download).size > 1000);
}
console.log('面试代码边界验证与 6 份 / 359 页转换清单通过。');
