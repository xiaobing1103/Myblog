---
title: 阿里题集第二期：51 道算法与 SQL 解析
sidebar_label: 第二期 · 算法与 SQL
description: 补齐原 PDF 中缺失的算法答案，修正旋转、扁平化、两数之和和随机排序等实现。
---

对照 [完整原文](../sources/ali-2.md)；返回 [第二期导读](./index.md)。本页按“八、算法相关”1—51 及原书另一个“八、SQL 算法题”1—2 的编号整理。原书多数后半题仅有题面，以下代码为重新编写的 JavaScript 解答。

练习方式：先写输入、输出、约束与边界例，再实现。数组题默认稠密、无循环嵌套；链表节点结构为 `{val,next}`，二叉树节点为 `{val,left,right}`；返回 null 代表没有节点。不依赖网站安装其他算法库。

## A1 · 选择排序（第 80 页）

每轮选出未排序区间的最小值，与区间首项交换。时间 O(n²)，辅助空间 O(1)，常见交换版本不稳定；下面复制输入后排序，因此复制另占 O(n) 空间。

```js
function selectionSort(input) {
  const a = [...input];
  for (let i = 0; i < a.length - 1; i++) {
    let smallest = i;
    for (let j = i + 1; j < a.length; j++) if (a[j] < a[smallest]) smallest = j;
    [a[i], a[smallest]] = [a[smallest], a[i]];
  }
  return a;
}
```

## A2 · 迭代 flatten（第 80—81 页，纠错）

原算法把展开内容 concat 到尾部，会改变顺序且 splice 时可能跳项。用栈反向压入来保持原顺序，O(n) 时间和 O(n) 辅助空间，n 包含嵌套数组与叶子项数。

```js
function flatten(input) {
  const stack = [...input].reverse();
  const result = [];
  while (stack.length) {
    const value = stack.pop();
    if (Array.isArray(value)) {
      for (let i = value.length - 1; i >= 0; i--) stack.push(value[i]);
    } else result.push(value);
  }
  return result;
}
```

## A3 · DFS 与 BFS（第 81—82 页）

DFS 用栈或递归，**不是堆**；BFS 用队列。图需要 visited 防止环导致死循环。邻接表遍历时间 O(V+E)、辅助空间 O(V)；BFS 在无权图中按边数得到最短距离，DFS 不保证。拓扑排序要求有向无环图，不能把任意图的 DFS 结果当拓扑顺序。

```js
function bfs(graph, start) {
  const queue = [start];
  const seen = new Set(queue);
  for (let head = 0; head < queue.length; head++) {
    for (const next of graph.get(queue[head]) ?? []) {
      if (!seen.has(next)) { seen.add(next); queue.push(next); }
    }
  }
  return queue;
}
function dfs(graph, start) {
  const stack = [start], seen = new Set(), order = [];
  while (stack.length) {
    const node = stack.pop();
    if (seen.has(node)) continue;
    seen.add(node); order.push(node);
    const next = graph.get(node) ?? [];
    for (let i = next.length - 1; i >= 0; i--) stack.push(next[i]);
  }
  return order;
}
```

上面返回从 start 可达的节点；要覆盖非连通图，对所有未访问节点再启动遍历。

## A4 · 扁平化、去重、升序（第 82—83 页）

先展开，再 Set 去重，再数值排序。原递归版本仅在当前层检查重复，不能可靠去掉跨层重复。

```js
function flattenUniqueSorted(input) {
  return [...new Set(flatten(input))].sort((a, b) => a - b);
}
```

适用于题设有限数字；比较排序通常按 O(n log n) 分析，但 JS 规范不规定 sort 的具体算法和复杂度。

## A5 · 含重复次数的交集（第 83 页，补答）

不是 Set 交集；每个值出现次数为两数组次数最小值。哈希计数期望 O(n+m) 时间、O(n) 空间。

```js
function intersect(a, b) {
  const count = new Map(), result = [];
  for (const x of a) count.set(x, (count.get(x) ?? 0) + 1);
  for (const x of b) {
    const left = count.get(x) ?? 0;
    if (left > 0) { result.push(x); count.set(x, left - 1); }
  }
  return result;
}
// intersect([1,2,2,1], [2,2]) -> [2,2]
```

