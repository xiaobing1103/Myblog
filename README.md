# 二姨的博客

基于 Docusaurus 3.10.2、React 18 和 MDX 3，发布在 GitHub Pages 的 `/Myblog/` 子路径下。

## 开发与预览

需要 Node.js **22.19 或以上版本**。统一使用 npm 和 `package-lock.json`。

```sh
npm ci
npm run start
```

访问 **http://127.0.0.1:3000/Myblog/**。终端需保持运行，启动脚本固定监听 IPv4 地址。

生产环境预览：

```sh
npm run build
npm run preview
```

预览服务提供异步 Brotli/gzip、PDF Range、HEAD、ETag 和真实的 404。HTML 使用 `no-store`，带内容哈希的资源缓存一年，未带哈希的脚本与 CSS 重新验证，其他资源缓存 600 秒。压缩缓存限制在 16 MiB，PDF 通过文件流读取。它用于本地验证，线上响应头由 GitHub Pages 控制。

如果升级前已打开网页，出现 `ChunkLoadError`，请先按 `Ctrl+Shift+R` 强制刷新，避免旧页面继续请求已更换的分块。不要同时在同一端口运行开发服务和生产预览。

PDF 页面使用本站托管的 **Mozilla PDF.js 6.4.299** 官方阅读器，支持中文界面、全文搜索、缩略图与目录、页码跳转、缩放、旋转、打印和下载，并提供全屏与独立阅读入口。扫描版 PDF 的搜索能力取决于文件是否包含文字层，不包含 OCR 功能。目前仓库缺少《Koa与Node.js开发实战》《图解HTTP》的文件，对应页面显示暂缺提示；其余 8 份文件可访问。

阅读器针对现代浏览器，PDF.js 核心、Worker、字体、CMap 和 WASM 均在 `static/pdfjs/`，不依赖外部 CDN，也不进入首页 JavaScript 包。外观及初始化适配位于 `static/pdf-reader/`；组件位于 `src/components/PdfReader/`。原始 PDF 下载入口可作为预览不兼容时的备用方式。

第三方文件和 Apache-2.0 许可证已随仓库保存。`npm run sync:pdfjs` 可从官方固定版本发布包恢复文件，脚本会验证 SHA-256，再注入本站外观配置。升级时一起更新脚本中的版本、发布包校验值与阅读器文件，并运行构建及 PDF 浏览器测试，勿单独替换 Worker。

新增 PDF 页面：

```jsx
import PdfReader from '@site/src/components/PdfReader';

<PdfReader src="pdf/example.pdf" title="文档标题" />
```

