---
title: 拼多多、商汤面经｜38 题逐题解析
sidebar_label: 拼多多 / 商汤 · React 与工程
description: 按原面经顺序补齐38题，提供 Promise.all、数组转树、深拷贝和 BST 转链表代码。
---

[完整原文](./sources/pdd.md) · [回到题库](./index.mdx)

原文件未提供答案。以下覆盖拼多多一面 8 题、二面 5 题、商汤一面 25 题；题干作了空格与标点整理。涉及“用过什么”的问题应回答自己的真实经历，不能把参考方案当成履历。

## 拼多多一面 1. 复杂页面与 react-imvc

选真实案例说明状态来源、异步依赖、交互复杂度和拆分方法，比如“列表筛选与 URL 同步、请求竞态、缓存与权限”，给测量和测试结果。react-imvc 是围绕 React、同构渲染、Model / View / Controller 组织应用的项目；不应把 MVC 当成 React 自带机制。若未用过，应直接说明，再根据其文档解释职责划分和与 SSR 的关系。

参考：[react-imvc 源仓库](https://github.com/Lucifier129/react-imvc)。

## 拼多多一面 2. Redux 的好处与 MobX 区别

Redux 把状态变化表达成 action 和 reducer，数据流明确，便于日志、重放与测试；实际项目通常使用 Redux Toolkit 减少模板代码。MobX 通过可观察状态和依赖追踪更新派生值，书写更直接，需要理解读取追踪范围和副作用。不是“Redux 只能同步、MobX 才能异步”；两者都能组织异步流程，取舍看团队习惯、可预测性、状态关系与调试需求。

参考：[Redux 核心概念](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)、[MobX 理解响应性](https://mobx.js.org/understanding-reactivity.html)。

## 拼多多一面 3. React 特性，class 与函数组件

回答应声明项目版本。以本站 React 18 为基线：自动批处理、并发能力相关 API、transition、Suspense 与流式服务端渲染等；不要把“最新”当固定知识点。class 用实例、生命周期和 `setState`，函数组件用 render 快照、Hooks 和 Effect；Hooks 不是把每个生命周期换一个函数名。现代函数组件便于抽取状态逻辑，class 仍受支持，错误边界等能力还需考虑具体 API。

## 拼多多一面 4. 为什么 useState 不能条件调用？

普通 Hooks 依赖组件每次 render 保持一致的调用顺序，条件或循环会导致状态槽错位。把条件放进 Effect 内或拆成独立组件，Hooks 保持顶层调用。React 的 `use` API 有特殊规则，不能把它反推成 `useState` 可以条件调用。

参考：[React Hooks 规则](https://react.dev/reference/rules/rules-of-hooks)。

## 拼多多一面 5. 实现 Promise.all

处理 iterable、普通值、thenable、空输入、结果顺序与拒绝。下面是固定使用原生 Promise 的教学实现，不复刻 Promise 子类和所有规范内部步骤。任一拒绝会拒绝整体，但**不会取消其他任务**。

```js
function all(iterable) {
  return new Promise((resolve, reject) => {
    const results = [];
    let pending = 1, index = 0;
    for (const item of iterable) {
      const current = index++;
      pending++;
      Promise.resolve(item).then(value => {
        results[current] = value;
        if (--pending === 0) resolve(results);
      }, reject);
    }
    if (--pending === 0) resolve(results);
  });
}
all([Promise.resolve(1), 2]).then(console.log); // [1, 2]
all([]).then(console.log); // []
```

Promise executor 内迭代器抛错会转为拒绝；结果按输入索引写入，不按完成顺序 push。测试还应覆盖空 Set、乱序完成、拒绝和无效 iterable。

参考：[MDN Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)。

## 拼多多一面 6. React SSR

服务端根据路由和请求生成 HTML，客户端通过 `hydrateRoot` 接管。需要共享初始数据、正确加载脚本与样式、避免跨请求共享用户状态，处理错误和超时。流式 SSR 可以提前发送就绪内容，但不消除 hydration 和客户端资源成本。更完整的工程细节见 [蚂蚁三面第 4 题](./ant.md)。

## 拼多多一面 7. ESLint 与 Prettier 冲突

ESLint 检查代码问题与团队规则，Prettier 负责格式化。使用适配当前 ESLint 配置形式的 `eslint-config-prettier` 关闭冲突的格式规则；CI 分别执行 lint 和 prettier check。统一编辑器设置和锁文件，不要通过反复保存让两者互相覆盖。

参考：[Prettier 集成说明](https://prettier.io/docs/integrating-with-linters)。

## 拼多多一面 8. 数组转树

约定根节点 `parentId === null`，id 为非空字符串或有限数字，拒绝重复 ID、缺失父节点和环；不改原数组。先建 Map，再验证关系，最后连接节点。时间与空间均 O(n)。

```js
function arrayToTree(rows) {
  const nodes = new Map();
  for (const row of rows) {
    const validId = typeof row.id === 'string' ? row.id.length > 0
      : typeof row.id === 'number' && Number.isFinite(row.id);
    if (!validId || nodes.has(row.id)) throw new Error('非法或重复 id');
    nodes.set(row.id, {...row, children: []});
  }
  for (const node of nodes.values()) {
    if (node.parentId !== null && !nodes.has(node.parentId)) throw new Error('缺失父节点');
  }
  const done = new Set();
  for (const node of nodes.values()) {
    const path = new Set();
    let current = node;
    while (current && !done.has(current.id)) {
      if (path.has(current.id)) throw new Error('父子关系形成环');
      path.add(current.id);
      current = current.parentId === null ? undefined : nodes.get(current.parentId);
    }
    for (const id of path) done.add(id);
  }
  const roots = [];
  for (const node of nodes.values()) {
    if (node.parentId === null) roots.push(node);
    else nodes.get(node.parentId).children.push(node);
  }
  return roots;
}
console.log(arrayToTree([{id: 2, parentId: 1}, {id: 1, parentId: null}]));
```

如果业务允许孤儿节点或根值为 0，应明确改约定，不要默默吞掉坏数据。

## 拼多多二面 1. 足够复杂的项目

说清规模和约束、本人负责的范围、最困难的一个决策、备选方案、如何测量。准备可公开的流程图、接口边界和测试结果；复杂不等于依赖库数量多。

## 拼多多二面 2. 你实际如何做 SSR？

从请求进入开始讲：路由与权限 → 获取数据与缓存 → 构建请求级状态 → 渲染 HTML → 安全序列化数据 → 客户端用相同初始树 hydration → 监控错误。区分可公用缓存与用户数据，说明部署和回滚策略。浏览器专用 API 放到客户端阶段，不能在服务端直接访问 window。

参考：[React hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)。

## 拼多多二面 3. 性能优化

给基线、瓶颈证据、改动和对比：网络瀑布慢就查资源与缓存，主线程长任务就查脚本与渲染，交互卡顿就查更新范围、列表规模和同步计算。用实验室 trace 加真实用户指标验证，记录负面影响，例如分包过细的请求开销。见 [笔试第 13 题](./written.md)。

## 拼多多二面 4. 深拷贝

生产场景优先按数据模型选择：支持的数据用 `structuredClone`，但函数、DOM 节点等不支持，属性描述符和自定义原型也不能假定保留；JSON 往返会丢失多种类型并无法处理环。

下面手写版仅支持普通对象、数组、Date、Map、Set 与循环引用。只复制可枚举数据属性，拒绝访问器、自定义实例与函数；不宣称是万能克隆。

```js
function cloneData(value, seen = new Map()) {
  if (typeof value === 'function') throw new TypeError('不支持函数');
  if (value === null || typeof value !== 'object') return value;
  if (seen.has(value)) return seen.get(value);
  const proto = Object.getPrototypeOf(value);
  let copy;
  if (proto === Date.prototype) copy = new Date(value.getTime());
  else if (proto === Map.prototype) copy = new Map();
  else if (proto === Set.prototype) copy = new Set();
  else if (Array.isArray(value) && proto === Array.prototype) copy = new Array(value.length);
  else if (proto === Object.prototype || proto === null) {
    copy = Object.create(proto);
  } else throw new TypeError('不支持该对象类型');
  seen.set(value, copy);
  if (value instanceof Map) for (const [key, item] of value) copy.set(cloneData(key, seen), cloneData(item, seen));
  if (value instanceof Set) for (const item of value) copy.add(cloneData(item, seen));
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor.enumerable) continue;
    if (!('value' in descriptor)) throw new TypeError('不支持访问器属性');
    Object.defineProperty(copy, key, {value: cloneData(descriptor.value, seen),
      enumerable: true, writable: true, configurable: true});
  }
  return copy;
}
const original = {items: [1, 2], date: new Date(0)};
original.self = original;
const cloned = cloneData(original);
console.log(cloned !== original, cloned.self === cloned); // true true
```

参考：[MDN structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone)。

## 拼多多二面 5. BST 转链表

原题没有说明单链表、双链表、是否循环以及能否破坏原树。这里采用**中序遍历，生成新的非循环单链表**，保留原树，值按非递减排列。时间 O(n)，输出空间 O(n)，辅助栈 O(h)。

```js
function bstToList(root) {
  const dummy = {next: null}, stack = [];
  let tail = dummy, node = root;
  while (node || stack.length) {
    while (node) { stack.push(node); node = node.left; }
    node = stack.pop();
    tail.next = {value: node.value, next: null};
    tail = tail.next;
    node = node.right;
  }
  return dummy.next;
}
```

若要求复用 left/right 做双向链表，需保存遍历的后继，并连接前驱与后继；循环版还要把头尾连接。先澄清再实现。

## 商汤 1. 工作内容

用“业务目标 → 职责 → 交付物 → 协作方式 → 可核验结果”概括；区分团队成果和本人贡献。未参与的后端、运维工作不要冒领。

## 商汤 2. Lerna、monorepo 和共享代码

monorepo 是仓库组织方式，workspace 管依赖和链接，Lerna 可组织任务与发布。共享组件、工具和类型抽成有明确导出的 package，避免任意跨目录引用；配合依赖图、变更影响构建、统一或独立版本策略。一个仓库不等于所有项目必须一起上线。

参考：[Lerna 官方说明](https://lerna.js.org/docs/introduction)。

## 商汤 3. 微前端独立部署与通信

主应用负责路由与装载契约，子应用产物独立发布，用带版本的 manifest 指向资源，支持回滚；样式、全局变量和运行时依赖需要隔离或约束。通信使用小而稳定的消息契约，身份与权限不能仅靠前端状态。参见 [蚂蚁一面第 7 题](./ant.md)。

## 商汤 4. webpack 构建流程

读取配置 → 从 entry 建依赖图 → resolver 定位模块 → loader 转换资源 → 解析依赖 → 按 chunk 策略组织 → 生成并输出 assets。plugin 在编译生命周期钩子参与。区分开发增量构建、生产压缩和浏览器 runtime 加载，别把它们混成一次操作。

参考：[webpack 概念](https://webpack.js.org/concepts/)。

## 商汤 5. loader 与 plugin

loader 主要针对匹配资源进行源代码转换，例如 TS 到 JS、CSS 处理；常见链式转换的正常阶段从右向左执行，pitch 有额外规则。plugin 通过钩子扩展编译流程，如生成 HTML、提取样式、分析产物；不是“loader 处理文件、plugin 完全不处理文件”。

参考：[webpack loaders](https://webpack.js.org/concepts/loaders/)、[plugins](https://webpack.js.org/concepts/plugins/)。

## 商汤 6. HMR

开发服务检测变更并重新编译，通知浏览器获取更新的 manifest / 模块；runtime 找到可接受的更新边界，替换模块并执行清理与接受逻辑。无法接受时可回退刷新。React Fast Refresh 在此之上协调组件状态保留，状态并非任何改动都能保留。

参考：[webpack HMR](https://webpack.js.org/concepts/hot-module-replacement/)。

## 商汤 7. 分包

动态 `import()` 按路由或功能拆包，用 `splitChunks` 提取合适的共享模块，必要时分离 runtime。看 bundle report 与请求瀑布验证，避免把整个依赖库或大量小 chunk 都预加载到首页。缓存命中率、重复模块、请求开销与执行成本一起考量。

## 商汤 8. webpack 优化与 Rollup

先区分构建耗时和页面运行成本。构建慢看 loader 范围、重复转换、缓存与插件；产物大看重复依赖、tree shaking、按需加载、压缩和资源格式。Rollup 擅长基于模块图产出不同格式的包，但不能简单断言它总比 webpack 快或产物总更小，应用和库的需求不同。

参考：[webpack 构建性能](https://webpack.js.org/guides/build-performance/)、[Rollup 介绍](https://rollupjs.org/introduction/)。

## 商汤 9. react-imvc 是什么？

见拼多多一面第 1 题。进一步可讲 Controller 组织路由与数据、Model 管理状态、View 负责 React 渲染，以及服务端和客户端代码共享。实际 API 以使用的仓库版本为准，不把历史框架的 API 写成当下 React 标准。

## 商汤 10. react 和 react-dom

`react` 提供组件和 Hooks 等核心 API；`react-dom` 是面向浏览器 DOM 的渲染器，并提供客户端根、hydration 及服务端渲染相关入口。React 也有其他平台渲染器，因此组件逻辑不等于 DOM 操作。

## 商汤 11. Redux、MobX、redux-saga

两种状态模型见拼多多一面第 2 题。redux-saga 用 generator 表达异步副作用，支持任务取消、并发与组合；它不等于状态容器，也不是所有请求都必须引入。简单场景可用 thunk，服务端缓存还可考虑查询工具，先看问题复杂度。

参考：[redux-saga](https://redux-saga.js.org/docs/introduction/GettingStarted/)。

## 商汤 12. React diff 原理与复杂度

React 用元素类型和兄弟列表中的 key 辅助判断复用与重建，保持 key 稳定可以避免状态错配。面试常说的 O(n) 指其基于约束的协调启发式，不是任意两棵树的最优编辑算法，也不等于整次 render / DOM 更新总成本 O(n)。不能声称虚拟 DOM 必然比直接 DOM 更快。

参考：[React 状态保留与重置](https://react.dev/learn/preserving-and-resetting-state)。

## 商汤 13. class 与 Hooks

函数组件每次执行产生快照，Effect 描述与外部系统同步，需正确清理和声明依赖；class 的 this 指向组件实例。用自定义 Hook 复用逻辑，但不同调用默认不共享同一份状态。不要用“函数没有状态、class 才有状态”的过时答案。

## 商汤 14. TypeScript 泛型

泛型在类型参数之间保留关系，比 `any` 更能约束输入输出；它在编译期工作，不提供运行时校验。

```ts
function first<T>(values: readonly T[]): T | undefined {
  return values[0];
}
const value = first([1, 2]); // number | undefined
```

说明约束 `extends`、默认参数和推断；不要写只出现一次、没有表达关系的无意义泛型。

参考：[TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)。

## 商汤 15. 输入 URL 到页面

导航决策与可能的缓存 / Service Worker → DNS → 连接与 TLS（也可能复用现有连接）→ HTTP 请求响应 → HTML 解析、资源发现 → DOM / 样式计算 → 布局、绘制和合成 → 脚本执行与交互。HTTP/3 使用 QUIC，不能所有请求都描述成 TCP 三次握手；重定向、缓存命中和预连接会改变流程。

## 商汤 16. 重绘与回流

布局计算几何信息，绘制生成视觉内容，合成组合图层。改变宽高可能触发布局，颜色变化通常只需重绘，transform 在合适条件下可由合成处理，但不能保证零成本。连续写样式后读布局可能强制同步布局，应测 trace 再批量读写。

## 商汤 17. BFC

块级格式化上下文规定一部分块布局与浮动交互规则。`display: flow-root` 可建立 BFC，用于包含浮动、避免父子 margin 折叠等；不能说它隔离一切布局、任何 margin 都不折叠。`overflow: hidden` 也可建立 BFC，但会裁剪内容，别为清除浮动无条件使用。

参考：[MDN BFC](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Block_formatting_context)。

## 商汤 18. 判断数组

用 `Array.isArray(value)`，对其他 realm 创建的数组也适用。`typeof []` 为 object，`instanceof Array` 可能跨 iframe 失败，判断是否有 length 也不可靠。

## 商汤 19. 页面卡顿定位

先复现用户动作，录制 Performance，观察长任务、调用栈、渲染和布局，结合 React Profiler 查更新原因。区分 CPU、网络、内存和 GPU 问题，尝试减少单次工作、分片、虚拟列表或 worker。固定节流频率不能替代定位。

## 商汤 20. 十万项数组，取首尾耗时？

常规密集数组索引访问通常接近 O(1)，尾项不是必须从头遍历。但 ECMAScript 不承诺固定纳秒时间，稀疏数组、访问器、Proxy、JIT 和缓存都会影响。应说明访问方式与环境，用预热、重复采样和基线测量，不能报一个通用固定耗时。

## 商汤 21. Canvas

Canvas 用脚本绘制位图，适合图表、游戏和大量自定义图形，DOM 语义与事件命中需自行补充。处理 DPR、尺寸变化、资源加载和清晰度，用 `requestAnimationFrame` 驱动动画、减少重复绘制；需要交互和可访问性时可选择 SVG 或 DOM。没有做过要说清，不虚构项目。

## 商汤 22. GC 与 Node 内存泄漏

GC 回收不可达对象，循环引用本身不必然泄漏。检查持续增长的缓存、监听器、定时器和被闭包保留的大对象；区分 heap、external、RSS。固定负载多轮采样，比较 heap snapshot 的 retained size 与引用链；快照可能暂停进程并额外占内存，应在受控环境采集。

参考：[Node 内存诊断](https://nodejs.org/en/learn/diagnostics/memory/using-heap-snapshot)。

## 商汤 23. 如何理解前端？

前端把用户目标转成可理解、可操作、可靠的界面，同时处理网络、状态、性能、可访问性和工程交付。用具体项目说明如何在体验、成本与维护之间做取舍，避免只背框架名称。

## 商汤 24. 最难的问题和自豪项目

选有事实依据的一个案例，讲约束、定位证据、失败尝试、关键决策、结果与复盘。突出本人贡献，保留可公开的测试或监控记录。参考 [蚂蚁二面第 8 题](./ant.md)。

## 商汤 25. 周末安排与学习途径

如实回答个人安排。学习可形成“官方文档 → 最小实验 → 小项目 → 复盘”的闭环；遇到文章结论先核对版本和规范，再用代码验证。无需声称所有休息时间都在写代码。
