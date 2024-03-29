---
id: 03-Interview
title: html&css基础面试题
# hide_title: false
# hide_table_of_contents: false
# sidebar_label: Markdown :)
# custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: 欢迎访问二姨的博客！这个页面是由本人整理的一些前端面试题,能够给大家在面试的时候带来一些帮助。
keywords:
  - JavaScript
  - frontend
  - 视频教程
  - 前端
# image: https://i.imgur.com/mErPwqL.png
---


## 1. 你做的页面在哪些流览器测试过？这些浏览器的内核分别是什么? 

IE: trident 内核 

Firefox：gecko 内核

Safari:webkit 内核 

Opera:以前是 presto 内核，Opera 现已改用 Google Chrome 的 Blink 内核 

Chrome:Blink(基于 webkit，Google 与 Opera Software 共同开发)



## 2、每个 HTML 文件里开头都有个很重要的东西，Doctype，知道这是干什么的吗？

 声明位于文档中的最前面的位置，处于  标签之前。此标签可告知浏 览器文档使用哪种 HTML 或 XHTML 规范。（重点：告诉浏览器按照何种规范解析页面）



## 3、Quirks 模式是什么？它和 Standards 模式有什么区别

从 IE6 开始，引入了 Standards 模式，标准模式中，浏览器尝试给符合标准的文档在规范上 的正确处理达到在指定浏览器中的程度。

在 IE6 之前 CSS 还不够成熟，所以 IE5 等之前的浏览器对 CSS 的支持很差， IE6 将对 CSS 提供更好的支持，然而这时的问题就来了，因为有很多页面是基于旧的布局方式写的，而如 果 IE6 支持 CSS 则将令这些页面显示不正常，如何在即保证不破坏现有页面，又提供新的 渲染机制呢？

在写程序时我们也会经常遇到这样的问题，如何保证原来的接口不变，又提供更强大的功能， 尤其是新功能不兼容旧功能时。遇到这种问题时的一个常见做法是增加参数和分支，即当某 个参数为真时，我们就使用新功能，而如果这个参数 不为真时，就使用旧功能，这样就能 不破坏原有的程序，又提供新功能。IE6 也是类似这样做的，它将 DTD 当成了这个“参数”， 因为以前的页面大家都不会去写 DTD，所以 IE6 就假定 如果写了 DTD，就意味着这个页面 将采用对 CSS 支持更好的布局，而如果没有，则采用兼容之前的布局方式。这就是 Quirks 模式（怪癖模式，诡异模式，怪异模式）。

区别：

总体会有布局、样式解析和脚本执行三个方面的区别。

盒模型：在 W3C 标准中，如果设置一个元素的宽度和高度，指的是元素内容的宽度和高度， 而在 Quirks 模式下，IE 的宽度和高度还包含了 padding 和 border。

设置行内元素的高宽：在 Standards 模式下，给等行内元素设置 wdith 和 height 都 不会生效，而在 quirks 模式下，则会生效。

设置百分比的高度：在 standards 模式下，一个元素的高度是由其包含的内容来决定的，如 果父元素没有设置百分比的高度，子元素设置一个百分比的高度是无效的用 margin:0 auto 设置水平居中：使用 margin:0 auto 在 standards 模式下可以使元素水平 居中，但在 quirks 模式下却会失效。



## 4、div+css 的布局较 table 布局有什么优点？

1. 改版的时候更方便 只要改 css 文件。

2. 页面加载速度更快、结构化清晰、页面显示简洁。

3. 表现与结构相分离。

4. 易于优化（seo）搜索引擎更友好，排名更容易靠前。



## 5、 img 的 alt 与 title 有何异同？ strong 与 em 的异同？

Alt是`<img>`的特有属性，是图片内容的等价描述，用于图片无法加载时显示，读屏器阅读图片。

title: 可提高图片高可访问性，除了纯装饰图片外都必须设置有意义的值，搜索引擎会重点分析。鼠标滑过时显示的文字提示，用户体验上很重要。当然不必要所有的img标签都加此属性，比方说logo这样比较重要或者说用户会体验到的图片内容建议一定要加此属性。 

strong:粗体强调标签，强调，表示内容的重要性 

em:斜体强调标签，更强烈强调，表示内容的强调点



## 6、你能描述一下渐进增强和优雅降级之间的不同吗?

渐进增强 progressive enhancement：

> 针对低版本浏览器进行构建页面，保证最基本的功 能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

优雅降级 graceful degradation：

>一开始就构建完整的功能，然后再针对低版本浏览器 进行兼容。

区别：优雅降级是从复杂的现状开始，并试图减少用户体验的供给，而渐进增强则是从一个 非常基础的，能够起作用的版本开始，并不断扩充，以适应未来环境的需要。降级（功能衰 减）意味着往回看；而渐进增强则意味着朝前看，同时保证其根基处于安全地带。

**优雅降级观点 **

优雅降级”观点认为应该针对那些最高级、最完善的浏览器来设计网站。而将那些被认为 “过时”或有功能缺失的浏览器下的测试工作安排在开发周期的最后阶段，并把测试对象限 定为主流浏览器（如 IE、Mozilla 等）的前一个版本。

