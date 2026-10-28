---
title: 阿里第一期：CSS 104 题解析与实作
sidebar_label: CSS（104题）
sidebar_position: 3
toc_max_heading_level: 2
---

对应[完整原文](../sources/ali-1.md)第 26—82 页。2.23 在原文写成“23.”，2.101 只在正文出现；此处完整覆盖，不按有缺项的目录漏题。

## 2.1 CSS 盒模型

原文第 26—27 页。content、padding、border、margin 是四个区域。`content-box` 的 width 指内容宽度，`border-box` 包括内容、内边距和边框，二者都不含 margin。**纠错：**现代标准支持两种 box-sizing，border-box 不能等同于“只有 IE 的非标准模式”；有 DOCTYPE 也可显式用它。[MDN：盒模型](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Introduction)。

## 2.2 CSS 选择器

原文第 27 页。类型、类、ID、属性、伪类、伪元素与通配选择器可用组合器连接；空格表示后代，`>` 表子元素，`+` 表紧邻后继兄弟，`~` 表后续兄弟。**纠错：**`>` 不是“相邻后代”。现代还需理解 `:is()`、`:where()`、`:not()`、`:has()`，按目标版本查支持。[MDN：选择器](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors)。

## 2.3 before/after 的冒号

原文第 27—28 页。新代码用 `::before`、`::after`，单冒号只为兼容少数历史伪元素保留。它们生成元素内部的首/尾伪元素，通常需设置 content。**纠错：**并不保证 after 永远盖住 before，位置、z-index、格式化和层叠上下文都可能改变绘制顺序。[MDN：伪元素](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)。

## 2.4 伪类与伪元素

原文第 28 页。伪类匹配已有元素的状态或结构条件，如 `:hover`、`:nth-child()`；不只动态状态。伪元素代表元素的一部分或生成盒，如 `::first-line`、`::before`；不是可以直接用 querySelector 取得的普通 DOM 节点。

## 2.5 哪些属性继承

原文第 28—29 页。color、字体、line-height、text-align 等通常继承；margin、border、width 通常不继承。以属性参考的 Inherited 字段为准。`inherit` 强制取父元素计算值，`initial` 回到初始值，`unset` 按是否继承选择；根元素没有可继承的父值。[MDN：继承](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Inheritance)。

## 2.6 CSS 优先级

原文第 30—31 页。**纠错：**先看声明是否适用、来源与重要性、层叠层等，再在可比范围内比较 specificity；还可能有作用域接近性，最后才是顺序。选择器用 ID、类/属性/伪类、类型/伪元素三元组字典序比较，不作十进制进位；内联样式另有层叠位置。`!important` 不是永远最高，也不是特殊性的一位；过渡等有不同层叠位置。`:where()` 为零，`:is/:not/:has` 取参数中最强选择器。[MDN：specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity)。

```css
/* 在同一来源、层和重要性下比较 */
#panel a { color: blue; }      /* 1-0-1 */
.panel .item a { color: red; } /* 0-2-1：不会因“类很多”进位成 ID */
:where(#panel) a { color: green; } /* 0-0-1 */
```

## 2.7 LVHA

原文第 31 页。相同特殊性下常按 link → visited → hover → active 声明，便于后状态覆盖前状态。不是语法强制顺序。键盘交互还应提供 `:focus-visible`；visited 可设置的属性受隐私限制，不可拿它读取用户历史。

## 2.8 常见伪类

原文第 31—32 页。区分 `:nth-child()` 在全部兄弟中计数与 `:nth-of-type()` 在同类型中计数；`:target` 对应 URL 片段目标，**不是泛指当前活动元素**；`:enabled` 是可用，`:disabled` 是禁用。`:empty` 对实际文本节点的处理要按规范/实现理解，不把 CSS 生成内容算作 DOM 子节点。[MDN：伪类](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)。

## 2.9 如何居中

原文第 32—35 页。二维居中优先 Grid 的 `place-items:center` 或 Flex 的双轴对齐。普通块的水平 auto margin 需有剩余空间；`text-align:center` 对齐行内内容，不直接居中任意块盒。绝对定位用 50% 加 translate 时，要分清前者相对包含块、后者相对自身。[MDN：居中元素](https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_cookbook/Center_an_element)。

```css
.center-area { display: grid; place-items: center; min-block-size: 16rem; }
```

## 2.10 display

原文第 35 页。要同时谈外部参与方式和内部布局：block/inline 是外部，flow/flex/grid 等影响内部；`inline-block` 可理解为 inline flow-root。`none` 不生成盒，`contents` 则去掉元素自身盒但保留子盒，语义/可访问性需实测。不能把 block 简化成“始终父宽”。[MDN：display](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display)。

## 2.11 relative、absolute 与 fixed

原文第 35—36 页。relative 从正常布局位置偏移且保留原空间；absolute 脱离普通流，依据包含块定位。**纠错：**包含块不仅可由最近非 static 祖先建立，transform、contain 等也可建立。fixed 通常对视口，但某些祖先会改变其包含块，见 2.20。[MDN：包含块](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Containing_block)。

## 2.12 CSS 新能力

原文第 36 页。可结合真实项目说明 Flex/Grid、媒体查询、变换、过渡/动画、渐变、变量、容器查询等。CSS 按模块发展，没有一个“CSS3 之后统一版本号”供罗列；不要把私有反射属性当成跨浏览器标准。重点是用了什么、为何适合、如何回退。

## 2.13 Flexbox

