---
title: 大厂手册题解：框架、工程与项目表达
sidebar_label: 框架、工程与项目
sidebar_position: 4
---

对应原文印刷页 69—111（PDF 81—123）。V/R/M/E/P/O 分别为 Vue、React、小程序、其他高频、项目流程、开放题；保留原缺号。[题解目录](./index.md) · [逐页原文](../sources/handbook.md)

## Vue：分清 Vue 2 与 Vue 3

### V01 Vue 的核心

**回顾。** 声明式渲染、响应式状态与可组合的组件。Vue 核心处理界面，路由和集中状态按需求添加，不要求所有项目都使用“全家桶”。[Vue 简介](https://vuejs.org/guide/introduction.html)

### V02 对 Vue 的理解

**更新。** 将模板或渲染函数描述的界面与响应式状态关联，状态变化触发依赖组件更新。可从渐进式引入、单文件组件、组合式 API 和生态工具回答；MVVM 是理解方式，不是全部实现细节。

### V03 单向数据流

**纠错。** props 从父到子，子组件用事件请求父组件修改。对象 props 的嵌套值技术上可能被子项更改，但会造成隐式耦合；使用本地状态或有 getter/setter 的 computed 时，也要明确初始化、后续同步和事件反馈规则。[Vue props](https://vuejs.org/guide/components/props.html)

### V04 常用修饰符

**纠错。** 表单 `.lazy` 改用 change 事件，不精确等于“失焦”；`.trim` 去首尾空白，`.number` 尝试转换，无法解析时仍可能是字符串。事件 `.stop/.prevent/.self/.capture/.once/.passive` 各有语义，`.passive` 不应与 `.prevent` 同用；修饰符顺序也可能改变行为。[表单绑定](https://vuejs.org/guide/essentials/forms.html)、[事件处理](https://vuejs.org/guide/essentials/event-handling.html)

### V05 v-text、插值与 v-html

**纠错。** 文本插值转义 HTML，v-text 设置整个 textContent，v-html 设置 innerHTML。差别不只是“花括号闪烁”，v-text 会替换元素原文本；外部 HTML 必须进行可靠清洗，不能把用户输入直接交给 v-html。[Vue 模板语法](https://vuejs.org/guide/essentials/template-syntax.html)

### V06 一个事件调用多个方法

**补答。** 最清楚的是绑定一个处理函数，在函数中按序调用，并明确异常/异步处理。对象语法可以一次监听不同事件，不能把“逗号分隔”当无条件通用规则。

```vue
<script setup>
function validate() { return true; }
function save() { console.log('保存'); }
function submit() { if (validate()) save(); }
</script>
<template><button @click="submit">提交</button></template>
```

### V07 key 的作用

**纠错。** key 是同级节点身份提示，影响节点和组件实例复用；没有 key 不代表清空所有 DOM。列表应使用稳定唯一的业务 ID；排序、插入时用数组下标可能让输入状态落到错误项目。key 不只是性能开关。[Vue 列表](https://vuejs.org/guide/essentials/list.html)

### V08 计算属性

**纠错。** computed 根据响应式依赖派生值并缓存。默认只有 getter，是只读的；需要时才声明 setter。getter 应无副作用，不在其中请求数据或修改其它状态；依赖不变时复用缓存。[Vue computed](https://vuejs.org/guide/essentials/computed.html)

### V09 SPA 优缺点

**纠错。** 客户端导航可保持状态和局部更新，但首屏 JS 成本、错误恢复和搜索抓取需设计。SPA 并非必须一次下载所有页面，也不是“导航不可用”，可路由分包并接入历史记录；需要时使用 SSG/SSR。[Vue 应用形态](https://vuejs.org/guide/extras/ways-of-using-vue.html)

### V10 Vuex 是什么及场景

**更新。** Vuex 提供集中响应式状态和规范化修改流程；共享购物车、跨页面身份信息等可使用，局部表单不必搬进去。旧项目理解 state/getters/mutations/actions/modules；新 Vue 应用官方状态管理路线可评估 Pinia，不强行给现有项目迁移。[Vue 状态管理](https://vuejs.org/guide/scaling-up/state-management.html)

### V11 声明式与编程式路由

**回顾。** RouterLink 声明导航，router.push/replace 编程导航，RouterView 显示匹配组件。push 增加历史，replace 替换当前；导航可能失败或被守卫重定向，应按需求处理其结果。[Vue Router 导航](https://router.vuejs.org/guide/essentials/navigation.html)

### V12 Vue 跨域

**纠错。** 跨域由浏览器安全模型和服务器决定，Vue 自身无“关闭跨域”开关。后端按允许来源配置 CORS，或经受控同源反向代理；开发代理仅解决开发环境请求，生产需独立配置。JSONP 仅是有明显限制的历史方案。[MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)

### V13 生命周期

**更新。** Vue 2 常见 beforeCreate/created、beforeMount/mounted、beforeUpdate/updated、beforeDestroy/destroyed。Vue 3 选项式销毁名改 beforeUnmount/unmounted；组合式在 setup 中注册 onMounted/onUpdated/onUnmounted 等，另有激活、错误捕获等钩子。不能说生命周期总共只有 8 个。[Vue 生命周期](https://vuejs.org/guide/essentials/lifecycle.html)

### V14 生命周期作用

**回顾。** 在正确阶段接入副作用：挂载后初始化需要 DOM 的库，更新后读取本次 DOM，卸载时清理监听和定时器。SSR 不调用 mounted/unmounted 等客户端挂载钩子，避免在 setup 顶层访问 window。

### V15 DOM 在哪个阶段完成

**纠错。** mounted 表示本组件 DOM 已建立且同步子组件已挂载，不保证异步子组件、图片、网络数据全部完成。状态变化后等待 DOM 更新用 await nextTick；mounted 不是“浏览器已经完成所有绘制”的保证。[Vue onMounted](https://vuejs.org/api/composition-api-lifecycle.html#onmounted)

### V16 Vue 路由如何实现

**更新。** 基于 URL/历史变化匹配路由，再渲染对应组件；Vue Router 统一了路由表、导航和守卫。Vue 3 常通过 createRouter 创建实例并 app.use(router)，不能直接复制 Vue 2 的 new VueRouter 初始化方式。[Vue Router 入门](https://router.vuejs.org/guide/)

### V17 hash 与 history

**回顾。** hash 片段不发送到服务器，适合难以配置回退的静态托管；HTML5 history 路径更自然，但深链刷新要由服务端回退到入口（真实资源/404 应正确处理）。服务端渲染还可用 memory history；不是只有两种模式。[Vue Router history](https://router.vuejs.org/guide/essentials/history-mode.html)

### V18 params 与 query

**纠错。** params 对应路径里的动态段，query 对应问号后的参数，两者都可能显示在 URL，都不能用于隐藏敏感数据。合法路径参数刷新不会天然丢失；未在路径声明的任意 params 不应当隐式存储。使用 name+params 或构造 path，path 与 params 混用时注意忽略规则。[Vue Router 动态参数](https://router.vuejs.org/guide/essentials/dynamic-matching.html)

### V19 数据绑定方式

**纠错。** 文本插值、v-bind 属性、v-on 事件、v-model 表单/组件值同步各有职责。v-once 表示只渲染一次，不依赖 v-model；“双向绑定”是值和事件的组合，不改变组件 props 向下的原则。[Vue 模板](https://vuejs.org/guide/essentials/template-syntax.html)

### V20 全局组件

**纠错。** Vue 3 使用 `app.component('MyButton', MyButton)`，Vue 2 使用 Vue.component；原文 componnet 拼写错误。局部组件或 script setup 导入更易明确依赖与按需打包，全局只注册高频基础组件。[Vue 注册组件](https://vuejs.org/guide/components/registration.html)

### V21 路由守卫

**纠错。** 全局 beforeEach/beforeResolve/afterEach；路由 beforeEnter；组件 beforeRouteEnter/beforeRouteUpdate/beforeRouteLeave，原文 beforeRouter 拼写错误。现代守卫可 return false 取消或 return 路由重定向；避免 next 重复调用。前端守卫不代替服务端鉴权。[导航守卫](https://router.vuejs.org/guide/advanced/navigation-guards.html)

### V22 动态路由与取参

**补答。** 区分路径参数 `/users/:id` 与运行时 `router.addRoute()` 添加记录。取当前参数用 route.params，query 用 route.query；同组件复用时参数变化可能不重新 mounted，应 watch 对应参数或使用更新守卫。[动态匹配](https://router.vuejs.org/guide/essentials/dynamic-matching.html)、[动态添加路由](https://router.vuejs.org/guide/advanced/dynamic-routing.html)

### V23 Element 常用组件及属性

**纠错。** Vue 2 的 Element UI 与 Vue 3 的 Element Plus 需区分。可举 Table(data/列)、Form(model/rules)、Pagination(total/page-size)、Dialog(v-model)、Select(options/value) 并说明真实业务使用。原文下拉菜单应为 el-dropdown/el-dropdown-menu/el-dropdown-item，不是 el-container-menu。[Element Plus 组件目录](https://element-plus.org/en-US/component/overview.html)

### V24 自定义指令

**补答。** 这是 Vue API，不依赖 Vue CLI。适合底层 DOM 行为，不应替代可复用组件或组合函数；卸载钩子清理资源。

```js
app.directive('focus', {
  mounted(el) { el.focus(); },
});
// 模板：<input v-focus />
```

Vue 2 钩子名为 bind/inserted/update 等，与 Vue 3 不同。[Vue 自定义指令](https://vuejs.org/guide/reusability/custom-directives.html)

### V25 内置指令

**纠错。** v-if/else-if/else、v-show、v-for、v-on、v-bind、v-model、v-slot、v-text、v-html、v-pre、v-once、v-memo、v-cloak。原文写成 v-clock，应为 v-cloak；v-if 控制挂载，v-show 改 display。[Vue 内置指令](https://vuejs.org/api/built-in-directives.html)

### V26 过滤器

**更新。** filters 选项和模板管道语法属于 Vue 2，Vue 3 已移除。新代码使用函数或 computed，例如 `formatCurrency(price)`；格式化可用 Intl.NumberFormat，避免照抄旧语法。[Vue 3 过滤器迁移](https://v3-migration.vuejs.org/breaking-changes/filters.html)

### V27 KeepAlive

**回顾。** 缓存动态组件实例，切换时保留状态；activated/deactivated 管理激活期间工作，卸载仍需清理。通过 include/exclude/max 控制范围；不代表缓存所有 DOM 或自动避免数据请求，过度缓存也会占内存。[Vue KeepAlive](https://vuejs.org/guide/built-ins/keep-alive.html)

### V28 CSS 只在当前组件生效

**纠错。** 单文件组件使用 `<style scoped>`，不是 styled。编译器为选择器和节点加属性约束，不是 Shadow DOM 的完全隔离；子组件根节点、`:deep()`、插槽等有明确边界。也可选 CSS Modules。[SFC CSS](https://vuejs.org/api/sfc-css-features.html)

### V29 生命周期阶段数

**更新。** 创建、挂载、更新、卸载可作为教学分期，不应声称完整 API 只有四阶段八钩子。具体 Vue 2/3 名称与 mounted 边界见 V13—V15。

### V30 MVC 与 MVVM

**纠错。** MVC 分离模型、视图、控制器；MVVM 引入 ViewModel 暴露视图状态和操作，通过绑定连接视图。具体框架的实现有差异，不能用“视图是否访问模型”一句话判断所有架构。说明状态归属、依赖方向和测试边界更实用。

### V31 data 为什么是函数

**回顾。** 每次创建组件调用工厂，返回新对象，避免不同实例共享同一可变对象。若函数仍返回同一个外部对象，仍会共享；这是对象创建问题，不是函数自动产生“深拷贝”。组合式中也要注意模块级响应式单例与组件局部状态。

### V32 双向绑定原理

**纠错。** Vue 2 常用 defineProperty 对属性做依赖追踪并补丁数组方法；Vue 3 reactive 基于 Proxy，ref 可通过访问器追踪 value。响应式状态→渲染 effect→DOM 更新；v-model 再结合输入事件更新状态。响应式与表单双向绑定不是同一机制。[Vue 响应式基础](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)

### V33 组件通信

**更新。** props 向下、emit 向上，跨层 provide/inject，共享状态可用 store。Vue 3 移除实例 `$on/$off/$once`，不能直接照搬 Vue 2 的 new Vue 事件总线；外部总线需显式取消订阅。优先使数据所有权明确。[Vue 组件事件](https://vuejs.org/guide/components/events.html)

### V34 Bootstrap 网格

**纠错。** 默认 12 列，通过容器、行、列、间距和响应式断点组织布局；Bootstrap 5 默认网格基于 Flex，不笼统说“24 或 32 列”。原文 `col-xs-4` 是旧版命名，5.x 最小尺寸可用 col-4。[Bootstrap 5 网格](https://getbootstrap.com/docs/5.3/layout/grid/)

### V36 跨项目复用组件

**补答。** 抽出业务无关 API、props/events/slots 和主题样式，作为版本化 npm 包或 monorepo 包发布；声明框架 peerDependencies，提供示例、类型与变更说明。先有真实复用需求，再提取稳定部分，避免复制多个难同步的目录。

### V37 插槽

**更新。** 父组件提供内容，子组件决定呈现位置；默认、具名和作用域插槽分别表达默认位置、多个位置和子组件向插槽暴露数据。插槽内容通常在父作用域求值，子组件数据必须作为 slot props 显式传出；Vue 3 使用 v-slot 或 `#name`。[Vue 插槽](https://vuejs.org/guide/components/slots.html)

### V38 watch

**补答。** 监听响应式来源的变化以执行副作用，适合请求、持久化或同步外部系统。注意清理旧请求、监听来源与 flush 时机；大对象 deep watch 可能昂贵。不要用 watch 维护本来可以 computed 派生的值。[Vue watchers](https://vuejs.org/guide/essentials/watchers.html)

### V39 Vant UI

**回顾。** 面向移动 Web 的 Vue 组件库，选型需核对 Vue 大版本、组件能力、无障碍与按需导入；Vant Weapp 是另一个小程序组件库，不能当同一包。[Vant 官方](https://vant-ui.github.io/vant/)

### V40 computed 与 watch

**纠错。** computed 声明派生结果并按依赖缓存，watch 执行变化引发的副作用。watch 的来源不限于 data 中变量，还可为 ref、reactive、getter 或来源数组；computed getter 应保持纯净。[computed](https://vuejs.org/guide/essentials/computed.html)、[watch](https://vuejs.org/guide/essentials/watchers.html)

### V41 MVVM 与 jQuery

**纠错。** Vue 用声明式界面与响应式状态组织复杂交互，jQuery 主要提供 DOM、事件和 Ajax 工具，两者并不是对等的完整架构。简单既有页面可局部增强；状态和组件关系复杂时声明式框架更易维护，不用贬低或绝对排除某种工具。

### V42 首屏慢、白屏检测与解决

**补答。** 原文检测处只有问号。先区分下载慢、JS 执行慢、接口依赖、资源404和运行异常；记录 FCP/LCP、导航与资源时序，结合错误日志和业务首屏可用标记。FCP 不等同于业务可用，白屏探测需考虑页面骨架和正常空状态。按瓶颈分包、减 JS、优化关键资源、SSR/SSG、超时与错误回退；v-cloak 仅隐藏未编译模板，不能修复 chunk 失败或减少白屏。[Paint Timing](https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming)、[Vue 性能](https://vuejs.org/guide/best-practices/performance.html)

### V43 数据改变如何通知视图

**纠错。** 读取响应式属性时收集当前 effect 的依赖，写入时触发关联 effect，渲染更新可批处理；不是两个控件互相直接监听。Vue 2/3 拦截方式有别，表单事件回写另见 V32。[Vue 响应式深入](https://vuejs.org/guide/extras/reactivity-in-depth.html)

### V44 Vuex 流程

**纠错。** 组件可 dispatch action；action 可异步并 commit mutation；mutation 同步修改 state；响应式消费者更新。组件也可直接 commit，不强制经过 action；不存在必须调用名为 mutate 的 API。[Vuex mutations](https://vuex.vuejs.org/guide/mutations.html)

### V45 Vuex 请求异步数据

**回顾。** action await 请求，成功后 commit，失败时维护 error，finally 清 loading；返回 Promise 供调用方等待。并发请求要处理过期响应覆盖，不把异步写进 mutation。[Vuex actions](https://vuex.vuejs.org/guide/actions.html)

### V46 action 提交 mutation

**回顾。** action 接收 context，可解构 commit 后 `commit('setUser', user)`；命名空间模块的本地/根提交要明确。context 不是 store 实例本身，拥有的能力相似不代表对象相同。

### V47 route 与 router

**纠错。** router 是导航器，提供 push/replace 等；route 是当前匹配位置及 params/query/meta 等状态，不是每个页面的固定独立实例。组合式常用 useRouter/useRoute，关注特定字段而非无条件监听整个 route。

### V49 Vuex State

**纠错。** state 存响应式状态；mapState 映射 state，mapGetters 映射 getters，原文把两者混为 mapState。模块或 SSR 多实例场景采用工厂返回状态，避免串数据。[Vuex state](https://vuex.vuejs.org/guide/state.html)

### V50 Vuex Getter

**回顾。** 从 state 派生可复用值，属性形式可像计算属性读取；方法形式按参数调用不等于自动缓存每个参数结果。不把可直接读取的状态重复加工为大量冗余 getter。[Vuex getters](https://vuex.vuejs.org/guide/getters.html)

### V51 Vuex Mutation

**补答。** 同步更新状态，commit 记录可追踪的变更；异步工作放 action。开启严格模式可在开发时发现非 mutation 修改，实际底层仍是 JS 对象，不是“物理上无法写”。

### V52 Vuex Action

**回顾。** 编排异步或多步业务，通过 commit 修改状态，可 dispatch 其它 action 并返回 Promise；action 并非只能异步，见 V45/V46。

### V54 Vuex 优势与持久化

**纠错。** 集中状态与工具支持改善共享和追踪，但不会自动减少网络请求；去重、缓存、失效需自己设计。刷新后内存重建，若需持久化只存必要字段并处理版本、退出与过期；敏感令牌不应随意塞到 localStorage。无需依赖原文单个插件才可实现。

### V55 路由懒加载

**补答。** 路由 component 使用返回 import Promise 的函数，由构建工具形成分包；注意部署时旧 HTML/新 chunk 的兼容与加载失败回退，不一开始预取所有页面。

```js
const routes = [{ path: '/settings', component: () => import('./Settings.vue') }];
```

[Vue Router 懒加载](https://router.vuejs.org/guide/advanced/lazy-loading.html)

### V56 v-for 与 v-if 优先级

**纠错。** Vue 2 同节点 v-for 优先，Vue 3 改为 v-if 优先，因此不能背一个跨版本结论。两者不建议写在同一元素：过滤列表用 computed，整体隐藏用外层 v-if，逐项条件放进 template 循环。[Vue 列表规则](https://vuejs.org/guide/essentials/list.html#v-for-with-v-if)

### V57 写五个 Element 组件

**纠错。** 可答 el-alert、el-dialog、el-calendar、el-progress、el-switch。原文 calender/progrees 拼写错误；Alert 是警告提示，非模态弹窗。实际属性参阅对应版本文档，不把单词相似的组件名当真实 API。[Element Plus](https://element-plus.org/en-US/component/overview.html)

### V58 created 与 mounted 请求

**纠错。** Vue 2 created 已初始化响应状态且尚未挂载，可提前启动不依赖 DOM 的请求；mounted 可使用组件 DOM，但仍不代表图片和接口完成。Vue 3 可在 setup、路由 loader 或框架数据加载层按场景获取；SSR 与取消/竞态另行设计，不存在“请求一定只能 mounted”。

### V59 Proxy

**纠错。** 可拦截读取、写入、删除等对象操作，配合 Reflect 保留默认语义。Vue 2 并非“不能监听 object 的值变化”，主要限制是后添加/删除属性和部分数组索引/length 操作；Proxy 也不能感知绕过代理的原对象操作。[MDN Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

### V60 Vue 3 为什么更快

**纠错。** 编译器提供静态提升、补丁标记、动态节点跟踪等信息，缩小运行时工作；响应式与树摇优化也可降低成本。Vue 2 已有静态节点优化，原文“每次所有静态节点都重新创建”过度简化；实际收益取决于模板和更新场景。[Vue 渲染机制](https://vuejs.org/guide/extras/rendering-mechanism.html)

## React：避免沿用旧生命周期答案

### R01 fetch、Ajax、axios

**纠错。** Ajax 是技术方式，XHR/fetch 是浏览器 API，axios 是跨环境 HTTP 客户端库，可有不同 adapter，不永远等同封装 XHR。fetch 需要手动检查 HTTP 状态，axios 提供拦截器等抽象；选择依项目需求而非“新旧替代”。[Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)、[axios 文档](https://axios-http.com/docs/intro)

### R02 事件处理的 this

**回顾。** 类组件在构造器 bind 或使用箭头类字段，使处理器取得实例 this；render 中 bind/箭头会创建新引用，是否有性能影响需测量。函数组件没有实例 this，事件处理直接使用闭包。

### R03 对 React 的理解

**纠错。** 用组件和状态声明 UI，React 调度 render 计算、commit 更新宿主界面。render 可能多次执行或被丢弃，必须纯净；不是“props 改变就把全部 DOM 重建”，也不保证虚拟 DOM 总比直接操作更快。[React render/commit](https://react.dev/learn/render-and-commit)

### R04 组件通信

**更新。** props、回调、提升状态、Context、外部 store；兄弟组件可提升至共同祖先，不必引入 pubsub。Context 不等于状态库，订阅外部数据可用 useSyncExternalStore；事件总线需清理订阅。[React 共享状态](https://react.dev/learn/sharing-state-between-components)

### R05 Vue 与 React

**纠错。** 都支持组件、声明式 UI 和多种渲染方式，但不是默认实现了 Web Components 规范。Vue 常用模板和细粒度依赖收集，React 常用 JSX 与状态快照；两者组件 props 都向下流动，Vue v-model 是约定的值/事件组合。React 并非任意更新都重渲染全应用，可有状态局部化和记忆化；CSS 写法也不是必须内联。

### R06 虚拟 DOM 与 diff

**回顾。** 内存描述界面，比较更新前后描述并提交必要的宿主变更；类型、位置与 key 影响复用。不要把 render 次数等同实际 DOM 更新，也不承诺全局最少编辑距离。[React 状态与位置](https://react.dev/learn/preserving-and-resetting-state)

### R07 组件理解

**补答。** 封装输入、状态、事件和渲染逻辑的可组合单元。边界按职责和复用需求划分，提供清楚 props、保持 render 纯净，用 key 管理身份，不为拆得细而制造层层透传。

### R08 setState 后发生什么

**纠错。** 类组件 setState 入队，下一次更新计算 state（对象形式浅合并，函数形式根据前态计算），随后可能 render/commit；Hook setter 是替换值，不自动合并对象。当前处理器中的值仍是当前渲染快照，依旧值更新用函数式更新；React 18 createRoot 扩展自动批处理范围。[React 状态队列](https://react.dev/learn/queueing-a-series-of-state-updates)、[类 setState](https://react.dev/reference/react/Component#setstate)

### R09 生命周期

**更新。** 新组件优先函数与 Hook。维护类组件理解 constructor/render/componentDidMount/componentDidUpdate/componentWillUnmount 等；willMount/willReceiveProps/willUpdate 已属历史不安全方法，不能作为新代码模板。Effect 用于同步外部系统，需要清理，不能机械对应所有类生命周期。[React Component](https://react.dev/reference/react/Component)

### R10 虚拟 DOM 为什么提高性能

**纠错。** 虚拟 DOM 提供声明式计算与集中提交，减少无必要宿主修改的机会，但自身比较和分配也有成本。手写精准 DOM 更新可能更快；应测量交互与渲染瓶颈，不接受题干中“必然更快”的预设。

### R11 state 与 props

**回顾。** props 是父项传来的只读输入，state 是组件保存的状态快照；两者都不应原地修改。父组件能传入新 props；本组件通过 setter 请求新 state，派生数据能计算时不要重复存储。[React state 快照](https://react.dev/learn/state-as-a-snapshot)

### R12 shouldComponentUpdate

**纠错。** 类组件的性能提示，默认更新；PureComponent 浅比较 props/state。函数组件 memo 主要对 props 比较，但自身 state/Context 仍可更新；不是“无状态组件专用”，也不应靠它保证逻辑正确。不可变更新与实际 profiler 数据是前提。[React memo](https://react.dev/reference/react/memo)

### R13 diff 原理

**回顾。** 同位置同类型可保留状态，类型不同或 key 改变可能重建；稳定 key 帮助识别同级列表项目。不要把“跨层不比较”背成所有实现永远不变的内部规范；可观测身份规则见 R06。[React 位置与 key](https://react.dev/learn/preserving-and-resetting-state)

### R14 受控组件

**补答。** 表单 value/checked 由 React 状态提供，并通过 onChange 更新；非受控输入用 defaultValue/defaultChecked 与 ref 读取。不要在生命周期中从 undefined 突然切换为受控字符串；用户输入与异步状态需保持一致。[React input](https://react.dev/reference/react-dom/components/input)

### R15 super(props)

**纠错。** 派生类构造器必须先调用 super 才能使用 this；传 props 使父 Component 构造器初始化 this.props。它不是继承“父组件实例 this”，父类构造器和 UI 树里的父组件是两种概念。

### R16 构建组件方式

**更新。** 函数组件可使用 Hook 保存状态，并非“函数=无状态”。类组件仍受支持；返回值可为元素、Fragment、数组、字符串、null 等，并非必须一层 DOM 包裹。[React 组件](https://react.dev/learn/your-first-component)

### R17 Flux

**回顾。** action 描述发生的事，store 维护状态，view 订阅状态形成单向流；经典 Flux 的 dispatcher 是其架构角色。Redux 等方案借鉴该方向但 API 不同，不必为小组件引入完整架构。[Redux 基础概念](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)

### R18 项目脚手架

**更新。** 说明自己用过的工具及取舍；MERN 更常指 MongoDB/Express/React/Node 技术栈，不是 React 官方脚手架。新项目依渲染、路由和部署需求选择框架，或以 Vite 等构建工具搭建；不按旧文推荐安装历史 Yeoman/MERN 生成器。[React 创建应用](https://react.dev/learn/creating-a-react-app)

### R19 在哪里请求数据

**纠错。** 不在 render 发副作用；客户端可在 Effect 中请求并清理/防止旧响应覆盖，类组件可用 componentDidMount/Update。框架 loader、服务端数据获取或查询库能避免瀑布和重复请求。开发 Strict Mode 会额外执行设置/清理来检查问题，不能声称挂载逻辑绝对只跑一次。[React Effects](https://react.dev/learn/synchronizing-with-effects)

### R20 高阶组件

**回顾。** 接收组件并返回增强组件的函数，不修改原组件。需要转发 props、处理 ref/静态属性和展示名；在 render 内创建 HOC 会改变组件类型。共享有状态逻辑也可用自定义 Hook，按需求选择。[React 自定义 Hook](https://react.dev/learn/reusing-logic-with-custom-hooks)

## 微信小程序

本组旧文多数无答案。基础库和发布规则会更新，下面给稳定实现方向；不沿用固定包大小和静默读取资料的旧结论。微信开发文档本次无法直接抓取，双向绑定与头像昵称另有微信官方 GitHub 依据。

### M01 优势与限制

**纠错。** 依托宿主分发、免独立安装和原生能力桥接，适合轻量业务；也受宿主生命周期、包体、API、审核和跨平台差异限制。包体限额有主包/分包和平台版本规则，不能把 PDF 的“每个 App 都不能超过 2 MB”作为现行总量结论。[微信分包文档](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/basic.html)

### M02 页面四文件

**回顾。** WXML 模板、WXSS 样式、JS/TS 逻辑、JSON 配置是常见页面组织。全局另有 app 文件与页面注册，配置与样式可按需要省略，不能理解成任何页面缺一个文件就必然失败。[微信目录结构](https://developers.weixin.qq.com/miniprogram/dev/framework/structure.html)

### M03 生命周期

**纠错。** 页面主要 onLoad/onShow/onReady/onHide/onUnload；onPullDownRefresh/onReachBottom/onShareAppMessage 是页面事件处理，不全是生命周期。App 还有 onLaunch/onShow/onHide，组件有独立 lifetimes/pageLifetimes，名称大小写要正确。[页面定义](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html)

### M04 请求数据

**补答。** 使用 wx.request，配置 HTTPS 合法域名，处理网络 fail、HTTP statusCode 和业务码；success 不代表业务成功。返回的 RequestTask 可在页面退出时 abort；登录凭证由自己的后端签发和校验，不在前端放密钥。[wx.request](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)

### M05 缩短首屏时间

**更新。** 减主包、合理分包、早启动关键请求、缓存可复用数据、先显示可用骨架、减初始渲染节点与 setData 负载。区分冷/热启动与网络条件，以开发工具和真机数据定位，不把“加加载动画”当实际加载提速。[启动性能](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips/start.html)

### M06 常用组件

**回顾。** view/text/image/swiper/scroll-view/input/button/navigator 等按真实场景说明；图片 mode 和尺寸、长列表滚动、表单事件、按钮状态都比枚举名字有价值。内置组件的行为不等同同名 HTML 元素。[组件文档](https://developers.weixin.qq.com/miniprogram/dev/component/)

### M07 WXSS 与 CSS

**更新。** WXSS 提供 rpx、样式导入、全局/页面样式等；选择器与能力随渲染后端/基础库演进，不能断言永远只支持少数选择器。自定义组件还有样式隔离配置，移植 Web CSS 需验证。[WXSS](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)

### M08 响应式适配

**补答。** rpx 按视口宽度比例换算，并非状态响应式。搭配百分比、Flex/Grid（依环境支持）、安全区与横竖屏尺寸变化处理；不要按比例无限放大平板布局。若题目问数据响应，需回答 setData 或框架层机制。[WXSS](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)

### M09 小程序优化

**补答。** 启动/下载见 M05；运行时只 setData 视图需要的变更路径，避免大对象和高频无差别同步，长列表分页/虚拟化，隐藏页面停止无用计时，图片按需请求。性能优化须说明指标、设备、前后结果，原文“自主获知自己的服务器”不是可执行方案。[运行时性能](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips/runtime.html)

### M10 头像与昵称

**纠错。** 不能承诺通过 open-data 或 getUserInfo 静默获得真实个人资料。使用用户主动选择头像、填写昵称的能力，选择得到的临时图片需上传到受控后端再持久化；登录身份与资料填写分离。微信官方头像组件库已经归档，核对其示例可以理解原理，新增业务直接按平台组件实现。[微信官方头像昵称项目](https://github.com/wechat-miniprogram/mp-user-avatar)

```xml
<button open-type="chooseAvatar" bindchooseavatar="onChooseAvatar">选择头像</button>
<input type="nickname" placeholder="填写昵称" bindinput="onNicknameInput" />
```

### M11 与 Vue 双向绑定异同

**纠错。** 传统 setData 驱动视图，表单事件可回写；小程序还提供 `model:` 简易双向绑定，不能说绝无双向能力。Vue v-model 也建立在值和更新事件之上，但响应式、组件更新和运行架构不同。[微信官方 glass-easel 模板文档](https://github.com/wechat-miniprogram/glass-easel/blob/master/glass-easel/guide/zh_CN/basic/template.md)

### M12 小程序传参

**补答。** 页面导航 URL query 传小型、可编码参数，目标 onLoad 接收并校验；复杂临时数据可通过 eventChannel，跨页共享数据用清楚的状态层或 storage。不要把敏感值放 URL，也不要依靠页面栈对象进行隐式强耦合。

### M13 与 Vue 类比

**补答。** WXML 类似声明模板，data/setData 类似状态与视图更新，组件 property/event 类似 props/emit；但不是浏览器 DOM，路由、样式、通信桥、生命周期由宿主管理，不能直接操作 document 或假设 Vue API 原生存在。

### M14 适配问题

**补答。** 验证窄屏/平板、横竖屏、字体放大、安全区、键盘顶起、不同系统与基础库；使用 rpx 处理适合比例的尺寸，内容宽度设上限，底部按钮避让安全区。M17 是重复题，同用此解析。

### M15 页面间数据传递

**补答。** URL query（少量可序列化）、eventChannel（页面间事件）、应用状态（会话内共享）、storage（持久化）、后端（跨设备权威数据）。明确数据生命周期与来源，避免把 storage 当任意临时变量箱。[wx.navigateTo](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html)

### M16 请求封装

**补答。** 封装 baseURL、鉴权、超时和统一错误类型，保留 HTTP/业务错误与网络错误区别；把返回值转 Promise，同时提供 abort 句柄。只对幂等读取做有上限的重试，页面层决定提示与 loading，避免每个底层请求都弹窗。[wx.request](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)

### M17 适配问题（重复）

**补答。** 参见 M14，保留原题号。给出真实设备复现与修复例子，不能只答“全部用 rpx”。

### M18 页面跳转

**补答。** navigateTo 保留当前页，redirectTo 替换当前页，navigateBack 返回，switchTab 切到 tabBar 页面，reLaunch 重建页面栈。按场景选择，不假定所有接口可跳到任意页面类型。[路由 API](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html)

### M19 跳转其它小程序

**补答。** wx.navigateToMiniProgram 指定 appId/path/extraData，并处理失败与环境差异；是否允许跳转、所需交互和资格按当前平台规则检查，不由前端绕过限制。[官方 API](https://developers.weixin.qq.com/miniprogram/dev/api/navigate/wx.navigateToMiniProgram.html)

### M20 加载过慢

**补答。** 先区分代码包下载、逻辑初始化、数据请求、渲染/图片，再采用 M05/M09 对应措施。不要从“用户等待”直接推断为服务器慢，更不能只加 loading 宣称优化完成。

## 其他高频与工程

### E01 TypeScript 是什么

**补答。** 为 JavaScript 加静态类型检查与类型工具，通常编译/擦除成 JS 执行。接口、类型别名、泛型等帮助表达契约，不把运行时外部数据自动变成可信类型。[TS 手册](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

### E02 相对 JavaScript 的优势

**补答。** 编译前发现部分类型错误、提供补全与重构信息、表达模块边界。代价是类型建模和构建配置；any 和类型断言会绕过检查，API 入参仍需运行时验证，不能保证零 bug。

### E03 webpack 与 gulp

**回顾。** webpack 从模块依赖图产出 bundles/chunks；gulp 是通用任务编排与流处理，可执行复制、编译、清理等。两者可协作，不能只以“一个处理 JS、一个处理 CSS”区分。[webpack 概念](https://webpack.js.org/concepts/)、[gulp 概念](https://gulpjs.com/docs/en/getting-started/quick-start/)

### E04 loader 与 plugin

**纠错。** loader 转换模块源码，常规链从右向左；plugin 通过生命周期钩子影响编译、资源输出等更广流程。webpack 并不内置 babel-loader，也不是永远只认识 JS；现代版本可处理 JSON/资源模块等，按版本和实验能力核对。[webpack loaders](https://webpack.js.org/concepts/loaders/)、[插件](https://webpack.js.org/concepts/plugins/)

### E05 性能优化

**补答。** 测量→定位→小步修改→对比回归。按关键渲染、传输、缓存、主线程和稳定性分别处理，答案应有同条件数据而非罗列术语，详见 [H31](./html-browser.md#h31-web-性能优化)。

### E06 Node 用于什么

**补答。** 服务器 JS 运行时，可做 API/BFF、CLI、构建工具和脚本。事件循环适合大量异步 I/O，但 CPU 密集任务会阻塞当前线程，可考虑 worker_threads 或独立服务；Node 不是一个前端框架。[Node 简介](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)

### E07 webpack 打包原理

**补答。** 读取配置/入口，解析依赖，对模块应用 loader，构建模块与 chunk 图，执行优化并生成运行时与资源；plugin 通过钩子参与多个阶段。动态 import 可形成异步 chunk，不能说所有文件最终只能变成 JS。[webpack 依赖图](https://webpack.js.org/concepts/dependency-graph/)

### E08 CommonJS 与 ESM

**纠错。** CJS require 返回模块的 exports 值，模块对象可共享，不是“所有数据必然深拷贝”；对其对象属性修改可被其它引用看到。ESM import 是导出绑定的只读视图，绑定可随导出方变化，导出的对象本身仍可变。ESM 有静态结构与异步加载能力，具体互操作依运行时版本，不绝对背 require 永远不能加载 ESM。[Node CJS](https://nodejs.org/api/modules.html)、[Node ESM](https://nodejs.org/api/esm.html)

### E09 Git 常用命令

**补答。** clone、status、diff、switch、add、commit、fetch、log、merge/rebase、push。pull 涉及获取和整合，不是无条件“同步”；冲突先理解两侧意图并验证。提交前查看 diff，敏感信息不入库，别把 reset --hard 作为常规撤销答案。[Git 官方手册](https://git-scm.com/docs)

### E10 后端技术栈

**补答。** 经验题，填真实语言/框架、数据库、认证方式、API 契约以及自己协作的部分；不清楚基础设施可坦诚限定已知信息，不能替团队编造 Java/Spring 等经历。可以解释项目如何消费接口与处理失败。

### E11 小项目为什么用 Vue 全家桶

**补答。** 从页面数量、共享状态、导航复杂度、团队熟悉度和交付维护成本说明取舍；没有跨路由状态时可不加 store，没有客户端导航时可不加 Router。若历史选型过重，说明可简化位置，不用“流行所以全装”作理由。

### E12 使用过的 UI 框架

**补答。** 真实说明版本、组件、主题、按需引入、可访问性、国际化和定制成本。可讨论 Element/Vant 的场景差异，但不要把此题答成无依据的“哪个性能最好”，更不能编造使用经验。

### E13 CORS

**补答。** 服务器通过响应头授权跨源读取；某些请求先预检，服务端检查来源/方法/头。带凭证时允许来源不能简单用通配符，且 Cookie 仍受 SameSite/浏览器策略约束。CORS 不代替鉴权，也不阻止所有跨源发送。[MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)

### E14 WebSocket

**纠错。** 持久双向通信，浏览器和服务器可主动发送消息；安全连接用 wss。传统握手基于 HTTP Upgrade，新协议扩展另有规则，不能说等同 TCP 握手。需要认证、断线重连、心跳、限流和队列处理，经典 WebSocket API 不提供自动背压。[MDN WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### E15 后端传什么数据

**补答。** 常见 JSON，也有二进制文件、流、HTML 等；由接口契约定义字段、可空、分页、错误、日期与精度。大整数 ID 可作为字符串传递避免 JS Number 精度损失；前端验证结构，显示时不要直接信任外部 HTML。

### E16 Ajax/fetch/axios

**纠错。** 同 R01，保留原题号。可补充取消、超时、凭证、错误处理和上传进度需求后再选择 API；Promise 语法本身不区分服务端业务成功。

## 企业项目流程

### P01 Web 前端项目开发流程

**纠错。** 澄清需求与验收标准→风险/方案/接口契约→任务拆分→实现及代码审查→自动/手工验证→受控发布→监控回滚与迭代。产品、设计、前后端、测试共同参与，不是只有测试人员负责质量、只有设计师决定技术；测试环境到生产用配置切换，不手工全局替换域名。

### P02 大小公司开发差异

**纠错。** 人数不决定一定瀑布或敏捷，也不能说大公司交付后不维护。比较约束、责任划分、审批发布、可观测性与沟通成本，用自己的实际经历说明，并避免将地域/公司规模刻板印象当事实。

### P02a 正文附题：前后端分离怎么测试

**补答。** 单元测试纯逻辑，组件测试输入输出，接口契约/Schema 测试字段与错误；开发阶段 mock 可控边界，联调接真实服务；端到端覆盖登录、权限和关键交易，再验证网络失败、重复请求、分页和过期凭证。mock 不能替代真实集成，生产 smoke 验证配合监控。测试环境与脱敏数据独立管理。

## 开放题：用事实作答

### O01 后端开发用什么

**补答。** 同 E10，说明实际技术、接口职责、自己掌握的边界；学习项目可明确称练习项目。无法获知的细节不猜测。

### O02 移动端怎么刷新

**补答。** 先确认是 Web 整页重载、数据重新获取，还是小程序下拉刷新。Web 可 location.reload()，但普通列表刷新通常只重取数据；小程序处理下拉事件并停止刷新状态。保留滚动/输入与避免重复提交是需要说明的业务边界。

### O03 项目初始化构建流程

**补答。** 确定运行版本与包管理器，初始化仓库/模板，配置路由、样式、类型/lint、必要测试与环境配置，锁依赖、建立 CI 和可复现构建，再完善 README。按需求添加工具，不一次装满所有库。

### O04 最骄傲的项目部分

**补答。** 用背景与目标→自己负责的约束→方案比较→实现→验证数据→复盘组织。示例结构是“某页面某指标从 A 到 B，在相同设备网络测量”，A/B 必须由真实记录填入，不编造结果或把团队全部成果说成个人完成。

### O05 自己的缺点

**补答。** 选择真实、与工作相关且可改进的问题，给具体影响、已采取行动和后续验证；不要套“太追求完美”的空话，也不透露他人隐私。

### O06 热部署是什么

**补答。** 区分开发 HMR（替换模块、尽量保留状态）、整页 live reload、服务端热重载和生产滚动发布。HMR 不能等于生产无中断部署；说明自己实际使用的机制与失败时回退。[webpack HMR](https://webpack.js.org/concepts/hot-module-replacement/)

### O07 用户有多少

**补答。** 只报有权限获得的真实数据，明确注册量、DAU、MAU、峰值并发和时间窗口的区别；无统计时说明暂无数据，讲清准备如何埋点衡量，不捏造“大规模用户”。

### O08 调接口与后端沟通

**补答。** 先确定方法、URL、认证、请求/响应 schema、错误码、分页和幂等；用接口文档与 mock 并行开发，联调保留 requestId 和最小复现，变更时维护兼容与契约。不是只问后端“接口好了没”。

### O09 单元测试

**补答。** 原文“单元格测试”应理解为单元测试（若面试指表格单元格则先澄清）。针对独立行为，用输入/执行/断言验证正常、边界、失败；时间与网络可控制，避免测试复制实现。组件和 E2E 的职责见 P02a，覆盖率不是唯一质量指标。[Node 测试运行器](https://nodejs.org/api/test.html)

### O10 多环境变量

**补答。** 区分构建时注入和运行时配置，环境文件按工具约定管理，CI 明确环境并校验必须项。前端产物里的任何配置都可被用户读取，不能放数据库密码或服务端密钥；不同环境 API、日志/开关集中配置，避免源码手动替换。真正的密钥只在服务端或受保护的 CI 环境使用。[Vite 环境变量安全边界](https://vite.dev/guide/env-and-mode.html)
