---
title: 阿里题集第二期：JavaScript、执行结果与源码
sidebar_label: 第二期 · JavaScript
description: 49 道语言与框架题、9 道执行结果题、9 道源码题的补答和纠错。
---

对照 [第二期完整原文](../sources/ali-2.md)；返回 [第二期导读](./index.md)。以下保留原章节、题号和页码。现代答案区分 Vue 2 / Vue 3、旧 React root / React 18 createRoot；默认示例为现代 JavaScript。

## 三、JavaScript 篇

### J1 · defineProperty 与 Proxy（第 26 页）

`Object.defineProperty` 本身可以定义数组索引的 getter/setter；Vue 2 的限制来自基于已有属性的观测方案及数组处理策略，不能说语言 API 根本不能监听索引。它需要预先遍历，新增/删除属性等需要额外处理。Vue 3 对对象使用 Proxy 拦截访问、设置、删除、遍历等，对 ref 使用 getter/setter。深层代理可以在读取时建立，并非一次代理就自动递归拦截所有嵌套对象。Proxy 不等于双向绑定，响应式和表单值回写是两个层面。

依据：[Vue：响应式深入](https://vuejs.org/guide/extras/reactivity-in-depth.html)。

### J2 · 列表 key（第 27 页）

key 表示同一父级下节点或组件的稳定身份，帮助在插入、删除、重排时正确复用状态。用数据稳定 ID；可重排列表不要用 index，每次 render 随机生成 key 会导致反复重建。**核心不是“没有 key 就必然慢、有 key 就必然快”**；错误 key 会产生输入框值、组件状态错位。Vue 2 双端比较也不能当作所有 Vue/React 版本的唯一算法。

依据：[React：列表与 key](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)、[Vue：维护列表状态](https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key)。

### J3 · map(parseInt)（第 27 页）

结果为 `[1, NaN, NaN]`：map 传入值、索引、原数组，索引误作 parseInt 的 radix。`radix=0` 按输入推断，`1` 非法，`"3"` 不是二进制数字。正确写法为 `xs.map(x => parseInt(x, 10))`；如果需要完整数值转换可用 `xs.map(Number)`，两者对 `"12px"` 等输入语义不同。

### J4 · 防抖与节流（第 28—29 页）

防抖把调用延迟到停止触发一段时间之后；节流限制一段时间内的调用频率。先声明是否要首调、尾调、取消；不是“防抖只能 timer、节流只能变量”。下面分别为尾部防抖、首部节流，保留调用上下文和参数：

```js
function debounce(fn, wait) {
  let timer;
  function wrapped(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  }
  wrapped.cancel = () => clearTimeout(timer);
  return wrapped;
}
function throttle(fn, wait) {
  let last = -Infinity;
  return function (...args) {
    const now = performance.now();
    if (now - last >= wait) {
      last = now;
      return fn.apply(this, args);
    }
  };
}
```

### J5 · Set、Map 与弱集合（第 29—30 页）

Set 保存不重复值，Map 保存任意类型键到值的映射；按插入顺序迭代，使用 SameValueZero 比较键。WeakMap 的键、WeakSet 的值可为对象及支持该规范的运行时中的非注册 Symbol，不能为字符串、数字或 `Symbol.for()` 产生的注册 Symbol。弱集合不会仅因这个关联阻止键/成员被回收，不提供遍历和 size，回收时间不保证。它们不会自动消除其他强引用引发的泄漏。

依据：[MDN：WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)。

### J6 · ES5 原型继承与 class（第 30 页）

class 仍基于原型；类声明有暂时性死区，类体严格模式，原型方法不可枚举，类构造器必须通过构造调用。派生类在使用 this 前要调用 super；ES5 的 `Parent.call(this)` 不能等价模拟内建类和所有派生语义。原文的内部槽名应为 `[[Construct]]`，不是 `[[constructor]]`；普通类方法没有该构造能力。

### J7 · timer、Promise、async/await（第 31 页）

Promise executor 同步执行；resolve/reject 决定状态或吸收另一个 Promise，**它们本身不是“等 then 后再调用”的异步方法**。反应回调在 Promise job/微任务中执行。timer 到期使任务具备调度条件，不保证准确准时。async 函数返回 Promise，await 暂停当前 async 函数，把后续流程安排到异步恢复阶段，不阻塞整个线程。

### J8 · async/await 原理（第 31 页）

可以用 Generator 加执行器解释降级转换思路，但原生 async 不是规范定义的“自执行 Generator”。它把 Promise 的成功/失败映射到恢复执行/抛出；独立任务适合先并发启动，再 `await Promise.all(...)`，有依赖时才串行 await。

### J9 · Generator（第 31—33 页）

调用生成器函数只创建迭代器，调用 next 才推进；yield 输出值，下一次 `next(value)` 的 value 成为上一个 yield 表达式的结果，第一次 next 的参数无对应 yield 接收。原例 `g.next(2)` 到达 `return y`，应是 `{value:2, done:true}`，原答案 done:false 错误。Generator 自身不保证异步，异步需调用者或执行器协调。

### J10 · 异步方案（第 33—34 页）

回调适合事件和底层接口，错误约定靠 API；同步调用回调中的错误可被当前栈捕获，异步回调里的错误不能被外层已返回的 try/catch 捕获。Promise 统一链式结果与错误；async/await 允许围绕 await 用 try/catch，仍是异步。标准 Promise 不提供统一取消方法，但底层操作可通过 AbortSignal 取消。Generator 提供暂停恢复控制，需要执行器。

依据：[MDN：Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)、[async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)、[Generator.next](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next)。

### J11 · 浏览器缓存（第 34—35 页）

先区分 HTTP 缓存和 CacheStorage。HTTP 缓存根据新鲜度与验证器决定直接复用、条件请求后 304 复用或取新响应；`no-cache` 要验证，`no-store` 不存储，`private` 不允许共享缓存存储。Service Worker 可拦截并自行选择缓存策略。**不存在跨所有浏览器固定的“SW→内存→磁盘→推送”读取顺序**；缓存分区、Vary、凭据和刷新方式都影响匹配，不能说相同 URL 在跨站场景一定共用缓存。原文 Push Cache 的固定五分钟和普遍可用性不作为现行结论。

依据：[MDN：HTTP 缓存](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching)。

### J12 · mutation/reducer 为什么同步（第 35 页）

Redux reducer 应是纯函数，由旧状态和 action 同步计算新状态，不做请求、随机数或修改外部对象；异步放在 thunk 等中间件。Vuex mutation 要同步便于状态快照和追踪，但“mutation 必须纯函数”错误，它的职责就是更改 state；异步流程放 action。

### J13 · a 连续等于 1、2、3（第 35—36 页）

```js
let next = 0;
const a = { [Symbol.toPrimitive]() { return ++next; } };
console.log(a == 1 && a == 2 && a == 3); // true
```

宽松比较会触发对象到原始值转换；原文 valueOf 思路也成立。若换成 `===` 则不会这样转换。这是语言机制题，业务代码应避免有副作用的隐式转换。

### J14 · props 不能直接改（第 36 页）

单向数据流让父级拥有数据的来源。子级用事件请求修改，或用显式模型约定。Vue 3 的 props 顶层只读，开发模式会提示写入；对象/数组的嵌套字段仍可能被修改，因为共享引用，这并不意味着推荐这样做。原文“所有修改都由 setter 检测”只适用于特定历史实现，不能覆盖 Vue 3。

### J15 · sleep（第 36—37 页）

```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
// 在 async 函数中：await sleep(1000)
```

它只延迟后续恢复，不让 JS 主线程忙等，也不保证恰好 1000ms。Generator 包裹不会自动开始睡眠，仍需推进迭代器。

### J16 · v-model 与 Vuex（第 37 页）

冲突来自绕过 mutation 直接写 store，而非双向绑定概念本身。用带 getter/setter 的 computed：getter 从 store 读，setter commit；或显式 value/事件绑定。区分 Vue 2 的 value/input 与 Vue 3 的 modelValue/update:modelValue，不能混抄接口。

依据：[Vue：Props](https://vuejs.org/guide/components/props.html)、[Vuex：表单处理](https://vuex.vuejs.org/guide/forms.html)、[Redux：reducer 前提](https://redux.js.org/usage/structuring-reducers/prerequisite-concepts)。

### J17 · call 与 apply（第 37—38 页）

call 接收离散参数，apply 接收类数组参数，均请求以指定 this 调用函数；目标是箭头函数时不改变其词法 this。**“call 一定比 apply 快”缺乏通用依据**，具体引擎、调用形态和版本会影响性能；优先按语义选择，热点才基准测试。

### J18 · 像素埋点（第 38 页）

历史上用微小图片触发 GET，不读取跨源响应体，接口简单且可隐藏展示；它仍有请求和响应，不是服务器无需返回。URL 长度、缓存、隐私策略、CSP、广告拦截都会影响上报，不能保证必达或性能总优。现代页面关闭前的小量上报可考虑 `sendBeacon`，需自定义请求时考虑 fetch keepalive；返回“已入队”也不等于服务端已落库。

依据：[MDN：sendBeacon](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon)。

### J19 · 数字链式运算（第 38 页）

原型扩展能满足题设，但会污染内建原型。教学隔离环境可用普通函数并返回 `Number(this) + n`；工程用包装对象：

```js
function calc(value) {
  return {
    add(n) { return calc(value + n); },
    minus(n) { return calc(value - n); },
    value() { return value; },
  };
}
calc(5).add(3).minus(2).value(); // 6
```

这保留计算目的；若强制要求 `(5).add(3)`，需明确会修改 Number.prototype，不建议在网站运行环境添加。

### J20 · 补齐 12 个月销售额（第 38—39 页）

原答案使用索引 0—11 后再 slice，只得到 11 项，还将销售额 0 误当缺失。

```js
function monthlySales(sales) {
  return Array.from({ length: 12 }, (_, i) => sales[i + 1] ?? null);
}
monthlySales({ 1: 222, 2: 0, 5: 888 });
// [222, 0, null, null, 888, null, null, null, null, null, null, null]
```

### J21 · LazyMan（第 39 页，原答案文件缺失）

队列保存任务，链式方法先入队，微任务启动消费；sleepFirst 放队首。以下按原题示例先问候，再执行 sleepFirst。若约定 sleepFirst 连问候也要延迟，应将问候也改为入队任务。

```js
function LazyMan(name) {
  const tasks = [];
  const wait = seconds => new Promise(resolve => {
    setTimeout(() => { console.log(`等待了 ${seconds} 秒`); resolve(); }, seconds * 1000);
  });
  const api = {
    eat(food) { tasks.push(() => console.log(`I am eating ${food}`)); return api; },
    sleep(seconds) { tasks.push(() => wait(seconds)); return api; },
    sleepFirst(seconds) { tasks.unshift(() => wait(seconds)); return api; },
  };
  console.log(`Hi I am ${name}`);
  queueMicrotask(async () => {
    while (tasks.length) await tasks.shift()();
  });
  return api;
}
// LazyMan('Tony').eat('lunch').sleepFirst(1).eat('dinner');
```

这里的 API 约定链式方法在当前同步任务调用完成，任务参数是非负有限秒数；需要接受任务执行期间动态追加时，再设计持久消费者和错误策略。

### J22 · 箭头与普通函数（第 39—40 页）

箭头捕获外层词法 this、arguments、super、new.target，不是“定义时所在对象”；对象字面量不会因此创造 this 作用域。call/apply/bind 仍可调用箭头并传参，只是无法重绑其 this。箭头没有 `[[Construct]]`，不能 new，也不能作 Generator；不是仅因缺少 `.prototype` 属性。

### J23 · Redux reducer 为何纯（第 40 页）

可预测计算便于重放、测试和开发工具追踪。只要求 reducer 纯，不是“Redux 中处处纯函数”；中间件可以执行副作用。Redux Toolkit 的 Immer 写法允许看起来直接修改草稿，最终仍生成符合不可变更新约定的结果。

### J24 · Babel 转换（第 40—41 页）

解析源码成 AST，遍历转换，生成代码和 source map。语法转换不等于补齐运行时 API：Promise、Map 等按目标环境配置 polyfill。Proxy 等能力不能在 ES5 中完全等价模拟；也不能保证任意新语法只靠“转 AST”无成本兼容。

### J25 · Vue 父子生命周期（第 41 页）

普通同步挂载中，父初始化与 beforeMount 先行，子 mounted 先于父 mounted；更新通常父 beforeUpdate 先于子，子 updated 先于父。**只有实际需要更新的组件才执行更新钩子，子自己更新不会必然触发父更新**。Vue 3 用 beforeUnmount/unmounted，异步组件和 Suspense 影响“所有子已完成”的断言；DOM 更新后读值使用 nextTick，而非死记固定顺序。

### J26 · React Router Link 与 a（第 41 页，原文标签缺失）

已核对 [原 PDF 第 41 页截图](./source-page-41.png)，原题本身没有显示两个标签；按答案上下文推断是在比较 Link 和 a，无法保证是精确题面。普通 a 导航由浏览器负责；路由 Link 最终提供链接语义并在适合的同窗口本地导航时拦截，交给客户端路由。修饰键、新窗口、外部 URL、下载等应保持浏览器行为。不能简单说“所有 onClick 都无刷新”。

依据：[React Router：Link](https://reactrouter.com/api/components/Link)。

### J27 · v-for 事件代理（第 41 页）

Vue 模板事件不要求手动委托。很长的同类列表可通过父节点委托减少监听器，但要处理冒泡、closest、嵌套目标和键盘可访问性；虚拟列表通常比把十万 DOM 节点都渲染出来更有意义。是否更快要量测，原文“用了代理必然更优”过度概括。

### J28 · MVC、MVP、MVVM（第 41—43 页）

MVC 通过 Controller 协调输入和模型，MVP 让 Presenter 通过 View 接口驱动展示，MVVM 用 ViewModel 暴露适合视图的状态及命令，绑定机制同步展示。它们有不同实现变体，并非所有 MVC 都必须用观察者、所有 MVVM 都必须双向绑定；不要用一个模式名代替对实际数据流和边界的说明。

### J29 · 内存泄漏（第 43 页）

泄漏是已无业务用途的数据仍被可达引用保留。常见来源：无界缓存、全局引用、未清定时器、未取消订阅、脱离 DOM 仍被保存。**闭包和循环引用本身不是泄漏**，现代追踪式 GC 可以回收不可达循环。用堆快照、保留路径及稳定重复场景定位，不靠一张禁用列表。

### J30 · 跨源（第 44 页）

CORS 是服务器给浏览器的跨源读取授权，不是关闭同源策略。带凭据时 Allow-Origin 必须是具体源，不能与 `*` 一起当作成功配置；服务端要验证 Origin 白名单并正确处理预检、Vary: Origin。前端代理适用于开发，本质由同源服务端转发；JSONP 只能加载脚本式数据且风险较高，避免用于新接口；`mode:no-cors` 得到不透明响应，无法解决读取 JSON 的需要。

依据：[MDN：CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)。

### J31 · instanceof（第 44 页）

常见路径是在实例原型链上找构造器 prototype，完整运算还会考虑 Symbol.hasInstance、可调用性及跨 realm。**原文修改 `x.__proto__` 的实现会破坏被测对象，应只移动局部指针**：

```js
function ordinaryInstanceOf(value, Constructor) {
  // 教学版只覆盖带对象 prototype 的普通构造器。
  const prototype = Constructor.prototype;
  if (prototype === null || !['object', 'function'].includes(typeof prototype)) {
    throw new TypeError('prototype 必须是对象');
  }
  if (value === null || !['object', 'function'].includes(typeof value)) return false;
  let current = Object.getPrototypeOf(value);
  while (current !== null) {
    if (current === prototype) return true;
    current = Object.getPrototypeOf(current);
  }
  return false;
}
```

数组跨窗口判断优先 `Array.isArray`；自定义 hasInstance 场景直接遵循原生语义。

依据：[MDN：instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)。

### J32 · React 生命周期（第 44—45 页）

类组件：挂载时 constructor→render→componentDidMount；更新时 render 与 componentDidUpdate；卸载时 componentWillUnmount 清理。getDerivedStateFromProps、shouldComponentUpdate、getSnapshotBeforeUpdate 按需要使用；旧 willMount/willReceiveProps/willUpdate 为不安全历史 API，不应新用。函数组件以渲染、提交、effect 理解，effect 不是所有类生命周期的一对一替代。严格模式开发检查可能额外执行挂载/清理，渲染阶段应保持纯。

### J33 · Flux（第 45—46 页）

Action 描述发生了什么，经分发机制触发 store 更新，再通知视图。重点是单向数据流和集中管理状态，不是要求所有框架都复制同一 Dispatcher 类；Redux 是受其影响的不同设计。

### J34 · 执行上下文与栈（第 46 页）

调用栈维护执行上下文，词法环境保存绑定并沿定义位置构成作用域链。this 由调用方式和函数类型决定：严格普通函数直接调用为 undefined，非严格时可能替换为 globalThis；ES 模块顶层 this 为 undefined；Node CommonJS 顶层 this 通常是 exports。**全局环境不总是 window，不能把所有执行环境当浏览器 classic script**。

### J35 · CSP（第 47 页）

通过响应头声明允许的资源和脚本执行规则，例如基于 nonce/hash 的 script-src；报告模式可先观测违规。meta 只支持部分能力，不能等价替代所有响应头指令。CSP 是纵深防御，应配合安全 DOM API、输出编码和可信依赖，不能保证消灭 XSS。

### J36 · CSRF（第 47 页）

浏览器可能自动携带目标站点凭据；攻击页借此诱导状态修改。使用服务端校验的 CSRF token、适当的 SameSite、Origin/Referer 与 Fetch Metadata 检查；状态变更不用 GET。SameSite 的“站”和同源的“源”不同，CORS 也不是完整 CSRF 防护。存在 XSS 时许多 CSRF 防线会失效。

依据：[MDN：CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)、[CSRF](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/CSRF)。

### J37 · 函数式编程（第 47—48 页）

用可组合函数组织计算，重视纯函数、不可变数据与显式副作用边界。一等函数和高阶函数是工具，闭包、递归、惰性求值不是每个函数式程序必须同时具备的条件，也不要求 JS 项目只剩表达式。

### J38 · 尾调用（第 48 页）

函数的最终动作是返回另一个调用的结果时可能构成尾调用；`return 1 + f()` 不是。规范中严格模式的适当尾调用可复用栈空间，但实际引擎支持不同，不能指望所有现代浏览器自动消除递归栈；生产中深递归优先改迭代或显式栈。

### J39 · Vue 通信（第 48 页）

父子用 props/emit，跨层共享用 provide/inject，跨组件状态用明确的 store 或组合函数；refs 用于必要的命令式能力。Vue 3 已移除实例 `$on/$off/$once`，历史 event bus 方案需改用独立事件器并清理监听。滥用 `$parent.$refs` 使结构耦合且难以测试。

### J40 · computed 与 watch（第 48—49 页）

computed 计算派生值并依赖响应式依赖缓存，getter 不放异步副作用；watch 观察指定来源以执行请求等副作用，可按需 deep、immediate、flush 并清理过时请求。watchEffect 自动收集同步访问的依赖。不是按“一影响多/多影响一”的数量判断，先判断“派生值还是副作用”。

### J41 · PWA（第 49 页）

以 Web 技术渐进提供可安装、离线和平台集成体验。manifest 提供安装信息；Service Worker 在安全上下文按作用域拦截请求，可结合 CacheStorage。离线与推送需具体实现且权限/平台能力不同；Service Worker 生命周期受浏览器管理，不能当永远在线的后台线程。

### J42 · CacheStorage（第 49—50 页）

`caches.open(name)` 管理命名 Cache；Cache 以 Request/Response 为核心。它可在安全上下文的 window/worker 使用，并非只属于 Service Worker；**不会自动按 HTTP Cache-Control 过期**，需应用维护版本、更新、删除与容量策略。`cache.match` 的规则也不是纯粹字符串字典。

依据：[MDN：Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache)。

### J43 · Vue 双向绑定（第 50—51 页）

响应式依赖跟踪触发视图更新，表单的 value 与事件让输入回写状态。Vue 2 常见 defineProperty，Vue 3 对象 Proxy/ref 访问器；组件 `v-model` 是 props 加更新事件约定，不是所有 props 都允许子级直接改。与 J1、J14、J16 连起来回答。

### J44 · 可用时间与性能指标（第 51 页）

“页面可用”需先定义：DOM 解析完、主内容可见、关键业务组件就绪和交互响应不是同一时刻。旧 `performance.timing` 已弃用；用 `PerformanceNavigationTiming` 读取导航阶段，用 LCP/INP/CLS 与自定义 mark/measure 记录体验，不把 DOMContentLoaded 当作可交互的充分条件。

```js
const navigation = performance.getEntriesByType('navigation')[0];
console.log(navigation?.domContentLoadedEventEnd); // 相对导航起点，事件完成后读取
performance.mark('search-ready'); // 应在真实业务就绪处记录
```

依据：[MDN：PerformanceNavigationTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming)。

### J45 · WebAssembly（第 51 页）

面向虚拟栈机的可验证二进制格式，支持多语言编译到 Web 等宿主。与 JS 通过接口交互；性能取决于算法、编译器、内存和边界调用，不保证任何任务都比 JS 快，也不直接获得任意 DOM 权限。

### J46 · 移动端点击（第 51—52 页）

历史上的点击延迟与双击缩放识别有关，现代浏览器在适当 viewport/手势配置下通常无需 FastClick。优先使用语义按钮和 click/Pointer Events，必要时在具体控件用 `touch-action:manipulation`。**不要照抄全局 user-scalable=no**。同时绑定 touch 与 click 可能重复触发；穿透还与元素移除和命中测试有关，不是所有情况都归咎 300ms。

依据：[MDN：touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action)。

### J47 · Git rebase（第 52 页）

把选定提交重新应用到新基点，会产生新的提交标识；交互式 rebase 可整理或合并提交，普通 rebase 不必减少提交数。已共享历史重写前需要团队协调，合并冲突时逐个理解改动；不能把它描述为简单“合并分支并减少记录”。

依据：[Git：git-rebase](https://git-scm.com/docs/git-rebase)。

### J48 · 懒加载（第 52—53 页）

屏外图片可用 `loading="lazy"` 和明确宽高；复杂资源用 IntersectionObserver，JS 功能用动态 import。首屏 LCP 图不懒加载。**不把 img 的 src 设成空字符串当通用步骤**，它可能导致错误请求；懒加载并不能自动解决所有网络与 CPU 阻塞。

### J49 · loader 与 plugin（第 53 页）

loader 参与模块源内容的转换，可返回 JS 或其他后续 loader 输入，也可产生依赖与附加资源；plugin 通过 compiler/compilation 钩子介入构建全流程。**plugin 不是只能在 loader 全部结束后运行，也可以操作模块与输出资源**。

依据：[Webpack：Loaders](https://webpack.js.org/concepts/loaders/)、[Plugins](https://webpack.js.org/concepts/plugins/)。

## 四、执行结果

### E1 · 静态方法与实例方法（第 53—54 页）

结果依次为 **4、2、1**。第一次调用现有的 Foo.a；new Foo 重写 Foo.a，同时在实例定义自己的 a；实例自有属性遮蔽原型 a。最后调用被改写的静态方法。

### E2 · 参数是值传递（第 54 页）

`webSite.siteUrl` 为 `"http://www.baidu.com"`。函数最初拿到同一对象的引用值，第一次修改被调用方可见；之后 `o = new Object()` 只改变局部参数绑定，不替换外部对象。

### E3 · 事件循环（第 54—55 页）

在现代浏览器中，原代码按以下顺序打印：

```text
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```

同步段先运行；await 恢复与 then 在本轮微任务检查点按入队顺序处理；timer 属于之后的任务。结论针对题内无其他干扰的脚本，不把历史转译器和所有宿主调度混为一谈。

### E4 · React setState（第 55—56 页）

原答案 **0、0、2、3** 针对旧 root 的批处理边界。React 18 `createRoot` 对 timer 内的更新也自动批处理：忽略开发 StrictMode 的重复挂载检查时，四次日志为 **0、0、1、1**，最后 state 为 2，因为两次对象更新读取同一旧值。改用函数式 `this.setState(s => ({val:s.val+1}))` 可累加，更新后读取放在回调或相应提交逻辑中。不要把某次日志是否立刻变化当作 setState 的同步承诺。

依据：[React 18：自动批处理](https://react.dev/blog/2022/03/08/react-18-upgrade-guide#automatic-batching)。

### E5 · 命名函数表达式（第 57 页）

在非严格 classic script 中，函数内部的 b 是命名函数表达式只读的局部名字；赋值被忽略，打印函数本身，外部 b 仍为 10。严格模式下赋值抛 TypeError，不会继续打印。不是所有“非匿名函数变量”都只读；普通函数声明或外层变量要另论。

### E6 · var 提升（第 57 页）

浏览器非模块 classic script 的原环境下是 **undefined、10、20**：局部 var a 的声明提前遮蔽外部 a，赋值不提前。**ES 模块中顶层 var 不挂 window；Node 中也没有 window**，所以不能把这组结果脱离题目环境背诵。

### E7 · 类数组 push（第 58 页）

操作后仍是普通对象，包含 `"2":1`、`"3":2`、`length:4` 和原 push/splice 方法，索引 0、1 不存在；`Array.isArray(obj)` 为 false。控制台有时显示近似数组格式，并不改变它的类型，原文直接写成数组易误导。

### E8 · 链式赋值（第 58 页，补答）

`a.x` 是 undefined，`b.x` 是 `{n:2}`。先确定左侧 `a.x` 的引用，保留旧对象；再给 a 赋新对象，最后把它写进旧对象的 x。b 仍引用旧对象，不能用“从右到左”忽略左侧引用的求值时机。

### E9 · 对象键（第 58—59 页，补答）

三个例子结果分别为 **c、b、c**。字符串 `"123"` 和数字 123 转为同一属性键；两个 `Symbol('123')` 不同；两个普通对象在此都转为 `"[object Object]"` 而覆盖。需要按对象身份区分键时用 Map。

语言依据：[MDN：this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)、[赋值运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment)。

## 五、源码相关

### S1 · 柯里化（第 59—60 页）

柯里化把多参数函数拆成连续接收参数的函数；延迟到空调用求和是另一种 API 约定。原代码把新参数数组作为一个元素插入，多个参数可能转成 NaN，console.log 也不保证触发自定义 toString。固定参数个数可写：

```js
function curry(fn, arity = fn.length) {
  const collect = args => (...more) => {
    const all = [...args, ...more];
    return all.length >= arity ? fn(...all) : collect(all);
  };
  return collect([]);
}
curry((a, b, c) => a + b + c)(1)(2, 3); // 6
```

默认参数/rest 参数会使 fn.length 不等于预期元数，此时显式传 arity；上例针对无 this 依赖的普通函数。

### S2 · bind、call、apply（第 60—61 页）

原答案未处理 null/原始值，可能覆盖现有 fn 属性，异常时不清理；bind 更是调用了错误对象且漏返回值与后续参数。实现时先讲调用与构造两条语义。以下用 Reflect 作为调用原语，避免临时向业务对象挂属性；是原理练习，不是逐项复刻原生 bound function 的 polyfill：

```js
const callWith = (fn, context, ...args) => Reflect.apply(fn, context, args);
const applyWith = (fn, context, args) => Reflect.apply(fn, context, args ?? []);
function bindForExercise(fn, context, ...preset) {
  function bound(...later) {
    const args = [...preset, ...later];
    return new.target
      ? Reflect.construct(fn, args, new.target === bound ? fn : new.target)
      : Reflect.apply(fn, context, args);
  }
  return bound;
}
```

普通调用的严格/非严格 this 转换由目标函数语义决定，箭头仍不重绑 this。构造时忽略绑定的 context。name、length、自有 prototype、原生 instanceof 细节和可构造性标记未完全模拟；生产直接使用原生 bind。

依据：[MDN：bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)、[Reflect.apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply)。

### S3 · 模拟 new（第 61 页）

原答案 `result` 未声明，且把 null 误当有效对象、漏掉函数返回值。普通可调用构造函数的教学版：

```js
function newForExercise(Constructor, ...args) {
  const prototype = Constructor.prototype;
  const object = Object.create(
    prototype !== null && ['object', 'function'].includes(typeof prototype)
      ? prototype : Object.prototype,
  );
  const result = Reflect.apply(Constructor, object, args);
  return result !== null && ['object', 'function'].includes(typeof result)
    ? result : object;
}
```

它不能执行 class 构造器，也不完整支持内建类型、new.target 等。需要真实构造语义应使用 `Reflect.construct(Constructor,args)`，不能声称该教学版等价所有 new。

### S4 · Proxy + Fetch（第 61—62 页）

HTTP 4xx/5xx 不会自动让 fetch 拒绝；还需检查 status。原答案对 Symbol 属性直接大写会抛错，也没有处理响应体与取消。最小 API：

```js
const methods = new Set(['get', 'post', 'put', 'patch', 'delete', 'head', 'options']);
const http = new Proxy(Object.create(null), {
  get(_target, key) {
    if (typeof key !== 'string' || !methods.has(key)) return undefined;
    return async (url, options = {}) => {
      const response = await fetch(url, { ...options, method: key.toUpperCase() });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (response.status === 204 || key === 'head') return null;
      return response.json(); // 本 API 约定其余成功响应都是 JSON
    };
  },
});
// http.post('/api/items', {
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ title: '练习' }), signal: controller.signal,
// });
```

这不是完整 axios 替代品；超时、重试、拦截器、非 JSON 响应和凭据需要明确契约，不能隐式重试有副作用的写请求。

依据：[MDN：使用 Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)。

### S5 · 手写 Promise（第 62—64 页）

原实现可多次修改状态，then 返回自身，订阅晚于完成时丢失通知，用 timer 代替 Promise job，all 又按完成顺序收集且空数组不完成，不能作为可用 Promise。需要掌握：单次决议、then 返回新对象、thenable 吸收、异常传播、值穿透、微任务执行。下面补上一个教学实现；不覆盖 species/subclass、宿主未处理拒绝追踪等完整标准功能，业务仍用原生 Promise。

```js
class StudyPromise {
  #state = 'pending';
  #value;
  #handlers = [];

  constructor(executor) {
    let locked = false;
    const resolve = value => {
      if (locked) return;
      locked = true;
      this.#adopt(value);
    };
    const reject = reason => {
      if (locked) return;
      locked = true;
      this.#settle('rejected', reason);
    };
    try { executor(resolve, reject); } catch (error) { reject(error); }
  }

  #adopt(value) {
    if (value === this) {
      this.#settle('rejected', new TypeError('Promise 不能解析为自身'));
      return;
    }
    if (value !== null && ['object', 'function'].includes(typeof value)) {
      let then;
      try { then = value.then; } catch (error) { this.#settle('rejected', error); return; }
      if (typeof then === 'function') {
        queueMicrotask(() => {
          let called = false;
          const resolve = next => {
            if (called) return;
            called = true;
            this.#adopt(next);
          };
          const reject = error => {
            if (called) return;
            called = true;
            this.#settle('rejected', error);
          };
          try { Reflect.apply(then, value, [resolve, reject]); }
          catch (error) { reject(error); }
        });
        return;
      }
    }
    this.#settle('fulfilled', value);
  }

  #settle(state, value) {
    if (this.#state !== 'pending') return;
    this.#state = state;
    this.#value = value;
    for (const handler of this.#handlers) this.#run(handler);
    this.#handlers = [];
  }

  #run(handler) {
    queueMicrotask(() => {
      const callback = this.#state === 'fulfilled' ? handler.ok : handler.fail;
      if (typeof callback !== 'function') {
        (this.#state === 'fulfilled' ? handler.resolve : handler.reject)(this.#value);
        return;
      }
      try { handler.resolve(callback(this.#value)); }
      catch (error) { handler.reject(error); }
    });
  }

  then(ok, fail) {
    return new StudyPromise((resolve, reject) => {
      const handler = { ok, fail, resolve, reject };
      if (this.#state === 'pending') this.#handlers.push(handler);
      else this.#run(handler);
    });
  }
  catch(fail) { return this.then(undefined, fail); }
  static resolve(value) {
    return value instanceof StudyPromise ? value : new StudyPromise(resolve => resolve(value));
  }
  static all(iterable) {
    return new StudyPromise((resolve, reject) => {
      const values = [];
      let pending = 1;
      let index = 0;
      for (const item of iterable) {
        const position = index++;
        pending++;
        StudyPromise.resolve(item).then(value => {
          values[position] = value;
          if (--pending === 0) resolve(values);
        }, reject);
      }
      if (--pending === 0) resolve(values);
    });
  }
  static race(iterable) {
    return new StudyPromise((resolve, reject) => {
      for (const item of iterable) StudyPromise.resolve(item).then(resolve, reject);
    });
  }
}
```

`all([])` 兑现空数组，结果顺序与输入一致；`race([])` 保持 pending。测试要覆盖同步 executor 抛错、重复 resolve/reject、晚订阅、多分支、thenable 抛 getter、链中抛错与返回自身。

依据：[ECMAScript：Promise 对象](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise-objects)。原目录无 S6，因此不虚构原题。

### S7 · redux-thunk（第 65 页）

```js
const thunk = ({ dispatch, getState }) => next => action =>
  typeof action === 'function' ? action(dispatch, getState) : next(action);
```

普通 action 放行；函数 action 可异步后 dispatch。应返回执行结果，让调用方 await；错误处理和请求取消仍是 action 的责任。源码中的额外参数能力可作为扩展。

依据：[Redux：异步逻辑与中间件](https://redux.js.org/tutorials/fundamentals/part-6-async-logic)。

### S8 · new Vue（第 65—66 页）

原题对应 Vue 2：初始化生命周期、事件、渲染、注入、state、provide，触发对应钩子，挂载时建立渲染 watcher 并 patch。**vue-loader 在构建阶段处理 SFC，不是运行时 new Vue 每次调用 loader**；runtime-only 构建需要预编译模板。Vue 3 创建应用入口为 createApp，响应式和渲染实现不同，不再照搬内部私有函数名当通用接口。

### S9 · Webpack HMR（第 66 页）

watch 检测改动，编译增量产物，开发服务器通知客户端，runtime 获取更新并检查接受边界，dispose 旧模块再应用新模块；无法接受时可能刷新。应用状态能否保留取决于模块和框架适配，不是替换文件就天然保留所有状态；通信与产物格式是版本实现细节。

依据：[Webpack：HMR](https://webpack.js.org/concepts/hot-module-replacement/)。

### S10 · React 实现（第 66—67 页）

以触发更新→render/reconcile→commit 说明即可：元素是描述 UI 的对象，组件计算元素，协调过程按身份和类型决定复用，提交阶段更新宿主节点与相应 effect。**state/props 不以 AST 注入“虚拟 DOM 树”，React Element 也不是 DOM 节点**；函数组件并没有类实例。调度、Fiber 内部字段是实现细节；diff 是启发式更新，不保证求出全局最优树编辑方案。

依据：[React：Render and Commit](https://react.dev/learn/render-and-commit)。