## A6 · 十位分组（第 83—84 页）

按 `floor(x/10)` 分组，排序后去重，空分组不输出。题目示例数组只有 9 项，与“长度 10”不一致，分组函数不依赖固定长度。原随机生成 `round(random*100)` 端点分布不均；若需要 0—99 均匀整数，用 `floor(random*100)`。

```js
function groupByTens(input) {
  const groups = new Map();
  for (const value of [...new Set(input)].sort((a, b) => a - b)) {
    const key = Math.floor(value / 10);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(value);
  }
  return [...groups.values()];
}
```

## A7 · 大小写取反（第 84 页，纠错）

原代码只比较字符码是否大于 97，会改坏数字、标点和非拉丁文字。按题目英文大小写条件处理，其他字符保留。时间 O(n)。Unicode 大小写还可能一对多，若需通用国际化必须另定需求。

```js
const swapCase = text => text.replace(/[a-zA-Z]/g,
  char => /[a-z]/.test(char) ? char.toUpperCase() : char.toLowerCase());
```

## A8 · 字符串匹配（第 84—85 页）

朴素法逐起点比较，最坏 O((n-m+1)m)，额外空间 O(1)。补齐空目标返回 0；原实现切片复制多且空字符串边界错误。

```js
function findSubstring(text, target) {
  if (target.length === 0) return 0;
  for (let i = 0; i <= text.length - target.length; i++) {
    let j = 0;
    while (j < target.length && text[i + j] === target[j]) j++;
    if (j === target.length) return i;
  }
  return -1;
}
```

若要求线性最坏时间可实现 KMP；这里的索引按 JS UTF-16 码元，和原生 indexOf 一致。

## A9 · 右旋数组（第 85 页，纠错）

原代码每项都读取相同索引。归一化 k 后拼接尾部与前部，O(n) 时间和空间；空数组单独处理，k 按题设为非负整数。

```js
function rotateRight(a, k) {
  if (a.length === 0) return [];
  k %= a.length;
  return k === 0 ? [...a] : [...a.slice(-k), ...a.slice(0, -k)];
}
```

## A10 · 两数之和（第 85—86 页，纠错）

先查补数再保存当前项，避免复用同一下标；不能用 if(index) 判断，索引 0 也是有效值。哈希查找期望 O(n) 时间与空间。

```js
function twoSum(numbers, target) {
  const seen = new Map();
  for (let i = 0; i < numbers.length; i++) {
    const other = target - numbers[i];
    if (seen.has(other)) return [seen.get(other), i];
    seen.set(numbers[i], i);
  }
  return null;
}
```

## A11 · 递归反转整数为字符串（第 86 页）

```js
function reverseInteger(n) {
  if (n < 0) return '-' + reverseInteger(-n);
  return String(n % 10) + (n >= 10 ? reverseInteger(Math.trunc(n / 10)) : '');
}
// reverseInteger(1200) -> '0021'
```

输入约定为安全整数；结果是字符串，所以保留逆序后的前导零，负号保持在前。这是对原题未说明的负数情况作出的明确约定。递归深度为位数 d，字符串反复拼接成本依实现，不能武断保证 O(d) 总时间。

## A12 · 随机洗牌（第 86—87 页，纠错）

`sort(() => Math.random()-0.5)` 不满足一致比较器规则，存在偏差。Fisher–Yates 每轮在剩余区间均匀选一个元素，假定随机源均匀时每个排列概率相同。O(n) 时间，以下复制输入占 O(n) 空间；Math.random 不用于安全抽签或密码。

```js
function shuffle(input) {
  const a = [...input];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
```

依据：[MDN：Array.sort 比较器约束](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)。

## A13 · 数字变 0（第 87—88 页，补答）

按题目模拟，偶数除二、奇数减一，0 返回 0；对正数步数为 O(log n)，空间 O(1)。