原文第 36—37 页。一维布局沿主轴分配空间，交叉轴对齐。**纠错：**主轴不恒为水平，取决于 flex-direction 和 writing-mode；只有参与布局的直接子盒成为 flex 项，绝对定位子项不参与伸缩。flex-shrink 分配还考虑基础大小，不能只按比例均分；auto 最小尺寸可能阻止收缩，必要时设 `min-width:0`。[MDN：Flex 基础](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)。

## 2.14 CSS 三角形

原文第 37—38 页。零宽高盒的边框在角处相接，三边透明、一边着色形成三角形。透明并非不存在，仍占对应边框尺寸。代码见同题型 2.103；原文合并了空格的颜色值不能直接复制。

## 2.15 满屏品字布局

原文第 38 页。可用两列两行 Grid，上方跨两列，下方两个单元。`100dvh` 跟随动态视口，`100vh` 作回退；内容多时允许滚动，不能强行裁掉。

```css
.pin {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: 1fr 1fr;
}
.pin > :first-child { grid-column: 1 / -1; }
```

## 2.16 多列等高

原文第 38 页。Flex 默认交叉轴 stretch 或同一 Grid 行都能让项目等高，前提是相应尺寸为 auto 等符合拉伸条件。原文超大 padding/负 margin 是历史模拟技巧，会影响溢出与锚点，现代无须优先采用。背景等高与内容真实等高也应区分。

## 2.17 浏览器兼容

原文第 38—40 页。**历史纠错：**IE6 双边距、PNG 和属性 hack 只用于明确的旧环境；缺 DOCTYPE 也可能让 Firefox 进入怪异模式。先做最小复现、查兼容表，再用标准替代、功能查询或必要 polyfill。不要为当前网站重新引入 `_property` 等语法 hack。[MDN：功能查询](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_conditional_rules/Using_feature_queries)。

## 2.18 li 之间空白

原文第 40 页。**纠错：**li 默认 list-item 不会因源代码换行就产生横向间隙，题目应假设改成了 inline/inline-block。行内盒之间的文本空白被排成空格；可用 Flex/Grid 加 gap，或明确移除空白文本。负 margin/字距依赖字体，不适合作通用修复。

## 2.19 为什么初始化样式

原文第 40—41 页。减少不需要的 UA 默认差异并建立排版基线。**纠错：**重置 CSS 不会天然伤害 SEO；真正风险是移除列表语义表现、焦点提示或让正文难读。只重置需要的部分，参考 HTML 篇 1.57。

## 2.20 包含块

原文第 41 页。它是计算尺寸和偏移的参照矩形，不是一定存在的直接父 DOM。普通流常取最近块容器/格式化上下文内容区域；absolute 通常取建立绝对定位包含块祖先的 padding 区域；fixed 通常取视口。**纠错：**根元素自身不等于初始包含块，transform、contain 等例外必须考虑。参见 2.11 的包含块文档。

## 2.21 visibility:collapse

原文第 41—42 页。表格行/列可收起占用空间，但尺寸参与等规则与 `display:none` 不完全相同；Flex 项还有保留交叉轴支撑尺寸的规范语义，其他普通元素通常如 hidden。**历史纠错：**不能沿用某个旧 Chrome“一律 hidden”的结论，跨表格/Flex 和浏览器需要实测。[MDN：visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/visibility)。

## 2.22 width:auto 与 100%

原文第 42 页。在普通非替换块布局中，auto 会按包含块空间和 margin/padding/border 算使用宽度；100% 指定相对包含块的百分比，content-box 时额外 padding/border 可能溢出。Flex/Grid、inline 和定位盒规则不同；不能把 auto 普遍等同于 100%。

## 2.23 定位与普通流的百分比

原文第 42 页“23.”。先确定真正包含块及其内容/padding 区域，再按具体属性解析，不能只找父元素。宽度相对包含块宽度，高度还需有可解析的确定尺寸；absolute 的包含块规则见 2.20，百分比 margin/padding 见 2.43。

## 2.24 Base64 图片

原文第 42—43 页。把图片嵌入 data URL 可免独立请求，但常增加编码大小、父文件解析与重复传输；不能独立缓存更新。原始 Base64 大约膨胀三分之一，传输压缩后实际差异另测。适合少量很小资源，不应把全部图片内联。[MDN：data URL](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data)。

## 2.25 display、position、float

