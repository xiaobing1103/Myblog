---
title: 阿里题集第二期：网络、Node 与重复题索引
sidebar_label: 第二期 · 网络与 Node
description: 修正 TLS、JWT、TCP 分包与 Node 模块等答案，保留最后 23 道重复题的定位。
---

对照 [完整原文](../sources/ali-2.md)；返回 [第二期导读](./index.md)。章节题号沿用原 PDF，讨论网络协议时先声明版本，Node 内部实现以实际使用版本的官方文档为准。

## 六、网络相关

### N1 · HTTP/1.0 与 HTTP/1.1（第 67—69 页）

HTTP/1.1 默认持久连接，完善缓存验证和控制、范围请求、消息长度与分块传输等能力，并要求请求具备有效的主机信息。HTTP/1.0 也存在 keep-alive 扩展，不能说任何 1.0 请求都必定新建 TCP。Host 是请求头，不应说每个响应也必须带 Host；持久连接默认也不代表每个响应必须写 `Connection:keep-alive`。HTTP/1.1 流水线有响应顺序阻塞，浏览器实际采用情况需与协议支持区分。

依据：[RFC 9112：HTTP/1.1](https://httpwg.org/specs/rfc9112.html)。

### N2 · HTTP/2 多路复用（第 69 页）

把消息拆成带 stream ID 的二进制帧，多个流可在一个连接交错传输，各自具有顺序及流量控制。它改善 HTTP 层串行响应的队头阻塞，**没有消除 TCP 丢包造成的连接级队头阻塞**。不是每个 HTTP/1.1 请求都握手，也不是 HTTP/2 让同一网站在任何条件下永远只用一个连接。

### N3 · HTTPS 握手（第 69 页）

HTTPS 是在 TLS 保护的连接上传输 HTTP。以常见的 TLS 1.3 完整握手为例：协商参数并交换 key share，服务端提供证书与对握手的签名，客户端验证身份，双方用密钥交换结果和握手上下文派生流量密钥，再验证 Finished。**原文“客户端生成会话密钥后用证书公钥加密”只对应某些旧 RSA 密钥交换思路，不能用于概括 TLS 1.3**。应用数据使用协商的对称认证加密，不是每个请求都用证书私钥加解密。

### N4 · 证书验证（第 70 页）

验证域名与证书身份匹配、有效期、从叶子经中间 CA 到信任根的签名链、用途/约束与平台撤销等策略；还需验证握手中对方拥有对应私钥。不是把 CA 名字在本地列表里找到就算通过，也不应通称签名验证为“用公钥解密”。浏览器信任库可能来自浏览器或系统，取决于产品与平台。

### N5 · token“加密”（第 70 页，纠错）

先区分随机不透明令牌、JWS 签名、JWE 加密。常见 JWT 的 header/payload 只做 Base64url 编码，任何拿到 token 的人都可读取；HMAC 是消息认证码，**不是加密、后端也不是“解密出密码”**。不要把密码放 payload。服务端应使用成熟库固定允许算法，验证签名、issuer、audience、过期和必要的撤销策略；令牌经 TLS 传输，浏览器保存方式需权衡 XSS 与 CSRF。

依据：[RFC 7519：JWT](https://www.rfc-editor.org/rfc/rfc7519.html)。

### N6 · HTTPS 中间人（第 70—71 页）

能拦截网络不代表能伪装服务器：正常客户端会验证证书与握手签名。忽略证书错误、信任攻击者 CA、私钥或终端被攻破、使用不安全初始连接等，可能削弱保护。HTTPS 不承诺防止终端恶意代码或服务器自身泄漏；用户不应靠跳过证书警告“修复”连接。

N3、N4、N6 的握手依据：[RFC 8446：TLS 1.3](https://datatracker.ietf.org/doc/html/rfc8446)，其中描述的是该版本协议机制，并非将其称为所有后续 TLS 文档的最新版。

### N7 · 状态码（第 71—72 页）

| 状态码 | 正确解释与边界 |
| --- | --- |
| 200 / 201 / 204 | 成功 / 创建 / 无响应内容；204 不再解析 JSON 体 |
| 301 / 302 | 永久/临时重定向，历史客户端可能把 POST 改成 GET |
| 307 / 308 | 临时/永久重定向，要求保留方法与请求体 |
| 304 | 条件请求未修改，复用缓存；不是带新实体的普通成功响应 |
| 400 / 401 / 403 / 404 | 请求错误 / 需身份认证 / 拒绝授权 / 未找到 |
| 409 / 429 | 与当前资源状态冲突 / 请求过多 |
| 500 / 502 / 503 / 504 | 内部错误 / 网关收到无效上游响应 / 暂不可用 / 网关等待上游超时 |

状态码描述 HTTP 语义，不代表详细业务结果；错误时仍需规范且不泄露敏感信息的响应体。

### N8 · URL 到页面（第 72 页）

解析 URL 和导航策略，检查本地机制/缓存，解析域名，建立或复用连接，必要时 TLS/ALPN 协商，发送请求与处理重定向，流式接收 HTML，解析 DOM/CSS、发现依赖、执行脚本，布局、绘制和合成。DNS、TCP、TLS 不一定每次重做；HTTP/3 使用 QUIC；Service Worker 可能改变网络路径。不同阶段可交错，不能排成每步必须等前一步全部完成的单线流水。

### N9 · HTTP/2 改进（第 73 页）

除多路复用外还有二进制帧、HPACK 头部压缩、流量控制等。原文“二进制因此更健壮”过于笼统，解析正确与协议实现才是条件。服务端推送是协议功能，但浏览器支持与启用情况不同，不能当通用提速策略；优先级机制也有版本和实现差别。HTTP/2 仍保留 HTTP 方法、状态码等语义。

N2、N9 依据：[RFC 9113：HTTP/2](https://httpwg.org/specs/rfc9113.html)。

### N10 · 会话恢复（第 73—74 页）

这是重新建立连接时利用已有会话资料减少握手成本，**不是把已断开的 TLS/TCP 连接原样接回去**。旧协议可基于 session ID 或 ticket；TLS 1.3 以 PSK 等恢复机制重新派生密钥，不直接复用之前的全部应用流量密钥。0-RTT 早期数据有重放风险，不能未经设计就用于支付、创建订单等非幂等操作。

### N11 · CDN（第 74—75 页）

通过边缘节点提供内容及相关服务，调度可基于 DNS、Anycast 等机制，节点未命中再回源。并非一定选择地理最近节点，也不总是原书那条固定 DNS 查询序列。收益和正确性依赖缓存键、TTL、Vary、鉴权和失效策略；用户私有响应不能意外共享缓存。调试时区分浏览器缓存、边缘缓存与源站响应。

依据：[MDN：HTTP 缓存与共享缓存](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching)。

## 九、Node.js 篇

### B1 · 模块是什么（第 118 页）

Node 同时支持 CommonJS 和 ES modules。CommonJS 文件在模块包装函数中执行，以 module.exports 导出；ESM 通过 import/export 表达静态结构、实时绑定和不同初始化规则。原文的 Module 构造函数是历史实现摘录，不是所有模块类型的规范定义，也不是业务应依赖的公开结构。

### B2 · require 加载（第 118—119 页）

解析标识符到内建模块或文件/包入口，结合包 exports 等规则选择模块，按已解析文件标识检查缓存，再初始化执行并返回导出。CommonJS 初始化期间就放入缓存以处理循环依赖；同一解析结果通常只执行一次。**不是执行完之后才缓存**。大小写、路径和包解析可使“名字相同”不等于同一缓存项；require 与 import 的缓存也不能等同。

### B3 · 内存泄漏（第 119 页）

无界缓存、未释放订阅/定时器、保留大对象的闭包和队列积压都可能持续保留数据，但闭包本身不是泄漏。先观察 RSS、heapUsed、external、arrayBuffers 的趋势，反复执行可复现场景，再比较堆快照和 retaining path；快照可能暂停并额外消耗内存，应选择适合的诊断环境。

依据：[Node：诊断内存](https://nodejs.org/en/learn/diagnostics/memory/understanding-and-tuning-memory)。

### B4 · 循环引用（第 119—120 页，纠错）

CommonJS 中第二个模块拿到第一个模块**当前尚未执行完的导出对象**，可能已经有一些属性，并非必定空对象。如果之后替换 module.exports，其他模块保留的旧对象引用也不会自动换新。ESM 的实时绑定与暂时性死区行为不同，不能套用该答案。

B1、B2、B4 依据：[Node：CommonJS 模块与 cycles](https://nodejs.org/api/modules.html#cycles)。

### B5 · 热更新（第 120 页）

删 `require.cache[require.resolve(path)]` 可以让后续 require 重新初始化该 CJS 模块，但不会清掉已有引用、定时器、连接和所有依赖；盲目清缓存会产生多份状态。ESM 没有等价的通用 require.cache 删除入口。开发环境通常用 watch 模式重启；生产滚动发布要做好 readiness、连接排空和资源清理。“清缓存”与“不中断服务”不是同一问题。

### B6 · 文件作用域（第 120—121 页）

CommonJS 包装函数隔离顶层变量；ESM 有自己的模块作用域并默认严格模式。非严格 CJS 中给未声明名字赋值可能污染全局，使用严格模式和 lint 可提前发现。`this`、globalThis、exports、局部变量不是同一个命名空间；Node 没有浏览器 window。

### B7 · I/O 与 CPU 任务（第 121 页，纠错）

事件循环适合大量等待 I/O、单次 JS 处理较短的服务。重 CPU 工作会阻塞同一 JS 线程的其他回调，可以分片、使用 worker_threads 线程池或独立进程。**“JavaScript/Node 不支持多线程”已错误**；worker 运行独立 JS 执行环境，可传消息或共享部分内存。是否选择 Node 要看工作量、并发模型和库，不能只凭语言名称断定性能高低。

依据：[Node：worker_threads](https://nodejs.org/api/worker_threads.html)。

### B8 · 垃圾回收（第 121 页）

V8 使用可达性判断并结合分代、增量、并行、并发等技术管理内存。年轻代与老年代采用不同策略，具体收集器会演进，不能把“两块新生代+老年代只标记清除”当完整现行实现。手动断开长期引用可减少无用保留，但不能保证立刻回收；GC 无法修复仍然可达的无界业务缓存。

依据：[V8：Orinoco GC](https://v8.dev/blog/trash-talk)。

### B9 · 异步 I/O（第 122—123 页，纠错）

JS 提交工作，由操作系统异步机制或 libuv worker pool 等完成，再在适合阶段调用 JS 回调。**不是所有 I/O 都进入线程池**：网络 I/O 通常利用系统就绪通知等，部分文件系统、DNS、加密等操作使用线程池。事件循环不是原文 setInterval 每 50ms 检查一次的示例程序；长回调和耗尽微任务都可能延误其他任务。

依据：[Node：不要阻塞事件循环或线程池](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop)。

### B10 · cwd（第 123 页）

`process.cwd()` 是进程工作目录，通常继承启动环境，`process.chdir()` 可修改。多数文件 API 的相对路径依它解析；CJS 的 `require('./x')` 则相对发起 require 的模块，不是 cwd。要取文件自身位置，CJS 用 __dirname，ESM 根据 import.meta.url 或适用版本的 import.meta.dirname 处理。

### B11 · console.log 同步吗（第 123—124 页）

console.log 使用格式化和可写流，不能统一回答“异步”。process.stdout 的文件写在 Windows/POSIX 通常同步；TTY 在 Windows 异步、POSIX 同步；管道在 Windows 同步、POSIX 异步。大量日志可能阻塞或积压，立即 process.exit 还可能丢待写数据。

```js
// 简化示例，不完整模拟自定义 Console 的所有选项。
const { format } = require('node:util');
function log(...values) { return process.stdout.write(format(...values) + '\n'); }
```

依据：[Node：process I/O 注意事项](https://nodejs.org/api/process.html#a-note-on-process-io)。

### B12 · 父子进程死亡（第 124 页，纠错）

进程相互独立，生命周期受操作系统、进程组、终端、打开的通道和 supervisor 影响。**父进程退出不意味着所有子进程必然自动死亡**，但 IPC 关闭、管道错误或信号也可能让子进程退出。POSIX 中孤儿进程会被相应的收养机制接管；僵尸是已退出但状态尚未被回收的进程，两者不是同义词。Windows 的行为不能照搬 Unix init 的描述。

### B13 · IPC（第 124 页）

IPC 是 Inter-Process Communication，进程间通信，不是 Inner-Process。Node fork 可建立消息通道，父子以 send/message 交换数据；还有管道、套接字等方式。它不是“本地网络”这一种方式，消息序列化、句柄传递和断开要按 API 约定处理。通信有成本，避免在消息里反复复制巨量对象。

### B14 · 守护与后台进程（第 124—125 页）

仅设 detached 不足以保证完整服务生命周期。脱离父进程还涉及 stdio、IPC、引用与平台差异；Node 子进程常需独立 stdio 并 unref，具体按照应用目的配置。生产服务通常由 systemd、Windows 服务管理器或容器编排管理重启、日志和健康检查，而不是手工实现所有监督能力。

B12—B14 依据：[Node：child_process 与 detached](https://nodejs.org/api/child_process.html#optionsdetached)。

### B15 · Buffer（第 125 页）

Buffer 继承 Uint8Array，用于字节序列和编码转换。长度固定，但 `subarray` 可共享底层内存，修改视图会影响原缓冲区。使用 `Buffer.alloc` 得到初始化内存；allocUnsafe 的内容必须在读取/发送前完全覆盖。底层内存与 V8 heap、external 等指标关联，不能因为不全计入 heapUsed 就忽略其内存压力。

依据：[Node：Buffer](https://nodejs.org/api/buffer.html)。

### B16 · Stream（第 125 页）

Readable、Writable、Duplex、Transform 将数据分块处理，降低一次性全部缓存的需求。重点是背压和错误/关闭传播：write 返回 false 后等待 drain，或使用 pipeline 协调。流仍可能因错误的缓冲策略占满内存，不是“用了 stream 就自动 O(1) 内存”。

```js
// CommonJS，调用时传入已创建的可读流和可写流。
const { pipeline } = require('node:stream/promises');
async function transfer(readable, writable) { await pipeline(readable, writable); }
```

依据：[Node：Stream](https://nodejs.org/api/stream.html)。

### B17 · TCP“粘包”（第 125 页，纠错）

TCP 提供有序字节流，**不保存应用 write 的消息边界**；一次 data 可能是不完整消息，也可能包含多条。Nagle 会影响小包发送，但不是边界丢失的根因，关闭它或“每次发送等一会”不能解决。应用协议用固定长度、长度前缀或可转义分隔符定义 framing，接收端维护缓冲并循环解析，校验长度上限。HTTP 自己定义消息边界，并不是 TCP 到 HTTP 层就永远不存在拆分问题。

依据：[RFC 9293：TCP 字节流](https://www.rfc-editor.org/rfc/rfc9293.html)。

### B18 · Cookie 与 Session（第 126 页，纠错）

Cookie 是浏览器保存并按规则发送的小数据；服务端 session 通常保存状态，由 Cookie 携带不可预测的 session ID。session 不是“通常就是加密串”，安全依赖令牌管理、TLS、过期、轮换与服务端验证。删除 Cookie 应匹配原来的 name、domain、path 等身份和分区条件，并设置 Max-Age=0 或过去的 Expires；同时注销服务端会话。只清空值而不匹配路径，可能留着原 Cookie。

```http
Set-Cookie: session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax
```

上例针对同名 host-only、Path=/ 的 Cookie；若原来设了 Domain，应匹配 Domain，不能随便加减属性当作通用删除命令。

依据：[MDN：Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie)。

### B19 · hosts（第 126 页）

系统本地的主机名到地址映射，可用于本机测试和固定解析。是否优先、如何缓存由系统名称解析配置与具体应用决定；浏览器代理、缓存和自有解析可能影响结果。它不修改 URL 的协议、路径和证书域名，写 hosts 也不能让错误域名证书自动可信。

## 十、消息队列

### M1 · 应用场景（第 126—127 页）

异步任务、解耦、削峰、事件分发与日志管道都可以用队列。面试回答必须补代价：确认与持久化、重试、幂等消费、顺序、死信、积压和监控。队列满后丢弃只是特定策略，不能当订单系统默认方案；可限流、拒绝并明确返回、扩容消费者等。应用与消息发布的一致性可考虑事务发件箱等设计，不能因“用了队列”就保证不重不丢或恰好一次业务效果。

依据：[RabbitMQ：可靠性指南](https://www.rabbitmq.com/docs/reliability)。

## 十一、大厂题重复索引（第 127—141 页）

这 23 道题与前面章节重复，为保持题号可追溯逐一列出。沿用对应题的正确答案及版本边界，不重复复制同一份内容。

| 原编号 | 题目 | 题解位置 |
| --- | --- | --- |
| F1 | 整数递归逆序 | [算法页 A11](./algorithms.md) |
| F2 | 扁平化、去重、排序 | [算法页 A4](./algorithms.md) |
| F3 | DFS 与 BFS | [算法页 A3](./algorithms.md) |
| F4 | HTTP/2 多路复用 | 本页 N2 |
| F5 | 防抖和节流 | [JavaScript 页 J4](./javascript.md) |
| F6 | async/await | [JavaScript 页 J8](./javascript.md) |
| F7 | 异步方案 | [JavaScript 页 J10](./javascript.md) |
| F8 | 实现 new | [JavaScript 页 S3](./javascript.md) |
| F9 | a 同时宽松等于 1、2、3 | [JavaScript 页 J13](./javascript.md) |
| F10 | 数字链式运算 | [JavaScript 页 J19](./javascript.md) |
| F11 | 列表 key | [JavaScript 页 J2](./javascript.md) |
| F12 | 执行上下文与栈 | [JavaScript 页 J34](./javascript.md) |
| F13 | Vue 组件通信 | [JavaScript 页 J39](./javascript.md) |
| F14 | 前端性能 | [浏览器与 CSS 页 H6](./index.md) |
| F15 | 数组随机排序 | [算法页 A12](./algorithms.md) |
| F16 | CacheStorage | [JavaScript 页 J42](./javascript.md) |
| F17 | Vue 双向绑定 | [JavaScript 页 J43](./javascript.md) |
| F18 | 可用性时间 | [JavaScript 页 J44](./javascript.md) |
| F19 | WebAssembly | [JavaScript 页 J45](./javascript.md) |
| F20 | 移动端点击 | [JavaScript 页 J46](./javascript.md) |
| F21 | Git rebase | [JavaScript 页 J47](./javascript.md) |
| F22 | loader 与 plugin | [JavaScript 页 J49](./javascript.md) |
| F23 | MVC、MVP、MVVM | [JavaScript 页 J28](./javascript.md) |

第 142 页仅残留 E2 的历史答案字符串，第 143—144 页没有新的可提取题目，完整逐页原文仍保留这些页码。J26 已渲染核对原图，原 PDF 本身的两个标签缺失，已注明按下文重建题意，不能把推断说成精确原题。
