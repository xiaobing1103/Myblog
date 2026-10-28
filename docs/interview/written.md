---
title: 前端笔试 00｜17 题校订解析
sidebar_label: 笔试 00 · 17 题
description: 校正选择器、级联、包含块、this、作用域、原型与斐波那契，并补全逻辑题。
---

[完整逐页原文](./sources/written.md) · [回到题库](./index.mdx)

以下沿用原 PDF 的 1—17 题。原答案中存在事实错误，不能直接背诵。代码输出题默认在独立的浏览器经典脚本中运行；模块和严格模式差异另行说明。

## 1. CSS 选择器

| 选择器 | 准确含义 |
| --- | --- |
| `div#idSel` | 同时满足标签为 div、id 为 idSel |
| `div .classSel` | div 内任意层级、class 含 classSel 的后代 |
| `div.classSel` | div 本身具有 classSel |
| `div > .classSel` | div 的直接子元素且具有该 class |
| `div + .classSel` | 与 div 同父且紧跟其后的元素，要求该元素具有该 class |
| `div ~ .classSel` | 与 div 同父、位于其后的所有匹配元素，不要求紧邻 |
| `input[type="button"]` | type 属性值匹配 button 的 input |

**纠错**：`+` 不是所有同级元素，`~` 不是所有后代。两者只向后匹配。

## 2. CSS 级联与优先级

**纠错**：不能用 `1000/100/10/1` 十进制相加，也不能把 `!important` 当选择器权重。

先判断规则是否适用，再比较来源与重要性、级联层、选择器优先级、作用域接近性及出现顺序。相同层级的选择器优先级按 `(ID, class/属性/伪类, 标签/伪元素)` 逐列比较，不进位。例如 11 个 class 不会超过 1 个 ID。内联声明有独立的级联地位，普通内联通常胜过普通样式表规则；重要声明还要考虑来源与层顺序。`:where()` 为零优先级，`:is()` / `:not()` / `:has()` 取参数中的最高优先级。

参考：[MDN 级联](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Cascade)、[优先级](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity)。

## 3. 定位与包含块：原图逐个解析

![原 PDF 定位结构图](/img/interview/written-position.png)

**纠错**：包含块不是“这个元素包含了哪些后代”，而是用于计算某个盒子位置和尺寸的参照区域。DOM 父子关系、是否脱离正常流、包含块是不同概念。

按图中只存在 `position` 声明、没有 `transform`、`contain` 等额外属性，并假设所有 div 为 block：

| 元素 | position | 包含块 |
| --- | --- | --- |
| div1 | static | body 内容区 |
| div11 | static | div1 内容区 |
| div111 / div113 | static / relative | div11 内容区 |
| div112 | absolute | 初始包含块（图中无已定位祖先） |
| div114 / div14 | fixed | 视口 |
| div12 | relative | div1 内容区 |
| div13 | absolute | 初始包含块 |
| div2 | relative | body 内容区 |
| div21 / div23 | static / relative | div2 内容区 |
| div22 | absolute | div2 内边距区 |
| div24 | fixed | 视口 |
| div3 | fixed | 视口 |
| div31 / div33 | static / relative | div3 内容区 |
| div32 | absolute | div3 内边距区 |
| div34 | fixed | 视口，fixed 祖先本身不改变这一点 |
| div4 | absolute | 初始包含块 |
| div41 | static | div4 内容区 |
| div411 / div413 | static / relative | div41 内容区 |
| div412 | absolute | div4 内边距区 |
| div414 / div44 | fixed | 视口 |
| div42 | absolute | div4 内边距区 |
| div43 | relative | div4 内容区 |

`relative` 保留原位置，只对自身视觉位置偏移；`absolute`、`fixed` 脱离正常流。绝对定位通常找最近建立绝对定位包含块的祖先，固定定位通常参照视口；`transform` 等属性能让祖先为 absolute / fixed 建立包含块，因此不能说“永远相对父级 / 窗口”。

参考：[MDN 包含块](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Containing_block)。

## 4. call / apply / bind

`fn.call(obj, a, b)` 和 `fn.apply(obj, [a, b])` 立即调用；`fn.bind(obj, a)` 返回绑定函数，稍后调用并可继续传参。`apply` 接受类数组参数，不能把任意 iterable 都当作数组使用。箭头函数的 `this` 来自外层词法环境，不能用这三个方法重新绑定；严格函数保留传入的 `null` / `undefined`，非严格普通函数会替换成全局对象。

## 5. 三段事件代码中的 this

| 写法 | this |
| --- | --- |
| 内联 `onclick="alert(this.value)"` | 当前 input |
| `input.onclick = showValue` | 浏览器调用处理函数时为当前 input |
| 内联 `onclick="showValue()"` 中 showValue 的 this | 普通函数调用；非严格函数为 globalThis，严格函数为 undefined |

**纠错**：最后一段不会把外层事件处理函数的 `this` 自动传给被调用函数。可以改成 `onclick="showValue.call(this)"`，实际项目更推荐 `addEventListener`，通过 `event.currentTarget` 访问绑定元素。原题各片段应独立运行，不要把重复 ID 放在同一页面。

参考：[MDN this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)。

## 6. 变量提升

