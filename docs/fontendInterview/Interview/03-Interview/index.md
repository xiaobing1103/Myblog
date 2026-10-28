---
id: 03-Interview
title: html&css基础面试题
description: 44道HTML与CSS基础面试题，包含现代浏览器规则、示例和历史答案纠错。
keywords:
  - HTML
  - CSS
  - 前端面试
---

本页保留原来的 44 道题和访问路径，已按当前 Web 平台校订答案。涉及 IE6—8、XHTML 或 Flash 年代的内容标记为历史背景；可继续阅读[阿里第一期完整逐题解析](../../../interview/ali-1/index.md)。

## 1. 你做的页面在哪些流览器测试过？这些浏览器的内核分别是什么?

请回答自己真实测试的浏览器、版本、操作系统和设备，不编造项目经历。桌面常见组合是 Chrome/Edge 的 Blink、Firefox 的 Gecko、Safari 的 WebKit；IE 的 Trident 与旧 Opera 的 Presto 属历史。移动品牌与桌面不一定使用同样引擎，需按目标设备确认。还应覆盖键盘、缩放、弱网和触摸。[Chromium：Blink](https://www.chromium.org/blink/)。

## 2、每个 HTML 文件里开头都有个很重要的东西，Doctype，知道这是干什么的吗？

现代 HTML 开头使用 `<!doctype html>`，让浏览器进入无怪异渲染模式。它不加载 HTML 版本、下载 DTD 或开启 JS 严格模式；DOCTYPE 后才是 html 文档元素。[HTML 标准：DOCTYPE](https://html.spec.whatwg.org/multipage/syntax.html#the-doctype)。

## 3、Quirks 模式是什么？它和 Standards 模式有什么区别

怪异模式为旧页面保留部分历史布局行为；无怪异模式遵循现代规则，还有有限怪异模式。影响如盒尺寸和表格单元格中的图片基线，不是换一个旧 JS 引擎。DOCTYPE 负责模式选择，JS strict mode 由 `"use strict"`、模块等规则决定。`document.compatMode` 可检测 BackCompat，但不能区分所有细分模式。[MDN：渲染模式](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Quirks_mode_and_standards_mode)。

## 4、div+css 的布局较 table 布局有什么优点？

用语义 HTML 配合 Flex/Grid/CSS，可分离内容与视觉、适应窄屏、调整布局并减少为布局制造的多余单元格。不能保证单用 div 就更快或排名更高；真正的表格数据应使用 table、th、caption 等，让表头关联和键盘/辅助技术体验正确。[WAI：表格教程](https://www.w3.org/WAI/tutorials/tables/)。

## 5、 img 的 alt 与 title 有何异同？ strong 与 em 的异同？

alt 是上下文中的文本替代：信息图描述信息，功能图描述动作，装饰图用空 alt。title 是补充提示，不保证在触摸、键盘或辅助技术中可用，不能代替 alt。strong 表重要性/严重性，em 表语气强调，并非“em 比 strong 更强”；默认粗斜体也能被 CSS 改变。[WAI：图片替代](https://www.w3.org/WAI/tutorials/images/)、[HTML：文本语义](https://html.spec.whatwg.org/multipage/text-level-semantics.html)。

## 6、你能描述一下渐进增强和优雅降级之间的不同吗?

渐进增强先保证核心内容和操作可靠，再按能力加交互；优雅降级先做完整体验，再为能力不足的环境提供可用回退。两者不只按浏览器年龄划分。与产品讨论兼容时说明支持范围、用户占比、实现成本和关键任务是否可完成，不以“旧浏览器用户不重要”代替判断。

## 7、为什么利用多个域名来存储网站资源会更有效？

题目前提不总成立。HTTP/1.1 时代拆域可能绕过每源连接限制，独立无 Cookie 域也可减小请求头；但增加 DNS、连接和 TLS 成本。HTTP/2/3 多路复用下拆域可能更慢。CDN 可通过同一资源主机提供；是否携带 Cookie 要看域范围等规则，换子域不保证隔离。按 Network 实测决定。[MDN：连接管理](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Connection_management_in_HTTP_1.x)。

## 8、请谈一下你对网页标准和标准制定机构重要性的理解。

标准定义跨浏览器契约，减少重复适配，让不同设备和辅助技术可理解内容。HTML 主要由 WHATWG 维护，CSS 与可访问性等有 W3C 标准，ECMAScript 由 TC39 推进。遵循标准有利于互操作，但不自动保证无 bug、安全或搜索排名。[WHATWG](https://whatwg.org/)、[W3C 标准](https://www.w3.org/standards/)。

## 9、请描述一下 cookies，sessionStorage 和 localStorage 的区别？

| 项目 | Cookie | localStorage | sessionStorage |
| --- | --- | --- | --- |
| 主要用途 | 会话与请求状态 | 本地小型持久偏好 | 当前页会话数据 |
| 自动随请求发送 | 符合域、路径、安全等条件时 | 否 | 否 |
| 范围 | 不按端口隔离，受 Domain/Path 等约束 | 按源，另受分区等政策影响 | 按源与顶层标签页 |
| 生命周期 | Max-Age/Expires 或会话规则 | 可持久保留，仍可被清理/限制 | 页会话结束，恢复行为依浏览器 |

Web Storage 只存字符串，容量不是跨浏览器固定 5MB；Cookie 也不默认加密。HttpOnly Cookie 不能由 document.cookie 读取，本地存储仍受 XSS 风险影响。不要将“永久保存”当数据可靠性承诺。[MDN：Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies)、[存储配额](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)。

~~~js
sessionStorage.setItem('draft', JSON.stringify({title: '草稿'}));
const saved = sessionStorage.getItem('draft');
const draft = saved === null ? null : JSON.parse(saved);
sessionStorage.removeItem('draft');
// 若存储内容可能损坏或不受信任，读取时需处理解析失败并验证结构
~~~

## 10、简述一下 src 与 href 的区别

src 通常指定要加载的嵌入资源，如 img、script、iframe；href 指链接目的或关联资源，如 a、link。具体加载和阻塞语义由元素、类型和属性决定，不能说所有 src 都暂停解析、所有 href 都不阻塞。图片不会像普通经典脚本一样阻塞 HTML 解析，样式表通常阻塞渲染。[MDN：script](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script)、[link](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link)。

## 11、知道的网页制作会用到的图片格式有哪些？

照片比较 JPEG/WebP/AVIF，透明无损图比较 PNG/WebP，矢量图标可用 SVG，动画可按内容选 WebP/APNG/GIF 或视频。不能承诺某格式对任意图固定小 40%；尺寸、编码质量、内容类型和解码成本共同影响结果。WebP 已是常见选项，应通过 picture 保留必要回退。[MDN：图片格式指南](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types)。

## 12、知道什么是微格式吗？谈谈理解。在前端构建中应该考虑微格式吗？

Microformats 用约定的 HTML class 等标记结构化信息，microformats2 如 h-card 表示名片、p-name 表姓名。它可兼顾可读 HTML 和机器提取，不要求网站改成 XHTML。按实际消费者需求采用；Google 富结果须满足其对应结构化数据规范，不能保证加了微格式就获得额外展示。[Microformats2 官方](https://microformats.org/wiki/microformats2)。

## 13、在 css/js 代码上线之后开发人员经常会优化性能，从用户刷新网页开始， 一次 js 请求一般情况下有哪些地方会有缓存处理？

区分 DNS 解析缓存与资源缓存：前者缓存域名解析；浏览器 HTTP 缓存、Service Worker Cache、CDN/反向代理可缓存响应，服务端还可能缓存构建结果。HTTP 缓存看 Cache-Control、ETag/Last-Modified 和 Vary；no-cache 允许存储但使用前需验证，no-store 才要求不存。内容哈希资源可长缓存，HTML 需及时获取最新版本；普通刷新和强刷行为不同。[MDN：HTTP 缓存](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching)。

## 14、一个页面上有大量的图片（大型电商网站），加载很慢，你有哪些方法优 化这些图片的加载，给用户更好的体验。

先测 LCP、图片传输与解码体积。输出与显示尺寸匹配的响应图片、选择合理格式质量、设置缓存和 width/height。首屏关键主图尽早请求，不懒加载；屏外图可 loading=lazy。懒加载是接近视口时请求，不保证刚好进入可见区才请求；无需用空 src 和高频滚动监听模拟。[web.dev：原生图片懒加载](https://web.dev/articles/browser-level-image-lazy-loading)。

~~~html
<!-- 屏外的商品图片；实际文件路径按页面资源目录调整 -->
<img src="product.webp" width="480" height="480"
     loading="lazy" decoding="async" alt="蓝色帆布背包正面">
~~~

## 15、你如何理解 HTML 结构的语义化？

用元素表达内容结构和操作意义：标题层级、导航、主内容、列表、表格、按钮和链接各有职责。好处是便于理解、维护、键盘操作和辅助技术处理，不只是无 CSS 时“看起来整齐”。按钮应有可访问名称和焦点，而非 div 加点击监听就结束。[MDN：HTML 可访问性](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML)。

## 16、谈谈以前端角度出发做好 SEO 需要考虑什么？

提供有用正文、唯一准确的 title、可抓取链接、正确状态码、canonical、必要站点地图和不误拦爬虫的配置。SSR/静态生成可降低内容对 JS 渲染的依赖，图片有合适 alt，页面保持可用和快速。原文的付费收录、旧市场份额、关键词密度口诀已不适合作当前规则；购买广告不等于提高自然排名。[Google：搜索基础要求](https://developers.google.com/search/docs/essentials)。

## 17、有哪项方式可以对一个 DOM 设置它的 CSS 样式？

外部 link 样式表、head 中 style 和元素 style 属性都可以。JS 可切换 class、设置 style 或在符合权限的情况下操作 CSSOM。优先用 class 表达状态；内联不天然覆盖 important、来源、层等所有规则，仍需按层叠分析。

~~~js
element.classList.toggle('is-open', true);
element.style.setProperty('--progress', '0.75');
~~~

## 18、CSS 都有哪些选择器？

类型、类、ID、属性、伪类、伪元素和通配选择器可通过后代/子/兄弟组合器连接。优先级先看层叠来源、重要性与层，再按 ID、类/属性/伪类、类型/伪元素三元组比较，不把 1/10/100 当十进制进位。:where 为零，:is/:not/:has 使用其参数中的最大特殊性。原例同层两条类规则，后声明的 classB 为红，与 class 属性内的顺序无关。[MDN：特殊性](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity)。

## 19、CSS 中可以通过哪些属性定义，使得一个 DOM 元素不显示在浏览器可视范围 内？

display:none 不留布局盒，visibility:hidden 保留占位，opacity:0 仍可被点击/聚焦并保留可访问性；裁剪和移屏也要管理焦点。零宽高不保证子内容不溢出，负 z-index 不保证隐藏。若只让读屏读取，使用经过验证的 visually-hidden 样式；禁用子树交互可评估 inert。[MDN：inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert)。

## 20、超链接访问过后 hover 样式就不出现的问题是什么？如何解决？

访问后的链接仍可同时处于 hover/active 状态。常见原因是 visited 规则在相同层与特殊性下排得靠后覆盖了 hover，常用声明顺序为 link、visited、hover、active；也应提供 focus-visible。还要检查层叠层和更强的选择器；visited 允许的样式受隐私限制。

## 21、什么是 Css Hack？ie6,7,8 的 hack 分别是什么？

历史上利用解析差异，如 IE6 的下划线属性、IE7 的星号属性和特定条件注释，为旧环境提供规则。这些技巧不是现代标准能力检测，也不能保证原文每段代码只命中标注的浏览器。新项目明确支持范围，优先标准属性、@supports、渐进增强和必要 polyfill，不引入这套旧 hack。[MDN：@supports](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports)。

## 22、请用 Css 写一个简单的幻灯片效果页面

纯 CSS 自动轮播需管理自动运动、暂停、键盘和读屏。教学可先实现可键盘进入、可触摸滚动的静态横向幻灯片；它不依赖原文失效的 HTTP 图片。自动切换是可选增强，增加后应提供明确暂停按钮，减少动画偏好时关闭。

~~~html
<div class="slides" role="region" aria-label="课程幻灯片" tabindex="0">
  <section><h2>第一课</h2><p>HTML 结构</p></section>
  <section><h2>第二课</h2><p>CSS 布局</p></section>
  <section><h2>第三课</h2><p>交互练习</p></section>
</div>
~~~

~~~css
.slides { display: flex; overflow-x: auto; scroll-snap-type: x proximity; }
.slides > section { flex: 0 0 100%; box-sizing: border-box; padding: 2rem; scroll-snap-align: start; }
~~~

如题目必须展示 animation，可以给纯装饰指示条加入关键帧；不要用不断换 background-url 当成完整无障碍轮播：

~~~css
@media (prefers-reduced-motion: no-preference) {
  .progress { transform-origin: left; animation: progress 5s linear infinite; }
  .progress:hover { animation-play-state: paused; }
}
@keyframes progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
~~~

[WAI：轮播教程](https://www.w3.org/WAI/tutorials/carousels/)。

## 23、行内元素和块级元素的具体区别是什么？行内元素的 padding 和 margin 可 设置吗？

普通块盒通常另起一行，auto 宽度分配可用空间；非替换 inline 的 width/height 不按块盒生效，垂直 margin 不改变行框，垂直 padding/border 可以绘制却可能覆盖邻行。img 是有固有尺寸的替换元素，不要与 span 的规则混淆；label 默认并非 inline-block。display 可改变盒类型，HTML 嵌套仍受内容模型约束。[MDN：display](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display)。

## 24、什么是外边距重叠？重叠的结果是什么？

普通块布局中某些相邻块轴 margin 会折叠，包括兄弟、父子和空块自身。全正取最大值，全负取最负值，正负混合为最大正值加最小负值。浮动、绝对定位、Flex/Grid 项有不同规则。父 flow-root 可阻止其与子 margin 折叠，但不给任一兄弟 flow-root 就保证阻止外部折叠。[MDN：margin 折叠](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Margin_collapsing)。

## 25、rgba()和 opacity 的透明效果有什么不同？

带 alpha 的颜色仅使使用该颜色的那一层透明，如 background-color；opacity 将元素及其后代合成后的整体变透明，并在小于 1 时建立层叠上下文。opacity 不继承，但子元素不能靠 opacity:1 抵消父整体透明。设置 color 为半透明仍可能通过颜色继承影响后代，不能说 rgba 永远不影响子元素。

## 26、css 中可以让文字在垂直和水平方向上重叠的两个属性是什么？

过小 line-height 可让相邻行字形重叠，负 letter-spacing 可让字形水平挤压。它们是排版属性，极端值会破坏阅读，不应用于正常布局。inline-block 空白来自文本节点，优先用 Flex/Grid + gap；负字距消隙依赖字体，不能作为通用方案。

## 27、如何垂直居中一个浮动元素？

float 没有通用的 vertical-align 居中开关；把元素改成 absolute 后也就不是在验证“浮动元素居中”了。若需求只是居中内容，改用 Flex/Grid；浮动用于文本环绕时应按其本来的流动规则设计。

~~~css
.container { min-height: 20rem; display: grid; place-items: center; }
.container > img { max-width: 100%; height: auto; }
~~~

原文“未知宽高”示例实际写了固定宽高，不能据此推广；Grid 示例无需固定子元素宽高。

## 28、px 和 em 的区别。

CSS px 是参考长度，不等同于固定一个物理像素，也会受缩放影响。em 在 font-size 中相对继承的字号，在其他属性中通常相对该元素计算字号；rem 相对根元素字号。浏览器默认字号常见 16px，但可由用户/环境修改，不能作固定前提。[MDN：长度单位](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length)。

## 29、描述一个”reset”的 CSS 文件并如何使用它。知道 normalize.css 吗？你 了解他们的不同之处？

reset 主动改写默认样式，normalize 尽量保留有用默认并协调差异。作为基础样式较早加载；自定义层叠层时可将第三方基础样式放在低优先级层。只加需要的规则，不移除焦点提示后忘记补回，也不把 normalize 说成能修复一切兼容问题。[Normalize.css 官方](https://github.com/necolas/normalize.css)。

## 30、Sass、LESS 是什么？大家为什么要使用他们？

它们是编译成 CSS 的预处理语言，提供模块、变量、mixin、函数等组织能力，具体语法和模块规则不同。生产通常构建时编译，不在浏览器中加载编译器；前缀兼容常由 Autoprefixer 等另处理。原生 CSS 变量可在运行时级联，不能和 Sass 构建变量混同。[Sass 官方](https://sass-lang.com/documentation/)、[Less 官方](https://lesscss.org/)。

## 31、display:none 与 visibility:hidden 的区别是什么？

none 不生成布局盒，子树通常不进入可访问树；hidden 保留布局占位，通常不可聚焦/命中，但后代可显式 visibility:visible。元素样式属性并没有“丢失”，只是未按可见盒布局。程序主动 dispatchEvent 与用户点击命中是不同机制，别把二者都叫不响应事件。

## 32、CSS 中 link 和@import 的区别是：

link 是 HTML 元素，@import 是 CSS 规则。link 通常更早被发现；import 可能形成所属样式表下载后的依赖链，但不是一定等全页加载完才下载。二者没有固定的“link 权重更高”规则，实际优先级仍按来源、重要性、层、特殊性和顺序等决定。[MDN：@import](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@import)。

## 33、简介盒子模型：

四区域为 content、padding、border、margin。content-box 的 width/height 指内容区，border-box 包括 padding 和 border，都不包含 margin。两种都是现代标准支持的 box-sizing，border-box 不是仅 IE 可用的怪异模型。

~~~css
*, *::before, *::after { box-sizing: border-box; }
~~~

## 34、为什么要初始化样式？

建立产品需要的排版基线、减少不必要的默认差异。初始化 CSS 不会天然降低搜索排名；清空焦点、列表或表单默认却不补回，才可能损伤体验。按需求最小重置，与第 29 题共同理解。

## 35、BFC 是什么?

块级格式化上下文限制块盒与浮动交互，可包含内部浮动，阻止自身与内部块 margin 折叠；display:flow-root 是直接建立方式。它不会让内外尺寸完全互不影响。Flex/Grid 建立各自格式化上下文，overflow:clip 单独不会创建 BFC。[MDN：BFC](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Block_formatting_context)。

## 36、html 语义化是什么？

参见第 15 题。补充：语义不由默认视觉样式决定；把 h1 缩小仍是最高层标题，把 div 变粗不会成为标题。使用合适原生元素、准确名称和层级，通常比到处补 ARIA 更可靠，不承诺因此一定收录或排名靠前。

## 37、Doctype 的作用？严格模式与混杂模式的区别？

参见第 2—3 题。这里的“严格模式”是旧资料对标准渲染模式的不严谨叫法；不要与 JS strict mode 混淆。现代正常页面写 `<!doctype html>`，HTML 按内建解析算法处理，不依赖下载 DTD。

## 38、IE 的双边距 BUG：

历史 IE6 中，特定浮动块同侧 margin 可能出现翻倍，旧修复常见给浮动盒设置 display:inline。它不是当前浏览器通用 bug，新站不应保留 _display 等旧 hack；若维护必须支持 IE6 的系统，需在该实际环境复现后限定补丁。

## 39、HTML 与 XHTML——二者有什么区别？

XHTML 是 HTML 的 XML 序列化。按 XML MIME 类型提供时，必须符合 XML 的大小写、正确嵌套、引号、实体和闭合规则，解析错误行为与 text/html 不同。仅写小写或自闭合并不能把 text/html 页面变成 XHTML。图片替代文本是内容/可访问性要求，不是区分两种解析语法的规则。[HTML：XML 语法](https://html.spec.whatwg.org/multipage/xhtml.html)。

## 40、html 常见兼容性问题？

先确定支持的浏览器版本和平台，用最小复现查功能、默认表单样式、布局最小尺寸、字体、移动视口和媒体格式支持。优先标准写法和渐进增强；原文 IE6 PNG、select 覆盖和透明滤镜属于历史，不应直接复制到当前网站。z-index 先查层叠上下文，不能保证给父元素 relative 就解决；important 也不会让不支持的属性突然生效。

## 41、对 WEB 标准以及 W3C 的理解与认识

标准帮助互操作、可访问和长期维护；结构/表现/行为的职责分工是常见工程方法，不是必须拆成三个文件。HTML 大小写与闭合规则取决于 HTML/XML 语法，不能统一要求所有 HTML 空元素都写结束标签。遵循规范也不自动保证更小体积或更高 SEO 排名。机构分工参见第 8 题。

## 42、行内元素有哪些?块级元素有哪些?CSS 的盒模型?

常见默认行内内容有 span、a、em、strong；div、p、标题和列表容器通常是块级。img/input 等替换或控件盒有自己的尺寸规则，不按普通 span 的规则推断。display 决定 CSS 盒行为，内容模型决定 HTML 嵌套；盒模型与 box-sizing 见第 33 题。

## 43、前端页面有哪三层构成，分别是什么?作用是什么?

结构层 HTML 描述内容与含义，表现层 CSS 控制布局和视觉，行为层 JS 响应交互与状态变化。分层是职责划分，现代组件可以把相关模板/样式/行为放在同一组件内；仍应保持语义清晰和边界可维护，不能把所有内容都等到 JS 执行后才生成视为必然最优。

## 44、Doctype 作用? 严格模式与混杂模式-如何触发这两种模式，区分它们有何 意义?

现代文档开头使用 `<!doctype html>`；缺失或某些历史声明会触发怪异/有限怪异模式，具体按标准的模式选择规则，不是所有“拼错一个字”都同样处理。区分模式有助定位布局差异，不能靠切换 DOCTYPE 修复 JS 严格模式问题。与第 2—3、37 题是同主题重复题，统一使用同一结论。

校订时间：2026-10-28。继续学习[新版面试题库](../../../interview/index.mdx)。