```js
function numberOfSteps(n) {
  let steps = 0;
  while (n > 0) { n = n % 2 === 0 ? n / 2 : n - 1; steps++; }
  return steps;
}
```

## A14 · Trie（第 88—89 页，补答）

每条边表示字符，end 区分完整单词和仅有前缀。单次操作 O(L)，总空间与插入字符数成正比；以下按题设非空英文词处理。

```js
class Trie {
  constructor() { this.root = { children: new Map(), end: false }; }
  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) node.children.set(char, { children: new Map(), end: false });
      node = node.children.get(char);
    }
    node.end = true;
  }
  find(prefix) {
    let node = this.root;
    for (const char of prefix) {
      node = node.children.get(char);
      if (!node) return null;
    }
    return node;
  }
  search(word) { return this.find(word)?.end === true; }
  startsWith(prefix) { return this.find(prefix) !== null; }
}
```

## A15 · 朋友圈/连通分量（第 89—90 页，补答）

扫描未访问的人，每次开启一次 DFS 就得到一个连通分量。邻接矩阵需扫描 O(n²)，空间 O(n)。关系矩阵按题意对称。

```js
function countCircles(matrix) {
  const seen = new Set();
  let count = 0;
  for (let start = 0; start < matrix.length; start++) {
    if (seen.has(start)) continue;
    count++;
    const stack = [start]; seen.add(start);
    while (stack.length) {
      const person = stack.pop();
      for (let next = 0; next < matrix.length; next++) {
        if (matrix[person][next] === 1 && !seen.has(next)) {
          seen.add(next); stack.push(next);
        }
      }
    }
  }
  return count;
}
```

## A16 · 解压缩编码列表（第 90—91 页，补答）

每两个数为频率和值，顺序展开。输入按题设偶数长度、非负频率。时间和结果空间均为 O(输出长度)。

```js
function decompress(numbers) {
  const result = [];
  for (let i = 0; i < numbers.length; i += 2) {
    for (let j = 0; j < numbers[i]; j++) result.push(numbers[i + 1]);
  }
  return result;
}
```

## A17 · 各位积减各位和（第 91—92 页，补答）

```js
function productMinusSum(n) {
  let product = 1, sum = 0;
  for (const char of String(n)) { const digit = Number(char); product *= digit; sum += digit; }
  return product - sum;
}
```

按非负整数处理，0 的位数视作一位，结果 0；时间和字符串空间为 O(位数)。

## A18 · 猜数字（第 92—93 页，补答）

只比较同一轮对应位置，不是求集合交集。题设长度为 3，所以时间与额外空间均 O(1)。

```js
const guessCount = (guess, answer) => guess.reduce(
  (count, value, i) => count + Number(value === answer[i]), 0);
```

## A19 · 偶数位数的数字（第 93 页，补答）

```js
const countEvenDigits = numbers => numbers.filter(n => String(n).length % 2 === 0).length;
```

题设都是正整数，因此不计负号或科学计数法；遍历每个数的十进制表示，时间 O(总位数)。用 filter 会创建结果数组，若需 O(1) 额外空间可改计数循环。

## A20 · 无临时变量交换（第 93—94 页，补答）

```js
function swapNumbers(numbers) {
  [numbers[0], numbers[1]] = [numbers[1], numbers[0]];
  return numbers;
}
```

满足“无显式临时变量”，不承诺引擎内部零临时存储。不要用加减法冒精度溢出风险，也不要用 XOR 将普通数截断为 32 位。

## A21 · 只给非尾节点，删除它（第 94—95 页，补答）

```js
function deleteGivenNode(node) {
  node.val = node.next.val;
  node.next = node.next.next;
}
```

O(1) 时间/空间。复制后继的值再跳过后继，因此**改变节点身份对应的值**；题设必须保证非尾节点。若节点有外部身份约束、不可改值或是尾节点，这个方案不成立。

## A22 · 子集（第 95 页，补答）

```js
function subsets(numbers) {
  const result = [[]];
  for (const value of numbers) {
    const count = result.length;
    for (let i = 0; i < count; i++) result.push([...result[i], value]);
  }
  return result;
}
```