选型依据：[PDF.js 官方阅读器说明](https://mozilla.github.io/pdf.js/getting_started/)、[6.4.299 发布记录](https://github.com/mozilla/pdf.js/releases/tag/v6.4.299)。React-PDF 11 要求 React 19，本站仍使用 React 18，因此直接集成与 React 版本独立的官方阅读器。

## 验证

```sh
npm run check
npm run report
npx playwright install chromium
npm test
npm run profile
```

- `check`：检查构建页面引用的本地资源（含 iframe 和 PDF 链接），并验证升级前的页面地址仍存在。
- `report`：统计首页入口脚本（runtime + main）的原始与 gzip 体积，预算为 112 KiB；首页 HTML 预算为 20 KiB。不代表整个页面的网络下载量。
- `test`：验证原有页面、React 水合、移动端布局、深色模式、实时编辑器，以及 PDF 实际渲染、切换、翻页、缩放和搜索。
- `profile`：在预览服务运行时测量冷浏览器首页、文章页和 PDF 页，记录请求及传输量到 `reports/network-current.json`；首页预算为 14 个请求、160 KiB，文章页为 30 个请求、260 KiB。CI 自动执行这些预算检查。
- 如使用已安装的 Chrome，可设置 `CHROME_PATH` 指向浏览器可执行文件。

Lighthouse 需在 `npm run build` 和 `npm run preview` 后单独运行，避免与浏览器测试同时竞争 CPU：

```sh
npx lighthouse http://127.0.0.1:3000/Myblog/ --output=json --output-path=reports/lighthouse-mobile.json --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo
```

## 目录与性能策略

- `blog/`：文章、作者配置及随文图片。
- `docs/`：教程、小册、面试及资源文档。
- `src/theme/BlogListPage/`：首页摘要卡片，避免在列表渲染完整文章示例。
- `scripts/blog-metadata.cjs`：包装官方博客插件，首页及标签列表只注入摘要元信息，归档只注入标题、日期、地址；不下载文章 MDX 来显示列表。
- `scripts/performance-plugin.cjs`：关闭链接进入视口时的批量预取，保留官方的悬停与触摸预加载。这处适配和代码高亮适配都需在 Docusaurus 升级时复核。
- 文章页、文档导航、目录、搜索引擎元信息等使用官方主题。
- `src/theme/CodeBlock/`：代码进入视口后加载高亮；实时编辑器点击后加载。
- `scripts/defer-prism.cjs`：配合高亮组件，避免主题在首页预加载 Prism；升级 Docusaurus 时需验证这处适配。
- `src/components/`：视频和 CodeSandbox 点击后加载，避免第三方页面阻塞阅读。
- `scripts/remark-images.mjs`：编译时补齐本地图片尺寸、延迟加载属性，并修正旧 MDX 的段落嵌套。
- `prebuild` / `prestart` 自动生成响应式 WebP、动画封面和缓存清单；生成文件不提交，首次构建自动恢复。大动画点击后播放，原动画及原始图片保留。
- PDF 禁用自动获取全文和流式拉取，在支持 HTTP Range 的主机按需读取；搜索时可继续获取需要的内容。原理见 [PDF.js 文档](https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib.html)。
- 采用系统字体、CSS 响应式布局与官方深色模式，首屏无字体 CDN、动画库和统计请求。
- 如需 GA4，设置 `GTAG_ID` 环境变量后重新构建。

## 图片

新增图片优先放在文章旁，通过 Markdown 相对路径引用。`static/` 资源的 URL 不包含 `static` 目录名；JSX 中使用 `useBaseUrl`，不要手写 `/Myblog/` 前缀。

```md
![图片说明](./img/example.webp)
```

执行 `npm run optimize:images` 会为较大的 PNG/JPEG/GIF 生成更小的 WebP，并更新文章引用；原始图片保留。动画 GIF 转为动画 WebP。生成图片需人工检查文字与动画质量。

68 张原图床插图已下载到 `static/img/remote/`，来源保存在 `reports/image-sources.json`。12 张返回 404 的示意图已按正文重绘为本站 SVG，并在文章中标注；它们不是恢复出来的原始截图。

## Java 后端学习室

访问 `/Myblog/docs/java/`，面向有前端经验的 Java 初学者。推荐从 `/Myblog/docs/java/textbook/` 的 **18 课分步教材** 开始：5 个阶段、14 个完整可运行示例、36 项课后任务，逐步讲解语法、对象、集合、工程、HTTP、Spring、SQL 与测试。原 8 章作为快速复习，12 道在线练习与教材配套使用。教材在 `docs/java/textbook/`，练习题在 `src/data/java-course.js`。

- OneCompiler 在点击启动后加载，代码会发送到第三方服务；运行输出与示例匹配后记录完成。草稿和进度仅保存在当前浏览器。
- 离线可下载 `Main.java`，使用 JDK 21 执行 `java Main.java`。官方 Playground 是备用入口。
- `examples/java/todo-api/` 是 Java 21 + Spring Boot 4.1.2 + JDBC + H2 的本机实战项目，含参数校验与真实 HTTP 集成测试。进入项目后执行 `mvn test`、`mvn spring-boot:run`。
- 构建及开发启动时自动打包项目到 `static/downloads/java-todo-api.zip`，排除数据库和 Maven 产物。
- `scripts/package-java-textbook.mjs` 在构建及开发启动时从教材提取完整示例，生成 `static/downloads/java-textbook-examples.zip`，每课提供 Main.java、运行命令和预期输出。
- `npm run verify:java` 使用本机 JDK 编译全部练习起始代码、运行参考答案，并编译执行教材前 14 课示例，核对正文输出；第 14 课会短暂使用本机回环 HTTP 服务。
- 第 15—18 课使用完整 Maven 项目教学，局部代码片段标注文件位置。第 18 课筛选功能为读者练习与参考答案，下载项目保留起始实现。
- `npm run smoke:java` 在预览服务启动后验证真实在线编译与完成进度，依赖 OneCompiler 可访问。日常 Playwright 协议测试明确使用模拟服务，不替代真实编译验证。

### 完整项目实战与开源教材

- `/Myblog/docs/java/projects/library/`：图书借阅管理台，配套 7 步实战文档。源码在 `examples/java/library-lab/`，JDK 21 + Spring Boot + JDBC + H2，包含同源 HTML/JavaScript 界面、搜索分页、借还库存事务和真实 HTTP 测试，新项目代码采用 MIT 许可。
- 下载 `static/downloads/java-library-lab.zip` 后进入项目，执行 `mvn test`、`mvn spring-boot:run`，打开 `http://127.0.0.1:8080/`。博客负责文档和下载，Java 服务在本机运行。
- `/Myblog/docs/java/open-source/`：原样收录 Spring Guides `gs-rest-service` 固定提交的 59 个上游文件，包括起始版、完成版、README 原文与双许可证。代码 Apache-2.0，文档 CC BY-ND 3.0；本站另行编写中文实操指南，未翻译或改写上游教材附件。
- 上游快照在 `third_party/spring-guides/`，来源和逐文件 SHA-256 记录在 `SOURCES.json`。构建时 `scripts/package-java-lab.mjs` 验证哈希并生成上游源码包与项目包，复制原文和许可附件；无需在网站构建时联网拉取仓库。
- 在 library-lab 执行 `mvn test` 后，根目录运行 `npm run smoke:library`：从 Maven 测试报告复用类路径，使用独立临时文件数据库和本机随机端口启动真实服务，检查浏览器录入、借还、搜索、手机布局和重启持久化。结束后自动停止验证服务，结果在 `reports/java-library-ui.json`。
- CI 验证图书项目、官方 REST 项目、浏览器业务流程、静态文档、下载内容和上游文件校验值。

## 发布

`.github/workflows/pages.yml` 在 PR 中构建验证，合并到 `master` 后部署 `build/`，无需个人访问令牌。

首次使用需在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。发布使用现有域名与 `/Myblog/` 路径。此次本地升级不会自动推送代码或改变线上网站。

旧主题、废弃组件和其他包管理器锁文件已保存在本地 `.migration-backup/`，不参与构建或提交。
