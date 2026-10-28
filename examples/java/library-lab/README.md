# 小型图书借阅管理台 · Library Lab

面向有前端经验的 Java 初学者：用一个完整的“录入书目 → 搜索 → 借阅 → 归还 → 核对库存”流程，练习浏览器、HTTP、业务事务与数据库如何协作。

技术基线：Java 21、Spring Boot 4.1.2、JdbcTemplate、H2、Bean Validation、JUnit；前端使用原生 JavaScript、HTML 和 CSS，无需 Node.js 或前端构建。后端和页面由同一个服务提供。

## 1. 从干净目录运行

安装 JDK 21 与 Maven 3.6.3 以上，解压后进入含 `pom.xml` 的 `library-lab` 目录：

```sh
java --version
mvn --version
mvn test
mvn spring-boot:run
```

打开 **http://127.0.0.1:8080/**。第一次启动没有预置书目，请先用页面录入一本书。首次 Maven 执行需要下载依赖，下载失败先检查网络与具体错误，不要跳过测试掩盖失败。

8080 已被其他程序使用时：

```sh
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
```

然后访问 8081。停止服务按 Ctrl+C，等进程退出后再次启动；默认数据保存在**进程工作目录**的 `data/` 下。不要同时运行两个进程读写同一份 H2 文件。

## 2. 第一次操作与验收

1. 录入《Java 编程入门》，作者自行填写，总册数为 1。
2. 输入借阅人姓名，点击该书的“借阅”；可借库存应从 1 变 0。
3. 在未归还记录中点击“归还”；可借库存回到 1。
4. 切换到“已经归还”，可以看到借阅历史。
5. 尝试删除该书，服务器应返回 409，保留历史。
6. 另录一本从未借阅的书，删除应成功。
7. 创建一些书目，按标题或作者搜索，体验分页；重启服务确认数据仍存在。

页面对用户文本使用 `textContent`，不会把书名、作者或借阅人当 HTML 执行。标题中 `%`、`_` 被当作字面字符搜索，不是任意匹配通配符。

## 3. 接口契约

所有业务接口在 `/api` 下，JSON 请求需要 `Content-Type: application/json`。

| 方法与路径 | 请求或参数 | 成功响应 |
| --- | --- | --- |
| GET /api/books | q 可选，page 默认 1，size 默认 10 | 200，分页对象 |
| GET /api/books/{id} | 图书 id | 200，Book |
| POST /api/books | title、author、totalCopies | 201，Book，Location |
| DELETE /api/books/{id} | 只能删除无借阅历史的图书 | 204，无响应体 |
| GET /api/loans | active 不传为全部，true 未归还，false 已归还 | 200，最近 100 条 Loan 数组 |
| GET /api/loans/{id} | 借阅 id | 200，Loan |
| POST /api/loans | bookId、borrower | 201，Loan，Location |
| POST /api/loans/{id}/return | 无需请求体 | 200，归还后的 Loan |

Book：

```json
{"id":1,"title":"Java 编程入门","author":"教学作者","totalCopies":1,"availableCopies":1}
```

分页对象：

```json
{"items":[],"total":0,"page":1,"size":10}
```

Loan：

```json
{"id":1,"bookId":1,"bookTitle":"Java 编程入门","borrower":"小明","createdAt":"2026-10-28T00:00:00Z","returnedAt":null}
```

时间由服务器生成；上例只是数据形状，不是固定运行结果。库存、id、时间都以实际响应为准。

验证规则：title 非空白且最多 80 字符，author/borrower 非空白且最多 60 字符；长度在原始输入上校验，通过后清理两端空白。totalCopies 为 1—100，bookId 为正数。q 最长 80，page 至少 1，size 为 1—50；搜索标题与作者，不区分大小写。active 只接受字面文本 `true` 或 `false`。

400 表示参数/JSON 校验失败；404 表示图书或借阅不存在；409 表示库存不足、重复归还、借阅历史阻止删除或数据库约束冲突。业务错误体统一为：

```json
{"message":"该图书暂无可借库存"}
```

客户端应先检查状态码再决定是否解析数据，204 不调用 `response.json()`。页面包含加载、错误与空列表提示，删除操作要求确认。

