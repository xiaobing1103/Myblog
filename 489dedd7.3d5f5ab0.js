(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{107:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return b})),n.d(t,"toc",(function(){return o})),n.d(t,"default",(function(){return u}));var r=n(3),a=n(8),l=(n(0),n(189)),c=n(193),i={id:"http-basics",title:"HTTP \u534f\u8bae\u57fa\u7840",description:"\u524d\u540e\u7aef\u4ea4\u4e92\u4e4b HTTP \u534f\u8bae\u3002HTTP\u534f\u8bae\u7b80\u660e\u6982\u8ff0\u3002",keywords:["network","http","https","\u7f51\u7edc","\u7f51\u7edc\u534f\u8bae","http\u534f\u8bae"]},b={unversionedId:"videos/network/01-http-basics/http-basics",id:"videos/network/01-http-basics/http-basics",isDocsHomePage:!1,title:"HTTP \u534f\u8bae\u57fa\u7840",description:"\u524d\u540e\u7aef\u4ea4\u4e92\u4e4b HTTP \u534f\u8bae\u3002HTTP\u534f\u8bae\u7b80\u660e\u6982\u8ff0\u3002",source:"@site/docs/videos/network/01-http-basics/index.md",slug:"/videos/network/01-http-basics/http-basics",permalink:"/Myblog/docs/videos/network/01-http-basics/http-basics",editUrl:"https://github.com/xiaobing1103/docs/videos/network/01-http-basics/index.md",version:"current",sidebar:"videos",previous:{title:"JS DOM \u64cd\u7eb5",permalink:"/Myblog/docs/videos/browser/03-js-dom/js-dom-operation"},next:{title:"HTTPS \u534f\u8bae\u57fa\u7840",permalink:"/Myblog/docs/videos/network/02-https-basics/https-basics"}},o=[{value:"URL",id:"url",children:[]},{value:"\u53d1\u9001 HTTP \u8bf7\u6c42",id:"\u53d1\u9001-http-\u8bf7\u6c42",children:[]},{value:"\u63a5\u6536\u54cd\u5e94",id:"\u63a5\u6536\u54cd\u5e94",children:[]},{value:"\u65e0\u72b6\u6001",id:"\u65e0\u72b6\u6001",children:[]},{value:"HTTP/2",id:"http2",children:[]}],p={toc:o};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(l.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(l.b)(c.a,{src:"//player.bilibili.com/player.html?aid=413122179&bvid=BV1KV411o7u5&cid=186435489&page=1",bsrc:"https://www.bilibili.com/video/BV1KV411o7u5/",mdxType:"BVideo"}),Object(l.b)("p",null,"\u524d\u540e\u7aef\u6570\u636e\u7684\u4ea4\u6362\u4e00\u822c\u662f\u57fa\u4e8e HTTP \u534f\u8bae\u3002"),Object(l.b)("p",null,"HTTP \u534f\u8bae\u5305\u62ec\u5ba2\u6237\u7aef\u548c\u670d\u52a1\u7aef\u4e24\u4e2a\u5b9e\u4f53\uff0c\u5ba2\u6237\u7aef\u53d1\u9001\u8bf7\u6c42\u7ed9\u670d\u52a1\u7aef\uff0c\u670d\u52a1\u7aef\u8fd4\u56de\u54cd\u5e94\u7ed9\u5ba2\u6237\u7aef\u3002"),Object(l.b)("p",null,"\u5728 HTTP \u4e2d\uff0c\u6570\u636e\u79f0\u4e3a\u8d44\u6e90\uff0c\u53ef\u4ee5\u662f html \u6587\u6863\u3001\u56fe\u7247\u3001\u4e5f\u53ef\u4ee5\u662f\u666e\u901a\u6587\u672c\u3002\u8d44\u6e90\u662f\u901a\u8fc7 URL \u8fdb\u884c\u5b9a\u4f4d\u7684\u3002"),Object(l.b)("h2",{id:"url"},"URL"),Object(l.b)("p",null,"\u5f53\u5ba2\u6237\u7aef\u9700\u8981\u8bbf\u95ee\u670d\u52a1\u7aef\u8d44\u6e90\u65f6\uff0c\u9996\u5148\u9700\u8981\u77e5\u9053\u8d44\u6e90\u7684 url\uff0c\u4f8b\u5982\u6253\u5f00 bilibili \u7f51\u7ad9:"),Object(l.b)("pre",null,Object(l.b)("code",Object(r.a)({parentName:"pre"},{}),"http://www.bilibili.com\n")),Object(l.b)("p",null,"\u6216\u8005\u8bf7\u6c42\u67d0\u7bc7\u535a\u6587\u4e0b\u7684\u6240\u6709\u8bc4\u8bba\u3002"),Object(l.b)("pre",null,Object(l.b)("code",Object(r.a)({parentName:"pre"},{}),"http://jsonplaceholder.typicode.com/comments?postId=1\n")),Object(l.b)("p",null,"URL \u7684\u7ec4\u6210\u90e8\u5206\u6709\uff1a"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"http:// - \u534f\u8bae Protocal"),Object(l.b)("li",{parentName:"ul"},"jsonplaceholder.typicode.com - \u4e3b\u673a Host"),Object(l.b)("li",{parentName:"ul"},"/comments - \u8def\u5f84 path"),Object(l.b)("li",{parentName:"ul"},"?postId=1 - \u67e5\u8be2\u53c2\u6570")),Object(l.b)("p",null,"\u670d\u52a1\u7aef\u6536\u5230 url \u4f1a\u89e3\u6790\u5b83\u4eec\u5e76\u8fd4\u56de\u76f8\u5e94\u7684\u6570\u636e\u3002"),Object(l.b)("h2",{id:"\u53d1\u9001-http-\u8bf7\u6c42"},"\u53d1\u9001 HTTP \u8bf7\u6c42"),Object(l.b)("p",null,"HTTP \u8bf7\u6c42\u5305\u62ec\u4e0b\u8fb9\u51e0\u4e2a\u90e8\u5206"),Object(l.b)("pre",null,Object(l.b)("code",Object(r.a)({parentName:"pre"},{}),"GET /comments?postId=1 HTTP/1.1\n\n\u8bf7\u6c42\u5934 request headers\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\nAccept-Encoding: gzip, deflate\n...\n\n\u8bf7\u6c42\u4f53(\u5982\u679c\u6709) request body\n....\n\n")),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"\u8bf7\u6c42\u65b9\u5f0f\uff0c \u544a\u77e5\u670d\u52a1\u5668\u8981\u8fdb\u884c\u7684\u64cd\u4f5c\uff0cGET\u662f\u9ed8\u8ba4\u8bf7\u6c42\u65b9\u5f0f\uff0c\u610f\u601d\u662f\u4ece\u670d\u52a1\u7aef\u83b7\u53d6\u8d44\u6e90\uff0c\u53e6\u5916\u8fd8\u6709\u51e0\u4e2a\u5176\u4ed6\u5e38\u7528\u7684\u65b9\u5f0f\uff1a",Object(l.b)("ul",{parentName:"li"},Object(l.b)("li",{parentName:"ul"},"POST - \u521b\u5efa\u8d44\u6e90"),Object(l.b)("li",{parentName:"ul"},"PUT - \u66f4\u65b0\u8d44\u6e90"),Object(l.b)("li",{parentName:"ul"},"DELETE - \u5220\u9664\u8d44\u6e90"),Object(l.b)("li",{parentName:"ul"},"\u533a\u522b\u662f GET \u548c DELETE \u4e00\u822c\u6ca1\u6709\u8bf7\u6c42\u4f53\u3002\u800cPOST \u548c PUT \u901a\u5e38\u5e26\u6709\u8bf7\u6c42\u4f53\uff0c\u7528\u4e8e\u5411\u670d\u52a1\u7aef\u53d1\u9001\u8d44\u6e90\u4fe1\u606f\u3002")))),Object(l.b)("p",null,"\u63a5\u4e0b\u6765\u662f\uff1a"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"\u8bf7\u6c42\u8d44\u6e90\u7684\u8def\u5f84\u548c\u67e5\u8be2\u53c2\u6570"),Object(l.b)("li",{parentName:"ul"},"HTTP \u7248\u672c"),Object(l.b)("li",{parentName:"ul"},"\u8bf7\u6c42\u5934\uff0c\u5305\u542b\u989d\u5916\u7684\u4fe1\u606f\u6765\u5e2e\u52a9\u670d\u52a1\u5668\u51b3\u5b9a\u5982\u4f55\u8fdb\u884c\u54cd\u5e94\uff0c\u6bd4\u5982\u4f7f\u7528 accept \u8bbe\u7f6e\u63a5\u6536\u54cd\u5e94\u8d44\u6e90\u7684\u7c7b\u578b"),Object(l.b)("li",{parentName:"ul"},"\u8bf7\u6c42\u4f53\uff0c\u662f\u9700\u8981\u53d1\u9001\u7ed9\u670d\u52a1\u5668\u7684\u6570\u636e")),Object(l.b)("h2",{id:"\u63a5\u6536\u54cd\u5e94"},"\u63a5\u6536\u54cd\u5e94"),Object(l.b)("p",null,"\u670d\u52a1\u7aef\u5728\u5904\u7406\u8bf7\u6c42\u4e4b\u540e\u53d1\u9001\u54cd\u5e94\u7ed9\u5ba2\u6237\u7aef\u3002\u5185\u5bb9\u6709\uff1a"),Object(l.b)("pre",null,Object(l.b)("code",Object(r.a)({parentName:"pre"},{}),'HTTP/1.1 200 OK\nDate: Sat, 02 May 2020 08:21:09 GMT\nContent-Type: application/json; charset=utf-8\nCache-Control: max-age=14400\n\n[\n  {\n    "postId": 1,\n    "id": 1,\n    "name": "id labore ex et quam laborum",\n    "email": "Eliseo@gardner.biz",\n    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\\ntempora quo necessitatibus\\ndolor quam autem quasi\\nreiciendis et nam sapiente accusantium"\n  }\n]\n...\n\n')),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"HTTP \u534f\u8bae\u7248\u672c"),Object(l.b)("li",{parentName:"ul"},"\u54cd\u5e94\u72b6\u6001\u7801\uff0c\u8868\u660e\u54cd\u5e94\u7684\u7ed3\u679c",Object(l.b)("ul",{parentName:"li"},Object(l.b)("li",{parentName:"ul"},"100-199 \u4e00\u822c\u4fe1\u606f"),Object(l.b)("li",{parentName:"ul"},"200-299 \u6210\u529f\u54cd\u5e94"),Object(l.b)("li",{parentName:"ul"},"300-399 \u91cd\u5b9a\u5411"),Object(l.b)("li",{parentName:"ul"},"400-499 \u5ba2\u6237\u7aef\u9519\u8bef"),Object(l.b)("li",{parentName:"ul"},"500-599 \u670d\u52a1\u7aef\u9519\u8bef")))),Object(l.b)("p",null,"\u63a5\u4e0b\u6765\u662f\uff1a"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"\u72b6\u6001\u7801\u542b\u4e49\u7684\u7b80\u8981\u63cf\u8ff0"),Object(l.b)("li",{parentName:"ul"},"\u54cd\u5e94\u5934\uff0c\u4e0e\u8bf7\u6c42\u5934\u7c7b\u4f3c\uff0c\u5305\u542b\u989d\u5916\u7684\u54cd\u5e94\u4fe1\u606f\uff0c\u6bd4\u5982\u544a\u77e5\u5ba2\u6237\u7aef\u5982\u4f55\u63a7\u5236\u7f13\u5b58\u548c cookie\u3002"),Object(l.b)("li",{parentName:"ul"},"\u54cd\u5e94\u4f53\uff08\u5982\u679c\u6709\uff09- \u662f\u670d\u52a1\u7aef\u8fd4\u56de\u7684\u6570\u636e")),Object(l.b)("h2",{id:"\u65e0\u72b6\u6001"},"\u65e0\u72b6\u6001"),Object(l.b)("p",null,"HTTP \u534f\u8bae\u662f\u65e0\u72b6\u6001\u7684\uff0c\u6bcf\u6b21\u5ba2\u6237\u7aef\u53d1\u51fa\u7684\u8bf7\u6c42\u90fd\u88ab\u8ba4\u4e3a\u662f\u4ece\u5168\u65b0\u7684\u5ba2\u6237\u7aef\u53d1\u51fa\u6765\u7684\uff0c\u5982\u679c\u9700\u8981\u8bb0\u5f55\u72b6\u6001\u5219\u9700\u8981\u4f7f\u7528 cookie \u548c session \u6765\u4fdd\u6301\u4f1a\u8bdd\uff0c\u5b9e\u73b0\u767b\u5f55\u548c\u8d2d\u7269\u8f66\u4e4b\u7c7b\u7684\u529f\u80fd\u3002"),Object(l.b)("h2",{id:"http2"},"HTTP/2"),Object(l.b)("p",null,"\u73b0\u5728 HTTP/2\u5df2\u7ecf\u53ef\u4ee5\u6b63\u5f0f\u5f00\u59cb\u4f7f\u7528\u4e86\uff0c\u5b83\u8ddf HTTP 1.1\u4e0d\u540c\u7684\u662f\uff1a"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"\u6570\u636e\u901a\u8fc7\u4e8c\u8fdb\u5236\u5f62\u5f0f\u4f20\u8f93\uff0c\u4e0d\u518d\u662f\u6587\u672c\u5f62\u5f0f"),Object(l.b)("li",{parentName:"ul"},"\u591a\u8def\u590d\u7528 - \u5efa\u7acb\u8fde\u63a5\u540e\u4e00\u6b21\u53ef\u4ee5\u53d1\u9001\u591a\u4e2a HTTP \u8bf7\u6c42"),Object(l.b)("li",{parentName:"ul"},"\u538b\u7f29 http headers\uff0c\u51cf\u5c11\u8d1f\u8f7d"),Object(l.b)("li",{parentName:"ul"},"\u652f\u6301 server push")),Object(l.b)("p",null,"\u597d\u4e86\uff0c\u8fd9\u5c31\u662f\u4eca\u5929\u7684\u524d\u540e\u7aef\u4ea4\u4e92\u4e4b HTTP \u534f\u8bae\uff0c\u770b\u5b8c\u8fd9\u4e9b\u4f60\u5e94\u8be5\u4e86\u89e3\u524d\u7aef\u5e94\u7528\u53d1\u9001\u8bf7\u6c42\u548c\u63a5\u6536\u54cd\u5e94\u65f6\uff0c\u5404\u9879\u53c2\u6570\u7684\u542b\u4e49\u4e86\u3002\u5982\u679c\u6709\u5e2e\u52a9\u522b\u5fd8\u4e86\u4e09\u8fde\u52a0\u5173\u6ce8\uff0c\u6211\u662f\u4e8c\u59e8\uff0c\u611f\u8c22\u89c2\u770b\uff01"))}u.isMDXComponent=!0},189:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=a.a.createContext({}),p=function(e){var t=a.a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return a.a.createElement(o.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,c=e.parentName,o=b(e,["components","mdxType","originalType","parentName"]),u=p(n),m=r,d=u["".concat(c,".").concat(m)]||u[m]||s[m]||l;return n?a.a.createElement(d,i(i({ref:t},o),{},{components:n})):a.a.createElement(d,i({ref:t},o))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,c=new Array(l);c[0]=m;var i={};for(var b in t)hasOwnProperty.call(t,b)&&(i[b]=t[b]);i.originalType=e,i.mdxType="string"==typeof e?e:r,c[1]=i;for(var o=2;o<l;o++)c[o]=n[o];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},193:function(e,t,n){"use strict";var r=n(0),a=n.n(r),l=n(1),c=n.n(l),i=n(57),b=n.n(i);function o(e){var t=e.src,n=e.bsrc;return a.a.createElement(a.a.Fragment,null,a.a.createElement("iframe",{src:t,scrolling:"no",border:0,frameBorder:"no",framespacing:0,allowFullScreen:!0,className:b.a.videoFrame}),a.a.createElement("div",{style:{fontWeight:800,padding:"2em 0"}},a.a.createElement("a",{href:n},"\u70b9\u51fb\u8df3\u8f6c\u5230B\u7ad9\u8fdb\u884c\u89c2\u770b~\u8bb0\u5f97\u7ed9\u4e2a\u4e09\u8fde\u54e6\uff01")))}o.propTypes={src:c.a.string.isRequired,bsrc:c.a.string},t.a=o}}]);