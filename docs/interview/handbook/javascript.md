---
title: 大厂手册题解：JavaScript 与 jQuery 栏目
sidebar_label: JavaScript 与 jQuery
sidebar_position: 3
---

对应原文印刷页 23—69（PDF 35—81）。J 是 JavaScript 原题号（原文缺 4），Q 是原文 jQuery 栏目题号；该栏目实际混合了网络、CSS 和 JavaScript。[返回目录](./index.md) · [逐页原文](../sources/handbook.md)

## JavaScript 语言与浏览器 API

### J01 基本数据类型

**纠错。** 七种原始类型为 undefined、null、boolean、number、bigint、string、symbol；其它是 object。数组和函数都是对象，数组不是独立基本类型。`typeof null === 'object'` 是历史行为，不代表 null 是对象。[MDN 数据类型](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)

### J02 Ajax 如何使用

**纠错。** Ajax 是无需整页刷新获取数据并更新界面的技术方式，不要求 XML。XHR 应先注册回调、open 配置，再 send；也可使用 fetch。HTTP 4xx/5xx 不会令 fetch 自动 reject，必须检查 `response.ok`；网络、解析与业务错误分开处理。

```js
async function getJSON(url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
```

[MDN fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

### J03 判断 NaN

**纠错。** 优先 `Number.isNaN(value)`，也可用 `Object.is(value, NaN)` 或 `value !== value`。全局 `isNaN` 会先转数字，`isNaN('abc')` 为 true，不能据此认定输入本身是 NaN；`value == NaN` 永远不成立。[MDN Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)

### J03a 附题：null 与 undefined

**补答。** 两者都是原始值，通常用 null 表达有意的空值，undefined 表达尚未提供的值。`Number(null)` 为 0、`Number(undefined)` 为 NaN；`null == undefined` 为 true，但严格比较为 false。属性不存在和属性值为 undefined 仍可通过 `Object.hasOwn()` 区分。

### J05 闭包及影响

**纠错。** 闭包是函数与其词法环境的组合，函数创建时就与环境关联；不以“外部函数已经返回”为成立条件。它保留的是仍可达的环境引用，不是永久禁止回收。闭包适合封装与回调，只有不再需要的数据仍被引用时才可能造成内存保留问题。[MDN 闭包](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)

```js
function createCounter() {
  let count = 0;
  return () => ++count;
}
const a = createCounter();
console.log(a(), a()); // 1 2
```

### J06 常见内存泄漏

**纠错。** 未清理的定时器/订阅、无界缓存、全局集合持有已移除 DOM 都可能保留无用数据；闭包与循环引用本身不等于泄漏。定位时比较多次操作前后的堆快照与 retaining path；释放所有不必要的引用和资源，单独把某变量置 null 不保证对象不可达。[MDN 内存管理](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management)

### J07 事件委托和事件源

**纠错。** 祖先监听事件，通过 target/closest 查找符合条件的后代；`currentTarget` 是当前处理器注册的节点。target 不是“谁调用谁”，还受 Shadow DOM 重定向影响；并非所有事件冒泡。

```js
list.addEventListener('click', (event) => {
  const button = event.target instanceof Element
    ? event.target.closest('button[data-id]') : null;
  if (!button || !list.contains(button)) return;
  console.log(button.dataset.id);
});
```

[MDN addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

### J08 事件冒泡

**纠错。** 传播包括捕获、目标、冒泡；捕获阶段可以执行以 `capture: true` 注册的监听器，原文“捕获不会响应事件”错误。`stopPropagation` 阻止后续传播，`preventDefault` 取消可取消的默认行为，两者不同；是否冒泡看事件的 bubbles 属性。

### J09 Cookie、localStorage 与 sessionStorage

**更新。** Cookie 在域、路径、SameSite、Secure 等条件匹配时随请求发送，可设置 HttpOnly 限制脚本读取；不要保存明文密码。Web Storage 是同源、同步、字符串存储，不自动随请求发送；localStorage 跨会话，sessionStorage 主要按顶层页面会话划分。配额与清理策略由实现决定，不保证永久保留。[MDN Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies)、[Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

### J10 ES6 特性

**回顾。** let/const、箭头函数、解构、模板字符串、默认参数、class、模块、Promise、Map/Set、Symbol、迭代器与生成器。不要把所有现代语法都说成 ES6，例如 async/await 和 BigInt 来自后续版本。

### J11 let、var、const

**纠错。** var 通常是函数作用域；let/const 是块作用域，在初始化前有暂时性死区，不能简单说“没有提升”。const 固定绑定，不冻结对象，完全允许 `const value = null`。顶层 var 挂到 window 只适用于特定浏览器经典脚本；模块或 Node 包装环境不同。[MDN let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

### J12 数组方法

**纠错。** push/pop/shift/unshift/splice/sort/reverse 修改原数组；slice/concat/map/filter 返回新数组但内部引用仍可能共享。sort 默认按转成字符串后的 UTF-16 顺序比较，数字排序需 `(a,b) => a-b`；forEach 返回 undefined，不代表它必然修改原数组，也不等待异步回调。`toSorted/toReversed/toSpliced` 是相应的非变更版本。[MDN Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

### J13 JSON 如何增删键值

**补答。** JSON 是文本格式，先解析为对象再操作，最后按需序列化；对象与 JSON 字符串不能混称。

```js
const data = JSON.parse('{"name":"Lin"}');
data.age = 22;
delete data.name;
console.log(JSON.stringify(data)); // {"age":22}
```

只解析可信格式并处理解析失败；处理外部键名时防止原型污染，不把任意对象直接合并进配置原型。[MDN JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)

### J14 面向对象

**纠错。** 将状态和行为封装为对象，以接口组织协作，复用可采用组合或继承。JavaScript 基于原型，也有 class 语法和私有字段；不是“每个函数都有 prototype”，箭头等函数没有构造能力。多态也不必以 class 继承为前提，遵守同一接口的对象即可协作。[MDN 类](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes)

### J15 普通函数与构造函数

**纠错。** 差别主要在调用方式和函数是否可构造。可构造函数用 new 调用会创建并初始化实例；箭头、方法简写等不可 new，class 则必须 new。普通调用的 this 依调用点/严格模式决定，不总是 window；构造器显式返回对象会替代新实例。[MDN new](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)

### J16 原型、原型链与继承

**纠错。** 对象有内部原型，可用 `Object.getPrototypeOf()` 读取；属性查找先自身，再沿原型直到 null。`Object.create(null)` 没有原型，不能说所有对象都必须由可见构造函数创建。函数的 `.prototype`（若存在）用于构造实例，与函数对象自身的原型不同。避免修改内建原型。[MDN 原型链](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain)

### J17 Promise

**纠错。** 状态 pending→fulfilled 或 rejected，结定后不可再变。构造器 executor 同步执行，then 回调异步调度；不是“Promise 中一切都异步”。resolve 可采纳另一个 Promise 的结果，已 resolved 也可能仍 pending；未处理拒绝通常会被宿主报告。Promise 本身无标准取消，底层操作可接受 AbortSignal。[MDN Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### J18 Promise 解决什么问题

**回顾。** 统一组合异步结果与错误传播：then 链表示依赖，all 聚合全部结果，allSettled 收集所有结局，race 取首先结定，any 取首先成功。`Promise.all` 不负责启动任务、不限制并发，某项失败不会自动取消其它任务。

### J19 async/await

**纠错。** async 函数总返回 Promise；await 暂停当前异步函数后续部分，不阻塞整个线程。可 await 普通值；模块顶层也能使用 await。它与 generator 不等同，不能只替换关键字。并行独立任务先启动再 `Promise.all`，避免无意义的串行等待。[MDN async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

### J20 URL 到页面加载

**纠错。** 参见 [H33](./html-browser.md#h33-输入网址到页面显示)。缓存、连接复用、HTTP/2/3 和流式解析都会改变实际路径；“每个资源都会开启线程、远程 DNS、三次握手”不是通用事实。

### J21 GET 请求长度

**纠错。** 没有跨所有服务器、代理和浏览器通用的固定 GET 参数上限；URL 长度、请求头和 body 都可能被各层限制，超限可能收到 414/413。不能沿用原文对 Chrome 8182 字节等断言，POST 也绝非无限。[HTTP 语义 RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html#section-4.1)

### J22 GET/POST 缓存

**纠错。** GET 常用于可缓存的读取，POST 响应在满足明确新鲜度等条件时也可缓存，但实际支持有限。是否查询数据库与 HTTP 可缓存性没有直接因果；决定因素包括方法语义、响应头、状态码和缓存实现。[MDN 缓存](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching)

### J23 闭包

**纠错。** 参见 J05。函数可以访问定义位置的外层绑定；与函数后来在哪里调用无关，不等于读取调用者的局部变量。

### J24 事件流

**更新。** 参见 J08；第三个参数也可写 options 对象，包含 capture、once、passive、signal。被动监听器不能有效 preventDefault，滚动性能与业务取消行为要一起考虑。

### J25 事件委托

**回顾。** 参见 J07。适合动态列表，减少独立监听；需要检查 closest 得到的元素仍位于委托容器内。focus 可用捕获或冒泡的 focusin，不能假设所有事件都能直接委托。

### J26 new 做了什么

**补答。** 确认目标可构造，创建以构造器 prototype 为原型的对象（非对象 prototype 时使用默认原型），以新对象为 this 执行构造器；若显式返回对象则用该对象，否则返回实例。class、内建类型涉及内部语义，教学版 `Object.create + apply` 不是完整 new 实现。

### J27 call、apply、bind

**纠错。** call 立即调用并逐项传参，apply 立即调用并接受类数组参数或 null/undefined，bind 返回绑定 this 和部分参数的新函数。箭头函数的词法 this 不受它们改变；以 new 调用绑定构造器时绑定的 this 被忽略。[MDN bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

### J28 DOM 尺寸与位置

**纠错。** clientHeight 包含 padding，不含 border 和横向滚动条；offsetHeight 包含 padding、border、横向滚动条；scrollHeight 描述内容所需高度。clientTop 是上边框宽；scrollTop 是滚动偏移，不是 offsetTop；offsetTop 依 offsetParent 计算。视觉位置及 transform 后大小用 `getBoundingClientRect()`，不要混用视口、文档和局部坐标。[MDN 确定元素尺寸](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements)

### J29 JS 拖拽

**更新。** 用 Pointer Events 统一鼠标、触控和触笔，pointerdown 记录初始位置与指针坐标，setPointerCapture 保持追踪，pointermove 计算差值，pointerup/cancel 清理。选择一致坐标系，可用 transform 移动并用 rAF 合并更新；需要键盘操作与边界约束。[MDN Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)

### J30 垃圾回收

**纠错。** 现代引擎主要按从根对象的可达性回收，可结合分代、增量、并行策略。不可达的互相引用对象仍可回收；原文把旧引用计数问题当现代通用行为不准确。回收时间不可依赖，释放文件、订阅等外部资源要显式清理，不能依赖 FinalizationRegistry 的及时执行。

### J31 监听属性变化

**纠错。** defineProperty 的 setter 只接收新值，getter/setter 可拦截指定属性；Proxy 的 set trap 可拦截通过代理的写入，应返回布尔值，常用 Reflect.set 保持语义。直接写原始 target 会绕过代理；嵌套对象需另行代理，监听属性也不自动等于框架响应系统。

```js
const user = new Proxy({}, {
  set(target, key, value, receiver) {
    console.log('修改', key, value);
    return Reflect.set(target, key, value, receiver);
  },
});
user.name = 'Lin';
```

[MDN Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

### J32 手写 bind

**纠错。** 原实现错误地累积参数，且 new 时仍使用绑定对象。下面演示参数绑定、普通调用和构造调用；通过 Reflect.construct 支持 class，生产使用原生 bind。这不是完整 polyfill：没有精确模拟原生 length/name/自身属性和所有派生行为。

```js
function bindForLearning(fn, thisArg, ...preset) {
  if (typeof fn !== 'function') throw new TypeError('需要函数');
  function bound(...later) {
    const args = [...preset, ...later];
    if (new.target) {
      return Reflect.construct(fn, args, new.target === bound ? fn : new.target);
    }
    return Reflect.apply(fn, thisArg, args);
  }
  Object.defineProperty(bound, Symbol.hasInstance, {
    value(value) { return value instanceof fn; },
  });
  return bound;
}
const add = bindForLearning(function (a, b) { return this.n + a + b; }, { n: 1 }, 2);
console.assert(add(3) === 6 && add(4) === 7);
class Person { constructor(name) { this.name = name; } }
const BoundPerson = bindForLearning(Person, null, 'Lin');
const person = new BoundPerson();
console.assert(person.name === 'Lin' && person instanceof Person && person instanceof BoundPerson);
```

### J33 图片按顺序加载

**纠错。** 原代码只展示加载单图，且 onreadystatechange 不适用于现代 Image 的通用加载流程。先注册 load/error 再赋 src，用循环 await 明确串行；指定失败策略。

```js
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`图片加载失败：${src}`));
    image.src = src;
  });
}
async function loadSequentially(urls, container) {
  for (const url of urls) {
    const image = await loadImage(url); // 失败时中断；继续策略可在此 catch
    container.append(image);
  }
}
```

串行会降低吞吐，只在业务必须按序时采用；常规图库可限并发而不是全串行。[MDN HTMLImageElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)

### J34 克隆“所有对象”

**纠错。** 无法对任意 JS 值给出保留全部语义的通用深克隆：函数闭包、DOM、WeakMap、私有字段等各有约束。对支持的数据类型优先 `structuredClone`，可处理循环、Date、RegExp、Map/Set、部分包装对象；不保留自定义原型、属性描述符或 RegExp.lastIndex。JSON 会丢失类型且不支持循环/BigInt，`valueOf()` 将包装对象转原始值也不是克隆。[MDN structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone)

```js
const source = { date: new Date(0), tags: new Set(['js']) };
source.self = source;
const copy = structuredClone(source);
console.assert(copy !== source && copy.self === copy);
console.assert(copy.date.getTime() === 0 && copy.tags.has('js'));
```

若面试要求递归实现，先限定仅支持普通对象、数组和自有数据属性，再用 WeakMap 处理循环，不能把简化实现标成“支持所有对象”。

### J35 再谈闭包

**纠错。** 参见 J05/J06。未声明赋值在严格模式会抛错，不是一定创建全局变量；全局变量访问也不能笼统解释成遍历原型链。模块或块作用域通常能直接完成封装，不必为一切使用立即执行函数。

### J36 JavaScript 语言特性

**纠错。** 动态类型、允许隐式转换、基于原型、函数一等公民，支持多种编程范式。可运行在浏览器、Node 等宿主，不只客户端；现代引擎可能先解释再 JIT 编译，“不用编译”不准确。单个 agent 的执行与宿主任务调度也不等于整个平台只有一个线程。

### J37 全排列

**纠错。** 原文代码有语法错误，并漏掉部分插入位置。下面按 Unicode 码点拆分，回溯时跳过同一深度重复字符，空串返回一个空排列；不等同按用户感知字素分割，超长输入阶乘增长。

```js
function permutations(text) {
  const chars = Array.from(text);
  const used = Array(chars.length).fill(false);
  const result = [];
  function visit(path) {
    if (path.length === chars.length) { result.push(path.join('')); return; }
    const seen = new Set();
    for (let i = 0; i < chars.length; i++) {
      if (used[i] || seen.has(chars[i])) continue;
      seen.add(chars[i]); used[i] = true; path.push(chars[i]);
      visit(path);
      path.pop(); used[i] = false;
    }
  }
  visit([]);
  return result;
}
console.assert(permutations('abc').length === 6);
console.assert(permutations('aab').length === 3);
console.assert(permutations('')[0] === '');
```

## 原文 jQuery 栏目：按原题补齐

### Q01 Sass/Less 是什么

**更新。** CSS 预处理语言，提供变量、嵌套、mixin 等能力，构建时编译成 CSS。浏览器通常只需接收产物，不必在用户侧下载编译器；原生 CSS 已支持变量、嵌套等能力，要按项目需求选择。[Less 文档](https://lesscss.org/usage/)、[Sass 文档](https://sass-lang.com/documentation/)

### Q02 call 与 apply

**纠错。** 参见 J27。apply 的参数列表可为类数组对象，不要求一定是 Array；两者改变本次调用的 this 值，不是“把某个对象替换掉”。

### Q03 同源策略与跨域

**纠错。** 源由协议、主机、端口确定。同源策略限制某些跨源读取/DOM 访问，并不禁止一切跨源加载或发送；跨源图片、经典脚本和表单都有各自规则。接口读取通常用服务端正确配置 CORS 或同源代理；前端添加请求头不能自行授权。[MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)

### Q04 减少加载时间的三种方法

**更新。** 举出可测量的三个方向即可：图片尺寸/编码优化、拆除不必要的 JS、有效缓存与压缩。指定图片宽高主要改善布局稳定性，不直接减少图片下载字节；统一尾斜杠只在避免具体重定向时有效，不能当通用提速法。[H31 性能解析](./html-browser.md#h31-web-性能优化)

### Q05 this 指向

**纠错。** 普通函数 this 取决于调用方式：方法调用依接收者，严格模式普通调用为 undefined，非严格模式可能替换为全局对象；new 依新实例；箭头函数继承外层 this。DOM 普通事件监听器 this 通常等于 currentTarget，不是 event 对象。[MDN this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

### Q06 JSONP

**更新。** 经典 script 加载服务端返回的“回调名(数据)”脚本，通过执行回调取得数据，和 XHR/fetch 的读取机制不同。通常只能 GET，会执行远端任意脚本，错误处理与授权能力有限；能控制后端时优先 CORS，不作为新接口默认方案。

### Q07 两种数组去重

**纠错。** `Set` 使用 SameValueZero，能合并 NaN，引用对象按身份区分；`indexOf` 方案无法正确保留一个 NaN，`includes` 可以。按业务字段去重需 Map 或显式 key。

```js
const unique = (values) => [...new Set(values)];
const uniqueByIncludes = (values) => values.reduce((out, value) => {
  if (!out.includes(value)) out.push(value);
  return out;
}, []);
console.assert(unique([NaN, NaN, 1, 1]).length === 2);
console.assert(uniqueByIncludes([NaN, NaN, 1]).length === 2);
```

[MDN Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

### Q08 深拷贝与浅拷贝

**纠错。** 赋值对象引用不算浅拷贝；浅拷贝创建新外壳但共享嵌套对象。扩展、slice、Object.assign 都是浅拷贝，原文称 spread 为深拷贝错误；深复制按受支持的对象图递归处理，参见 J34。

### Q09 为什么说 JS 弱类型

**纠错。** 应区分动态类型与允许隐式转换。变量绑定可在运行时引用不同类型的值，运算可自动转换类型；var 是声明关键字，不是唯一数据类型。“强/弱”不是统一严密分类，面试最好用具体表达式说明，比如 `1 + '2'` 与 `1 - '2'`。

### Q10 Less 转 CSS

**补答。** 项目内安装 less 后在构建脚本运行 `lessc input.less output.css`，或由 bundler loader/plugin 处理。锁定依赖并在 CI 构建，不把某台 IDE 的自动保存功能当唯一产物生成方式。[Less CLI](https://lesscss.org/usage/)

### Q11 ECharts 常用什么

**补答。** 经验题需按实际图表说明：如折线显示趋势、柱形比较类别、散点描述关联。解释 series、dataset、坐标系、tooltip 和 resize 的使用；在组件卸载时 dispose，大数据场景评估采样和渐进渲染，不能虚构“使用最多”的统计。[ECharts 官方手册](https://echarts.apache.org/handbook/en/get-started/)

### Q12 for 与 map

**纠错。** `for` 是可 break/continue 的语句；`for...in` 才遍历可枚举字符串键及继承键，两者不能混淆。map 按存在的索引调用回调并返回新数组，会跳过稀疏数组空位但保留稀疏结构；回调仍可能修改源对象。只做副作用用 forEach/for，映射数据用 map。[MDN map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

### Q13 类和继承

**补答。** class/extends 表达原型继承，派生构造器使用 this 前先调用 super。组合通常比为复用强行建立继承更简单。

```js
class Animal { constructor(name) { this.name = name; } speak() { return this.name; } }
class Dog extends Animal { speak() { return `${super.speak()}：汪`; } }
console.assert(new Dog('阿黄').speak() === '阿黄：汪');
```

### Q14 同步/异步与阻塞/非阻塞

**纠错。** 同步/异步描述结果或完成通知如何返回，阻塞/非阻塞描述等待期间线程能否继续工作，不能直接画等号。同步 JS 长循环阻塞主线程；fetch 异步完成，但其 then 中繁重计算仍可阻塞渲染；Worker 可转移计算。

### Q15 重绘与回流

**纠错。** 布局计算几何位置，绘制生成像素绘制指令，再合成图层；修改颜色可能只需绘制，尺寸改变可能需布局。它们不必每次都重建整棵树。交替写样式和读 offsetHeight 等可能强制同步布局，先读后写并用工具确认。[MDN 渲染流程](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work)

### Q16 HTTP 是什么

**纠错。** HTTP 是应用层请求响应协议，本身无会话状态；Cookie 等可在其上建立会话。不能称现代 HTTP “无连接”：HTTP/1.1 默认持久连接，HTTP/2 多路复用，HTTP/3 使用 QUIC。[MDN HTTP 概述](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)

### Q17 HTTP 与 HTTPS

**纠错。** HTTPS 是经 TLS 保护的 HTTP，提供传输加密、完整性和服务端身份认证，默认端口 443，HTTP 默认 80（都可配置其它端口）。不能说“SSL 解密协议”，也不能认为 POST 代替 HTTPS 即可安全。

### Q18 prototype 与 call/apply 继承

**补答。** `Parent.call(this, ...)` 只运行父构造函数初始化字段，不会自动继承 Parent.prototype 上的方法。原型链负责方法查找；传统组合需连接原型和恢复 constructor，现代通常用 extends，参见 J16/Q13。

### Q19 箭头与普通函数

**回顾。** 箭头没有自己的 this、arguments、super、new.target，不能构造，call/apply/bind 不能更改其词法 this。没有自己的 arguments 时可引用外层或使用 rest。箭头并非只能“没有名字”：变量名可推断函数 name。

### Q20 内存泄漏

**纠错。** 参见 J06/J30。泄漏的数据通常仍然可达才无法回收；置 null 只切断一个引用，订阅、DOM 集合、缓存的其它引用仍要清理。

### Q21 优化文件与资源

**更新。** 基于构建体积与网络瀑布，执行去无用代码、按需加载、压缩、缓存、合适图片与字体子集。HTTP/2 下盲目打成单个大包会牺牲缓存和首屏按需加载；SEO 元信息不是字节/运行性能优化的替代。[H31](./html-browser.md#h31-web-性能优化)

### Q22 Ajax 流程及状态码

**补答。** 请求流程见 J02。常见状态：200 成功；201 已创建；202 已接受未完成；204 成功无响应体；301/308 永久重定向；302/307 临时重定向（保留方法规则不同）；304 缓存验证通过；400 请求无效；401 缺有效身份凭证；403 拒绝；404 未找到；429 限流；500 服务端错误；502 网关错误；503 暂不可用。[MDN 状态码](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)

### Q23 预加载与懒加载

**更新。** preload 提早获取当前导航必需但发现较晚的资源，prefetch 提示未来可能使用的资源；懒加载在接近可见或交互需求出现时加载。预加载应有明确收益，过多会争抢关键资源带宽；不是必须“页面完成之前全部预加载”。[MDN preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload)

### Q24 jQuery 选择器

**纠错。** CSS 的 id/class/属性/组合选择器，加 jQuery 扩展；返回的是 jQuery 集合，即使只匹配一个节点。`+` 要求紧邻后一个兄弟，`~` 是之后所有匹配兄弟。历史 `:first/:eq/:even/:odd` 等已弃用，可用 `.first()`、`.eq()`、`.filter()`。`:visible` 依布局盒判断，不等同于肉眼可见，不应当 CSS 标准伪类使用。[jQuery 选择器](https://api.jquery.com/category/selectors/)

### Q25 jQuery 插入节点

**回顾。** append/prepend 插入元素内部末尾/开头，before/after 插入元素外部前后；appendTo/prependTo/insertBefore/insertAfter 调换语句中的目标和内容位置。已有节点可能被移动；对多目标可能克隆。外部输入优先 `.text()`，不要直接作为 HTML 插入。[jQuery DOM insertion](https://api.jquery.com/category/manipulation/dom-insertion-inside/)

### Q26 防抖与节流

**补答。** 防抖在连续触发停止一段时间后执行，适合搜索建议；节流限制持续触发时的执行频率，适合滚动采样。下面给尾沿防抖与首沿节流，均保留 this/参数；真实组件卸载应取消未执行定时器，产品还要决定 leading/trailing/maxWait 语义。

```js
function debounce(fn, delay) {
  let timer;
  function wrapped(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  }
  wrapped.cancel = () => clearTimeout(timer);
  return wrapped;
}
function throttle(fn, interval) {
  let last = -Infinity;
  return function (...args) {
    const now = performance.now();
    if (now - last < interval) return;
    last = now;
    return fn.apply(this, args);
  };
}
```

### Q27 GET 与 POST

**纠错。** GET 语义是获取表示，安全且幂等；POST 让资源按自身语义处理请求内容，一般不保证幂等。POST 数据通常在请求体，不是“HTML header”；GET 可有查询参数，POST 也可带查询参数。两者都需 HTTPS，均存在实现层大小限制，参见 J21/J22。[MDN HTTP 方法](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods)

### Q28 CSRF

**补答。** 攻击者诱导浏览器带着用户已有凭证发出未经用户同意的状态变更请求。防护包括合理 SameSite Cookie、服务端校验 CSRF token、校验 Origin/必要时 Referer，并避免 GET 改状态；CORS 不是完整 CSRF 防线，XSS 也可能绕过部分防护。[OWASP CSRF 防护](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

### Q29 什么时候深/浅拷贝

**纠错。** 根据是否需要隔离嵌套可变状态决定：只更新一条路径可逐层浅复制保留结构共享；需要独立快照时选择符合数据类型约束的深复制。设计模式与拷贝深浅没有原文所说的一一对应关系。优先不可变更新与清楚的数据所有权，避免为“保险”克隆巨大对象图。
