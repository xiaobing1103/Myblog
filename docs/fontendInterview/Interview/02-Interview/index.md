---
id: 02-Interview
title: JavaScript 基础面试题 2：逐题解析
sidebar_label: JavaScript 基础题 2
description: 18 道 JavaScript 基础题，覆盖作用域、数组、this、原型、DOM 和手写算法，附正确答案与边界。
keywords:
  - JavaScript
  - 前端面试
---

保留原有 18 道题目与访问地址，修正数组示例、原型执行顺序、DOM API 和算法边界。示例标注运行环境；可以先预测输出，再复制到对应环境运行。[完整面试题库](../../../interview/index.mdx)

## 1. 阅读代码，写出打印结果

```js
var x = 5;
function fn(x) {
  return function (y) { console.log(y + (++x)); };
}
var f = fn(6);
f(7);
console.log(x);
```

输出 **14、5**。fn 的形参 x 与外层 x 是不同绑定；闭包保留形参 x，第一次调用先把它由 6 加到 7，再与 y 相加。如果继续调用 `f(7)`，会输出 15；外层 x 仍是 5。闭包由函数与词法环境组成，不会让所有相关数据永久无法回收。[MDN 闭包](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)

## 2. 阅读代码，写出打印结果

```js
var o3 = { m: 3 };
var o4 = o3;
o3 = { m: 4 };
console.log(o4.m, o4 === o3);
```

输出 **3、false**。第一次赋值让两个变量引用同一个对象；后续给 o3 赋新对象只改变该绑定，o4 仍引用旧对象。如果执行的是 `o3.m = 4`，两个引用看到的才都会是 4。无需假定或打印引擎内存地址。

## 3. 写出你知道的数组方法

| 方法 | 结果 | 修改原数组 |
| --- | --- | --- |
| push / unshift | 尾部/头部添加，返回新长度 | 是 |
| pop / shift | 删除尾部/头部，返回被删项 | 是 |
| splice | 指定位置增删，返回被删项数组 | 是 |
| sort / reverse | 排序/反转，返回同一个数组 | 是 |
| slice / concat | 截取/连接得到新数组 | 否，内部引用仍可能共享 |
| map / filter | 映射/过滤得到新数组 | 方法本身不修改，回调可能修改 |
| forEach | 遍历副作用，返回 undefined | 取决于回调 |
| some / every | 判断是否某项/全部满足 | 方法本身不修改 |
| find / findIndex | 首个匹配值/索引 | 否 |
| includes / indexOf | 是否包含/首次索引 | 否 |
| reduce / reduceRight | 按顺序累积结果 | 方法本身不修改 |
| join | 连接为字符串 | 否 |
| toSorted / toReversed / toSpliced | 排序/反转/增删的新数组版本 | 否 |

```js
const values = [1, 2, 3, 4];
console.log(values.pop()); // 4；values 为 [1, 2, 3]
console.log(values.unshift(5, 6)); // 5；values 为 [5, 6, 1, 2, 3]

const removed = [1, 2, 3, 4];
console.log(removed.splice(1, 2)); // [2, 3]；removed 为 [1, 4]
const replaced = [1, 2, 3, 4];
console.log(replaced.splice(1, 2, 5, 6, 7)); // [2, 3]
console.log(replaced); // [1, 5, 6, 7, 4]

console.log([1, 10, 2].sort()); // [1, 10, 2]，默认按转为字符串后的顺序
console.log([1, 10, 2].sort((a, b) => a - b)); // [1, 2, 10]
console.log([1, 2, 3].reduce((sum, n) => sum + n, 0)); // 6
```

注意：

- 索引从 0 开始，`arr[4]` 是第五项。扩展 length 会增加空位，不会实际填入 undefined。
- `new Array(3)` 创建 3 个空位；`Array.of(3)` 才创建单项值 3。空位会被 map/forEach 等跳过。
- reduce 的回调接收 accumulator/currentValue/index/array，方法本身接收回调和可选初始值。未提供初始值时使用首个存在的元素；空数组会抛错。
- join 将 null/undefined/空位转成空字段；数组 valueOf 返回数组自身，不能说它也返回这种空字符串。
- forEach/map 不会等待异步回调；并发任务可使用 Promise.all，必须串行时用 for...of + await。

