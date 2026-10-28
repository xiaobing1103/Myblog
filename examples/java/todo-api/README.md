# Java 待办 API 学习项目

环境：JDK 21、Maven 3.6.3 以上。进入包含 pom.xml 的目录：

```sh
mvn test
mvn spring-boot:run
```

访问 http://127.0.0.1:8080/api/tasks 。首次运行需从 Maven Central 下载依赖。
端口占用时运行 `mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8081`。

## 练习顺序

1. GET 列表，初次返回 `[]`。
2. POST 新任务，观察 201、Location 和生成的 id。
3. PATCH 标记完成，GET 再查询。
4. 重启服务，确认文件数据库中的记录仍存在。
5. DELETE 后查询，观察 404；提交空白或超长标题，观察 400。
6. 增加按完成状态筛选功能，并补测试。

PowerShell 示例：

```powershell
$task = Invoke-RestMethod http://127.0.0.1:8080/api/tasks -Method Post -ContentType 'application/json' -Body '{"title":"Learn Java"}'
Invoke-RestMethod "http://127.0.0.1:8080/api/tasks/$($task.id)" -Method Patch -ContentType 'application/json' -Body '{"done":true}'
Invoke-RestMethod http://127.0.0.1:8080/api/tasks
```

macOS / Linux 示例：

```sh
curl -i -H 'Content-Type: application/json' -d '{"title":"Learn Java"}' http://127.0.0.1:8080/api/tasks
curl -i -X PATCH -H 'Content-Type: application/json' -d '{"done":true}' http://127.0.0.1:8080/api/tasks/1
curl -i -X DELETE http://127.0.0.1:8080/api/tasks/1
```

请用创建响应里的 id 替换示例的 1。Windows PowerShell 优先使用上面的 Invoke-RestMethod，避免 curl 别名及 JSON 引号问题。

## 代码地图

- TaskController：HTTP 路由、请求格式、参数校验。
- TaskService：业务逻辑与事务。
- TaskRepository：参数绑定的 JDBC SQL。
- schema.sql：可重复执行的建表语句。
- TaskApiTest：启动随机端口，通过 Java HttpClient 发送真实 HTTP 请求；覆盖增删改查、404、非法输入与 SQL 特殊字符。

应用数据在运行目录的 `data/`，测试使用独立的内存数据库。停止后再次启动，应用数据仍在。不要同时启动两个进程访问同一个 H2 文件。

这是本地教学项目，绑定回环地址，无登录鉴权和跨域配置。需要连接前端时，可通过前端开发服务器把 `/api` 代理到 8080；生产应用还需要认证、授权、数据库迁移及部署配置。

官方阅读：https://spring.io/guides/gs/rest-service 、https://docs.spring.io/spring-framework/reference/data-access/jdbc.html