每个数选择加入或不加入，结果 2ⁿ 个子集，总输出时间与空间 O(n·2ⁿ)。原题数组互不重复；有重复值需要额外去重策略。

## A23 · 螺旋矩阵 II（第 95—96 页，补答）

维护上、下、左、右边界，每完成一条边就收缩。中间剩一行或一列时用条件避免重复写入。时间/结果空间 O(n²)。

```js
function spiralMatrix(n) {
  const result = Array.from({ length: n }, () => Array(n).fill(0));
  let top = 0, bottom = n - 1, left = 0, right = n - 1, value = 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) result[top][c] = value++;
    top++;
    for (let r = top; r <= bottom; r++) result[r][right] = value++;
    right--;
    if (top <= bottom) { for (let c = right; c >= left; c--) result[bottom][c] = value++; bottom--; }
    if (left <= right) { for (let r = bottom; r >= top; r--) result[r][left] = value++; left++; }
  }
  return result;
}
```

## A24 · IPv4 地址无效化（第 96 页，补答）

```js
const defangIP = address => address.replaceAll('.', '[.]');
```

输入已保证是合法 IPv4，这只是展示替换，不是网络安全隔离或地址校验。时间与输出空间 O(n)。

## A25 · 二进制链表转整数（第 96—98 页，补答）

```js
function binaryListToNumber(head) {
  let value = 0;
  for (let node = head; node; node = node.next) value = value * 2 + node.val;
  return value;
}
```

每次左移一位再加入当前位。题设最多 30 位，Number 安全；更长的位串改 BigInt，避免普通位运算截断。O(n) 时间、O(1) 空间。

## A26 · 反转链表（第 98 页，补答）

```js
function reverseList(head) {
  let previous = null, current = head;
  while (current) {
    const next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }
  return previous;
}
function reverseListRecursive(head) {
  if (!head || !head.next) return head;
  const result = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  return result;
}
```

二者均 O(n) 时间；迭代 O(1) 辅助空间，递归 O(n) 栈且可能溢出。都会修改原链表，别对同一链表连续调用后误比结果。

## A27 · 删除元音（第 98—99 页，补答）

```js
const removeVowels = text => text.replace(/[aeiou]/g, '');
```

题设仅小写英文，所以不需要 i 标志；若产品需求包含大写或其他语言，应另行定义元音范围。O(n) 时间与结果空间。

## A28 · 变位映射（第 99—100 页，补答）

把 B 中每个值的索引存成栈，按 A 依次取出，重复值也使用不同索引。期望 O(n) 时间和空间。

```js
function anagramMapping(a, b) {
  const positions = new Map();
  b.forEach((value, i) => {
    if (!positions.has(value)) positions.set(value, []);
    positions.get(value).push(i);
  });
  return a.map(value => positions.get(value).pop());
}
```

前提是 B 确为 A 的变位，否则必须校验缺失值。

## A29 · TinyURL（第 100 页，补答）

短链接是映射编码，**不是加密**。单进程练习可以自增 ID 转 base36 并存双向映射。encode/decode 在内存中期望 O(1) 查表；实际服务还需持久化、唯一 ID、域名、过期策略和滥用控制。

```js
class TinyURL {
  constructor() { this.next = 1n; this.forward = new Map(); this.backward = new Map(); }
  encode(url) {
    if (this.backward.has(url)) return this.backward.get(url);
    const short = 'https://tiny.example/' + (this.next++).toString(36);
    this.forward.set(short, url); this.backward.set(url, short);
    return short;
  }
  decode(short) { return this.forward.get(short) ?? null; }
}
```

ID 可猜测，不能因此授予私密资源权限；重启会丢失此练习映射。

## A30 · 访问所有点的最短时间（第 100—101 页，补答）

相邻两点先对角线移动 min(dx,dy) 次，再补剩余距离，合计 max(dx,dy)。按规定顺序累加，O(n) 时间、O(1) 辅助空间。