## 4. PowerShell 请求练习

保持服务在另一个终端运行：

```powershell
$base = 'http://127.0.0.1:8080'
$book = Invoke-RestMethod "$base/api/books" -Method Post -ContentType 'application/json' -Body '{"title":"Java Study","author":"Student","totalCopies":1}'
$loan = Invoke-RestMethod "$base/api/loans" -Method Post -ContentType 'application/json' -Body (@{bookId=$book.id;borrower='Alice'} | ConvertTo-Json)
Invoke-RestMethod "$base/api/books/$($book.id)"
Invoke-RestMethod "$base/api/loans/$($loan.id)/return" -Method Post
Invoke-RestMethod "$base/api/loans?active=false"
Invoke-RestMethod "$base/api/books?q=Java&page=1&size=10"
```

`Invoke-RestMethod` 对非成功状态通常抛异常，这是观察 400/409 的预期行为。中文请求体跨 PowerShell 版本编码有差异，初次命令练习用 ASCII 示例，中文功能可先在网页中验证。

## 5. 代码阅读顺序

```text
src/main/java/blog/library/
  LibraryApplication.java     启动入口
  LibraryController.java      HTTP 路由与请求 record 校验
  LibraryService.java         业务规则与事务边界
  LibraryRepository.java      参数绑定 SQL 与行映射
  Book.java / Loan.java       响应数据形状
  BookPage.java               分页响应
  ApiErrors.java              统一业务错误格式
src/main/resources/
  application.properties     回环绑定与文件数据库
  schema.sql                 建表、约束和索引
  static/index.html          语义化表单与列表
  static/app.js              fetch、文本渲染、交互
  static/style.css           响应式布局与深色适配
src/test/java/blog/library/
  LibraryApiTest.java         随机端口真实 HTTP 与事务测试
```

先沿新增图书请求读 Controller → Service → Repository。再看借出：条件 SQL 在 `available_copies > 0` 时扣一册，然后写借阅记录；两步位于同一事务中，后一步失败会回滚库存。归还通过 `returned_at IS NULL` 条件更新，只有成功标记的一次调用才恢复库存。

两张表之间有外键，库存还有数据库 CHECK 约束。应用规则与数据库约束相互补充；“先查库存再在 Java 里减一”不能代替条件更新的并发保证。

前端 `request(path, options)` 统一处理 HTTP 状态；`loadBooks`、`loadLoans` 拉取数据，`refresh` 更新两个区域；`runAction` 处理按钮忙碌和错误。列表请求用序号忽略过时响应，用户文本用 DOM 节点安全展示。

## 6. 测试覆盖和自己修改

`mvn test` 使用独立 H2 内存库、随机 HTTP 端口，不会写进 data。当前测试验证：

- 搜索、分页、字面百分号、中文数据与空结果。
- 借出、归还、库存变化、借阅历史保护、404 与 409。
- 非法 JSON、必填、数量范围和查询参数。
- SQL/HTML 特殊字符以文本保存。
- 两个并发借出只有一个成功；两个并发归还只恢复一次库存。
- 借阅插入失败时库存扣减回滚。
- 首页与前端资源由同源 Java 服务返回。

练习一：增加“图书分类”，同时修改 schema、请求校验、Book、查询与表单。先决定旧数据库怎样迁移；`CREATE TABLE IF NOT EXISTS` 不会修改已存在表。

练习二：增加“借阅到期日”，使用明确的业务日期类型，测试当天与跨月边界。

练习三：增加图书编辑，必须规定已有借出册数时能否降低总册数，并用条件更新和测试保证 `0 <= availableCopies <= totalCopies`。

## 7. 许可与教学边界

本目录新增的项目源码、前端和本 README 以同目录 MIT LICENSE 授权，复制和修改时保留版权与许可文本。Maven 第三方依赖保留各自许可证；这里的 MIT 授权不更改博客其他目录或第三方材料的许可。

这是绑定本机回环地址的教学系统，没有登录、权限、审计、CSRF 防护或生产数据库迁移。不要将其直接暴露为公共借阅服务。生产化时需要根据用户与部署环境补充这些设计；本轮专注一个能够真实运行和验证的业务闭环。
