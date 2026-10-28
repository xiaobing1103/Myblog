# PDF 阅读器替换报告

## 选型与实施

采用 Mozilla PDF.js **6.4.299** 的官方完整阅读器，替换浏览器原生 PDF 预览。阅读器提供中文工具栏、文字搜索、页码跳转、缩放、目录与缩略图、旋转、打印及下载；本站组件增加全屏、独立阅读与原文件下载入口。

React-PDF 当前 11 版本要求 React 19，本站使用 React 18；直接托管官方阅读器能避免为阅读功能升级全站 React，也无需自行重写完整工具栏。参考：[PDF.js 官方介绍](https://mozilla.github.io/pdf.js/getting_started/)、[PDF.js 发布记录](https://github.com/mozilla/pdf.js/releases/tag/v6.4.299)、[React-PDF 11 发布说明](https://github.com/wojtekmaj/react-pdf/releases/tag/v11.0.0)。

官方发布包已验证 SHA-256，阅读器、核心、Worker、字体、CMap、WASM 与许可证一起保存在 `static/pdfjs/`；支持通过 `npm run sync:pdfjs` 恢复。本站外观和初始化位于 `static/pdf-reader/`，不修改上游渲染逻辑。阅读器通过独立同源页面运行，不依赖 CDN，也不加入首页入口包。

## 验证

- 生产构建通过；87 个 HTML 页面（含阅读器）、825 处资源引用检查，无缺失。
- 全站 **88 项浏览器测试通过**，无跳过或失败。
- 连续切换全部 11 个 PDF 页面，没有 ChunkLoadError；9 份现有文件均返回有效 PDF，并实际渲染出 Canvas。
- 验证翻页、缩放、中文工具栏下的文字搜索、深色同步、390px 手机布局。
- Worker 响应为 200，MIME 为 `application/javascript`；本地预览补充 `.mjs`、`.wasm`、`.ftl` 类型。
- HTML 和脚本不缓存，避免后续使用旧入口与新分块混合；已打开的旧网页需强制刷新。
- 首页入口脚本 gzip 为 109,382 字节，比替换前增加 24 字节。

## 限制与访问

扫描版没有文字层时不能搜索，本次不包含 OCR。阅读器面向现代浏览器；可通过原文件下载入口使用系统阅读器。

《Koa与Node.js开发实战》《图解HTTP》仍缺少原文件，页面保留暂缺提示。库替换无法恢复缺失的原文件。

本地访问：<http://127.0.0.1:3000/Myblog/docs/resources/frontend-pdf/01frontend-pdf/>。尚未推送或更新线上站点。