```js
function minVisitTime(points) {
  let time = 0;
  for (let i = 1; i < points.length; i++) {
    time += Math.max(Math.abs(points[i][0] - points[i - 1][0]),
      Math.abs(points[i][1] - points[i - 1][1]));
  }
  return time;
}
```

## A31 · 不重复字符的全排列（第 101—102 页，补答）

```js
function permutations(text) {
  const chars = [...text], used = Array(chars.length).fill(false), result = [], path = [];
  function visit() {
    if (path.length === chars.length) { result.push(path.join('')); return; }
    for (let i = 0; i < chars.length; i++) {
      if (used[i]) continue;
      used[i] = true; path.push(chars[i]); visit(); path.pop(); used[i] = false;
    }
  }
  visit();
  return result;
}
```

题设字符不重复，输出 n! 个字符串，时间/输出空间 O(n·n!)，辅助回溯空间 O(n)。这不是可以对超长输入随意运行的线性算法。

## A32 · 有序矩阵负数计数（第 102—104 页，补答）

从左下角出发：非负就右移；遇到负数，当前行其右侧全部为负，累加后上移。O(m+n) 时间、O(1) 空间。原书把本题的示例 4 和约束排到了 A33 后，不能当 A33 的链表输入。

```js
function countNegatives(grid) {
  if (!grid.length) return 0;
  let row = grid.length - 1, col = 0, count = 0;
  while (row >= 0 && col < grid[0].length) {
    if (grid[row][col] < 0) { count += grid[0].length - col; row--; }
    else col++;
  }
  return count;
}
```

## A33 · 倒数第 k 个节点（第 103 页，补答）

快指针先走 k 步，再同步移动两个指针；快指针到末尾时，慢指针即为目标。越界返回 null，O(n) 时间、O(1) 空间。

```js
function kthFromEnd(head, k) {
  if (!Number.isInteger(k) || k <= 0) return null;
  let fast = head, slow = head;
  for (let i = 0; i < k; i++) { if (!fast) return null; fast = fast.next; }
  while (fast) { fast = fast.next; slow = slow.next; }
  return slow;
}
```

## A34 · 单行键盘（第 104—105 页，补答）

建字符到位置表，从下标 0 开始累加绝对差。O(键盘长度+单词长度) 时间，英文固定键盘下辅助空间 O(1)。

```js
function keyboardTime(keyboard, word) {
  const positions = new Map([...keyboard].map((char, i) => [char, i]));
  let current = 0, time = 0;
  for (const char of word) {
    const next = positions.get(char);
    time += Math.abs(next - current); current = next;
  }
  return time;
}
```

## A35 · 二叉树深度（第 105 页，补答）

迭代保存节点和深度，避免单链状一万层树递归爆栈。O(n) 时间，辅助空间最坏 O(n)。空树深度为 0。

```js
function maxDepth(root) {
  if (!root) return 0;
  const stack = [[root, 1]];
  let maximum = 0;
  while (stack.length) {
    const [node, depth] = stack.pop();
    maximum = Math.max(maximum, depth);
    if (node.left) stack.push([node.left, depth + 1]);
    if (node.right) stack.push([node.right, depth + 1]);
  }
  return maximum;
}
```

## A36 · 1 到最大的 n 位数（第 105—106 页，补答）

题面要求返回整个数组，输出本身就有 10ⁿ−1 项，时间/结果空间不可能低于这个规模。小 n 可以：

```js
const printNumbers = n => Array.from({ length: 10 ** n - 1 }, (_, i) => i + 1);
```

上式只适用于能实际分配且整数精度足够的小 n；题面未给 n 上界，所以**不能把它声称为任意 n 可运行的实现**。只需逐个消费大整数时改生成器，改变了返回类型，仍不能消除巨大输出耗时：

```js
function* positiveNumbers(n) {
  const limit = 10n ** BigInt(n);
  for (let value = 1n; value < limit; value++) yield value.toString();
}
```

## A37 · 其他数字出现三次（第 106—107 页，补答）

按每一位出现次数模 3，可得唯一数的对应位。题设为正整数且小于 2³¹，因此使用 31 位安全；O(31n) 时间、O(1) 辅助空间。