在这种设计范例下，旧版的浏览器被认为仅能提供“简陋却无 妨 (poor, but passable)” 的浏览体验。你可以做一些小的调整来适应某个特定的浏 览器。但由于它们并非我们所关注的焦点，因此除了修复较大的错误之外，其它的差异将被 直接忽略。

**渐进增强观点**

“渐进增强”观点则认为应关注于内容本身。

内容是我们建立网站的诱因。有的网站展示它，有的则收集它，有的寻求，有的操作，还有 的网站甚至会包含以上的种种，但相同点是它们全都涉及到内容。这使得“渐进增强”成为 一种更为合理的设计范例。这也是它立即被 Yahoo! 所采纳并用以构建其“分级式浏览器 支持 (Graded Browser Support)”策略的原因所在。

那么问题来了。现在产品经理看到 IE6,7,8 网页效果相对高版本现代浏览器少了很多圆角， 阴影（CSS3），要求兼容（使用图片背景，放弃 CSS3），你会如何说服他？



## 7、为什么利用多个域名来存储网站资源会更有效？

1. CDN 缓存更方便

2. 突破浏览器并发限制

3. 节约 cookie 带宽

4. 节约主域名的连接数，优化页面响应速度

5. 防止不必要的安全问题



## 8、请谈一下你对网页标准和标准制定机构重要性的理解。

网页标准和标准制定机构都是为了能让 web 发展的更‘健康’，开发者遵循统一的标准，降 低开发难度，开发成本，SEO 也会更好做，也不会因为滥用代码导致各种 BUG、安全问题， 最终提高网站易用性。



## 9、请描述一下 cookies，sessionStorage 和 localStorage 的区别？

<img src="https://s3.ax1x.com/2020/12/24/rgm2Y8.png" alt="rgm2Y8.png" border="0" />

sessionStorage 和 sessionStorage 是 HTML5 新增的两个特性，这两个特性主要是用来作为会话存储和本地存储来使用的，解决了 cookie 存储空间不足的问题；

sessionStorage 属性允许你访问一个 session Storage 对象，用于存储当前会话的数据，存储在 sessionStorage 里面的数据在页面会话结束时会被清除。页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。

localStorage 属性允许你访问一个 Document 源(origin)的对象 Storage 用于存储当前源的数据，除非用户人为清除(调用 localStorage api 或则清除浏览器数据)， 否则存储在 localStorage 的数据将被长期保留。

**相同点**

存储大小一般均为5M左右

都有同源策略限制，跨域无法访问

数据仅在客户端中保进行存储，并不参与和服务器的通信(不会随着 http 请求发送到服务器)

以 key 和 value 的形式进行存储数据， value 值必须为字符串，不为字符串会自动转型( value 如果是对象则需要转为 json 进行存储)

**不同点**

localStorage 存储的数据是永久性的，除非用户人为删除否则会一直存在(调用 localStorage api 或则清除浏览器数据)。

sessionStorage 存储的数据在当前会话结束时会被清除，一旦窗口或者标签页被关闭，那么所有通过 sessionStorage 存储的数据也会被删除。

**作用域**

localStorage: 在同一个浏览器内，同源文档之间共享 localStorage 数据，可以互相读取、覆盖、清除(同浏览器限制、同源限制)

sessionStorage: 与 localStorage 一样需要同一浏览器同源文档这一条件。除此之外 sessionStorage 的作用域还被限定在了窗口中，也就是说，只有同一浏览器、同一窗口的同源文档才能共享数据(同浏览器限制、同源限制、同标签页限制)

**sessionStorage localStorage 在操作上没什么区别，下面以 sessionStorage 为例：**

**新增、修改**

- 通过 setItem 添加、修改数据

```js
sessionStorage.setItem('name', 'qianyin');
sessionStorage.setItem('name', 'linheng');
sessionStorage.setItem('user1', {name: 'qianyin'});
sessionStorage.setItem('user2', JSON.stringify({name: 'qianyin'}));
```

- 通过对象的形式添加、修改数据

```js
sessionStorage.name = 'qianyin';
sessionStorage.name = 'linheng';
sessionStorage.user1 = {name: 'qianyin'};
sessionStorage.user2 = JSON.stringify({name: 'qianyin'})
```

- 通过浏览器(chrome)控制台查看数据:

<img src="https://s3.ax1x.com/2020/12/24/rgnr3F.png" alt="rgnr3F.png" border="0" />

**获取数据**

- 通过 getItem 获取数据

> sessionStorage.getItem('user')

- 通过对象的形式获取数据

> sessionStorage.user

- 通过 length 属性存储数量

> *// 通过 getItem('legnth') 返回的结果为 null， 只能通过对象形式获取 length 值* 
>
> sessionStorage.length

**移除数据**

- 通过 removeItem 移除指定数据

> sessionStorage.removeItem('user');

- 通过对象的形式移除指定数据

> **delete** sessionStorage.user

- 移除当前作用域下所有数据

> sessionStorage.clear();

