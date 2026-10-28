---
id: 01-Interview
title: 基础面试题 1｜20 题校订版
description: 盒模型、布局、this、类型、原型链和数组算法，保留原题顺序并纠正旧答案。
---

[统一题库](../../../interview/index.mdx)。本页按原来的 20 题顺序校订；代码输出题需要说明运行环境，不能混用浏览器经典脚本、ES 模块和 Node。

## 1. 谈谈盒子模型

盒子由内容、内边距、边框和外边距组成。`box-sizing: content-box` 时 width / height 指内容区；`border-box` 时包含内容、内边距和边框，两者都不包含 margin。现代标准模式也支持 border-box，不能把它等同于 IE 怪异模式。

`element.style.width` 仅取内联声明；`getComputedStyle` 取解析后的样式值；`getBoundingClientRect()` 返回相对视口的边界矩形，包括 x/y、top/right/bottom/left、width/height，受 transform 影响，不等于文档绝对坐标。`currentStyle` 是历史 IE API。

相邻块的垂直 margin 在满足条件时会折叠：正值取最大、负值取最负、正负相加；不是所有情况都只取较大者。父元素建立 `flow-root` 可阻止其与子元素折叠；flex/grid 项目的 margin 不折叠。

## 2. 不定宽高元素水平垂直居中

优先用有明确可用高度的 flex 或 grid 容器。原文绝对定位四边为 0 加 auto margin 的方法需要尺寸等额外条件，不能普遍用于未知宽高。

```html
<div class="parent"><div class="child">不定宽高内容</div></div>
<style>
  .parent { min-height: 20rem; display: grid; place-items: center; }
</style>
```

也可父容器 `display:flex; justify-content:center; align-items:center`；绝对定位可用父 relative、子 `left:50%; top:50%; transform:translate(-50%,-50%)`，但需考虑内容溢出。

## 3. Flex 容器与项目属性

容器：`flex-direction` 定义主轴，`justify-content` 主轴对齐，`align-items` 交叉轴对齐，`flex-wrap` 控制换行。方向受书写模式与 direction 影响，不应一概叫“左右 / 上下”。

项目：`flex-grow` 分配正剩余空间，`flex-shrink` 结合 flex 基准尺寸分配负空间，`flex-basis` 给出主轴基准大小，`align-self` 覆盖自身交叉轴对齐。`flex-basis` 不是“最小宽度”，grow 的比例也不是最终宽度百分比。现代目标浏览器通常无需手写旧前缀，应由兼容目标和工具决定。

## 4. 举例 CSS 新能力

`border-radius`、`box-shadow`、`background-size`、`transform`、`transition`、`animation`、flex/grid、媒体查询等。CSS 已按模块独立演进，面试中“CSS3”常是历史统称，不是一个统一版本开关。使用具体能力前检查目标浏览器支持与降级策略。

## 5. JavaScript 数据类型

7 种原始类型：undefined、null、boolean、number、bigint、string、symbol；另有 object。数组和函数都是对象，函数是可调用对象。变量赋值传递的是值；对象值可让多个变量引用同一对象，不要简单说“JS 按引用传参”。

## 6. 方法赋值后的 this

```js
var age = 35;
var obj = {age: '18', say: function () { console.log(this.age); }};
obj.say();
var res1 = obj.say;
res1();
```

在独立浏览器非严格经典脚本中，依次输出字符串 `"18"` 和数字 `35`。第二次是普通调用，this 为 globalThis。若函数在严格模式下定义，第二次 this 为 undefined，访问 age 抛 TypeError；ES 模块的顶层 var 也不会变成 window 属性。不要用“查自身作用域”解释 this。

## 7. 闭包计数

```js
function foo() {
  var a = 1;
  return function bar() { a++; console.log(a); };
}
var newBar = foo();
newBar(); newBar(); newBar(); // 2 3 4
```

同一个闭包访问同一个外层绑定，每次调用修改它；再调用一次 foo 会创建新的独立绑定。闭包不是天然内存泄漏，被保留的引用不再可达时可以回收。

## 8. 原始值与对象赋值

```js
var a = 1, b = a;
a = 2;
console.log(b); // 1
var c = {name: '小红', age: 18}, d = c;
d.name = '小黄';
console.log(c.name); // 小黄
```

b 保存赋值时的数字值；c 和 d 引用同一对象，修改对象可从两者观察。给 d 重新赋成新对象则不改变 c。

## 9. 嵌套条件表达式

```js
var b = 3;
var a = b === '3' ? 4 : 1 == '1' ? 5 : 6;
console.log(a); // 5
```

严格相等为 false，再判断宽松相等为 true。嵌套条件表达式难读，业务代码可加括号或用 if。`==` 有类型转换规则，不是“内容看起来一样就相等”。

## 10. 自增表达式

