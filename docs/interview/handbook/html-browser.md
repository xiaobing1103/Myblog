---
title: 大厂手册题解：HTML、CSS 与浏览器
sidebar_label: HTML、CSS 与浏览器
sidebar_position: 2
---

对应原文印刷页 1—22（PDF 13—34）。[返回题解目录](./index.md) · [逐页原文](../sources/handbook.md)。H 后数字为原题号；原文没有 23、24。

## HTML 与基础样式

### H01 网络常见图片格式

**更新。** JPEG 适合照片，PNG 支持无损与透明，GIF 常用于简单动画但颜色有限，SVG 适合矢量图。WebP、AVIF 常用于降低照片和插图体积，需要结合目标浏览器、编码成本及视觉质量选择；不存在脱离样本的“JPEG 总能最小”。用 `picture` 提供格式回退，用 `srcset` 提供尺寸候选。[MDN 响应式图片](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images)

### H02 CSS 盒模型

**纠错。** 内容、内边距、边框、外边距由内向外排列。`content-box` 下声明宽度只约束内容区；边框盒宽为内容宽加左右 padding、border，**不含 margin**。布局占用空间还受外边距折叠、定位、布局模式影响，不能把所有值相加称为所有情况下的“实际宽高”。

### H03 视频与音频标签

**纠错。** 属性拼写为 `preload`，它是加载提示，取 `none`、`metadata`、`auto`；浏览器可以调整策略。`autoplay` 不保证播放成功，带声音的自动播放通常受限制；JS 调用 `play()` 要处理 Promise 拒绝。`controls` 提供原生控制，`track` 可提供字幕。

```html
<video controls preload="metadata" poster="cover.webp" width="640" height="360">
  <source src="lesson.mp4" type="video/mp4" />
  <track kind="captions" src="lesson-zh.vtt" srclang="zh" label="中文字幕" />
  你的浏览器不支持此视频，请使用下载入口。
</video>
```

`audio` 可嵌套 `source`；`poster` 是视频属性。[MDN video](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video)

### H04 HTML5 新增内容

