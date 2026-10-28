---
title: 阿里题集第二期：浏览器、CSS 与设计
sidebar_label: 第二期 · 浏览器与 CSS
description: 按原 PDF 题号逐题整理，修正旧浏览器、样式布局和性能优化的过时答案。
---

本题集来自站内《阿里前端面试题·第二期》历史资料。企业名称是原资料标签，不代表企业当前招聘题库。PDF 共 144 页；目录列出 199 个编号项，其中最后 23 题重复前文，CSS 第 2 题也重复排版，源码篇缺少第 6 题编号。

## 怎么学习

1. 先遮住答案复述概念，再打开浏览器验证示例。
2. 阅读本页的 HTML 7 题、CSS 13 题、设计模式 5 题。
3. 继续学习 [JavaScript、执行结果与源码题](./javascript.md)、[51 道算法及 SQL 补答](./algorithms.md)、[网络、Node 与重复题索引](./network-node.md)。
4. 有需要时对照 [完整原文与页码](../sources/ali-2.md)。原文保留历史说法，学习结论以这里的纠错说明为准。

本页中的题号按原章节编号，页码是 PDF 文件页序。

## 一、HTML 篇

### H1 · link 与 @import（第 11 页）

`link rel="stylesheet"` 是 HTML 的外部样式关联，浏览器扫描到标签时即可发现资源；`@import` 是 CSS 规则，依赖其所在样式表被下载和解析后才发现下一层资源，可能形成串行依赖。**原文“@import 在页面加载完毕后才加载”不准确**，它也会在加载过程中发起请求。两者的样式优先级由层叠决定，不能简单说谁总覆盖谁。工程中通常将依赖交给构建工具处理，页面使用 `link`。