[MDN Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

## 4. this 指向规则与输出

普通函数主要看调用方式；箭头函数继承定义位置的外层 this。

| 调用方式 | this |
| --- | --- |
| obj.method() | 本次调用的接收者 obj |
| fn() | 严格模式 undefined；非严格模式通常是全局对象 |
| fn.call/apply(receiver) | 指定 receiver；严格函数原样保留，非严格函数有替换/装箱规则 |
| fn.bind(receiver) 后普通调用 | 绑定 receiver |
| new Constructor() | 新实例；绑定构造器的绑定 this 会被忽略 |
| 箭头函数 | 外层词法 this，call/apply/bind 不能改变 |

以下代码要求在**浏览器非严格经典脚本**运行，例如 HTML 的普通 script；不要直接按 ES Module/Node 环境推断。

```js
this.x = 9;
var module = {
  x: 81,
  getX: function () { return this.x; },
  newX: function () { this.x = 8; },
};
console.log(module.getX()); // 81，方法调用
var retrieveX = module.getX;
console.log(retrieveX()); // 9，非严格普通调用
var boundGetX = retrieveX.bind(module);
console.log(boundGetX()); // 81，绑定调用
var obj = new module.newX();
console.log(obj.x); // 8，新实例
console.log(module.x); // 81，原对象没有修改
```

原文的 `foo.count` 示例也是同样原因：`foo()` 并不自动让 this 指向 foo。严格模式中 this 为 undefined，读取 this.count 会直接抛错；非严格且全局 count 未定义时递增得到 NaN。null/undefined 作为 call 的 this 参数也不是总被忽略，取决于被调用函数的严格模式。[MDN this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

## 5. 阅读代码，写出执行结果

```js
Function.prototype.a = function () { console.log(1); };
Object.prototype.b = function () { console.log(2); };
function A() {}
var a = new A();
a.a();
a.b();
A.a();
A.b();
```

**连续执行时第一句 a.a() 抛出 TypeError，后面三句不会继续执行。** 如果分别捕获错误后独立调用，后三句输出 2、1、2。

- 实例链：`a → A.prototype → Object.prototype → null`，没有 Function.prototype.a。
- 函数对象链：`A → Function.prototype → Object.prototype → null`，可以找到 a 和 b。

这是解释题，不建议修改内建原型。若在浏览器实验，应在结束后 `delete Function.prototype.a`、`delete Object.prototype.b`，避免污染后续代码。[MDN 原型链](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain)

## 6. new 操作符做了什么

1. 确认目标支持构造，创建新对象。
2. 以构造器 prototype 建立新对象原型（不是对象时使用默认原型）。
3. 以新对象为 this 执行构造逻辑。
4. 若构造器显式返回对象，结果使用该对象；返回原始值或未返回时，结果使用实例。

箭头函数不能 new，class 必须 new；`Object.create + apply` 只能模拟部分普通构造器，不是完整实现。[MDN new](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)

## 7. call、apply、bind 怎么使用

```js
function introduce(prefix, suffix) { return `${prefix}${this.name}${suffix}`; }
const user = { name: 'Lin' };
console.log(introduce.call(user, '你好，', '！')); // 你好，Lin！
console.log(introduce.apply(user, ['你好，', '！'])); // 同上
const greet = introduce.bind(user, '你好，');
console.log(greet('！')); // 同上
```

call 逐项传参，apply 传类数组参数列表，二者立即调用；bind 返回绑定 this 和部分参数的新函数，不立即执行。bind 不会把所有未来参数“写死”，剩余参数仍在调用时传入；new 调用绑定构造器时忽略绑定 this。[MDN bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

## 8. 闭包是什么，有什么作用

闭包是函数与其词法环境的组合，可用于封装私有状态、回调和函数工厂。环境中仍被引用的数据可能在外层函数返回后继续可达；没有引用时仍可回收，闭包本身不是内存泄漏。

```js
function createCounter() {
  let count = 0;
  return () => ++count;
}
const counter = createCounter();
console.log(counter(), counter()); // 1 2
console.log(createCounter()()); // 1，独立状态
```

## 9. 立即执行函数是什么

函数表达式创建后立即调用，简称 IIFE；可以具名，不一定是匿名函数。历史上常用于隔离变量与一次性初始化，现代也可使用块作用域和模块。

```js
const answer = (() => {
  const temporary = 6 * 7;
  return temporary;
})();
console.log(answer); // 42，外部无法访问 temporary
```

## 10. DOM 相关方法和属性

| 需求 | API 与注意点 |
| --- | --- |
| 第一个 class=box 的元素 | `document.querySelector('.box')`，可能返回 null |
| 全部 class=box 的元素 | `document.querySelectorAll('.box')`，静态 NodeList |
| 按类名取集合 | `document.getElementsByClassName('box')`，动态 HTMLCollection；原文拼写漏 s |
| 创建元素 | `document.createElement('div')` |
| 添加 | `parent.appendChild(node)` 或 append；已有节点会移动 |
| 删除 | `node.remove()` 或 `parent.removeChild(node)` |
| 替换 | `parent.replaceChild(newNode, oldNode)` |
| 克隆 | `node.cloneNode(true)` 克隆子树，不复制 addEventListener 监听器 |
| 行内样式 | `element.style.color = 'red'` |
| 类名 | `element.classList.add/remove/toggle()` 或 className |

外部文本用 textContent，避免将未清洗的 HTML 拼进 innerHTML；克隆带 id 的节点后要确保 id 不重复。[MDN DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

## 11. 标准事件流模型

捕获→目标→冒泡。捕获监听器可以响应事件；并非所有事件都冒泡。addEventListener 可指定 capture/once/passive/signal 等选项；stopPropagation 影响传播，preventDefault 影响可取消的默认行为，二者不同。[MDN 事件监听](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

## 12. 事件委托的场景和优点

在祖先注册处理器，利用传播查找实际操作目标，适合动态列表。target 是事件目标，currentTarget 是当前监听节点；closest 匹配到元素后还要确认其在容器内部。

```js
list.addEventListener('click', (event) => {
  const button = event.target instanceof Element
    ? event.target.closest('button[data-action]') : null;
  if (!button || !list.contains(button)) return;
  console.log(button.dataset.action);
});
```

它减少独立监听并覆盖新增后代，但不能保证任意页面都会显著节省内存；非冒泡事件、Shadow DOM 和阻止传播的逻辑需另处理。

## 13. clientHeight、offsetHeight、scrollTop

| 属性 | 含义 |
| --- | --- |
| clientHeight | 内容+上下 padding，不含 border 和水平滚动条 |
| offsetHeight | 内容+padding+border+水平滚动条的布局高度 |
| scrollHeight | 容纳全部内容所需高度，包含溢出和 padding |
| scrollTop | 元素垂直滚动偏移，可为小数；某些布局/过度滚动场景可为负数 |

这些不是 transform 后的视觉尺寸。需要视口坐标和可视矩形时用 getBoundingClientRect；display:none 元素不能据此获得正常布局尺寸。[MDN 元素尺寸](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements)

## 14. clientHeight、offsetHeight、scrollTop（原重复题）

保留原题号，定义同第 13 题。增加一道练习：内容高 100px，上下 padding 各 10px、border 各 2px，无横向滚动条且未变换时，clientHeight 为 120，offsetHeight 为 124。滚动 30px 后 scrollTop 通常约 30，不是 offsetTop，也不是元素上边框厚度。

## 15. clientX、offsetX、screenX、pageX

| 坐标 | 参照 |
| --- | --- |
| clientX/Y | 视口左上角，滚动不会改变参照原点 |
| pageX/Y | 文档左上角，通常可理解为 client 加页面滚动偏移 |
| screenX/Y | 屏幕坐标，不适合直接作为页面布局坐标 |
| offsetX/Y | 事件目标 padding 边界附近的局部坐标，不是固定相对父盒子 |

需要拖拽局部坐标时可用 client 坐标减目标 getBoundingClientRect，并考虑变换、边框和滚动；不要直接混用 page 与 client。[MDN MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)

## 16. 手写数组去重

```js
function unique(values) { return [...new Set(values)]; }

function uniqueWithoutSet(values) {
  const result = [];
  for (const value of values) {
    if (!result.includes(value)) result.push(value);
  }
  return result;
}
console.assert(unique([1, 1, NaN, NaN]).length === 2);
console.assert(uniqueWithoutSet([1, 1, NaN, NaN]).length === 2);
```

两者均不修改输入，按 SameValueZero 处理 NaN 和正负零，对象按引用身份判断；业务对象按 id 去重需要显式字段规则。原代码 Arr/arr 大小写不一致会报错，`==` 还会错误合并数字 1 与字符串 '1'；indexOf 不能正确识别 NaN。[MDN Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

## 17. 为 Array 添加 average

题目要求 `[1,2,3,4,5].average()` 返回 3。下面限定有限数字、非稀疏数组，空数组返回 undefined；教学实现用不可枚举属性，避免影响 for...in。真实项目优先独立函数，避免扩展内建原型。

```js
function average(values) {
  if (values.length === 0) return undefined;
  let sum = 0;
  for (const value of values) {
    if (!Number.isFinite(value)) throw new TypeError('需要有限数字组成的数组');
    sum += value;
  }
  return sum / values.length;
}
Object.defineProperty(Array.prototype, 'average', {
  configurable: true,
  writable: true,
  enumerable: false,
  value: function () { return average(this); },
});
console.assert([1, 2, 3, 4, 5].average() === 3);
console.assert([10, 20].average() === 15);
console.assert([].average() === undefined);
delete Array.prototype.average; // 实验后清理
```

原实现除以外部 arr.length，换一个数组调用就可能出错，应使用实际接收者长度。普通 Number 加法存在浮点舍入与溢出边界；财务计算或极端数值应另外定义精度策略。[MDN defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

## 18. 迭代与递归实现斐波那契

题目数列从第 1 项开始：F(1)=F(2)=1。先定义输入为正整数；Number 的安全整数范围从 F(79) 开始无法保证，下面限制到 78。更大输入可改用 BigInt，递归还受调用栈限制。

```js
function checkIndex(n) {
  if (!Number.isInteger(n) || n < 1 || n > 78) {
    throw new RangeError('n 必须是 1 到 78 的整数');
  }
}
function fibonacciIterative(n) {
  checkIndex(n);
  let previous = 1, current = 1;
  for (let i = 3; i <= n; i++) [previous, current] = [current, previous + current];
  return current;
}
function fibonacciRecursive(n) {
  checkIndex(n);
  const memo = new Map([[1, 1], [2, 1]]);
  function visit(i) {
    if (!memo.has(i)) memo.set(i, visit(i - 1) + visit(i - 2));
    return memo.get(i);
  }
  return visit(n);
}
for (const [n, expected] of [[1, 1], [2, 1], [3, 2], [8, 21], [10, 55]]) {
  console.assert(fibonacciIterative(n) === expected);
  console.assert(fibonacciRecursive(n) === expected);
}
```

迭代时间 O(n)、额外空间 O(1)；带记忆化递归时间 O(n)、空间 O(n)。朴素递归不断重复子问题，时间指数增长。原迭代在 n=1/2 时返回 undefined，原递归遇到 0/负数会无限向下递归，均已修正。[MDN 安全整数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)