sessionStorage （session）中的数据，这些数据只有在同一个会话中的页面才能访问 并且当会话结束后数据也随之销毁。因此 sessionStorage 不是一种持久化的本地存储，仅仅是会话级别的存储。而 localStorage 用于持久化的本地存储，除非主动删除数据，否则 数据是永远不会过期的。

**Cookie是什么**

Cookie是服务端发送到用户浏览器并且保存到本地的一小块数据，它会在浏览器下次向同一服务器发起请求时，被携带到服务器上。

它的作用：

- 经常用来做一些用户会话状态管理、个性化设置等等。
- 前端可以通过document.cookie来访问cookie。
- cookie是跨域的，也就是在不同的域名中，访问的cookie的时候，只能访问对应的域名的cookie。

**web storage 和 cookie 的区别**

Web Storage 的概念和 cookie 相似，区别是它是为了更大容量存储设计的。Cookie 的大小 是受限的，并且每次你请求一个新的页面的时候 Cookie 都会被发送过去，这样无形中浪费 了带宽，另外 cookie 还需要指定作用域，不可以跨域调用。

除此之外，Web Storage 拥有 setItem,getItem,removeItem,clear 等方法，不像 cookie 需要前端开发者自己封装 setCookie，getCookie。但是 Cookie 也是不可以或缺的：Cookie 的作用是与服务器进行交互，作为 HTTP 规范的一部分而存在 ，而 Web Storage 仅仅是为 了在本地“存储”数据而生。



## 10、简述一下 src 与 href 的区别

src 用于替换当前元素，href 用于在当前文档和引用资源之间确立联系。

src 是 source 的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在 位置；在请求 src 资源时会将其指向的资源下载并应用到文档内，例如 js 脚本，img 图片 和 frame 等元素。

```html
<script src =”js.js"></script>
```

当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行 完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将 js 脚本放在底部而不是头部。

href 是 Hypertext Reference 的缩写，指向网络资源所在位置，建立和当前元素（锚点） 或当前文档（链接）之间的链接，如果我们在文档中添加

```html
<link href=”common.css” rel=”stylesheet”/>
```

那么浏览器会识别该文档为 css 文件，就会并行下载资源并且不会停止对当前文档的处理。 这也是为什么建议使用 link 方式来加载 css，而不是使用@import 方式。



## 11、知道的网页制作会用到的图片格式有哪些？

png-8，png-24，jpeg，gif，svg。

但是上面的那些都不是面试官想要的最后答案。面试官希望听到是 Webp。（是否有关注新 技术，新鲜事物）

科普一下 Webp：WebP 格式，谷歌（google）开发的一种旨在加快图片加载速度的图片格式。 图片压缩体积大约只有 JPEG 的 2/3，并能节省大量的服务器带宽资源和数据空间。Facebook Ebay 等知名网站已经开始测试并使用 WebP 格式。

在质量相同的情况下，WebP 格式图像的体积要比 JPEG 格式图像小 40%



## 12、知道什么是微格式吗？谈谈理解。在前端构建中应该考虑微格式吗？

**微格式**

建立在已有的、被广泛采用的标准基础之上的一组简单的、开放的数据格式（microformats.org官方定义）。

是把语义嵌入到HTML以便有助于分离式开发而制定的一些简单约定，是兼顾人机可读性设计的数据表达方式，对Web网页进行语义注解的方法。

这种方法依托于标准的Web页面写作技术，例如，XHTML，这样引入语义信息对浏览器等所有现存的Web技术冲击最小。采用Microformat的 Web页面，在XHTML文档中给一些标签（Tag）增加一些属性（attribute），这些属性对信息的语义结构进行注解，处理XHTML文档的软件，

优点：将智能数据添加到网页上，让网站内容在搜索引擎结果界面可以显示额外的提示。（应 用范例：豆瓣，有兴趣自行 google）



## 13、在 css/js 代码上线之后开发人员经常会优化性能，从用户刷新网页开始， 一次 js 请求一般情况下有哪些地方会有缓存处理？

答案：dns 缓存，cdn 缓存，浏览器缓存，服务器缓存。



## 14、一个页面上有大量的图片（大型电商网站），加载很慢，你有哪些方法优 化这些图片的加载，给用户更好的体验。

**懒加载**

**什么是懒加载**

**懒加载也叫延迟加载，指的是在长网页中延迟加载图像，是一种很好优化网页性能的方式**。用户滚动到它们之前，可视区域外的图像不会加载。这与图像预加载相反，在长网页上使用延迟加载将使网页加载更快。在某些情况下，它还可以帮助减少服务器负载。常适用图片很多，页面很长的电商网站场景中。

**为什么要用懒加载**

- **能提升用户的体验**，不妨设想下，用户打开像手机淘宝长页面的时候，如果页面上所有的图片都需要加载，由于图片数目较大，等待时间很长，用户难免会心生抱怨，这就严重影响用户体验。
- **减少无效资源的加载**，这样能明显减少了服务器的压力和流量，也能够减小浏览器的负担。
- **防止并发加载的资源过多会阻塞js的加载**，影响网站的正常使用。

**懒加载的原理**

首先将页面上的图片的 src 属性设为空字符串，而图片的真实路径则设置在data-original属性中， 当页面滚动的时候需要去监听scroll事件，在scroll事件的回调中，判断我们的懒加载的图片是否进入可视区域,如果图片在可视区内将图片的 src 属性设置为data-original 的值，这样就可以实现延迟加载。