依据：[MDN：@import](https://developer.mozilla.org/en-US/docs/Web/CSS/@import)。

### H2 · 常见浏览器内核（第 11—12 页）

先区分渲染引擎和 JavaScript 引擎：Blink 对应 Chromium 系列，Gecko 对应 Firefox，WebKit 对应 Safari；V8、SpiderMonkey、JavaScriptCore 是 JS 引擎。Trident、Presto 属于历史知识。原文列出的国内浏览器、双内核产品和平台可能变化，应以具体版本、平台、实际 UA 和开发者文档确认，不能把这份旧产品表当现状。

### H3 · 浏览器渲染过程（第 12—13 页）

网络读取与 HTML 解析可以交错进行，构建 DOM；解析 CSS 得到样式规则，计算样式；接着布局、绘制和合成。脚本可能阻塞解析，样式也可能影响脚本执行及首次渲染，不能理解为“所有文件下载完再依次执行”。`display:none` 的元素无布局盒；`visibility:hidden` 的盒仍参与布局，“看不见就没有渲染树节点”并不成立。性能排查应在 DevTools 中查看实际的 style、layout、paint 与 long task。

### H4 · autocomplete（第 13 页）

这是表单或控件对浏览器自动填充的提示。除 `on/off`，还可使用 `name`、`email`、`current-password`、`new-password` 等语义标记。`off` 不能保证密码管理器一定关闭填充，也不是数据保护措施；表单仍须有正确的标签、校验和服务端处理。

### H5 · 多标签通信（第 13—14 页）

同源、同存储分区的标签可用 `BroadcastChannel`。`localStorage` 改动会在符合条件的其他文档触发 `storage` 事件，本页不会因此收到自己的事件。持有窗口引用可用 `postMessage`，发送时指定目标源，接收时验证 `origin` 和消息结构。跨设备可由 WebSocket 服务端转发；它和同源广播的成本不同。

依据：[MDN：BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel)、[storage 事件](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event)。

### H6 · 前端性能优化（第 14 页）

先记录真实用户的 LCP、INP、CLS 和网络、CPU 基线，再定位瓶颈：减少首屏 JS 和长任务，按路由拆包，设置图片尺寸和合适格式，缓存带内容哈希的资源，压缩传输，控制第三方脚本。首屏主图应优先加载，屏外图可懒加载。**原文将合并文件、雪碧图、Base64、域名拆分全部当通用最佳实践过时**：它们可能增大包、降低独立缓存效率，或增加 DNS/TLS 成本。HTTP/2、HTTP/3 下依据实测选择，不追求“请求数越少越好”。

依据：[web.dev：Web Vitals](https://web.dev/articles/vitals)。

### H7 · WebP（第 14—15 页）

WebP 支持有损、无损、透明度和动画。节省多少由内容和编码参数决定，“同质量一定更小”不宜作为保证。使用 `picture` 提供格式回退，使用 `srcset/sizes` 选择分辨率；不需要每张图片都在 JS 中探测格式。

```html
<picture>
  <source srcset="cover.webp" type="image/webp" />
  <img src="cover.jpg" alt="学习路线" width="800" height="450" />
</picture>
```

## 二、CSS 篇

### C1 · BFC（第 15—16 页）

BFC 是块级格式化上下文。`display:flow-root` 是明确建立 BFC 的常用方式，还包括浮动、绝对定位、部分 overflow 值等。**`overflow:clip` 不建立 BFC；flex/grid 容器建立的是各自的格式化上下文，不应笼统等同 BFC。** BFC 可包含内部浮动，隔离父子 margin 折叠，并使正常流中的盒避开外部浮动；并非所有内部元素都与外界毫无影响，也不是在一个父元素上开启 BFC 就能禁止其所有子元素之间的 margin 折叠。

依据：[MDN：BFC](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Block_formatting_context)。

### C2 · 水平垂直居中（第 16—19 页，原文重复）

已知容器尺寸时，优先表达布局意图：

```css
.parent {
  min-height: 20rem;
  display: grid;
  place-items: center;
}
```

也可以用 flex 的 `justify-content:center; align-items:center`；绝对定位配合 `inset:50% auto auto 50%` 和 `translate(-50%,-50%)` 适合覆盖层。百分比和变换的参照不同：定位百分比依包含块，平移百分比依自身参考盒。需要处理内容过大、滚动和多子元素时应先确认布局要求。

### C3 · 回流、重绘与优化（第 19—21 页）

布局重新计算尺寸与位置；绘制生成像素绘制指令；合成将图层组合。读 `getBoundingClientRect()` 等布局信息，在样式脏时可能触发同步布局，**不是每次调用都必然重排整页**。将读操作和写操作分批，减小 DOM，减少长任务；动画可优先考虑 `transform/opacity`，但是否独立合成要看浏览器实际情况。`will-change` 和图层过多也耗内存。原文“table 固定慢三倍”“刷新固定 16.6ms”都不是通用事实。

依据：[web.dev：避免复杂布局与布局抖动](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing)。

### C4 · 三种隐藏方式（第 22 页）

| 方式 | 是否保留布局空间 | 指针与焦点 | 常见用途 |
| --- | --- | --- | --- |
| `display:none` | 否 | 通常不可交互，不进入可访问性树 | 内容完全关闭 |
| `visibility:hidden` | 是 | 本身不可交互，后代可设回 visible | 保留占位 |
| `opacity:0` | 是 | 仍可命中、仍可能键盘聚焦 | 渐隐动画 |

透明不等于禁用。需关闭交互时依据场景处理 `inert`、焦点管理与指针事件；`pointer-events:none` 本身也不移除键盘焦点。

### C5 · 盒模型（第 22 页）

`content-box` 下 width/height 指内容尺寸，padding 与 border 在外增加；`border-box` 下 width/height 包含内容、padding、border，margin 始终在外。border-box 是标准 CSS 能力，不必再叫“IE 模型”。注意最小内容尺寸、滚动条和布局约束仍可能影响最终使用值。

### C6 · rem 与 px（第 22—23 页）

`rem` 相对根元素字体尺寸；`em` 的参照取决于属性；`px` 是 CSS 像素。**原文“px 无法随浏览器缩放”错误**，页面缩放会放大 CSS 像素。默认字号常见 16px，但用户设置可以改变，不应假定永远固定。移动端布局可用响应式网格、百分比、`clamp()`，不需要把所有 px 一律换成 vw。

### C7 · 移动端 viewport（第 23 页）

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

通常从这条配置开始。**不沿用原文禁止用户缩放的配置**，它会影响低视力用户。需要控制手势时针对具体交互区使用 `touch-action`，不要全局禁用缩放。

### C8 · 伪类与伪元素（第 23 页）

伪类选择元素状态或结构关系，如 `:hover`、`:nth-child()`、`:is()`；伪元素选择或表示元素的某部分，如 `::before`、`::first-line`。伪类并不只用于“DOM 无法描述的状态”，结构伪类同样重要；伪元素也不等于真的向 DOM 增加元素。

### C9 · 行内元素的 margin、padding（第 24 页）

对普通非替换行内元素，水平方向 margin/padding 生效；垂直 margin 不影响行布局，垂直 padding/border 会绘制，但不会按块盒方式把行盒撑高，因此可能覆盖相邻行。`img` 等替换元素、inline-block、不同书写模式要另外讨论，不能把所有 inline 情况都说成“垂直无效”。

### C10 · 继承（第 24—25 页）

常见继承属性有 color、font-family、font-size、line-height、text-align、visibility、cursor；width、margin、padding、border 通常不继承。按具体属性的规范确认，`inherit` 可显式请求继承；继承值和选择器优先级是不同机制。原文 `line-hight` 拼写应为 `line-height`。

### C11 · 结构与状态伪类（第 25 页）

`p:nth-child(2)` 要求它是父元素的第二个元素子节点，且自己为 p；`p:nth-of-type(2)` 是同父下第二个 p。`only-child` 要求没有其他元素兄弟；`:empty` 要留意文本节点影响；`:not()` 排除匹配项，`:enabled/:disabled` 按控件语义匹配。学习选择器时用真实 DOM 验证，文本和注释并不计入 nth-child 的元素序号。

### C12 · CSS 三角形（第 25 页）

原文的 `border-width:20` 缺少单位，`border-style:"solid"` 不应加引号。

```css
.triangle {
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-bottom-color: #d33;
}
```

利用零内容盒的边框交界形成三角。若需自适应的实心形状，也可使用 `clip-path:polygon(...)`。

### C13 · min/max 与 width/height（第 26 页）

先通过层叠求每个属性的值，再由尺寸算法共同约束最终使用尺寸。通常先以 max 限制首选尺寸，再以 min 保证下限；min 大于 max 时 min 优先。**这不是 max-width 选择器比 width 的 `!important` 优先**，它们是不同属性。flex/grid 的自动最小尺寸、百分比与内在尺寸会引入额外约束。

依据：[MDN：min-width](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width)、[盒模型](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model)。

## 七、设计模式

### D1 · 设计模式解决什么问题（第 75 页）

模式是对重复出现的设计问题的经验总结，应说明场景、约束、协作关系及代价。先把问题拆小、明确变化点，再选择适合的抽象；不能为了套模式增加无必要的继承层次。原文“忽略问题的本质细节”应理解为忽略无关细节，业务本质与约束必须保留。

### D2 · 白箱与黑箱复用（第 75 页）

继承通常要求了解父类的可扩展约定，形成较强耦合；组合通过稳定接口调用协作者，更容易替换。二者不是安全等级标签：父类有完善契约时可继承，变化独立时常优先组合。

### D3 · 观察者与发布订阅（第 75—76 页）

观察者通常由被观察对象维护观察者并通知；发布订阅通过主题或消息中介解耦双方。**一对多和多对多不是两者的硬性分界**。都要考虑解除订阅、异常隔离、同步或异步投递、顺序及重复消息。浏览器 `EventTarget` 和 Node `EventEmitter` 可用来讨论不同的事件接口，不必把它们等同于所有模式定义。

### D4 · SOLID 等原则（第 76—77 页）

单一职责关注一个变化原因；开闭原则让常见扩展不需反复修改核心；里氏替换要求子类型遵守父类型行为契约；接口隔离避免强迫依赖无用方法；依赖倒置让策略依赖抽象。**开闭原则并不禁止修复已有代码**。组合优于继承、封装变化是设计建议，应结合测试、团队成本和实际变化使用。

### D5 · 模式与应用（第 77—80 页）

| 模式 | 面试中可说明的具体用法 | 容易混淆之处 |
| --- | --- | --- |
| 模板方法 | 固定导出流程，替换校验/编码步骤 | 与策略的组合方式不同 |
| 观察者 | 状态变化通知订阅者 | 需释放订阅，闭包不是必然泄漏 |
| 策略 | 按支付类型选择独立计算函数 | 简单分支未必需要类体系 |
| 装饰器 | 在原调用外增加日志、计时、鉴权 | 语法装饰器和设计模式不是同一概念 |
| 桥接 | 业务抽象与平台实现独立变化 | 单纯“组件组合”不足以证明使用桥接 |
| 工厂方法/抽象工厂 | 创建一种产品/一族兼容产品 | `createElement` 命名本身不足以证明 GoF 工厂方法 |
| 单例 | 控制某作用域内共享实例 | SSR 多请求共享状态需谨慎；不同 realm 未必共享 |
| 享元 | 共享不可变的内在状态 | 对象池的回收复用和享元并不相同 |
| 外观 | 对复杂子系统提供统一入口 | 避免演化成无边界的大对象 |
| 代理 | 在访问前后做缓存、鉴权等 | JS Proxy 是语言工具，不是模式的唯一实现 |
| 适配器 | 将旧接口转换成新接口要求 | 和门面“简化同一接口”目的不同 |
| 组合 | 让叶子和树状组合遵守统一接口 | 要处理递归深度与循环引用 |

实践依据：[MDN：Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)、[Node：EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)。模式表为结合原题重新整理的解释，不是框架内部实现的承诺。