**回顾。** 可从语义元素、音视频、表单控件与校验、Canvas 说起。Web Storage 等常被一起讨论的 Web API 并非全都属于 HTML 语言本身；“HTML5”是历史称呼，现行 HTML 持续演进。[HTML 标准](https://html.spec.whatwg.org/multipage/)

### H05 语义元素

**纠错。** `main` 是主要内容，`nav` 是主要导航，`article` 是可独立分发的内容，`section` 是通常带标题的主题分区，不能简单等同于 `div`。`header`、`footer` 可属于页面或某个分区；`figure` 不限于“上图下字”。`dialog.showModal()` 可打开模态对话框，并不要求先写 `open`。[HTML 元素语义](https://html.spec.whatwg.org/multipage/sections.html)

### H06 CSS3 特性

**纠错。** 原文拼写 `border-radios`、`border-shadow` 错误，应为 `border-radius`、`box-shadow`。还可说明渐变、媒体查询、transform、transition、animation、Flex/Grid。CSS 按模块发展，答题时说明解决什么问题比背“CSS3 属性清单”更有用。[MDN CSS 参考](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)

### H07 清除浮动

**更新。** 容器需要包住内部浮动时首选 `display: flow-root`，明确建立 BFC，又不必裁掉溢出。兼容旧布局可使用 clearfix。固定高度会限制内容；`overflow: hidden/auto` 有裁剪或滚动副作用。浮动并未“回到普通流”，只是 BFC 的高度计算包含内部浮动。[MDN BFC](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Block_formatting_context)

```css
.float-container { display: flow-root; }
/* 旧布局可选 */
.clearfix::after { content: ""; display: block; clear: both; }
```

### H08 定位属性的区别

**纠错。** `static` 正常流；`relative` 保留原占位再偏移；`absolute` 脱离正常流，依包含块定位；`fixed` 通常依视口，但 transform 等祖先也可能建立其包含块；`sticky` 保留占位，依最近滚动机制祖先与包含块限制发生粘滞。`absolute` 不是固定“相对父元素”。[MDN 包含块](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Containing_block)

### H09 子元素在父元素中居中

**纠错。** 不要求父子都固定宽度。水平居中的块可指定宽度或 `max-width` 后 `margin-inline: auto`；行内内容可用 `text-align: center`；两轴居中可用下面的 Grid。父容器需有可用高度，两轴居中才有视觉空间。

```css
.parent { display: grid; place-items: center; min-height: 12rem; }
```

### H10 border-box 与 content-box

**纠错。** `border-box` 的 width/height 包含 padding、border，`content-box` 不包含；两者均不包含 margin。`border-box` 是标准 CSS 行为，不等于浏览器运行在怪异模式。[MDN box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing)

### H11 元素垂直居中

**纠错。** 单行文字可用合适的 `line-height`；通用容器用 Flex 的 `align-items: center` 或 H09 的 Grid。`vertical-align: middle` 适用于行内、行内块和表格单元格，不会让普通块自动居中；原文部分 `relative + translateY(-50%)` 写法缺少正确的定位参照。[MDN 居中布局](https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_cookbook/Center_an_element)

### H12 Chrome 小于 12px 的文字

**更新。** 不把某版本的最小字号当所有 Chrome 的固定行为。字号受用户偏好、平台与缩放影响，`transform: scale()` 仅缩小绘制结果，占位仍是缩放前的尺寸。正文应使用可读字号并尊重缩放；确有小装饰文字需求时核对目标环境，不能把禁用文本缩放当通用方案。

### H13 选择器、继承、优先级与伪类

**纠错。** 先比较来源、重要性和层等层叠条件，再比较特异性、作用域接近度、声明顺序。特异性按 ID／类、属性、伪类／类型、伪元素的元组比较，不是会十进制进位的 100/10/1 分数；`:where()` 为零，`:is()`、`:not()`、`:has()` 依参数决定特异性。`color`、`font` 等通常继承；`text-decoration` 不是继承属性，装饰线的传播不能当继承。[层叠](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction)、[特异性](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity)

### H14 大量图片加载慢

**更新。** 先从网络瀑布定位尺寸、体积、解码、服务器或失败重试问题。提供合适尺寸与现代格式，声明宽高避免布局跳动，屏外图 `loading="lazy"`，首屏关键图正常加载并视需要设置优先级，配合缓存和 CDN。不要给首屏 LCP 图片懒加载，也不要盲目预加载全部图片。[MDN 响应式图片](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images)

### H15 行内与块级元素

**纠错。** HTML 元素的语义与 CSS `display` 是两件事。`div` 默认 block，`span` 默认 inline；非替换行内盒的 width/height 通常不起作用，`img`、`input` 等替换元素不能套用该结论。任意元素改变 display 不会自动改变语义。[MDN display](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display)

### H16 标准模式与怪异模式

**纠错。** 浏览器有 no-quirks、limited-quirks 和 quirks 模式；怪异模式用于历史兼容，不是“浏览器任意解析”。使用 `<!doctype html>` 触发标准模式；`document.compatMode` 可辅助检查。模式影响部分布局规则，不能只用 `box-sizing` 概括。[MDN 怪异模式](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Quirks_mode_and_standards_mode)

### H17 margin 与 padding

**回顾。** 边框外留白用 margin，内容与边框之间的距离用 padding。背景通常绘制到 padding/border 区域；padding 可扩大可点击内容区域，margin 不会。普通流的块级垂直 margin 还可能折叠。

### H18 Flex 属性

**回顾。** 容器：`flex-direction`、`flex-wrap`、`justify-content`、`align-items`、`align-content`、`gap`；项目：`flex-grow`、`flex-shrink`、`flex-basis`、`align-self`、`order`。属性拼写是 `align-items`，多行的 `align-content` 不等于每个项目的交叉轴对齐。[MDN Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts_of_flexbox)

### H19 标签禁用

**纠错。** `disabled` 只对支持它的表单控件等生效，并非给任意标签加属性都禁用。链接或自定义控件需处理点击和键盘行为；`aria-disabled="true"` 仅声明语义，仍需阻止操作并保留合适的焦点策略。`pointer-events: none` 也不能阻止键盘调用。[MDN disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/disabled)

### H20 Flex 布局原理

**回顾。** 将直接子项放入一维主轴，按 basis 形成初始尺寸，再按 grow/shrink 分配剩余或不足空间，最后执行对齐。主轴不必水平；`flex: 1` 也不能自动解决长文本的最小内容尺寸，必要时为项目设置 `min-width: 0`。

### H21 px、em、rem

**纠错。** CSS px 是参考像素，不等于一个物理屏幕像素。rem 依根元素字号；em 用在 `font-size` 上依继承字号，用在其它长度上通常依本元素计算字号。`1rem=16px` 仅是常见默认，用户或样式均可改变；给 body 写 62.5% 不会改变 rem 的根参照。[MDN 长度单位](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length)

### H21a 附题：媒体查询

**补答。** 根据视口、输入能力或用户偏好应用样式，例如窄屏改变列数、`prefers-reduced-motion` 降低动画。断点来自内容何时装不下，不必按具体手机型号枚举。

```css
.columns { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
@media (max-width: 48rem) { .columns { grid-template-columns: 1fr; } }
```

### H21b 附题：rem 的缺点

**纠错。** rem 本身不会让小屏文字自动变小；只有把根字号随视口缩放才会如此。全站共用根字号会耦合尺寸，复杂场景应组合 rem、百分比、Flex/Grid、`clamp()` 和容器查询，正文优先保证可读性。

### H22 网页三层结构

**回顾。** HTML 表达内容与语义，CSS 负责表现，JavaScript 实现交互。组件文件可以将三者放在一起，职责仍可清楚分离；是否拆成三个文件不是判断标准。

## 布局与浏览器

### H25 兼容性问题举例

**补答。** 原文没有答案。可选三个实际案例：新 CSS 用 `@supports` 提供降级；新 JS 语法通过编译处理，缺少 API 则按需 polyfill；媒体编码和触摸交互做能力检测与真机验证。说明目标浏览器、复现、修复和验证结果，不背已退出支持范围的 IE hack。

### H26 水平和垂直居中

**补答。** 采用 H09、H11 的 Grid/Flex 方案；若使用绝对定位，父容器需建立包含块，子项 `top/left: 50%` 加 `transform: translate(-50%, -50%)`，百分比位移分别参考包含块与自身，不是相同参照。

### H27 两边固定、中间自适应

**回顾。** 优先 Grid，内容可能很长时允许中列缩小；窄屏另设一列，避免把桌面三栏硬挤进手机。

```css
.layout { display: grid; grid-template-columns: 12rem minmax(0, 1fr) 14rem; gap: 1rem; }
@media (max-width: 50rem) { .layout { grid-template-columns: 1fr; } }
```

### H28 doctype

**补答。** `<!doctype html>` 是文档前导声明，用于让浏览器按标准模式处理；它不是普通 HTML 标签，也不负责下载某个 DTD 或启用所有新 API。

### H29 HTML 拖放 API

**纠错。** 正确事件为 `dragstart`、`drag`、`dragend` 与目标上的 `dragenter`、`dragover`、`dragleave`、`drop`。通过 `DataTransfer` 读写数据；目标通常要在 `dragover` 中 `preventDefault()` 才允许 drop。需要触摸和键盘支持时还要设计替代操作。[MDN HTML Drag and Drop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

### H30 HTML 语义化

**回顾。** 根据内容选择元素：操作用 button、导航用 a、标题用 h1—h6、数据表格用 table。可访问性和搜索理解受益，但语义标签不自动保证 SEO 或键盘可用；仍需可访问名称、焦点顺序和正确结构。

### H31 Web 性能优化

**更新。** 用真实用户数据和实验室测试确定瓶颈；按 LCP、INP、CLS 分别优化关键资源/服务器、主线程长任务、布局稳定性。移除无用代码、按路由分包、压缩传输、响应式图片和缓存都有价值。AppCache manifest 已淘汰；离线可评估 Service Worker，但缓存失效与更新逻辑需要设计，不能把 localStorage 当 HTTP 缓存。[Web Vitals](https://web.dev/articles/vitals)

### H32 浏览器缓存

**补答。** 新鲜响应可直接使用；过期响应按 `ETag/If-None-Match` 或 `Last-Modified/If-Modified-Since` 验证，未变化返回 304。`no-cache` 表示复用前验证，`no-store` 才是不存储；`max-age` 优先于 Expires。带内容哈希的静态文件适合长缓存，HTML 常需要重新验证。[MDN HTTP 缓存](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching)

### H33 输入网址到页面显示

**纠错。** 可依次说明 URL/导航处理、缓存或 Service Worker、DNS（可复用缓存）、建连、HTTP 请求响应、HTML 流式解析、子资源、DOM/CSSOM、样式、布局、绘制与合成。HTTPS 还涉及 TLS；HTTP/3 基于 QUIC，不是 TCP；连接可以复用，不会每个 URL 都新开线程、远程 DNS 和 TCP 再关闭。[MDN 页面如何工作](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work)

### H34 画 0.5px 线

**纠错。** 可以直接声明 `border: .5px solid` 并检查目标设备，也可用 1px 伪元素配合 `scaleY(.5)` 和 `transform-origin`。它是 CSS 尺寸，最终光栅化取决于 DPR。原文禁用用户缩放的 viewport 不是画线方法，也不应限制用户放大。

```css
.hairline::after {
  content: ""; display: block; height: 1px; background: currentColor;
  transform: scaleY(.5); transform-origin: 0 0;
}
```

### H35 JS 与 CSS 动画

**纠错。** CSS 适合状态过渡/关键帧，JS 适合复杂交互与计算，Web Animations API 也是选项。性能主要取决于改变的属性及浏览器能否合成：transform/opacity 通常较友好，但不保证永不绘制。JS 用 `requestAnimationFrame`，避免每帧反复读写布局；CSS 动画也可能触发布局。[MDN 动画性能](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/CSS_JavaScript_animation_performance)

### H36 外边距折叠

**纠错。** 普通流块级垂直相邻外边距可能折叠；正值取最大、负值取最负，混合取最大正值加最负值。不是取两个负值绝对值后得到正数。Flex/Grid 项之间不发生这种折叠；创建 BFC 可阻止特定父子折叠。[MDN margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Margin_collapsing)

### H37 浮动清除

**纠错。** 参见 H07。`::after` 生成的是所属元素的伪元素，不是 DOM 中“它后面最近的元素”；`overflow` 产生包含内部浮动的 BFC，并未恢复浮动元素的普通流地位。

### H38 选择器与优先级

**纠错。** 采用 H13 的层叠规则。内部样式与外部样式不自带高低优先级；相同条件才由声明先后决定。用户 `!important` 可覆盖作者 `!important`，过渡值还有特殊位置，原文“important 永远最高”不成立。

### H39 CSS 动画实现

**回顾。** transition 在可插值属性的状态变化间过渡；animation 通过 keyframes 定义时间序列。优先选择对布局影响小的属性，兼容 `prefers-reduced-motion`，不为所有元素常驻 `will-change`。

```css
.badge { transition: transform 160ms ease; }
.badge:hover { transform: translateY(-2px); }
@media (prefers-reduced-motion: reduce) { .badge { transition: none; } }
```

### H40 垂直居中

**纠错。** 参见 H11。表格单元格使用 `vertical-align: middle`，不存在 `vertical-align: center` 这个取值。

### H41 文本溢出

**补答。** 单行省略需约束宽度、禁换行并裁剪；`text-overflow: ellipsis` 单独写不够。多行截断应核对 line-clamp 兼容性，完整内容还要有可访问的阅读途径。[MDN text-overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-overflow)

```css
.summary { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
```

### H42 新 CSS 能力

**更新。** 除旧文的 Flex、Grid、变量外，可举容器查询、`:has()`、cascade layers 和逻辑属性。先说自己使用过的场景、回退与目标浏览器，不把“新”当作必须引入的理由。[MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

### H43 overflow 原理

**纠错。** `visible` 允许溢出；`hidden` 裁剪但可程序滚动；`clip` 裁剪且不产生滚动容器；`auto/scroll` 提供滚动机制。对普通块而言，值不是 visible 或 clip 时通常建立 BFC；“所有非 visible 都建立 BFC”漏掉了 clip。若只想建立 BFC，请使用 `flow-root`。[MDN overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow)

### H44 CSS 定位

**纠错。** 参见 H08。sticky 需要对应方向的非 auto 偏移（如 top），还受滚动祖先和容器边界约束；祖先 overflow 会改变参照。`inherit` 是通用继承关键字，不能把它与五种定位模式混为同一级分类。
