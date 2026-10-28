# Spring Guides 上游资料快照

此目录保存上游公开仓库的固定版本。本站原创中文操作导读放在博客文档中；这里的上游文件没有翻译或改写。

## gs-rest-service

- 作品：Building a RESTful Web Service。
- 归属：Spring Guides 项目及其贡献者。
- 仓库：https://github.com/spring-guides/gs-rest-service
- 官方教程：https://spring.io/guides/gs/rest-service/
- 固定提交：`3f4cef01152596c19bc4d37939409358812b1421`。
- 上游完整快照：https://codeload.github.com/spring-guides/gs-rest-service/zip/3f4cef01152596c19bc4d37939409358812b1421
- 本地 `gs-rest-service/` 内的 59 个上游文件逐字节保留，详情及校验值见 `SOURCES.json`。

代码按上游 `gs-rest-service/LICENSE.txt` 的 Apache License 2.0 分发。文档按上游 `gs-rest-service/LICENSE.writing.txt` 标示的 CC BY-ND 3.0 分发：保留原文、归属与许可证链接，不将其翻译或改写版本作为本文档附件分发。

CC BY-ND 3.0 完整许可：https://creativecommons.org/licenses/by-nd/3.0/legalcode.en

`README.adoc` 是上游原始 AsciiDoc 文档，保留其 include 指令，部分 include 指向上游公共宏。它是源文档快照，不是已展开宏的离线 HTML 教材；阅读完整渲染版请使用上方官方教程链接。

目录中的 initial 是起始项目，complete 是完成项目；Java 与 Kotlin 示例均按上游完整保留。Java complete 项目使用 Spring Boot 4.0.8，pom 中 Java 基线为 17。本机可用 JDK 21 和 Maven 运行 `mvn -B -ntp -f complete/pom.xml test`，启动使用 `mvn -f complete/pom.xml spring-boot:run`。

本站收录不表示 Spring 项目对本站提供支持或背书。上游文件若需升级，应另行核对提交、许可证与可运行性，更新 `SOURCES.json`，不要覆盖为未记录来源的版本。