```js
var a = 1, b = 2;
var res = ++a + ++b + 1 + a++;
console.log(res, a, b); // 8 3 3
```

按从左到右求值：2 + 3 + 1 + 2。后缀自增返回旧值再更新，前缀先更新再返回。实际业务应拆开，减少顺序副作用。

## 11. 属性访问

```js
var a = {size: 'small'};
var b = {name: '小红', small: true};
console.log(b[a.size]); // true
console.log(b[a['size']]); // true
console.log(b.a.size); // TypeError
```

前两次都读取 b.small；第三次 b.a 为 undefined，继续访问 size 抛错。属性键可以是字符串或 Symbol，其他键按规则转换；不是所有键都会变成字符串。

## 12. CSS 选择器与级联

类型、class、ID、属性、伪类、伪元素，可配合后代、子代、相邻兄弟和后续兄弟组合器。优先级是 `(ID, class/属性/伪类, 类型/伪元素)` 三列比较，不按十进制相加；`!important` 属于级联重要性，不是选择器权重。先考虑来源、重要性与层，再比较优先级和顺序。

完整例子见 [笔试第 1—2 题](../../../interview/written.md)。

## 13. 原型链

```text
const p = new Person()
p → Person.prototype → Object.prototype → null
Person → Function.prototype → Object.prototype → null
```

箭头表示 `Object.getPrototypeOf`，不是普通 `.prototype` 属性。对象先查自有属性，再沿原型链找；构造函数内部未赋给 this 的局部变量不是实例属性。详见 [类与继承](../../tolove/01-NInterview/01-NInterview.md)。

## 14. typeof 返回值

返回小写字符串：`"undefined"`、`"boolean"`、`"number"`、`"bigint"`、`"string"`、`"symbol"`、`"object"`、`"function"`。`typeof null === 'object'` 是历史行为；数组也是 object，检测数组使用 `Array.isArray`。原答案遗漏 bigint 且大小写有误。

## 15. call 与 apply

两者立即调用函数，首参为 thisArg，call 逐个传剩余参数，apply 接收类数组。箭头函数 this 不能重新绑定。严格函数保留 null / undefined，非严格普通函数会替换成 globalThis 并包装原始值。bind 返回新函数而非立即调用。

## 16. 数组累加

```js
function sum(values) {
  if (!values.every(Number.isFinite)) throw new TypeError('仅支持有限数值');
  return values.reduce((total, value) => total + value, 0);
}
console.log(sum([1, 2, 3]), sum([])); // 6 0
```

这里约定输入为稠密数字数组，空数组返回 0。浮点数仍遵循 IEEE 754，金额计算不能直接忽略精度。不要往 Array.prototype 增加业务方法。

## 17. 数组从小到大排序

```js
const sorted = [10, 2, 1].toSorted((a, b) => a - b);
console.log(sorted); // [1, 2, 10]
```

老环境可 `[...values].sort((a,b) => a-b)`；sort 会修改原数组，默认按字符串比较。数字比较器需明确 NaN 和混合类型处理。内置排序算法与性能是引擎实现细节，不能统一断言全部用快排。

教学用冒泡排序对相邻逆序项交换，最坏 O(n²)，优化版已排序输入可 O(n)。以下保留原有演示动画，点击才播放：

![冒泡排序演示](/img/remote/78e21ba429d968bb.webp)

## 18. 数组降维

```js
const result = [1, [2, [3]], 4].flat(Infinity);
console.log(result); // [1, 2, 3, 4]
```

flat 不改变原数组，对数组元素展开，不会递归展开普通对象。循环引用数组需要另行处理；无界深度也可能耗尽资源。不要用 join / split，字符串化会丢失类型、空值与对象结构。递归教学版应讲清深度与栈限制。

## 19. 数组去重

```js
const object = {};
console.log([...new Set([1, '1', NaN, NaN, object, object])]);
// [1, '1', NaN, object]
```

Set 使用 SameValueZero：NaN 可去重，+0/-0 视为同值；对象按身份，不按内容。普通对象当字典会把不同类型键转字符串并遇到原型键问题，不可作为通用去重方案。按业务 ID 去重时应明确保留第一项还是最后一项。

## 20. 行内与块级

常见默认显示：div / p / section 为块盒，span / a 为行内盒；img 是行内替换元素，其宽高规则不同。HTML 内容分类和 CSS display 不应混为一谈。

普通非替换行内盒的 width / height 不按块盒方式生效；垂直 padding / border 可以绘制但通常不撑开行盒，垂直 margin 不影响普通行内布局。`inline-block` 可设置宽高并参与行内布局，block 也可通过 CSS 改变显示类型。

## 参考来源

[MDN 盒模型](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model)、[Flex 基本概念](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)、[this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)、[typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)、[Array 方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)。