函数内 `var name` 声明提升，赋值不提升。输出依次是 `undefined`、`"eve"`，随后读取未声明的 `age` 抛 `ReferenceError`。外部同名变量不会绕过函数内声明被读取。`typeof 未声明变量` 是另一种情况，不能套在直接访问上。

## 7. 词法作用域

原代码共有三次 `foo` 调用：**10、30、30**。`foo` 在全局定义，查找的是全局 `z`，调用方的局部 `z = 20` 或 `z = 40` 不改变它的词法作用域。原文最后写 40 错误。

## 8. 原型链与异常中断

原构造函数内的 `a/b/c` 只是局部变量，没有赋给 `this`。因此：

| 调用 | 单独执行的结果 |
| --- | --- |
| `fun.a()` | a3，沿 Object.prototype 找到 |
| `fun.b()` | TypeError，实例链上没有 b |
| `fun.c()` | c3，来自 FUN.prototype |
| `FUN.a()` | a3，函数对象继续沿原型链找到 |
| `FUN.b()` | b3，来自 Function.prototype |
| `FUN.c()` | TypeError，FUN.prototype 不是 FUN 自己的原型 |

**完整原程序执行到第二行调用就中止，后四次不会运行。** 上表是假设每次调用分别捕获异常的结果。不要在真实网页给 `Object.prototype` / `Function.prototype` 加属性；实验应放在独立环境并清理。

## 9. Fibonacci：明确编号与数值范围

采用 `F(0)=0, F(1)=1`。原递归代码有中文逗号且边界错误；JavaScript 引擎不普遍保证尾调用优化。快速倍增在 O(log n) 层递归内计算，用 BigInt 避免 Number 精度损失；大整数运算本身并非 O(1)。

```js
function fibonacci(n) {
  if (!Number.isSafeInteger(n) || n < 0) throw new RangeError('n 必须是非负安全整数');
  function pair(k) {
    if (k === 0) return [0n, 1n];
    const [a, b] = pair(Math.floor(k / 2));
    const c = a * (2n * b - a);
    const d = a * a + b * b;
    return k % 2 === 0 ? [c, d] : [d, c + d];
  }
  return pair(n)[0];
}
console.log(fibonacci(10).toString()); // 55
```

## 10. 面向对象

对象封装状态和行为，继承表达类型关系，多态允许不同实现遵守相同调用接口。JS 用原型链共享行为，`class` 提供构造、继承、私有字段等语法。组合常比深层继承容易维护，不应为“面向对象”把所有函数硬塞进类。

```js
class Counter {
  #value = 0;
  increment() { return ++this.#value; }
}
console.log(new Counter().increment()); // 1
```

## 11. 跨浏览器 Web 开发

**纠错**：这道题问浏览器兼容，不等同于 uni-app 或 Flutter 跨端。先明确目标浏览器矩阵，使用语义 HTML 和标准 CSS/JS，做能力检测，按需转译或提供 polyfill，给不可用能力设计渐进增强，并在真实引擎、输入方式、视口和辅助技术下测试。UA 字符串不应成为唯一判断依据。

## 12. CSS 预处理器

Sass（SCSS 是其一种语法）、Less 在构建时解析变量、嵌套、混入和函数，输出浏览器理解的 CSS。浏览器不直接运行 SCSS。CSS 自定义属性在运行时参与级联，可用于主题和动态值，和 Sass 变量的工作阶段不同。

## 13. 性能优化

先通过真实用户指标与 DevTools 定位网络、主线程、布局或内存瓶颈。关注 LCP、INP、CLS；优化首屏图片尺寸和格式、延后非关键组件、缓存带哈希的静态资源、压缩传输、减少长任务、批量读写布局。不要懒加载 LCP 图片；不要盲目合并所有文件；HTTP/2 下“请求越少越好”不能替代测量。字体图标也有可访问性、加载与显示问题，可按场景使用 SVG。

参考：[web.dev 性能](https://web.dev/learn/performance/)。

## 14. 袜子题：原题数量矛盾

原文同时说“每人两对黑袜、两对白袜”和“两人混在一起四对”，两者数量对不上；因此先澄清题意。只要**每一对还由商标连接，且两人应均分每种颜色**，把每一对拆开，每人各拿其中一只，就能保证每人获得每种颜色总量的一半。如果共四对，则每人黑白各一对；若原意为八对，则每人黑白各两对。

**纠错**：靠晒太阳判断颜色不具备可靠条件，不能保证正确。如果连原始配对关系也已经丢失，题设就不足以保证这种解法。

## 15. 用两根不均匀绳子计时 45 分钟

同时点燃绳 A 两端、绳 B 一端。A 烧尽时经过 30 分钟，此时再点 B 的另一端；B 剩余部分原本还需单端燃烧 30 分钟，两端烧需 15 分钟，共 45 分钟。前提是每根绳子单端完整燃烧均为一小时且火焰不互相干扰，不能凭长度二等分。

## 16. 四罐药，一次称量

将罐编号 1—4，分别取 1、2、3、4 粒一起称。正常总重为 10g；实际多出的克数就是污染罐编号。前提是恰有一罐全部为 2g，其他均 1g，秤可分辨克数。此处是理想逻辑题，不是药物鉴定方法。

## 17. 八人分蛋糕，盒内仍留一份

切为八份，前七人各拿一份，最后一人连盒子一起拿最后一份。此时八人都有蛋糕，最后一份仍在盒中。原答案可成立。