```js
function singleNumber(numbers) {
  let result = 0;
  for (let bit = 0; bit < 31; bit++) {
    let count = 0;
    for (const value of numbers) count += (value >>> bit) & 1;
    if (count % 3 !== 0) result += 2 ** bit;
  }
  return result;
}
```

若允许任意大小整数或负数，位数/有符号语义需要重新定义，不能直接拓展到 64 位 Number。

## A38 · 单词频率（第 107 页，补答）

构造时预统计，之后期望 O(1) 查询；预处理 O(总字符数)，空间 O(不同单词及其字符数)。

```js
class WordsFrequency {
  constructor(book) {
    this.count = new Map();
    for (const word of book) this.count.set(word, (this.count.get(word) ?? 0) + 1);
  }
  get(word) { return this.count.get(word) ?? 0; }
}
```

这里按题设字符串数组完全匹配，不自行做分词、词形还原或大小写折叠。

## A39 · 替换空格（第 107—108 页，补答）

```js
const replaceSpaces = text => text.replaceAll(' ', '%20');
```

只替换 ASCII 空格，不是所有空白；也不等于完整 URL 编码，不能用它替代 URL/URLSearchParams。O(n) 时间与结果空间。

## A40 · 分割平衡字符串（第 108—109 页，补答）

```js
function balancedSplit(text) {
  let balance = 0, count = 0;
  for (const char of text) {
    balance += char === 'L' ? 1 : -1;
    if (balance === 0) count++;
  }
  return count;
}
```

题设仅含 L/R 且整体平衡。每次最早归零就切分不会妨碍后续平衡，所以贪心可得到最多段。O(n) 时间、O(1) 空间。

## A41 · 删除中间节点（第 109 页，补答）

与 **A21** 相同：复制后继值并跳过后继，使用本页 `deleteGivenNode(node)`。题意说的“中间”是非头非尾，不一定是长度中点；只有节点引用时不能使用“找前驱再删”的方案。

## A42 · 从尾到头打印链表（第 109 页，补答）

```js
function reversePrint(head) {
  const result = [];
  for (let node = head; node; node = node.next) result.push(node.val);
  return result.reverse();
}
```

不改变链表，O(n) 时间与结果空间。与反转链表不同，返回的是值数组。

## A43 · 反转链表（第 109—110 页，补答）

与 **A26** 相同，使用 `reverseList(head)` 返回新的头节点，注意它会修改每个 next。原题允许空链表，返回 null；5000 节点也优先迭代版本。

## A44 · 6 与 9 的最大数（第 110—111 页，补答）

```js
const maximum69 = n => Number(String(n).replace('6', '9'));
```

将从左起第一个 6 改成 9，收益在最高位最大；没有 6 时保持原值，符合“最多一次”要求。O(位数) 时间与空间。

## A45 · 最小元素数位和奇偶（第 111—112 页，补答）

```js
function evenDigitSumOfMinimum(numbers) {
  let minimum = Infinity;
  for (const value of numbers) minimum = Math.min(minimum, value);
  let sum = 0;
  for (const digit of String(minimum)) sum += Number(digit);
  return sum % 2 === 0 ? 1 : 0;
}
```

题设数组非空且为正整数。原文 `A[i].length` 的约束显然是排版错误，数值没有字符串 length，不能照搬为输入校验。O(n+最小数位数) 时间。

## A46 · 合并二叉树（第 112—113 页，补答）

创建新节点，避免调用后输入树意外被修改；一个节点为空时等价于该侧值为 0。下面迭代处理，O(两树节点总数) 时间和最坏 O(n) 辅助空间，另外占新树结果空间。

```js
function mergeTrees(a, b) {
  if (!a && !b) return null;
  const root = { val: (a?.val ?? 0) + (b?.val ?? 0), left: null, right: null };
  const stack = [[a, b, root]];
  while (stack.length) {
    const [first, second, output] = stack.pop();
    for (const side of ['left', 'right']) {
      const x = first?.[side], y = second?.[side];
      if (!x && !y) continue;
      output[side] = { val: (x?.val ?? 0) + (y?.val ?? 0), left: null, right: null };
      stack.push([x, y, output[side]]);
    }
  }
  return root;
}
```