**懒加载实现步骤**

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Lazyload</title>
    <style>
      .image-item {
	    display: block;
	    margin-bottom: 50px;
	    height: 200px;//一定记得设置图片高度
	}
    </style>
</head>
<body>
<img src="" class="image-item" lazyload="true"  data-original="images/1.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/2.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/3.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/4.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/5.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/6.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/7.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/8.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/9.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/10.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/11.png"/>
<img src="" class="image-item" lazyload="true"  data-original="images/12.png"/>
<script>
var viewHeight =document.documentElement.clientHeight//获取可视区高度
function lazyload(){
var eles=document.querySelectorAll（'img[data-original][lazyload]'）
Array.prototype.forEach.call(eles,function(item,index){
var rect
if(item.dataset.original==="")
   return
rect=item.getBoundingClientRect()// 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
if(rect.bottom>=0 && rect.top < viewHeight){
!function(){
  var img=new Image()
  img.src=item.dataset.original
  img.onload=function(){
    item.src=img.src
    }
item.removeAttribute（"data-original"）//移除属性，下次不再遍历
item.removeAttribute（"lazyload"）
   }()
  }
 })
}
lazyload()//刚开始还没滚动屏幕时，要先触发一次函数，初始化首页的页面图片
document.addEventListener（"scroll"，lazyload)
</script>
</body>
</html>
```

**预加载**

**什么是预加载**

资源预加载是另一个性能优化技术，我们可以使用该技术来预先告知浏览器某些资源可能在将来会被使用到。**预加载简单来说就是将所有所需的资源提前请求加载到本地，这样后面在需要用到时就直接从缓存取资源**。

**为什么要用预加载**

在网页全部加载之前，对一些主要内容进行加载，以提供给用户更好的体验，减少等待的时间。否则，如果一个页面的内容过于庞大，没有使用预加载技术的页面就会长时间的展现为一片空白，直到所有内容加载完毕。

**实现预加载的几种办法**

- 使用HTML标签

> `<img src="http://pic20.nipic.com/0000.jpg">`

- 使用Image对象

> `<script src="./myPreload.js"></script>`

```js
//myPreload.js文件
var image= new Image()
image.src="http://pic26.nipic.com/20121213/6168183 004444903000 2.jpg"
```

- 使用XMLHttpRequest对象,虽然存在跨域问题，但会精细控制预加载过程

```js
var xmlhttprequest=new XMLHttpRequest();
xmlhttprequest.onreadystatechange=callback;
xmlhttprequest.onprogress=progressCallback;
xmlhttprequest.open("GET","http://image.baidu.com/mouse,jpg",true);
xmlhttprequest.send();
function callback(){
  if(xmlhttprequest.readyState==4&& xmlhttprequest.status==200){
    var responseText=xmlhttprequest.responseText;
  }else{
     console.log("Request was unsuccessful:"+xmlhttprequest.status);
  }
}
function progressCallback(e){
e=e || event;
if(e.lengthComputable){
console.log("Received"+e.loaded+"of"+e.total+"bytes")
}
}
```

- 使用[PreloadJS库](https://createjs.com/preloadjs)

  PreloadJS提供了一种预加载内容的一致方式，以便在HTML应用程序中使用。预加载可以使用HTML标签以及XHR来完成。默认情况下，PreloadJS会尝试使用XHR加载内容，因为它提供了对进度和完成事件的更好支持，但是由于跨域问题，使用基于标记的加载可能更好。

```js
//使用preload.js
var queue=new createjs.LoadQueue();//默认是xhr对象，如果是new createjs.LoadQueue(false)是指使用HTML标签，可以跨域
queue.on("complete",handleComplete,this);
queue.loadManifest([
{id:"myImage",src:"http://pic26.nipic.com/20121213/6168183  0044449030002.jpg"},
{id："myImage2"，src:"http://pic9.nipic.com/20100814/2839526  1931471581702.jpg"}
]);
function handleComplete(){
  var image=queue.getResuLt("myImage");
  document.body.appendChild(image);
}
```

**懒加载和预加载的对比**

两者都是提高页面性能有效的办法，**两者主要区别是一个是提前加载，一个是迟缓甚至不加载。懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力**。

1. 图片懒加载，在页面上的未可视区域可以添加一个滚动条事件，判断图片位置与浏览器顶端 的距离与页面的距离，如果前者小于后者，优先加载。

2. 如果为幻灯片、相册等，可以使用图片预加载技术，将当前展示图片的前一张和后一张优先 下载。

3. 如果图片为 css 图片，可以使用 CSSsprite，SVGsprite，Iconfont、Base64 等技术。

4. 如果图片过大，可以使用特殊编码的图片，加载时会先加载一张压缩的特别厉害的缩略图， 以提高用户体验。 如果图片展示区域小于

5. 如果图片展示区域小于图片的真实大小，则因在服务器端根据业务需要先行进行图片压缩， 图片压缩后大小与展示一致。



## 15、你如何理解 HTML 结构的语义化？

去掉或样式丢失的时候能让页面呈现清晰的结构：

1. html 本身是没有表现的，我们看到例如`<h1>`\>是粗体，字体大小 2em，加粗;

   `<strong>`是加粗 的，不要认为这是 html 的表现，这些其实 html 默认的 css 样式在起作用，所以去掉或样式 丢失的时候能让页面呈现清晰的结构不是语义化的 HTML 结构的优点，但是浏览器都有有默 认样式，默认样式的目的也是为了更好的表达 html 的语义，可以说浏览器的默认样式和语 义化的 HTML 结构是不可分割的。

2. 屏幕阅读器（如果访客有视障）会完全根据你的标记来“读”你的网页.

   例如,如果你使用的含语义的标记,屏幕阅读器就会“逐个拼出”你的单词,而不是试着去对 它完整发音.

   PDA、手机等设备可能无法像普通电脑的浏览器一样来渲染网页（通常是因为这些设备对 CSS 的支持较弱）

   使用语义标记可以确保这些设备以一种有意义的方式来渲染网页.理想情况下,观看设备的 任务是符合设备本身的条件来渲染网页.

   语义标记为设备提供了所需的相关信息,就省去了你自己去考虑所有可能的显示情况（包括 现有的或者将来新的设备）.例如,一部手机可以选择使一段标记了标题的文字以粗体显示. 而掌上电脑可能会以比较大的字体来显示.无论哪种方式一旦你对文本标记为标题,您就可 以确信读取设备将根据其自身的条件来合适地显示页面.

3. 搜索引擎的爬虫也依赖于标记来确定上下文和各个关键字的权重

   过去你可能还没有考虑搜索引擎的爬虫也是网站的“访客”,但现在它们他们实际上是极其 宝贵的用户.没有他们的话,搜索引擎将无法索引你的网站,然后一般用户将很难过来访问.

   你的页面是否对爬虫容易理解非常重要,因为爬虫很大程度上会忽略用于表现的标记,而只 注重语义标记.

   因此,如果页面文件的标题被标记,而不是,那么这个页面在搜索结果的位置可能会比较靠后. 除了提升易用性外,语义标记有利于正确使用 CSS 和 JavaScript,因为其本身提供了许多“钩 钩”来应用页面的样式与行为.

   SEO 主要还是靠你网站的内容和外部链接的。

4. 便于团队开发和维护

   W3C 给我们定了一个很好的标准，在团队中大家都遵循这个标准，可以减少很多差异化的东 西，方便开发和维护，提高开发效率，甚至实现模块化开发。

   

## 16、谈谈以前端角度出发做好 SEO 需要考虑什么？

了解搜索引擎如何抓取网页和如何索引网页

你需要知道一些搜索引擎的基本工作原理，各个搜索引擎之间的区别，搜索机器人 （SE robot 或叫 web crawler）如何进行工作，搜索引擎如何对搜索结果进行排序等 等。

### Meta 标签优化

主要包括主题（Title)，网站描述(Description)，和关键词（Keywords）。还有一些其它 的隐藏文字比如 Author（作者），Category（目录），Language（编码语种）等。

如何选取关键词并在网页中放置关键词

搜索就得用关键词。关键词分析和选择是 SEO 最重要的工作之一。首先要给网站确定主关键 词（一般在 5 个上下），然后针对这些关键词进行优化，包括关键词密度（Density），相 关度（Relavancy），突出性（Prominency）等等。

### 了解主要的搜索引擎

虽然搜索引擎有很多，但是对网站流量起决定作用的就那么几个。比如英文的主要有 Google，Yahoo，Bing 等；中文的有百度，搜狗，有道等。不同的搜索引擎对页面的抓取和 索引、排序的规则都不一样。还要了解各搜索门户和搜索引擎之间的关系，比如 AOL 网页搜 索用的是 Google 的搜索技术，MSN 用的是 Bing 的技术。

### 主要的互联网目录

Open Directory 自身不是搜索引擎，而是一个大型的网站目录，他和搜索引擎的主要区别 是网站内容的收集方式不同。目录是人工编辑的，主要收录网站主页；搜索引擎是自动收集 的，除了主页外还抓取大量的内容页面。

### 按点击付费的搜索引擎

搜索引擎也需要生存，随着互联网商务的越来越成熟，收费的搜索引擎也开始大行其道。最 典型的有 Overture 和百度，当然也包括 Google 的广告项目 Google Adwords。越来越多的 人通过搜索引擎的点击广告来定位商业网站，这里面也大有优化和排名的学问，你得学会用 最少的广告投入获得最多的点击。

### 搜索引擎登录

网站做完了以后，别躺在那里等着客人从天而降。要让别人找到你，最简单的办法就是将网 站提交（submit）到搜索引擎。如果你的是商业网站，主要的搜索引擎和目录都会要求你付 费来获得收录（比如 Yahoo 要 299 美元），但是好消息是（至少到目前为止）最大的搜索引 擎 Google 目前还是免费，而且它主宰着 60％以上的搜索市场。

### 链接交换和链接广泛度（Link Popularity）

网页内容都是以超文本（Hypertext）的方式来互相链接的，网站之间也是如此。除了搜索 引擎以外，人们也每天通过不同网站之间的链接来 Surfing（“冲浪”）。其它网站到你的 网站的链接越多，你也就会获得更多的访问量。更重要的是，你的网站的外部链接数越多， 会被搜索引擎认为它的重要性越大，从而给你更高的排名。

**合理的标签使用**



## 17、有哪项方式可以对一个 DOM 设置它的 CSS 样式？

外部样式表，引入一个外部 css 文件

内部样式表，将 css 代码放在  标签内部

内联样式，将 css 样式直接定义在 HTML 元素内部



## 18、CSS 都有哪些选择器？

派生选择器（用 HTML 标签申明）

id 选择器（用 DOM 的 ID 申明）

类选择器（用一个样式类名申明）

属性选择器（用 DOM 的属性申明，属于 CSS2，IE6 不支持，不常用，不知道就算了）

除了前 3 种基本选择器，还有一些扩展选择器，包括



后代选择器（利用空格间隔，比如 div .a{ }） 

群组选择器（利用逗号间隔，比如 p,div,#a{ }）

那么问题来了，CSS 选择器的优先级是怎么样定义的？ 基本原则：

一般而言，选择器越特殊，它的优先级越高。也就是选择器指向的越准确，它的优先级就越 高。



复杂的计算方法：

用 1 表示派生选择器的优先级

用 10 表示类选择器的优先级

用 100 标示 ID 选择器的优先级

div.test1 .span var 优先级 1+10 +10 +1

span#xxx .songs li 优先级 1+100 + 10 + 1

\#xxx li 优先级 100 +1

那么问题来了，看下列代码，

标签内的文字是什么颜色的？

```CSS
<style>