原文第 43 页。display:none 时不生成盒；absolute/fixed 不参与普通浮动，盒的外部显示类型可能被块化；浮动盒也有块化规则。**补充：**Flex/Grid 项的 float 不改变其布局。不要记成单纯优先级覆盖表，应区分指定值、计算值和盒生成。[CSS Display：块化规则](https://drafts.csswg.org/css-display/#transformations)。

## 2.26 margin 折叠

原文第 43—45 页。普通块布局中某些相邻块的块轴外边距可折叠；正值取最大，含负值时最大正值与最小负值相加，全负取最负值。**纠错：**给兄弟之一设 flow-root/BFC 不会普遍阻止它与兄弟的外部 margin 折叠；父建 BFC 主要阻止与子级折叠。兄弟间可改用父 Flex/Grid + gap。max-height 也不是通用消除折叠开关。[MDN：外边距折叠](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Margin_collapsing)。

## 2.27 BFC

原文第 45—46 页。BFC 约束块布局与浮动交互，能包含内部浮动，并阻止自身与内部块 margin 折叠；`display:flow-root` 是直观建立方式。**纠错：**它不是让内外尺寸完全互不影响的“沙箱”。Flex/Grid 建立各自格式化上下文；`overflow:clip` 不单独建立 BFC，不能写成“只要非 visible 都建立”。[MDN：BFC](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Block_formatting_context)。

## 2.28 IFC

原文第 46 页。行内格式化上下文把行内级盒排入行框，按可用行内宽度换行，并处理空白、双向文本和垂直对齐。**纠错：**行框高度不仅是最高盒高度，也受基线、line-height、vertical-align 等共同决定；方向也不固定为左到右。[CSS2：行内格式化](https://www.w3.org/TR/CSS2/visuren.html#inline-formatting)。

## 2.29 为什么清浮动

原文第 46 页。普通父块的 auto 高度可能不包含浮动子盒，影响后续排版；`clear` 排开前方相关浮动，父 `flow-root` 则把内部浮动纳入自动高度。**纠错：**不是浮动子元素自己“高度塌陷”，也不能说浮动绝不影响块布局。新布局优先 Flex/Grid，围绕图片排文字仍可用浮动。

## 2.30 clear 原理

原文第 47 页。clear 通过 clearance 将盒移到指定侧相关前方浮动的下方，不删除浮动。**纠错：**前方可以同时存在左浮动和右浮动，clear:left 与 clear:both 当然不同，右浮动更高时差异很明显。clearfix 例子中的 CSS 注释必须用块注释，不能写 `//`。[MDN：clear](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clear)。

```css
.clearfix::after { content: ""; display: block; clear: both; }
/* 只要包含内部浮动时，也可以直接给父元素 display: flow-root */
```

## 2.31 zoom:1

原文第 47—48 页。**历史：**IE 的 zoom:1 曾触发 hasLayout 并修复若干浮动布局问题，不能类比成现代 BFC 的通用解法。**纠错：**现代 zoom 已进入标准并被多种浏览器支持，作用是缩放且影响布局，不再是 IE 独占；transform:scale 不同样改变布局占位。[MDN：zoom](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/zoom)。

## 2.32 媒体查询

原文第 48 页。按视口、指针、悬停、颜色偏好或减少动画等条件应用规则。采用移动优先、内容决定断点；不需要每种机型一个断点。media 不匹配也不应被当作“绝不会下载样式表”的保证。[MDN：媒体查询](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)。

## 2.33 Sass 与 Less

原文第 48 页。**补充：**两者都是生成 CSS 的工具，但语法、模块、类型/函数和生态并非没有区别。按团队和现有链路选；原生 CSS 自定义属性是运行时能力，Sass 变量通常构建时消失。回答自己的真实使用经历，不直接复制“团队都用 Sass”。[Sass 官方：模块](https://sass-lang.com/documentation/at-rules/use/)。

## 2.34 CSS 性能

原文第 48—50 页。减未使用 CSS、压缩传输、减少关键阻塞和大面积频繁布局/绘制，用 DevTools 定位。**纠错：**没有“长属性一定比简写快”“超过三层选择器就慢”“所有通配符都性能灾难”的普遍规则；选择器匹配成本也不是网络加载耗时。布局与视觉需求优先，按测量结果优化。[Chrome：选择器统计](https://developer.chrome.com/docs/devtools/performance/selector-stats)。

## 2.35 CSS 选择器如何匹配

原文第 50 页。对一个候选元素常从最右复合选择器向祖先/兄弟验证，浏览器还用索引和失效跟踪避免全树重复匹配。**边界：**“匹配规则”不等于 CSS 文件语法解析，也不是规范要求所有实现只有一种算法；不要据此推导出所有后代选择器都慢。参见 2.34。

## 2.36 奇数字号还是偶数字号

原文第 50 页。**历史纠错：**现代网页没有“只能用偶数”的规则，字号还可为小数或 rem。选可读字号、合适字体和行高，在目标屏幕与缩放下验证；旧点阵字体经验不能泛化为当前 Chrome 或高 DPR 屏幕的约束。

## 2.37 margin 与 padding

原文第 50—51 页。margin 控制外部间距且可为负，padding 是边框内留白并参与背景和点击区域，不能为负。普通块垂直 margin 可能折叠，padding 不折叠；Flex/Grid 中项目间距常用 gap。它们不是能任意互换的两个“空白值”。

## 2.38 样式模块拆分

原文第 51 页。按设计变量、基础规则、复用组件、页面业务划边界，控制选择器作用域与依赖方向。可用 CSS Modules、组件约定或 @layer 管理；不为每个声明单独造文件。回答时说明复用频率、命名、防泄漏和删除成本，并给真实案例。

## 2.39 all 属性

原文第 51 页。all 重设多数 CSS 属性，但不包括 direction、unicode-bidi 和自定义属性。**纠错：**除 initial/inherit/unset，还有 revert/revert-layer 等全局关键字；unset 不是“忽略浏览器和用户”，而是按继承性取继承值或初始值。对组件使用 all 时应重新保证 display、焦点和字体。[MDN：all](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/all)。

## 2.40 通配符重置

原文第 51—52 页。**纠错：**不能说一个 `*` 就导致大型站加载很久。更实际的问题是过宽规则会抹掉有用默认、增加覆盖和维护成本。`*, *::before, *::after { box-sizing:border-box; }` 是合理基线之一；margin/padding 是否清零应根据目标元素决定。

## 2.41 absolute 包含块边界

原文第 52 页。普通流常参照块容器内容区，absolute 常参照建立包含块祖先的 padding 区。可以是定位的行内祖先，也可能由 transform/contain 建立；不是只有 `position:relative` 的父节点。多行内联参照涉及片段规则，复杂情况用最小复现检查。共用完整规则见 2.20。

## 2.42 hasLayout

原文第 52 页。这是旧 IE 的内部布局概念，解释旧代码时可以谈触发条件与当时 bug，现代标准 CSS 没有同名可配置的通用布局开关。新站用明确的布局上下文与标准属性；不要为复现历史 API 加新依赖。参见 2.31。

## 2.43 竖向百分比参照谁

原文第 52 页。在常见水平书写模式中，height/top/bottom 参照包含块高度，margin/padding 的百分比通常参照包含块宽度（逻辑行内尺寸）。**补充：**还要检查该轴尺寸是否可确定；不是看到竖向就套高度。transform 的 translate 百分比又以自身参考盒为基准，另当别论。参见 2.20。

## 2.44 全屏滚动

原文第 52 页。**补答：**优先原生滚动与 CSS Scroll Snap，内容超屏仍允许阅读，避免劫持滚轮和键盘。容器设滚动高度与 `scroll-snap-type:y proximity`，各页设 `scroll-snap-align:start`；如果真需强制逐屏切换，再设计焦点、历史、触摸和中断逻辑。[MDN：Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap)。

```css
.slides { height: 100vh; height: 100dvh; overflow-y: auto; scroll-snap-type: y proximity; }
.slides > section { min-height: 100%; scroll-snap-align: start; }
```

## 2.45 响应式设计

原文第 53 页。弹性布局、合理 max-width、响应式图片、媒体/容器查询共同适应可用空间；viewport 声明是移动端基础。**补充：**不是只按屏幕分辨率切模板，也不只靠一个 meta。确需老 IE 时提供可读单列回退，支持范围写清，不能为历史兼容禁用缩放。

## 2.46 视差与滚入动画

原文第 53 页。**补答：**视差是图层相对滚动位移不同；滚入显示可以用 IntersectionObserver。每次进入触发就按 isIntersecting 切类；只出现一次则进入后保留类并 unobserve。减少动画偏好时直接显示，正文不要因观察器失败永远透明。[MDN：IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)。

```js
const once = true;
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    entry.target.classList.toggle('is-visible', entry.isIntersecting);
    if (once && entry.isIntersecting) observer.unobserve(entry.target);
  }
}, {threshold: 0.1});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

## 2.47 自动填充背景

原文第 53 页。`:autofill` 可匹配自动填充，部分浏览器仍需私有选择器；UA 为保护识别可能锁定某些颜色。内阴影覆盖只是视觉技巧，需测试暗色、强制颜色和可读性。不要用超长 transition 隐藏状态，也不要禁用自动填充来修颜色。[MDN：autofill](https://developer.mozilla.org/en-US/docs/Web/CSS/:autofill)。

## 2.48 小于 12px 的文字

原文第 53—54 页。**历史纠错：**某些旧中文 Chrome 的最小字号行为不是当前所有平台定律。按用户字号偏好设计可读文本，直接设置合理 font-size；transform 缩放不会缩小布局占位，还损伤清晰度。不要把正文切成图片或用缩放规避用户可访问性设置。

## 2.49 字体变清晰、变细

原文第 54 页。优先选真实可用的字重、合适字体、字号与对比度。`-webkit-font-smoothing` 非标准且平台相关，只能影响部分环境的栅格化，不保证更清晰；不要把它作为跨平台变细方案。[MDN：font-smooth](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth)。

## 2.50 italic 与 oblique

原文第 54 页。italic 优先选字体设计的斜体，oblique 请求倾斜体及可选倾斜角度；字体缺失时可能合成或回退，具体匹配按字体规则。并非所有字体都把二者做成相同形状。[MDN：font-style](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style)。

## 2.51 像素、DPR、PPI

原文第 54—55 页。CSS px 是布局参考单位，物理像素是显示设备采样点；DPR 是设备像素与 CSS 像素的相关比例，页面缩放/显示器切换可改变它。PPI 是物理密度，不能只凭 PPI 推出分辨率；PC 也不恒为 DPR=1。捏合缩放与页面缩放的 DPR 行为不同。[MDN：devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)。

## 2.52 三种 viewport

原文第 55—56 页。布局视口用于布局，视觉视口是当前实际可见区域，缩放/软键盘可能改变它。ideal viewport 是历史移动适配的解释术语，不是第三个同等的标准 API。**纠错：**视觉视口尺寸以 CSS 像素表达，不应直接说成屏幕物理分辨率；980px 也是历史默认经验，不是固定规范值。[MDN：VisualViewport](https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport)。

## 2.53 Android fixed 无效

原文第 56 页。**纠错：**先检查 transform/contain 等祖先改变包含块、滚动容器、软键盘与嵌入 WebView 限制，不能一概归因 viewport 宽。基本声明为 `width=device-width, initial-scale=1`，不禁缩放。用真机复现；把浮层移到合适顶层容器通常比盲目加硬件加速有效。参见 2.20、2.52。

## 2.54 动画间隔是多少

原文第 56 页。**纠错：**60Hz 每帧约 16.7ms 是帧预算，不是固定最小定时间隔；120Hz 约 8.3ms，后台还可能暂停。视觉动画用 requestAnimationFrame，按回调时间戳计算进度，不能用帧数决定速度。[MDN：requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)。

```js
function move(element, distance, duration) {
  let started;
  function frame(now) {
    started ??= now;
    const progress = Math.min(1, (now - started) / duration);
    element.style.transform = `translateX(${distance * progress}px)`;
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
```

## 2.55 inline-block 间距

原文第 56 页。与 2.18 同题型：空白文本参与行内排版。现代列表用 Flex/Grid + gap；必须保留 inline-block 时可移除元素间空白，或父字号置零并显式恢复子字号。避免依赖固定负字距，它受字体和内容影响。

## 2.56 滚动不平滑

原文第 56—57 页。**历史纠错：**`-webkit-overflow-scrolling:touch` 是部分旧 iOS 的惯性滚动技巧，不能当通用硬件加速开关。滚动动画、滚轮响应、惯性是不同问题；先找长任务、非必要监听、嵌套滚动和绘制开销。`scroll-behavior:smooth` 影响程序/锚点滚动，不会自动修复卡顿。[MDN：scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)。

## 2.57 固定 100px 后填满剩余高度

原文第 57 页。**补充：**“剩余高度”要求容器有外部确定约束；若高度完全由内容决定，就没有固定剩余空间。容器用 Grid `100px minmax(0,1fr)` 或竖向 Flex，内容区 `min-height:0; overflow:auto`，防止最小内容高度撑破。

```css
.panel { height: 100dvh; display: grid; grid-template-rows: 100px minmax(0, 1fr); }
.panel > main { min-height: 0; overflow: auto; }
```

## 2.58 图片格式选型

原文第 57—59 页。照片可比较 JPEG/WebP/AVIF，透明无损图可比较 PNG/WebP，矢量图标用合适的 SVG，动画按需求选格式或视频。**历史纠错：**WebP 不再只限 Chrome/Opera；“PNG 永远比 JPEG/GIF 大”等无条件体积比较也不成立。SVG 含位图/滤镜时并不保证所有细节无限清晰，格式与编码参数要一起测。[MDN：图片格式](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types)。

## 2.59 检测 WebP

原文第 59 页。分清图片解码能力与 Canvas WebP 编码能力，toDataURL 测到的主要是后者，不能普遍代替前者。直接使用 `picture` 的 type 和 img 回退往往无需手写检测；若测动画/透明度，样例应包含该特征，不以一个静态样例推断全部能力。

```html
<picture>
  <source type="image/avif" srcset="cover.avif">
  <source type="image/webp" srcset="cover.webp">
  <img src="cover.jpg" width="800" height="450" alt="课程封面">
</picture>
```

## 2.60 Cookie 隔离

原文第 59 页。**纠错：**“跨域就绝不带 Cookie”错误，Cookie 的 Domain 可覆盖子域，且不按端口隔离。静态资源域应明确不接收业务 Cookie，避免宽 Domain；需要严格隔离时用独立站点域。JS fetch 可按需求设置 credentials，但跨源规则与普通图片/脚本请求不同，不能混用。[MDN：Cookie 范围](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies)。

## 2.61 style 放哪里

原文第 60 页。关键样式应尽早在 head 中被发现，避免迟到样式引发内容闪烁与布局变化；资源阻塞需按具体 stylesheet 和脚本顺序分析。**纠错：**不是所有浏览器一遇到尾部样式都按同一方式“停止之前渲染”。普通 style 的规范位置与性能是两件事，不靠浏览器纠错排版组织页面。

## 2.62 CSS 预处理与后处理

原文第 60 页。Sass/Less 编译扩展语法成 CSS；PostCSS 是解析并由插件处理 CSS 的平台，可做前缀、压缩、语法转换等。**纠错：**PostCSS 不等于 Autoprefixer，所谓前/后处理取决于流水线位置，不能说后处理器都只做前缀。[PostCSS 官方](https://postcss.org/)。

## 2.63 CSS Sprites

原文第 60—61 页。把多小图合在一张位图，靠背景位置选区域，可减少独立请求；代价是维护、重复下载、缩放与解码。**纠错：**合图不保证总字节减少，HTTP/2/3 下还需权衡缓存。矢量图标常可用 SVG symbol 或内联图形，无须无条件拼大图。

## 2.64 rem 布局

原文第 61 页。rem 相对根元素字号，适合统一比例与尊重文字缩放；不自动等于屏幕适配。**纠错：**它不天然与某品牌 DPR 冲突，也不必绑定屏幕分辨率；iframe 是自己的文档根字号。布局用 Flex/Grid、百分比、min/max 等，文本按可读性设 rem，不把整站机械等比例放大。

## 2.65 常见布局

原文第 61 页。**补答：**普通流适合文档，Flex 适合一维组件，Grid 适合二维区域，定位适合覆盖/装饰，float 适合文字环绕。选择依据是内容结构和变化方式。两栏/三栏/固定头尾的具体代码在 2.99—2.101，不以大量历史 hack 当布局分类。[MDN：CSS 布局](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout)。

## 2.66 0.5px 线

原文第 61 页。CSS 子像素最终要映射物理像素；DPR=2 时 0.5 CSS px 可能对应一个物理像素，DPR=1 无法保证同样效果。可用 1px 伪元素 scaleY(.5) 并设置变换原点。**边界：**别通过改全页 viewport 缩放画线，截图和不同 DPR 下都需检验。

```css
.hairline { position: relative; }
.hairline::after {
  content: ""; position: absolute; inset: auto 0 0;
  height: 1px; background: currentColor;
  transform: scaleY(.5); transform-origin: bottom;
}
```

## 2.67 transition 与 animation

原文第 61—62 页。**纠错：**二者都是对可动画属性随时间插值，不是 animation“作用于元素而非属性”。transition 由前后状态变化驱动；animation 用 keyframes 明确多段、迭代、方向等。缓动不只三次贝塞尔，还可 steps 等。减少动画偏好下提供静态状态。[MDN：CSS 动画](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)。

## 2.68 首选最小宽度

原文第 62 页。可用现代 min-content 理解：在允许的软换行处尽量断行时所需的固有行内尺寸。取决于脚本、空白处理、word-break/overflow-wrap 和不可断内容，不保证“中文永远恰好一个字宽”。不要用 break-all 随意破坏所有词的可读性。[MDN：min-content](https://developer.mozilla.org/en-US/docs/Web/CSS/min-content)。

## 2.69 height:100% 为什么无效

原文第 62 页。百分比通常需要包含块在相关轴上有可确定尺寸；普通内容撑开的 auto 高度未必可用。**补充：**Flex/Grid 的确定尺寸与拉伸有更细规则，不能只看父 CSS 是否写了像素；absolute 也有自身包含块/约束，不能说任何时候都成功。需填剩余空间时用 2.57 的布局。

## 2.70 min/max 与 width/height

原文第 62 页。尺寸使用值受 min/max 约束，若最大值小于最小值，最小约束通常优先。**纠错：**这不是 CSS 选择器“覆盖了 important”，而是不同属性参与尺寸算法；还要考虑 box-sizing、auto 最小尺寸、固有比例和可用空间。布局溢出时检查 min-width:auto，而不是不断提高选择器权重。

## 2.71 行内盒模型

原文第 62—63 页。区分元素生成的行内级盒、匿名行内盒、行框和包含它们的块容器。行框依据字体指标、行高、基线和垂直对齐容纳内容，不是一个真实 DOM 节点。**纠错：**可见字形边界不等同于 CSS 内容盒或 line-height，不能只量文字墨迹推算布局。

## 2.72 幽灵空白节点

原文第 63 页。这是解释行框 strut 的形象说法：块容器的字体与 line-height 给每一行提供基准影响。**纠错：**它不是 DOM 中真有一个隐藏文本节点，也不是 HTML5 特有的标签。图片下方间隙常来自基线排版，可针对图片设 `display:block` 或适合的 vertical-align。[CSS2：行高计算](https://www.w3.org/TR/CSS2/visudet.html#line-height)。

## 2.73 替换元素

原文第 63 页。内容表现不由普通 CSS 子盒排版控制、常有固有尺寸/比例的盒，例如 img、video、iframe。**纠错：**不等于“改属性就能替换内容”，也不意味着所有表单控件在所有规则中都一律替换，或永远 inline；display 可变成 block，外部尺寸与 object-fit 等仍可受 CSS 控制。[MDN：替换元素](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Images/Replaced_element_properties)。

## 2.74 替换元素尺寸

原文第 63—64 页。综合 CSS 宽高、HTML 尺寸提示、固有尺寸、固有比例与 min/max 计算。只确定一个轴时常能按比例求另一个轴，但约束可能改变结果。**纠错：**不是所有无尺寸元素都严格回退为 300×150，也不保证 CSS 尺寸总按 content-box；要看元素类型和 box-sizing。响应图片常写 `max-width:100%; height:auto` 并提供 width/height 稳定比例。

## 2.75 content 与替换

原文第 64 页。content 可生成文字、计数器或图像；生成图像可有替换内容行为，不能把所有生成文本都一律称为匿名替换元素。**纠错：**部分辅助技术能读到生成文本，不能断言永远不可读取；但重要内容仍应放 DOM，避免差异。生成内容不改变 `:empty` 的 DOM 判断，computed style 也可读取部分结果。[MDN：content](https://developer.mozilla.org/en-US/docs/Web/CSS/content)。

## 2.76 margin:auto

原文第 64—65 页。普通块行内轴上，两侧 auto 可平分剩余空间，块轴 auto 通常取 0；Flex/Grid 的 auto margin 有额外吸收自由空间规则，绝对定位又受四边约束影响。**纠错：**不能概括为 auto 在所有方向都平分，也不要求 width 必须 auto；固定宽度块的水平居中正是常见例子。

## 2.77 margin 为什么看似无效

原文第 65 页。先看是否适用于该盒，再看折叠、auto 算法、方向与容器约束。非替换 inline 的垂直 margin 不影响行框，table-row/table-cell 有适用性限制。**纠错：**绝对定位未写某方向不代表那个 margin 永远无效；固定高度父元素也不等于子 margin-bottom 没有计算值，要区分占位、溢出与可见效果。

## 2.78 border 特点

原文第 65 页。边宽不支持百分比，默认 style 为 none，默认颜色用 currentColor。背景定位区域由 background-origin 控制，默认 padding-box；背景绘制/裁剪区由 background-clip 控制，默认 border-box。**补充：**不同像素密度下 double 的栅格化不能用一个整数口诀保证。[MDN：border](https://developer.mozilla.org/en-US/docs/Web/CSS/border)。

## 2.79 基线与 x-height

原文第 65—66 页。基线是字体排版的对齐参考，不应严格等同某个字形的可见下边缘；不同文字系统还有不同基线。x-height 反映小写 x 的高度，ex 与字体相关，换字体/字号也会改变。vertical-align:middle 的参考见 2.81，**不是任意盒的几何中心**。

## 2.80 line-height

原文第 66—67 页。影响行框高度；无单位数通常作为倍数继承，再乘子元素字号，百分比/长度则可能继承已经计算出的长度。**纠错：**可设置小数；最终行框不是简单取最大 line-height，基线差、对齐与替换盒均可增高。可见字形还能超出行高，设置很小不代表自动裁掉文字。[MDN：line-height](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/line-height)。

## 2.81 vertical-align

原文第 67 页。用于行内级盒和表格单元格，不是通用块居中器。行内 middle 把盒中心与父基线加半个 x-height 对齐；百分比相对该元素 line-height。表格单元格的 middle/top 等按表格规则处理；Flex 项应用 align-items/align-self。[MDN：vertical-align](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/vertical-align)。

## 2.82 overflow

原文第 67—68 页。hidden 裁剪内容、一般仍是可编程滚动容器；clip 不建立滚动容器，裁剪边界可由 overflow-clip-margin 调整。默认常规裁剪区域应按 padding box 等规则分析，不叫“padding-box 内边缘”。**纠错：**覆盖式滚动条不一定占布局宽度，也不只 html/textarea 能滚动；普通 div 也可以。[MDN：overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow)。

## 2.83 无依赖绝对定位

原文第 68 页。这是四个 inset 仍为 auto 时利用 static-position 的俗称；元素已脱离普通流，静态位置参与自动偏移算法。**补充：**不是所有布局下都恰好等于它原来的位置，Flex/Grid 等各有静态位置规则。需要明确锚定时显式设置 inset，避免依赖偶然效果。

## 2.84 absolute 与 overflow

原文第 68 页。**历史纠错：**需同时看包含块链、裁剪祖先和滚动溢出区域。不能保证 overflow:auto 永远不因绝对定位子项出现滚动条，也不能沿用旧 Chrome“transform 让裁剪失效”的结论。常规组件可给同一容器 position:relative 与 overflow:hidden，但弹层若需逃离裁剪应放合适层级或使用对应顶层机制。

## 2.85 clip 与可访问性隐藏

原文第 68 页。**纠错：**clip 已废弃且只适用于特定定位盒，不是任何元素任何场景的万能属性；优先用合适的 clip-path 与经过验证的 visually-hidden 组合。只在有需求时保留辅助技术可读内容，聚焦的可操作元素必须可见。不要对聚焦元素永久裁切。[MDN：clip](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clip)。

```css
.visually-hidden:not(:focus):not(:active) {
  position: absolute; width: 1px; height: 1px;
  padding: 0; border: 0; margin: -1px;
  overflow: hidden; white-space: nowrap; clip-path: inset(50%);
}
```

## 2.86 relative 的偏移

原文第 68—69 页。偏移相对正常位置，百分比参照包含块相应轴；移动视觉位置不释放原空间。top/bottom 同时非 auto 时通常 top 优先；left/right 冲突受 direction 等规则影响，不能只说“永远左优先”。不确定高度下百分比的处理按定位规范，避免把所有情况写成零。

## 2.87 层叠上下文

原文第 69 页。它把内部后代作为整体参与父上下文的绘制顺序，子项的大 z-index 不能跨过父上下文的层级。常见触发包括定位且 z-index 非 auto、fixed/sticky、opacity 小于 1、transform、isolation 等。**纠错：**建立上下文不等于天然高于所有普通元素，也不再有原文固定定位的旧 Firefox/Chrome 对立。[MDN：层叠上下文](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Stacking_context)。

## 2.88 层叠水平

原文第 69 页。它是在同一层叠上下文内决定先后的一部分，不能把不同上下文中两个后代的 z-index 直接比较。先找共同祖先上下文，再比较各自上层整体的位置。遇到被盖住的弹层，检查祖先上下文与裁剪，单纯加到 999999 不保证成功。

## 2.89 层叠顺序

原文第 69 页。**补答：**在普通 CSS2 类场景，可按上下文背景/边框 → 负层级定位后代 → 流内块盒 → 浮动 → 行内内容 → 零层级定位/上下文 → 正层级定位上下文理解；各组内部还有树顺序规则。顶层元素与现代布局有额外规定，不能只画七层图覆盖一切。[CSS2：绘制顺序](https://www.w3.org/TR/CSS2/zindex.html)。

## 2.90 层叠准则

原文第 70 页。在同一上下文和相同绘制类别中，较大层级通常在上，完全同级时树顺序影响先后。**补充：**先判上下文和绘制组，再谈谁大谁上/后来居上；Flex/Grid order 等也会影响相应绘制顺序，不能仅看 DOM 序和局部 z-index。

## 2.91 font-weight

原文第 70 页。**纠错：**现代数值范围允许 1—1000，不只 100—900 的整百数；可变字体可提供连续字重。静态字体缺少所需字重时按匹配/回退规则选择，写 550 不保证实际存在 550 字体。[MDN：font-weight](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-weight)。

## 2.92 text-indent

原文第 70 页。通常缩进块容器内第一行的行内内容，可继承，百分比参照包含块行内尺寸；不用于把普通 inline 盒作为整体推开。**补充：**表单控件有不同内部渲染，不能靠“button 行、input 不行”的口诀做全平台布局；用 padding 调整控件留白更直接。[MDN：text-indent](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-indent)。

## 2.93 letter-spacing

原文第 70—71 页。控制排版字符间的附加间距，可继承、可为负/小数，normal 允许排版系统的默认处理，与显式 0 不完全等价。**纠错：**大负值不是可靠“反向排列”算法，也不能保证所有情况下第一行至少完整显示一个字符。支持的值与排版语言要按兼容表检查。[MDN：letter-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing)。

## 2.94 word-spacing

原文第 71 页。调整排版词分隔间距，可继承、可为负；其作用对象受语言、分隔符与 white-space 规则影响。不能用它精确布局组件，非断行空格和普通折叠空格也应区分；项目间距用 gap/margin。[MDN：word-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing)。

## 2.95 white-space

原文第 71 页。normal 折叠空白并自动换行，nowrap 折叠且不软换行；pre 保留空白仅按保留换行，pre-wrap 保留并允许软换行；pre-line 折叠空白但保留换行且允许软换行。**纠错：**pre-line 并非“只在换行符处换行”。长连续串仍可能需要 overflow-wrap；break-spaces 等另查需求。[MDN：white-space](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)。

## 2.96 隐藏背景图会下载吗

原文第 71—72 页。**历史纠错：**不能把旧测试表当规范承诺。HTML img 常被预加载扫描器提前请求，display:none 不是可靠延迟下载机制；CSS 背景是否请求受命中、可见性、时序和实现优化影响。要保证延迟资源发现，就在需要时才提供 URL；真实图片可按需求用 loading=lazy 并实测 Network。

## 2.97 单行/多行省略

原文第 72 页。单行需可约束宽度、nowrap、overflow hidden 与 text-overflow。多行可用当前广泛实现的 WebKit line-clamp 组合，注意兼容范围。**纠错：**原文固定高度后画一个“...”无论是否溢出都出现，不能作为准确通用省略。重要信息要能展开/访问，不能只靠悬浮 title。

```css
.one-line { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.three-lines {
  display: -webkit-box; -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; overflow: hidden;
}
```

[MDN：line-clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/line-clamp)。

## 2.98 隐藏方式

原文第 72 页。display:none 不留布局盒且通常不进可访问树；visibility:hidden 留空间但不可交互；opacity:0 保留布局、命中和可访问性，不能独立作安全隐藏。**纠错：**程序 dispatchEvent 不因这些视觉隐藏就必然失效，“不响应绑定事件”应限于正常用户命中。裁剪/移屏未必移除键盘焦点；负 z-index 不保证隐藏，交互控制可评估 hidden/inert。[MDN：inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert)。

## 2.99 上下固定，中间自适应

原文第 73—74 页。先分清固定高度与 fixed 定位。若是满视口头尾各 100px、中间独立滚动，Grid 最直接；minmax(0,1fr) 允许中间轨道缩小，否则内容最小尺寸可能撑破。

```css
.app-shell {
  height: 100vh; height: 100dvh;
  display: grid; grid-template-rows: 100px minmax(0, 1fr) 100px;
}
.app-shell > main { overflow: auto; min-height: 0; }
```

## 2.100 两栏布局

原文第 74—76 页。左侧固定、右侧自适应可用 Grid 或 Flex；自适应列需允许缩至 min-content 以下时用 minmax(0,1fr)/min-width:0。窄屏可切单列，不让固定侧栏挤没正文。

```css
.two-columns { display: grid; grid-template-columns: 200px minmax(0, 1fr); gap: 1rem; }
@media (max-width: 40rem) { .two-columns { grid-template-columns: minmax(0, 1fr); } }
```

## 2.101 三栏布局

原文第 76—80 页，目录漏项。左右固定、中间伸缩可用以下 Grid；圣杯/双飞翼是历史浮动和负 margin 方案，需要明确最小宽度与源顺序。**纠错：**原文比较圣杯与双飞翼时两次写同一名称，不能据此得出“某方案任何宽度都不会溢出”。

```css
.three-columns {
  display: grid; gap: 1rem;
  grid-template-columns: 100px minmax(0, 1fr) 200px;
}
@media (max-width: 48rem) { .three-columns { grid-template-columns: minmax(0, 1fr); } }
```

## 2.102 自适应正方形

原文第 81 页。**纠错：**`width:10%; height:10vw` 的百分比与视口参照不同，父宽不等视口就不是正方形。现代直接用 aspect-ratio；至少一个轴要自动解析，边框/内边距和内容最小尺寸也需考虑。

```css
.square { width: 30%; aspect-ratio: 1; box-sizing: border-box; }
```

[MDN：aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/aspect-ratio)。

## 2.103 三角形实现

原文第 81 页。与 2.14 共用原理；以下是向上的三角形。纯装饰用伪元素即可，有重要含义时仍要给文本或可访问名称。

```css
.triangle {
  width: 0; height: 0;
  border: 20px solid transparent;
  border-top: 0; border-bottom-color: tomato;
}
```

## 2.104 2:1 自适应矩形居中

原文第 81—82 页。**纠错：**原例 width:10% 与 padding-top:20% 造成的宽高比例不符合 2:1，也混合了 padding 与零高度。用 Grid 居中与 aspect-ratio:2/1 分别解决位置和比例，容器留出内容空间。

```css
.ratio-stage { min-height: 20rem; display: grid; place-items: center; }
.ratio-box { width: min(80%, 40rem); aspect-ratio: 2 / 1; box-sizing: border-box; }
```

可在任意容器宽度下量取 `getBoundingClientRect()`，检查宽/高约为 2；带内容时也验证溢出，不能仅凭截图看起来相似。返回[本组说明](./index.md) · [HTML 与浏览器解析](./html-browser.md)。
