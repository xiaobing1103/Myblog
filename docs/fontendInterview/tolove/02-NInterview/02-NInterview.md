---
id: 02-NInterview
title: HTTP 报文、版本与缓存
description: 从请求响应示例理解 HTTP 方法、状态码、缓存和 HTTP/2、HTTP/3。
---

[回到面试题库](../../../interview/index.mdx)

旧页面只有一段无关的自增代码，这里补成可复习的 HTTP 专题。

## HTTP/1.1 报文长什么样？

请求由起始行、字段、空行与可选消息体组成。下面省略了真实传输中的 CRLF 表示。

```http
GET /api/books?page=1 HTTP/1.1
Host: example.com
Accept: application/json
If-None-Match: "books-v2"

```

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Cache-Control: private, max-age=60
ETag: "books-v3"
Content-Length: 2

[]
```

URL 片段 `#...` 不会发送给服务器；查询参数会。消息体按字节传输，`Content-Length` 是字节数，不是 JavaScript 字符串长度。HTTP/1.1 也有 chunked 等消息分帧方式；不要把响应中的所有换行都当成内容。

## 常见方法及安全性

| 方法 | 常见语义 | 幂等性 |
| --- | --- | --- |
| GET | 获取表示 | 按语义应幂等、安全 |
| HEAD | 获取与 GET 对应的元数据，不传响应内容 | 应幂等、安全 |
| POST | 按资源定义处理提交的表示 | 不保证幂等 |
| PUT | 创建或替换目标资源状态 | 按语义应幂等 |
| PATCH | 对资源应用修改 | 不保证幂等，取决于操作 |
| DELETE | 删除目标资源关联 | 按语义应幂等 |

幂等指相同请求重复执行的预期服务端效果相同，不要求每次状态码和响应体完全相同。“安全方法”指不要求改变服务端状态，不等于没有鉴权、XSS 或隐私风险。

## 常见状态码

- `200` 成功，`201` 创建成功，`204` 成功但没有响应内容。
- `301/308` 永久重定向，`302/307` 临时重定向；307/308 保留方法和请求体语义。
- `304` 条件请求验证后无需传输表示，不是“缓存完全不发请求”。
- `400` 请求错误，`401` 需要有效认证，`403` 拒绝访问，`404` 未找到，`409` 状态冲突，`429` 限流。
- `500` 服务端内部错误，`502` 网关上游无效响应，`503` 暂不可用，`504` 网关等待上游超时。

## 缓存怎么答？

先检查是否有可用且新鲜的缓存；过期时可带 `If-None-Match` / `If-Modified-Since` 验证。`ETag` 验证器通常与 `If-None-Match` 配合，资源未变可返回 304。

- `max-age=...`：新鲜度。
- `no-cache`：允许存储，但复用前需验证，不是“不缓存”。
- `no-store`：不要存储。
- `private`：限制为私有缓存；个性化内容不能随意在共享 CDN 缓存。
- `Vary`：哪些请求字段会影响缓存键。

静态站带哈希资源可长缓存，HTML 入口要采用可及时更新的策略；发布时保留旧分块一段时间，避免旧页面引用已删除 chunk。

## HTTP/1.1、HTTP/2、HTTP/3

| 版本 | 传输与主要特点 | 需要避免的误解 |
| --- | --- | --- |
| HTTP/1.1 | 文本报文，通常基于 TCP，持久连接 | 每次请求不一定新建 TCP |
| HTTP/2 | 二进制帧、多路复用、字段压缩，通常在 TLS / TCP 上 | 同一连接仍受 TCP 丢包的队头阻塞影响 |
| HTTP/3 | 基于 QUIC，使用 UDP 承载，集成 TLS；独立流减少跨流传输阻塞 | 不是“UDP 不可靠所以 HTTP/3 丢数据”，可靠流由 QUIC 提供 |

HTTP 的方法和状态等核心语义跨版本保持一致，HTTP/2/3 不以相同的纯文本起始行在网络上传输。HTTPS 提供传输保护，不能替代业务授权或防止站点自身 XSS。

## 与本站项目一起练

1. 下载并启动 [图书管理项目](../../../java/projects/library/index.mdx)。
2. 用浏览器 Network 查看列表 GET、创建 POST、校验错误和借还冲突。
3. 查看本站静态资源的 Cache-Control，与 HTML 入口比较，解释为何策略不同。

参考：[MDN HTTP 消息](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)、[HTTP 缓存](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)、[HTTP 语义规范 RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html)。
