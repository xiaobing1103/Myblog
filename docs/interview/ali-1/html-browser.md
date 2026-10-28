---
title: 阿里第一期：HTML 与浏览器 69 题解析
sidebar_label: HTML 与浏览器（69题）
sidebar_position: 2
toc_max_heading_level: 2
---

对应[完整原文](../sources/ali-1.md)第 5—26 页。题号与原文一致；答案针对当前 Web 平台，旧环境单独说明。

## 1.1 DOCTYPE 的作用

原文第 5 页。现代 HTML 使用 `<!doctype html>` 让浏览器进入无怪异模式。它是历史兼容开关，不是 HTML 版本下载指令，也不会开启 JavaScript 严格模式；可以用 `document.compatMode` 区分 `CSS1Compat` 与 `BackCompat`，但这个属性不能细分所有渲染模式。[HTML 标准：DOCTYPE](https://html.spec.whatwg.org/multipage/syntax.html#the-doctype)。

## 1.2 标准模式与兼容模式

原文第 5 页。**纠错：**浏览器有无怪异、有限怪异、怪异模式，主要影响历史布局行为，例如盒尺寸和表格单元格中的图片基线；不是“兼容模式使用旧版 JS 引擎”。DOCTYPE 切换也不同于浏览器的 IE 模式。[MDN：怪异模式](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Quirks_mode_and_standards_mode)。

## 1.3 为什么不再引用 DTD

原文第 5—6 页。HTML 的现行语法和解析算法由 HTML Living Standard 定义，不按 SGML 的 DTD 解析。`<!doctype html>` 足以触发正确模式；浏览器不会为普通 HTML 页面下载外部 DTD 来校验 DOM。参见 1.1 的标准。

## 1.4 SGML、HTML、XML、XHTML

原文第 6 页。**纠错：**SGML 是定义标记语言的元语言，历史 HTML 4 以它定义；XML 是受限且可扩展的标记语法；现代 HTML 有自己的错误恢复规则。XHTML 是 HTML 的 XML 序列化，按 XML MIME 类型传输时适用严格 XML 解析，不能只凭小写、自闭合外观判断。不能说“XML 是未来网页语言”或“现在网页基本都用 XHTML”。[HTML 与 XML 语法](https://html.spec.whatwg.org/multipage/xhtml.html)。

## 1.5 DTD 是什么

原文第 6 页。DTD 描述文档允许的元素、属性与结构，是历史 SGML/XML 校验体系的一部分。**纠错：**普通 HTML 浏览器依据内置 HTML 解析算法生成 DOM，并不靠逐页读取 DTD 检查合法性；DOCTYPE 中的历史字符串可能影响渲染模式，这与 DTD 校验是两回事。参见 1.3。

## 1.6 行内元素

原文第 6 页。默认 `display:inline` 的非替换元素参与行内排版，可能跨多个行框。它不是“永远只有内容宽度”的静态类别；`img` 等替换元素有固有尺寸，与 `span` 的宽高规则不同。HTML 内容模型和 CSS `display` 必须分开回答。[MDN：display](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display)。

## 1.7 块级元素

原文第 6 页。块级盒在普通块布局中通常另起一行，`width:auto` 会分配可用行内空间。它不保证始终占满父元素：显式宽度、浮动、绝对定位、Flex/Grid 布局都会改变规则。常见默认块级元素有 `div`、`p`、标题和列表容器。

## 1.8 行内与块级的区别

原文第 6 页。非替换行内盒的 `width/height` 不按普通块盒生效，垂直 margin 不改变行框布局，但 padding 和 border 会绘制，可能覆盖相邻行。**纠错：**能否嵌套由 HTML 内容模型决定，不能简单说“块内可放所有块、行内不能放块”；例如 `p` 不能包含 `div`，而 `a` 的透明内容模型允许某些流内容。[HTML 内容模型](https://html.spec.whatwg.org/multipage/dom.html#content-models)。

## 1.9 HTML 内容分类

原文第 6—7 页。常见类别有元数据、流内容、分节、标题、短语、嵌入、交互内容，同一元素可同时属于多类。分类用于约束文档结构，不是七个互斥的 CSS 布局盒；`display` 改变外观不会解除嵌套约束。参见 1.8 的标准。

## 1.10 空元素

原文第 7 页。HTML void elements 如 `img`、`input`、`br`、`meta` 不允许子内容和结束标签。**纠错：**不是“标签中暂时没有内容的元素”，空 `div` 仍需要正确闭合；HTML 的 `<img />` 尾斜杠不会把任意元素变为 XML 式自闭合元素。[HTML 空元素](https://html.spec.whatwg.org/multipage/syntax.html#void-elements)。

## 1.11 link 元素

原文第 7 页。`link` 声明与外部资源的关系，例如样式表、图标、预加载、规范 URL。通常放在 `head`；**纠错：**是否可以出现在 `body` 取决于链接类型的 body-ok 规则，不能断言永远只能在 `head`。[MDN：link 的使用规则](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link)。

## 1.12 link 与 CSS @import

原文第 7 页。`link` 可被 HTML 预加载扫描器较早发现；`@import` 要在发现并解析所属 CSS 后发现，可能拉长依赖链。**纠错：**它不必等整个页面加载完成，现代 CSSOM 也可操作样式规则；不能把差异概括为“link 能用 JS，import 不能”。运行时优先用清晰的 `link`，构建时可合并依赖。[MDN：@import](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@import)。

## 1.13 浏览器做什么

原文第 7—8 页。浏览器负责导航、网络、安全隔离、解析文档、执行脚本、排版绘制、交互和存储。回答可用“输入 URL → 请求响应 → 解析渲染 → 响应交互”串联。HTML 标准由 WHATWG 维护，不能把所有 Web 规范都归为同一组织。

## 1.14 浏览器内核

原文第 8 页。“内核”是非严格统称。应具体区分渲染引擎、JS 引擎和浏览器进程架构；例如 Blink 与 V8 职责不同。PDF 展示也可以用浏览器内置组件或 PDF.js，不需要把它理解为传统浏览器插件。[Chrome：现代浏览器架构](https://developer.chrome.com/blog/inside-browser-part1)。

## 1.15 不同引擎怎么比较

原文第 8 页。**历史纠错：**Trident、Presto 的描述用于旧浏览器；不能沿用“某内核永远快三倍”“某内核一定更耗内存”等无基准的结论。比较应固定版本、平台、页面、冷暖缓存和指标，分别测兼容性、速度、内存与能耗。

## 1.16 常见浏览器引擎

原文第 8—9 页。桌面常见组合为 Chrome/Chromium 与 Edge 的 Blink、Firefox 的 Gecko、Safari 的 WebKit。品牌名不能推出所有平台与版本的引擎，套壳浏览器还可能有不同运行模式。原文中的国内浏览器清单是历史快照；实际项目看目标设备与功能检测，不背停更产品清单。[Chromium：Blink](https://www.chromium.org/blink/)、[WebKit 项目](https://webkit.org/)。

## 1.17 浏览器如何渲染

原文第 9 页。常用模型是解析 HTML/样式 → 样式计算 → 布局 → 绘制 → 栅格化与合成，执行时可增量推进。DOM 与布局盒不是一一对应。`display:none` 不生成布局盒，`visibility:hidden` 仍参与布局，不能将所有“肉眼不可见”的节点一概排除。[web.dev：渲染性能](https://web.dev/articles/rendering-performance)。

## 1.18 解析时遇到 JS

原文第 9 页。解析器插入的普通经典脚本通常会暂停 HTML 解析，外部脚本还要等待下载。`defer`、`async`、模块脚本和动态插入脚本有不同调度规则。不能说“任何 JS 下载都阻塞 DOM”；脚本执行的长任务也会影响交互和绘制。[MDN：script](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script)。

## 1.19 async、defer、module

原文第 9—10 页。经典外部 `defer` 并行下载，解析完后按文档顺序执行，DOMContentLoaded 会等它；`async` 下载完成即可执行，不保证顺序。`type="module"` 默认延后执行，处理其依赖图；加 `async` 则改变调度。内联经典脚本的 `defer` 不生效。参见 1.18。

## 1.20 预解析与预加载扫描

原文第 10 页。浏览器可以扫描尚未正式解析的 HTML，尽早发现图片、样式和脚本请求；不会代替主解析器构建 DOM，也不等于执行 JS。由 JS 动态计算出的 URL 不一定能提前发现；关键资源可按实际需要使用 `preload`，避免预载未使用文件。[web.dev：预加载扫描器](https://web.dev/articles/preload-scanner)。

## 1.21 CSS 如何阻塞

原文第 10 页。匹配当前媒体的常规样式表通常阻塞首次渲染；它不直接让 HTML 解析器普遍暂停。但普通经典脚本可能等待前面未完成的样式表，脚本又阻塞解析，形成间接阻塞。不是只有脚本显式读取样式才等待。[MDN：DOMContentLoaded 与样式表](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event)。

## 1.22 白屏、闪烁和布局偏移

原文第 10 页。FOUC 是未应用预期样式的内容先显示；白屏可能由网络、阻塞资源、JS 异常或服务端无有效内容造成。不能固定归因于 Firefox 或 Chrome 的单一“渲染机制”。用 Network、Console、Performance 和截图定位，还需区分字体闪烁和图片引发的布局偏移。

## 1.23 优化关键渲染路径

原文第 10—11 页。减少首屏关键字节和依赖深度，提前发现主图/字体，缩小阻塞 CSS，延迟非关键脚本。首屏主图不应盲目懒加载；给所有资源加 `preload` 会竞争带宽。以真实用户 LCP、INP、CLS 和实验室追踪验证收益。[web.dev：关键路径](https://web.dev/articles/critical-rendering-path)。

## 1.24 重绘与回流

原文第 11 页。布局计算几何信息，绘制生成视觉内容，合成组装图层。**纠错：**读 `offsetWidth` 只有在相关样式/布局已失效时才可能强制同步布局；设置任意 style 也不必然回流。`transform`/`opacity` 在满足条件时可走合成，但不保证“完全没有成本”。[web.dev：避免布局抖动](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing)。

## 1.25 如何减少回流

原文第 11 页。先批量读取尺寸，再批量写样式，避免读写交错；缩小受影响区域，减少超大 DOM，必要时虚拟列表。`DocumentFragment` 适合组织插入，不承诺永远更快；表格有语义用途，不应为了口号移除。参考 1.24，先定位热区再优化。

## 1.26 DOM 为什么可能慢

原文第 12 页。开销可能来自节点量、样式失效、同步布局、事件处理、绘制面积和垃圾回收，不是“所有 DOM API 都很慢”。缓存查询结果只解决一部分问题。用 Performance 观察长任务与 Layout/Paint，再减少具体瓶颈。

## 1.27 DOMContentLoaded 与 load

原文第 12 页。DOMContentLoaded 等 HTML 解析及延后的脚本，不等图片、子框架和 async 脚本；样式表可通过延后脚本间接影响它。`load` 等通常会影响加载完成的依赖，但懒加载资源等并非一律等待。初始化 DOM 通常无需等 `load`。参见 1.21 的 MDN 说明。

## 1.28 HTML5 特性与废弃元素

原文第 12 页。可谈语义元素、原生媒体、Canvas 和表单输入能力；Worker、WebSocket 等是相关 Web API，不能全当 HTML 标签。**纠错：**`s`、`u` 仍存在且有语义；`calendar` 不是有效 input 类型，`keygen` 已废弃。旧 `frame/font/center` 不用于新页面。[HTML 废弃特性](https://html.spec.whatwg.org/multipage/obsolete.html#non-conforming-features)。

## 1.29 兼容新元素

原文第 12 页。**历史：**html5shiv 主要解决 IE8 等对未知元素的样式处理，不会让旧浏览器突然支持所有现代 API。新项目先明确支持范围，语义 HTML + 渐进增强 + 必要的功能检测；原文失效的 HTTP shim 地址不可直接复制。

## 1.30 HTML 语义化

原文第 12—13 页。按含义选标题、导航、列表、按钮和链接，为结构和可访问名称提供信息。例如执行操作用 `button`、跳转用带 href 的 `a`。不要以“屏幕阅读器一定加重语气”作为语义保证，实际朗读受工具设置影响。[MDN：HTML 与可访问性](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML)。

## 1.31 b/strong 与 i/em

原文第 13 页。**纠错：**`strong` 表重要性/严重性，`em` 表语气重读；并不是同一条弱到强的等级。`b` 表需要引起注意但不增加重要性，`i` 表术语、异语或其他不同语态。四者都是有效语义元素；纯样式用 CSS。[MDN：b 的语义与比较](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/b)。

## 1.32 前端 SEO

原文第 13 页。提供唯一且准确的标题、可抓取链接、合适状态码、canonical、站点地图和有用正文；图片用符合目的的 alt。**纠错：**Google 可执行很多 JS，不能说所有爬虫都不执行；预渲染/SSR 可降低渲染依赖。`keywords` 不是 Google 排名权重公式，也没有“标题关键词最多两次”的统一规范。[Google：JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)。

## 1.33 离线存储怎么做

原文第 14—15 页。**历史纠错：**原答案讲的是已废弃 AppCache。现代离线页面由 Service Worker 在受控范围拦截请求，用 Cache API 存响应；业务结构化数据可放 IndexedDB。Service Worker 通常要求 HTTPS（localhost 可用于开发），不会访问 DOM。[MDN：Service Worker 入门](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)。

## 1.34 离线资源如何更新

原文第 15 页。Service Worker 按 install → waiting → activate 生命周期管理新旧版本；安装时准备版本化缓存，激活后按策略清旧缓存，fetch 决定网络优先或缓存优先。**补充：**不能直接照搬 AppCache manifest 的比较规则；强制立即接管可能造成新 HTML 与旧 JS 不匹配，需协调更新和用户刷新。参见 1.33。

## 1.35 浏览器存储有哪些

原文第 15 页。小型偏好可用 Web Storage，结构化数据用 IndexedDB，请求/响应用 Cache API，会话状态常用 Cookie。WebSQL、IE userData 属历史。存储额度、逐出和私密模式行为因浏览器而异；重要数据仍要考虑服务端同步。[MDN：存储配额与逐出](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)。

## 1.36 Cookie、sessionStorage、localStorage

原文第 15—16 页。Cookie 可随匹配的 HTTP 请求发送，范围由域、路径、Secure、SameSite、分区和浏览器政策等决定，**不按端口隔离且不默认加密**。会话 Cookie 也可能随会话恢复保留。localStorage 按源存字符串，sessionStorage 还按顶层标签页区分；可能受存储分区影响。它们都不是“不手删就永久存在”。认证 Cookie 常设置 Secure、HttpOnly、合适的 SameSite，XSS 仍可执行用户操作。[MDN：Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies)。

## 1.37 iframe 的代价

原文第 16 页。iframe 创建独立浏览上下文，有额外内存、加载、焦点/尺寸协调和安全管理成本；可使用 `loading="lazy"`、限制性的 `sandbox`、Permissions Policy 和必要的 `title`。**纠错：**它不必然让后退失效、移动端不可用或永远无法被索引；同源访问和跨源消息应分别设计。[MDN：iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe)。

## 1.38 label 的作用

原文第 16 页。label 给表单控件可访问名称并扩大点击目标，`for` 匹配唯一 id，也可直接包住控件。不要拿 placeholder 代替 label；`name` 是提交字段名，与关联标注不同。

```html
<label for="email">邮箱</label>
<input id="email" name="email" type="email" autocomplete="email">
```

## 1.39 autocomplete

原文第 17 页。告诉浏览器字段含义和自动填充意图，如 `username`、`current-password`、`new-password`、`one-time-code`。**纠错：**`off` 不保证关闭密码管理器，也不能当安全机制；原文的 `telephone` 应为 `tel`，`datepickers` 不是 input 类型。[MDN：autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete)。

## 1.40 标签页通信

原文第 17—18 页。同源且在兼容存储分区内的上下文可用 BroadcastChannel；有窗口引用可用 `postMessage`，必须校验来源与消息结构。localStorage 的 `storage` 事件发给其他相关文档，不发给写入者本身，Cookie 没有对应的 storage 事件。SharedWorker 不是 Chrome 独占；跨设备同步才通常需要服务器。[MDN：BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)。

```js
const channel = new BroadcastChannel('session-updates');
channel.onmessage = ({data}) => {
  if (data?.type === 'logout') console.log('清理当前页会话界面');
};
channel.postMessage({type: 'logout'});
// 页面不再需要通信时调用 channel.close()
```

## 1.41 WebSocket 的旧环境回退

原文第 18 页。**历史纠错：**不要恢复 Flash Socket、ActiveX。若目标运行环境确实不支持 WebSocket，可采用长轮询；单向通知可评估 SSE。Socket.IO 的回退是它自己的协议能力，不等于给任意原生 WebSocket 服务套一个透明 polyfill。[Socket.IO：工作原理](https://socket.io/docs/v4/how-it-works/)。

## 1.42 Page Visibility 用途

原文第 18 页。监听 `visibilitychange`，在 hidden 时暂停非必要动画/轮询，并按业务规则处理媒体。**纠错：**不可用它可靠预测卸载或认定用户一定离开；系统切后台也会触发。重要状态及时持久化，收尾上报可评估 `sendBeacon`。[MDN：Page Visibility](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)。

## 1.43 圆形可点击区域

原文第 18 页。普通交互用带名称的 `button` 加等宽高与 `border-radius:50%`；保留键盘焦点。图片热点可用 `map/area shape="circle"`。若只允许圆内命中，可用适当 `clip-path`，或以同一坐标系判断 `(x-cx)²+(y-cy)² <= r²`；需要同时处理键盘访问。

## 1.44 不用 border 的 1px 线

原文第 18 页。空块设置 `height:1px; background:currentColor` 即可；这里的 px 是 CSS 像素。不要为了兼容怪异模式继续省略 DOCTYPE，换行文本和默认 margin 也应排除。

```css
.rule { height: 1px; margin: 0; background: currentColor; }
```

## 1.45 title 与 h1

原文第 18—19 页。**纠错：**需先分清 `title` 元素与全局 title 属性。`head` 中的 `title` 是文档标题，供标签页和书签等使用；`h1` 是正文最高层级标题。title 属性只是补充说明，不适合作为唯一可访问名称。

## 1.46 img 的 title 与 alt

原文第 19 页。alt 提供图像在该上下文中的文本替代：纯装饰图用空 alt，功能图描述操作，信息图描述信息。title 常作悬浮提示，触摸/键盘下不可依赖。**纠错：**alt 也不只存在于 img，例如图像类型 input；不是 SEO 关键词堆砌区。[WAI：图片教程](https://www.w3.org/WAI/tutorials/images/)。

## 1.47 Canvas 与 SVG

原文第 19 页。Canvas 是脚本绘制的位图画布，适合大量动态像素内容；放大清晰度需匹配 backing-store 尺寸与 DPR。SVG 以元素表示矢量图形，可选择、监听与样式化，适合图标和可交互图表；复杂 DOM 也有成本。两者的可访问性都要主动设计，不能仅以缩放比较选型。

## 1.48 验证码解决什么

原文第 19 页。验证码提高自动化滥用的成本，不能保证区分所有机器人，也不能替代限流、密码策略、MFA 和服务端校验。应绑定具体动作与短有效期、防重放，并给可访问替代方式。验证码成功不等于用户已认证。[OWASP：认证建议](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)。

## 1.49 渐进增强与优雅降级

原文第 19 页。渐进增强先交付可靠核心，再按能力增强；优雅降级先实现完整体验，再准备能力不足时的可用方案。两者是设计路径，不必绑定浏览器年代。例如表单基础提交可用，再加 JS 校验与局部更新。

## 1.50 attribute 与 property

原文第 19 页。**纠错：**二者不是所有标准属性都双向同步。HTML attribute 通常表示初始声明，DOM property 表示对象状态；`input.value` 可变而 `getAttribute('value')` 仍是初始值，`checked/defaultChecked` 也有区别。布尔 attribute 看是否存在，`disabled="false"` 仍代表禁用。[HTML：属性反射](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes)。

## 1.51 标准、可用性、可访问性

原文第 19—20 页。标准提供跨实现的契约；可用性衡量完成任务的效率与体验；可访问性让不同能力、辅助技术和输入方式的人也能操作。交付时验证语义结构、键盘、焦点、文本替代、对比度和放大；“能用鼠标点”不代表合格。[WAI：可访问性入门](https://www.w3.org/WAI/fundamentals/accessibility-intro/)。

## 1.52 浏览器资源并发数

原文第 20 页。**历史纠错：**“永远六个资源”不是标准。HTTP/1.1 连接数限制与浏览器/代理实现有关，HTTP/2、HTTP/3 可在连接中复用多流，还受服务器并发、优先级与拥塞控制限制。优化前看实际 Protocol 与 Timing，不为凑连接数盲目拆域。[MDN：HTTP 连接管理](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Connection_management_in_HTTP_1.x)。

## 1.53 Flash 与 Ajax

原文第 20 页。**历史纠错：**Flash 已退出现代 Web，不再是选型候选。Ajax 是异步请求和局部更新的方式，可用 fetch/XHR；视频、矢量图形、音频等由原生 Web 能力承担。Ajax 本身不保证 SEO、离线检测可靠或操作系统访问能力。[Chrome：Flash 的结束](https://blog.chromium.org/2017/07/so-long-and-thanks-for-all-flash.html)。

## 1.54 怎样重构页面

原文第 20 页。先建立功能/视觉/可访问性和性能基线，再梳理内容结构、组件职责、样式边界与数据流，逐步替换并回归。优先解决重复逻辑、不可访问交互和测得的瓶颈；面试说自己的真实改动、前后指标和权衡，不编造经历。

## 1.55 浏览器架构

原文第 20—21 页。**纠错：**进程、线程、执行栈、任务队列不是同一层级。以 Chromium 为例可讲浏览器进程协调导航，网络/GPU 等进程提供服务，渲染进程处理页面与主线程任务；JS 引擎执行脚本，事件循环安排任务与微任务。站点隔离影响进程分配，不是每个标签永远恰好一个进程。参见 1.14 的 Chrome 说明。

## 1.56 常见 meta

原文第 21—22 页。**纠错：**文档语言写在 `html lang`，不是 `head lang`；`X-UA-Compatible` 等 IE 私有配置不用于现代新站。不要禁用用户缩放；HTTP 缓存策略用真实响应头，不能靠 meta 可靠替代。

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="本页内容的准确摘要">
  <title>页面主题 · 站点名</title>
</head>
<body></body>
</html>
```

[MDN：meta](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta)。

## 1.57 reset 与 normalize

原文第 22—23 页。reset 主动归零或改写默认样式，normalize 尽量保留有用默认并协调差异。两者不是性能优劣排行榜；按产品需要选最小规则，保留焦点可见、列表含义和表单可用性。通配 `box-sizing` 本身也不是错误。[Normalize.css 项目说明](https://github.com/necolas/normalize.css)。

## 1.58 预格式化文本

原文第 23 页。`pre` 保留空白和换行，代码常用 `pre` 配合 `code`。**补充：**它并非绝对“所见即所得”，字体、制表宽度和 CSS white-space 仍影响显示；展示 HTML 代码需要转义尖括号或用 Markdown fenced code。

## 1.59 DHTML

原文第 23 页。这是 HTML、CSS、DOM 与 JS 组合实现动态页面的历史统称，不是独立语言、协议或标准库。可以用“修改 DOM 和样式响应事件”解释；不意味着页面从此不能再请求服务器。

## 1.60 head 中哪些必需

原文第 23—24 页。普通独立 HTML 页面应提供有意义的 title，并尽早声明字符编码。**边界：**规范对 iframe srcdoc 等场景有例外；head 标签本身在某些语法条件下也可省略。面试通常在问 title 元素，不是让你省去编码和可访问性要求。[HTML：head 元素](https://html.spec.whatwg.org/multipage/semantics.html#the-head-element)。

## 1.61 表单新增元素

原文第 24 页。`datalist` 给输入建议，`output` 表示计算结果，还可结合原生日期/数值输入。**历史纠错：**`keygen` 已从标准移除，不能推荐用来做当前认证；前端约束验证也不能替代服务端验证。参见 [HTML 废弃特性](https://html.spec.whatwg.org/multipage/obsolete.html#non-conforming-features)。

## 1.62 获取当前位置

原文第 24 页。用 `navigator.geolocation.getCurrentPosition(success, error, options)`；需要安全上下文、用户权限，并可能受 Permissions Policy 限制。处理拒绝、超时与不可用，不能假设总能获取精确位置。[MDN：Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition)。

## 1.63 注释方式

原文第 24 页。HTML 用 `<!-- ... -->`，CSS 用 `/* ... */`，JS 用 `//` 或 `/* ... */`；块注释不要嵌套。注释仍会发给客户端，不应包含密码或密钥；JS 中换行还可能影响自动分号插入。

## 1.64 disabled 与 readonly

原文第 24 页。disabled 控件通常不聚焦、不参与表单提交和约束验证；readonly 适用于部分文本输入与 textarea，可聚焦，其值可提交。`select` 没有通用 readonly 行为。两者都不阻止脚本改值，也不能成为服务端信任输入的理由。[MDN：readonly](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/readonly)。

## 1.65 CSS 厂商前缀

原文第 24 页。历史上有 `-webkit-`、`-moz-`、`-ms-`、`-o-`；不能据此前缀推断当前浏览器内核。按目标浏览器和构建工具生成必要兼容规则，优先标准属性，实验功能另查兼容表，不手写所有前缀。

## 1.66 前端性能优化

原文第 25 页。先测加载、交互、稳定性，再按瓶颈减少 JS/CSS 体积和主线程长任务，优化图像尺寸格式、缓存和关键资源发现。**纠错：**不是请求越少越好，合并所有文件、把图片全转 Base64 或使用超大雪碧图可能损伤缓存与首屏。SSR/静态输出、分包、按需加载需要分别验证。[web.dev：Core Web Vitals](https://web.dev/articles/vitals)。

## 1.67 如何读 Waterfall

原文第 25—26 页。**补答：**瀑布图展示请求发现时刻、排队、连接和响应，不只看哪条最长。DNS/连接/TLS 长优先查链路与连接复用；Waiting/TTFB 长看服务器和网络往返；下载长看资源体积和带宽；晚启动的关键请求看发起者和依赖链。缓存命中不一定有完整网络阶段；用禁用缓存与网络限速复现后再比较。[Chrome DevTools：Timing](https://developer.chrome.com/docs/devtools/network/reference#timing)。

## 1.68 扫码登录原理

原文第 26 页。服务端创建短期、不可预测且一次性的登录挑战；网页显示其二维码，并轮询或订阅状态。已登录手机扫描后展示登录对象并由用户确认，服务端再给原网页会话建立登录态，消费挑战。**纠错：**扫码方案不能保证免疫 PC 病毒或钓鱼；不能把账户密码放二维码，也不能仅凭“扫过”就完成授权。需要防重放、过期、会话绑定与服务端校验。[OWASP：会话管理](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)。

## 1.69 为什么省略资源 URL 协议

原文第 26 页。**纠错：HTML 规范没有要求这样写。**`//cdn.example.com/a.js` 是继承页面协议的相对 URL，HTTP 页面仍会请求 HTTP，不能自动提供安全性。新站统一 HTTPS；同站文件通常用正确的相对/站点路径。混合内容不是靠省略协议“忽略警告”解决。[MDN：Mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)。

下一步：[CSS 104 题解析](./css.md) · [本组说明](./index.md)。
