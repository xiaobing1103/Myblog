---
title: 蚂蚁前端面经｜21 题逐题解析
sidebar_label: 蚂蚁 · 移动端与项目
description: React 更新、离线包、JSBridge、WebView、监控与工程题，补全大数加法和受限 HTML 解析器。
---

[完整原文](./sources/ant.md) · [回到题库](./index.mdx)

原文件只有问题，没有参考答案。这里按三轮原题顺序补答；项目经历类给出准备方法，请用自己的事实填写。

## 一面 1. setState 后怎么获取新值？异步中一定立即更新吗？

**先纠正题目前提**：React 18 使用 `createRoot` 后，Promise、定时器和原生事件中的更新也可以自动批处理；不能一概说“异步里同步更新”。旧版 legacy root 的表现不同。

类组件可用 `this.setState(updater, callback)`，在回调中读取提交后的状态；函数组件在对应 Effect 中观察已提交状态，依赖前值时写 `setCount(c => c + 1)`。当前 render 的闭包仍读到当前快照。不要 `await setState()`，它不是等待提交的 Promise。`flushSync` 只用于确有必要与外部同步接口协调的场景。

参考：[React 更新队列](https://react.dev/learn/queueing-a-series-of-state-updates)、[React 18 升级说明](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)。

## 一面 2. H5 离线包原理，客户端如何拦截？

构建产出资源包和版本清单，客户端下载、校验完整性与签名，原子切换到可用版本。WebView 请求命中约定的 URL、host、路径与版本时，由客户端返回本地对应内容，未命中走网络。Android 可通过资源请求回调处理；iOS 的可拦截范围受具体 API 和 scheme 限制，不能假设任意 HTTPS 都能用同一方式拦截。

要交代 MIME、缓存、版本回滚、包更新与 API 的兼容边界；不要把接口响应、用户凭据或个性化页面无差别打包。Service Worker 是浏览器侧方案，能否用于目标 WebView 需要验证。

## 一面 3. JSBridge 原理与取舍

JS 与原生约定消息协议，包含方法、参数、requestId、成功和错误结果；用原生注入接口、消息通道或特定 scheme 传递。原生执行后按 requestId 回调，JS 侧可包装为 Promise，设置超时并清理回调。

消息接口便于统一协议和异步响应，需维护序列化、生命周期和权限；scheme 方案容易遇到 URL 长度、编码和导航冲突。核心成本在协议版本与两端发布协同，不能只说“互相调用函数”。

## 一面 4. 怎么判断 WebView 加载完成？

区分导航结束、DOM 就绪、资源加载、业务可用和首屏可见。`DOMContentLoaded`、`load`、原生导航回调分别覆盖不同阶段；SPA 后续请求和懒加载不在同一完成时刻。约定页面完成必要数据与关键渲染后发送带 navigationId 的 ready 消息，原生设置失败超时与重试，防止上一次导航的消息误用。性能体验可另采集 LCP 等指标。

## 一面 5. App 头部与背景渐变

若头部和页面都在 Web：用共同背景层贯穿导航与首屏，内容层保持透明，通过 CSS 渐变和安全区内边距处理刘海区域。若头部为原生：约定相同色值、透明度、渐变坐标和滚动进度，JS 通过桥发送节流后的进度，原生更新头部；同时处理状态栏文字颜色、暗色模式和滚动回弹。必须确认两端坐标和安全区，不能只贴一条 gradient。

## 一面 6. 有意义的 PC 项目

按“用户与痛点 → 约束 → 自己的职责 → 方案与备选 → 验证结果”组织。比如管理台复杂表格，应说明数据规模、交互频率、虚拟滚动是否必要、权限与错误处理，再给上线前后的可验证指标。不要用别人项目或虚构提升百分比。

## 一面 7. 微前端通信与方案

独立业务尽量只共享少量稳定契约：URL 表达导航状态，主应用下发身份与配置，事件总线传递跨域业务事件；iframe 可用 `postMessage` 并检查精确 origin 和消息结构。共享 store 耦合更高，要定义订阅清理与版本兼容。按隔离、独立部署、技术栈、样式与运行时成本比较 iframe、模块联邦或微前端框架；路由和依赖也要有明确边界。

## 二面 1. Jenkins 部署流程

提交触发 pipeline：检出固定提交 → 安装锁定依赖 → lint / 测试 → 构建一次 → 保存带版本制品 → 测试环境验收 → 发布 → 冒烟与监控 → 必要时回滚。密钥由凭据系统注入，制品可追踪到 commit。静态站先上传哈希资源，再切 HTML，避免 HTML 引用未到位分块；入口不长期缓存，旧资源保留一段时间供旧会话使用。

参考：[Jenkins Pipeline](https://www.jenkins.io/doc/book/pipeline/)。

## 二面 2. JSBridge 有哪些安全问题？

不可信页面、iframe 或 XSS 可能获得原生能力。只向可信 HTTPS 内容开放最小接口，校验导航目标、参数类型与权限，在原生侧重新做鉴权，拒绝任意代码、文件路径和通用执行接口。消息通道不能使用宽泛 origin；页面离开信任范围要撤销接口。Android 的 `addJavascriptInterface` 会暴露给 WebView 内的所有 frame，不能单凭方法被调用就信任来源。

参考：[Android 原生桥风险说明](https://developer.android.com/privacy-and-security/risks/insecure-webview-native-bridges)。

## 二面 3. WAF 与前端安全实践

WAF 在 HTTP 流量入口按规则检测、阻断和限流常见攻击请求，可能误报或漏报，不能替代应用鉴权和输入输出处理。前端配合上下文转义、可信 HTML 清洗、CSP、依赖治理；后端做参数化查询、对象级授权、CSRF 防护与安全 Cookie。介绍做过的规则或整改时，要给检测依据与验证结果。

## 二面 4. 埋点与性能上报

先定义事件 schema、业务口径和版本，再采集页面、操作、错误和性能。携带匿名关联标识、发布版本与时间，做采样、去重、限流、脱敏，避免上报密码、token 和原始个人数据。性能关注真实用户的 LCP、INP、CLS，并按设备和网络分布分析；批量上报设置容量上限和失败退避，统计平台确认到达率。

参考：[Web Vitals](https://web.dev/articles/vitals)。

## 二面 5. 第三方上报脚本加载失败，怎么继续上报？

在应用入口内置极小的独立降级逻辑，不依赖那份脚本；给脚本的 error、加载超时和初始化失败各设置一次记录。发送到自有同源收集端点，使用 `sendBeacon`，无法入队时可 `fetch(..., {keepalive:true})`，必要时暂存有上限的小队列。`sendBeacon` 返回 true 仅表示浏览器接受排队，不代表服务端收到；离线、拦截器和网络错误仍可能丢失。降级自身失败不要递归上报。

```js
function reportLoaderFailure(reason) {
  const body = JSON.stringify({type: 'sdk-load-failed', reason, time: Date.now()});
  const url = '/telemetry'; // 需要真实服务端接收接口
  try {
    if (navigator.sendBeacon?.(url, new Blob([body], {type: 'application/json'}))) return;
  } catch {}
  fetch(url, {method: 'POST', body, keepalive: true,
    headers: {'Content-Type': 'application/json'}}).catch(() => {});
}
```

参考：[MDN sendBeacon](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon)。

## 二面 6. 两个大数相加

限定为**非负十进制整数字符串**，从低位相加并维护进位，结果保留为字符串。时间 O(n+m)，额外空间 O(n+m)，不先转 Number。

```js
function addDecimal(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || !/^\d+$/.test(a) || !/^\d+$/.test(b)) {
    throw new TypeError('请输入非负十进制整数字符串');
  }
  const digits = [];
  let i = a.length - 1, j = b.length - 1, carry = 0;
  while (i >= 0 || j >= 0 || carry) {
    const sum = (i >= 0 ? a.charCodeAt(i--) - 48 : 0)
      + (j >= 0 ? b.charCodeAt(j--) - 48 : 0) + carry;
    digits.push(String(sum % 10));
    carry = Math.floor(sum / 10);
  }
  return digits.reverse().join('').replace(/^0+(?=\d)/, '');
}
console.log(addDecimal('999999999999999999', '1')); // 1000000000000000000
```

如果题目允许负号或小数，需要再设计符号、绝对值比较、减法和小数对齐，不能把这份代码称为任意数字加法。

## 二面 7. 不用 DOM API，把字符串转虚拟 DOM

先约定语法。下面演示**受限的 XML 风格标签片段**：大小写敏感，标签必须闭合或自闭合，属性只支持双引号，无注释、实体、doctype、script/style 或 HTML 自动纠错。用扫描器加栈匹配嵌套，输出普通对象，不渲染到网页。完整 HTML 需要遵守 WHATWG 分词与树构建规则，应使用成熟解析器，不能用一条正则替代。

```js
function parseFragment(source) {
  const root = {tag: '#fragment', children: []};
  const stack = [root];
  let i = 0;
  const append = node => stack[stack.length - 1].children.push(node);
  while (i < source.length) {
    if (source[i] !== '<') {
      const end = source.indexOf('<', i);
      const text = source.slice(i, end < 0 ? source.length : end);
      if (text.includes('&')) throw new SyntaxError('示例不支持实体');
      append({text});
      i += text.length;
      continue;
    }
    const close = /^<\/([A-Za-z][\w-]*)\s*>/.exec(source.slice(i));
    if (close) {
      if (stack.length === 1 || stack[stack.length - 1].tag !== close[1]) {
        throw new SyntaxError('结束标签不匹配');
      }
      stack.pop(); i += close[0].length; continue;
    }
    const open = /^<([A-Za-z][\w-]*)/.exec(source.slice(i));
    if (!open || /^(script|style)$/i.test(open[1])) throw new SyntaxError('不支持的标签');
    const node = {tag: open[1], props: Object.create(null), children: []};
    i += open[0].length;
    while (true) {
      const end = /^\s*(\/?>)/.exec(source.slice(i));
      if (end) {
        i += end[0].length; append(node);
        if (end[1] === '>') stack.push(node);
        break;
      }
      const attr = /^\s+([A-Za-z_:][\w:.-]*)\s*=\s*"([^"<&]*)"/.exec(source.slice(i));
      if (!attr || Object.hasOwn(node.props, attr[1])) throw new SyntaxError('非法或重复属性');
      node.props[attr[1]] = attr[2]; i += attr[0].length;
    }
  }
  if (stack.length !== 1) throw new SyntaxError('标签未闭合');
  return root;
}
console.log(JSON.stringify(parseFragment('<div id="a"><b>你好</b><img/></div>')));
```

这是理解解析过程的教学代码，不是 HTML 清洗器，也不对输出内容做安全承诺。大输入还需要深度、长度与资源限制。

参考：[WHATWG HTML 解析](https://html.spec.whatwg.org/multipage/parsing.html)。

## 二面 8. 困难项目

用 STAR：场景和限制、承担的任务、具体决策与调试证据、最终结果。重点讲“为什么原方案失败”“如何缩小问题范围”“如何证明改动有效”“还能改进什么”，少用没有证据的“大流量”“高并发”。

## 三面 1. 管理系统业务和提效工具

先画清业务实体、角色权限、状态流转与异常路径，再说工具：类型化接口生成、表单 schema、组件库、脚手架、CI、可观测性。解释减少了哪类重复工作，维护成本和适用范围是什么，用工时、缺陷或交付周期记录验证。

## 三面 2. 常用组件解决了什么？

选一个真实组件说清输入输出、受控状态、键盘与读屏、加载/空/错误态、扩展点和测试。表格可讨论分页、筛选、虚拟滚动、行标识与大数据量；不要只列组件库名称。

## 三面 3. Node 平时用来做什么？

常见于构建脚本、BFF、SSR、文件处理与自动化。说明异步 I/O、请求校验、超时、日志和部署；CPU 密集工作用 worker 或独立服务，不能以“单线程”推断只能处理一个请求。不要把自己仅写过脚本包装成生产服务经验。

参考：[Node 事件循环](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)。

## 三面 4. SSR 原理

服务器匹配路由、获取数据并生成 HTML，浏览器先显示内容，再加载客户端代码并 hydration，接管事件与后续状态。初始数据和组件树需一致，避免时间、随机数和环境分支造成不匹配；请求间状态隔离，序列化数据要防注入。SSR 可能改善内容可见时间和抓取，但增加服务端成本，交互还依赖脚本，必须测量。

参考：[React hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)。

## 三面 5. 技术难点

用具体问题代替“用了什么技术”：例如重复借阅如何通过事务保证库存、慢页面如何从 trace 定位长任务。给失败尝试、定位过程、边界测试和回归结果；可直接用本站 [项目实战](../java/projects/library/index.mdx) 的真实操作积累案例。

## 三面 6. 和 Lazada 比较，为什么更好？

不猜竞争者内部架构。先声明产品、地区、设备、网络和时间范围，再从可观察的任务完成率、页面速度、可访问性、错误率或功能体验比较；无数据时说“这是待验证假设”，给实验设计。商业指标也可能由市场、物流、价格决定，不能全部归因为前端技术。
