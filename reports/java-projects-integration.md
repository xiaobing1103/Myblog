# Java 项目与开源教材集成

日期：2026-10-28。

## 本轮交付

1. `examples/java/library-lab/`：完整 Java 21 / Spring Boot / JDBC / H2 图书借阅项目，包含原生前端与 MIT 许可。支持录入、搜索分页、借出归还、库存约束及历史删除保护。
2. `docs/java/projects/library/`：项目路线和 7 步教程，共 8 页，涵盖启动、建表、图书 API、借还事务、前端、测试和交付。
3. `third_party/spring-guides/`：Spring Guides 官方 REST 项目的固定版本，59 个上游文件原样收录，保留代码 Apache-2.0 和文档 CC BY-ND 3.0 许可。
4. `docs/java/open-source/`：收录说明和本站原创中文实操指南；上游 README 作为未改写源文档附件，含未展开的远程宏。
5. 构建时自动打包项目与原始教材、验证来源 SHA-256，顶部 Java 入口、学习首页、侧栏与教材末课均已连接新内容。

## 访问与下载

- 实战文档：http://127.0.0.1:3000/Myblog/docs/java/projects/library/
- 开源教材：http://127.0.0.1:3000/Myblog/docs/java/open-source/
- 项目源码：http://127.0.0.1:3000/Myblog/downloads/java-library-lab.zip
- 官方资料快照：http://127.0.0.1:3000/Myblog/downloads/spring-rest-service-source.zip

## 验证证据

| 检查 | 结果 |
| --- | --- |
| library-lab Maven | 7 项通过；真实随机端口 HTTP、条件借还、并发、回滚、输入和搜索 |
| 官方 REST Maven | 原有 2 项上下文集成测试通过 |
| 官方 REST 真实服务 | /greeting、带 name 请求均 200，响应正确 |
| library-lab 真实浏览器 | 表单录入、文本安全显示、借还库存、重复归还409、删除历史保护、搜索、手机布局通过 |
| 文件库持久化 | 独立临时目录，停止并重启服务后，图书及库存仍保留 |
| 上游完整性 | 固定 commit 3f4cef01152596c19bc4d37939409358812b1421，59 文件 SHA-256 全部匹配 |
| npm run build | 成功 |
| npm run check | 126 页、1182 资源引用，无缺失 |
| 全站 Playwright | 137 项通过；证据 java-projects-regression.json |
| 首页入口预算 | gzip 111897 字节，低于 112 KiB；HTML 17728 字节，低于 20 KiB |
| 冷加载网络预算 | 首页 10 请求、133026 字节；文章 20 请求、198655 字节，符合现有预算 |

浏览器业务证据在 `java-library-ui.json`；桌面/手机截图在 `java-library-app-*.png`；官方来源验证在 `spring-guide-verification.json`。

首轮业务 smoke 的 select 精确名称定位因原生选项文本参与标签名称而超时，已改为按 combobox 角色和标签匹配，完整业务重跑通过。Java 服务在验证结束后自动停止，验证文件数据库放在忽略的 .cache 内。

## 运行界限

项目需在本机执行 `mvn spring-boot:run`，然后访问 Java 服务的 8080 根路径。静态博客提供教程和下载，不运行长驻 Java 服务。当前是本机教学配置，未提供认证授权、生产迁移和部署配置。

本轮仅本地集成，未推送或发布线上。