.classA{ color:blue;} 

.classB{ color:red;}
</style>
<body>
<p class='classB classA'> 123 </p>
</body>
```

答案：red。与样式定义在文件中的先后顺序有关，即是后面的覆盖前面的，与在

中的先后关系无关。



## 19、CSS 中可以通过哪些属性定义，使得一个 DOM 元素不显示在浏览器可视范围 内？

最基本的： 设置 display 属性为 none，或者设置 visibility 属性为 hidden

技巧性： 设置宽高为 0，设置透明度为 0，设置 z-index 位置在-1000



## 20、超链接访问过后 hover 样式就不出现的问题是什么？如何解决？

答案：被点击访问过的超链接样式不在具有 hover 和 active 了,解决方法是改变 CSS 属性的 排列顺序: L-V-H-A（link,visited,hover,active）



## 21、什么是 Css Hack？ie6,7,8 的 hack 分别是什么？

答案：针对不同的浏览器写不同的 CSS code 的过程，就是 CSS hack.

示例如下：

```css
#test {
width:300px;
height:300px;
background-color:blue; /*firefox*/
background-color:red\9; /*all ie*/
background-color:yellow; /*ie8*/
+background-color:pink; /*ie7*/
_background-color:orange; /*ie6*/ }
:root #test { background-color:purple\9; } /*ie9*/
@media all and (min-width:0px){ #test {background-color:black;} } /*opera*/
@media screen and (-webkit-min-device-pixel-ratio:0){ #test {background-color:gray;} } /*chrome and safari*/
```

## 22、请用 Css 写一个简单的幻灯片效果页面

答案：知道是要用 css3。使用 animation 动画实现一个简单的幻灯片效果。

```css
/**HTML**/
div.ani
/**css**/
.ani{
width:480px;
height:320px;
margin:50px auto;
overflow: hidden;
box-shadow:0 0 5px rgba(0,0,0,1);
background-size: cover;
background-position: center;
-webkit-animation-name: "loops";
-webkit-animation-duration: 20s;
-webkit-animation-iteration-count: infinite;
}
@-webkit-keyframes "loops" {
0% {
background:url(http://d.hiphotos.baidu.com/image/w%3D400/sign=c01e6adca964034f0fcdc3069fc27980/e824b899a9014c08e5e38ca4087b02087af4f4d3.jpg)
no-repeat;
}
25% {
background:url(http://b.hiphotos.baidu.com/image/w%3D400/sign=edee1572e9f81a4c2632edc9e72b6029/30adcbef76094b364d72bceba1cc7cd98c109dd0.jpg)
no-repeat;
}
50% {
background:url(http://b.hiphotos.baidu.com/image/w%3D400/sign=937dace2552c11dfded1be2353266255/d8f9d72a6059252d258e7605369b033b5bb5b912.jpg)
no-repeat;
}
75% {
background:url(http://g.hiphotos.baidu.com/image/w%3D400/sign=7d37500b8544ebf86d71653fe9f9d736/0df431adcbef76095d61f0972cdda3cc7cd99e4b.jpg)
no-repeat;
}
100% {
background:url(http://c.hiphotos.baidu.com/image/w%3D400/sign=cfb239ceb0fb43161a1f7b7a10a54642/3b87e950352ac65ce2e73f76f9f2b21192138ad1.jpg)
no-repeat;
    }
}
```



## 23、行内元素和块级元素的具体区别是什么？行内元素的 padding 和 margin 可 设置吗？

块级元素(block)特性：

总是独占一行，表现为另起一行开始，而且其后的元素也必须另起一行显示; 宽度(width)、高度(height)、内边距(padding)和外边距(margin)都可控制; 内联元素(inline)特性：

和相邻的内联元素在同一行;

宽度(width)、高度(height)、内边距的 top/bottom(padding-top/padding-bottom)和外边 距的 top/bottom(margin-top/margin-bottom)都不可改变（也就是 padding 和 margin 的 left 和 right 是可以设置的），就是里面文字或图片的大小。

那么问题来了，浏览器还有默认的天生 inline-block 元素（拥有内在尺寸，可设置高宽， 但不会自动换行），有哪些？

答案`：<input> 、<img> 、<button> 、<texterea> 、<label>。`



## 24、什么是外边距重叠？重叠的结果是什么？

外边距重叠就是 margin-collapse。

在 CSS 当中，相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一 个单独的外边距。这种合并外边距的方式被称为折叠，并且因而所结合成的外边距称为折叠 外边距。

折叠结果遵循下列计算规则：

两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。 两个外边距一正一负时，折叠结果是两者的相加的和。



## 25、rgba()和 opacity 的透明效果有什么不同？

rgba()和 opacity 都能实现透明效果，但最大的不同是 opacity 作用于元素，以及元素内的 所有内容的透明度,

而 rgba()只作用于元素的颜色或其背景色。（设置 rgba 透明的元素的子元素不会继承透明 效果！）



## 26、css 中可以让文字在垂直和水平方向上重叠的两个属性是什么？

垂直方向：line-height

水平方向：letter-spacing

那么问题来了，关于 letter-spacing 的妙用知道有哪些么？

答案:可以用于消除 inline-block 元素间的换行符空格间隙问题。

## 27、如何垂直居中一个浮动元素？

```css
// 方法一：已知元素的高宽#div1{
background-color:#6699FF;
width:200px;
height:200px;
position: absolute; //父元素需要相对定位
top: 50%;
left: 50%;
margin-top:-100px ; //二分之一的 height，width
margin-left: -100px;
}
//方法二:未知元素的高宽
#div1{
width: 200px;
height: 200px;
background-color: #6699FF;
margin:auto;
position: absolute; //父元素需要相对定位
left: 0;
top: 0;
right: 0;
bottom: 0;
}
那么问题来了，如何垂直居中一个<img>?（用更简便的方法。）
#container //<img>的容器设置如下
{
display:table-cell;
text-align:center;
vertical-align:middle;
}

```

## 28、px 和 em 的区别。

px 和 em 都是长度单位，区别是，px 的值是固定的，指定是多少就是多少，计算比较容易。 em 得值不是固定的，并且 em 会继承父级元素的字体大小。

浏览器的默认字体高都是16px。所以未经调整的浏览器都符合: 1em=16px。那么12px=0.75em, 10px=0.625em。

## 29、描述一个”reset”的 CSS 文件并如何使用它。知道 normalize.css 吗？你 了解他们的不同之处？

重置样式非常多，凡是一个前端开发人员肯定有一个常用的重置 CSS 文件并知道如何使用它 们。他们是盲目的在做还是知道为什么这么做呢？原因是不同的浏览器对一些元素有不同的 默认样式，如果你不处理，在不同的浏览器下会存在必要的风险，或者更有戏剧性的性发生。

你可能会用 Normalize 来代替你的重置样式文件。它没有重置所有的样式风格，但仅提供了 一套合理的默认样式值。既能让众多浏览器达到一致和合理，但又不扰乱其他的东西（如粗 体的标题）。

在这一方面，无法做每一个复位重置。它也确实有些超过一个重置，它处理了你永远都不用 考虑的怪癖，像 HTML 的 audio 元素不一致或 line-height 不一致。

## 30、Sass、LESS 是什么？大家为什么要使用他们？

他们是 CSS 预处理器。他是 CSS 上的一种抽象层。他们是一种特殊的语法/语言编译成 CSS。

例如 Less 是一种动态样式语言. 将 CSS 赋予了动态语言的特性，如变量，继承，运算， 函 数. LESS 既可以在客户端上运行 (支持 IE 6+, Webkit, Firefox)，也可一在服务端运行 (借助 Node.js)。 为什么要使用它们？

结构清晰，便于扩展。

可以方便地屏蔽浏览器私有语法差异。这个不用多说，封装对浏览器语法差异的重复处理， 减少无意义的机械劳动。

可以轻松实现多重继承。

完全兼容 CSS 代码，可以方便地应用到老项目中。LESS 只是在 CSS 语法上做了扩展，所 以老的 CSS 代码也可以与 LESS 代码一同编译。

## 31、display:none 与 visibility:hidden 的区别是什么？

display : 隐藏对应的元素但不挤占该元素原来的空间。 

visibility: 隐藏对应的元素并且挤占该元素原来的空间。

即是，使用 CSS display:none 属性后，HTML 元素（对象）的宽度、高度等各种属性值都将 “丢失”;而使用 visibility:hidden 属性后，HTML 元素（对象）仅仅是在视觉上看不见（完 全透明），而它所占据的空间位置仍然存在。

## 32、CSS 中 link 和@import 的区别是：

Link 属于 html 标签，而@import 是 CSS 中提供的 在页面加载的时候，link 会同时被加载，而@import 引用的 CSS 会在页面加载完成后才会加 载引用的 CSS

@import 只有在 ie5 以上才可以被识别，而 link 是 html 标签，不存在浏览器兼容性问题

Link 引入样式的权重大于@import 的引用（@import 是将引用的样式导入到当前的页面中）

## 33、简介盒子模型：

CSS 的盒子模型有两种：IE 盒子模型、标准的 W3C 盒子模型模型 盒模型：内容、内边距、外边距（一般不计入盒子实际宽度）、边框

<img src="https://s3.ax1x.com/2020/12/24/rgExaT.png" alt="rgExaT.png" border="0" />

## 34、为什么要初始化样式？

由于浏览器兼容的问题，不同的浏览器对标签的默认样式值不同，若不初始化会造成不同浏 览器之间的显示差异

但是初始化 CSS 会对搜索引擎优化造成小影响

## 35、BFC 是什么?

BFC（块级格式化上下文），一个创建了新的 BFC 的盒子是独立布局的，盒子内元素的布局 不会影响盒子外面的元素。在同一个 BFC 中的两个相邻的盒子在垂直方向发生 margin 重叠 的问题

BFC 是指浏览器中创建了一个独立的渲染区域，该区域内所有元素的布局不会影响到区域外 元素的布局，这个渲染区域只对块级元素起作用

## 36、html 语义化是什么？

当页面样式加载失败的时候能够让页面呈现出清晰的结构

有利于 seo 优化，利于被搜索引擎收录（更便于搜索引擎的爬虫程序来识别） 

便于项目的开发及维护，使 html 代码更具有可读性，便于其他设备解析。

## 37、Doctype 的作用？严格模式与混杂模式的区别？

用于告知浏览器该以何种模式来渲染文档

严格模式下：页面排版及 JS 解析是以该浏览器支持的最高标准来执行

混杂模式：不严格按照标准执行，主要用来兼容旧的浏览器，向后兼容

## 38、IE 的双边距 BUG：

块级元素 float 后设置横向 margin，ie6 显示的 margin 比设置的较大。

解决：加入_display：inline

## 39、HTML 与 XHTML——二者有什么区别？

1. 所有的标记都必须要有一个相应的结束标记

2. 所有标签的元素和属性的名字都必须使用小写

3. 所有的 XML 标记都必须合理嵌套

4. 所有的属性必须用引号 "" 括起来

5. 把所有 < 和 & 特殊符号用编码表示

6. 给所有属性赋一个值

7. 不要在注释内容中使用 "--"

8. 图片必须有说明文字

## 40、html 常见兼容性问题？

1. 双边距 BUG float 引起的 使用 display

2. 3 像素问题 使用 float 引起的 使用 dislpay:inline -3px

3. 超链接 hover 点击后失效 使用正确的书写顺序 link visited hover active

4. Ie z-index 问题 给父级添加 position:relative

5. Png 透明 使用 js 代码 改

6. Min-height 最小高度 ！Important 解决’

7. select 在 ie6 下遮盖 使用 iframe 嵌套

8. 为 什 么 没 有 办 法 定 义 1px 左 右 的 宽 度 容 器 （ IE6 默 认 的 行 高 造 成 的 ， 使 用 over:hidden,zoom:0.08 line-height:1px）

9. IE5-8 不支持 opacity，解决办法：

```css
.opacity {
opacity: 0.4
filter: alpha(opacity=60); /* for IE5-7 */
-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"; /* for IE
8*/
}
```

10. IE6 不支持 PNG 透明背景，解决办法: IE6 下使用 gif 图片

## 41、对 WEB 标准以及 W3C 的理解与认识

答：标签闭合、标签小写、不乱嵌套、提高搜索机器人搜索几率、使用外 链 css 和 js 脚本、 结构行为表现的分离、文件下载与页面速度更快、内容能被更多的用户所访问、内容能被更 广泛的设备所访问、更少的代码和组件，容易维 护、改版方便，不需要变动页面内容、提 供打印版本而不需要复制内容、提高网站易用性。

## 42、行内元素有哪些?块级元素有哪些?CSS 的盒模型?

答：块级元素：div p h1 h2 h3 h4 form ul 

行内元素: a b br i span input select Css 

盒模型:内容，border ,margin，padding

## 43、前端页面有哪三层构成，分别是什么?作用是什么?

答：结构层 Html 表示层 CSS 行为层 js。

## 44、Doctype 作用? 严格模式与混杂模式-如何触发这两种模式，区分它们有何 意义?

（1）、 声明位于文档中的最前面，处于  标签之前。告知浏览器的 解析器，用什么文档类型 规范来解析这个文档。

（2）、严格模式的排版和 JS 运作模式是 以该浏览器支持的最高标准运行。

（3）、在混杂模式中，页面以宽松的向后兼容的方式显示。模拟老式浏览器的行为以 防止站点无法工作。

（4）、DOCTYPE 不存在或格式不正确会导致文档以混杂模式呈现。