## A47 · 汉明距离（第 113 页，补答）

XOR 得到不同位；每次清除最低的 1 并计数。题设为 x、y 非负且小于 2³¹，可使用普通 JS 位运算，O(置位数) 时间、O(1) 空间。

```js
function hammingDistance(x, y) {
  let bits = x ^ y, count = 0;
  while (bits !== 0) { bits &= bits - 1; count++; }
  return count;
}
```

## A48 · 唯一摩尔斯密码词（第 113—114 页，补答）

```js
function uniqueMorse(words) {
  const codes = ['.-','-...','-.-.','-..','.','..-.','--.','....','..','.---','-.-','.-..',
    '--','-.','---','.--.','--.-','.-.','...','-','..-','...-','.--','-..-','-.--','--..'];
  return new Set(words.map(word => [...word].map(c => codes[c.charCodeAt(0) - 97]).join(''))).size;
}
```

按题设小写英文，将编码拼接后去重；时间、输出中间空间与编码总长度成正比。原文 cab 的拆分说明与字母表存在笔误，应严格按 c=`-.-.`、a=`.-`、b=`-...` 拼接。

## A49 · 自除数（第 114—115 页，补答）

```js
function selfDividingNumbers(left, right) {
  const result = [];
  for (let n = left; n <= right; n++) {
    if ([...String(n)].every(d => d !== '0' && n % Number(d) === 0)) result.push(n);
  }
  return result;
}
```

包含 0 直接排除，必须用原数判断能否整除每一位。O(区间长度×位数) 时间，除结果外 O(位数) 字符空间。原文把 left/right 的“上/下边界”文字写反，按约束 left≤right 理解。

## A50 · 二叉树最大深度（第 115 页，补答）

与 **A35** 相同，使用 `maxDepth(root)`。深度按节点数算：空树 0，单节点 1，示例返回 3；不要与按边数定义的高度混用。

## A51 · 斐波那契（第 115—116 页，补答）

```js
function fibonacci(n) {
  let previous = 0, current = 1;
  for (let i = 0; i < n; i++) [previous, current] = [current, previous + current];
  return previous;
}
```

O(n) 时间、O(1) 空间；原题 n≤30，Number 精度足够。避免无缓存的指数递归；大 n 需 BigInt 并考虑快速倍增等方法。

## SQL1 · 重复电子邮箱（第 116—117 页，补答）

```sql
SELECT Email
FROM Person
GROUP BY Email
HAVING COUNT(*) > 1;
```

WHERE 过滤行，HAVING 过滤分组；不能直接 `WHERE COUNT(*) > 1`。题目邮箱非空且按给定数据库排序规则比较；若实际库允许 NULL 且不想统计它，先 `WHERE Email IS NOT NULL`。有索引时执行计划可能不同，不把固定时间复杂度当数据库保证。

依据：[MySQL：GROUP BY](https://dev.mysql.com/doc/refman/8.4/en/group-by-handling.html)。

## SQL2 · 大的国家（第 117—118 页，补答）

原 PDF 的文字是面积**超过** 300 万、人口**超过** 2500 万：

```sql
SELECT name, population, area
FROM World
WHERE area > 3000000 OR population > 25000000;
```

需要用 OR，不是 AND。若使用的在线题版本定义为“至少”，应改 `>=`；示例不包含恰好等于边界的国家，所以仅凭示例无法区分，必须回到精确题意。

## 实现依据与自测重点

上面的解题代码为原创补充，算法步骤依据题设逐一推导；JS API 语义可对照 [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)、[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)、[BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。Map 的哈希式期望复杂度是常见实现分析，规范只要求平均次线性访问，不保证每次严格 O(1)。

重点加测：空数组、重复 0、k 为数组长度倍数、两数之和需要索引 0、flatten 跨层重复、非尾节点限制、空树、负数计数单行/单列、SQL 恰好等于边界。算法快不快必须同时算输出规模和额外空间。
