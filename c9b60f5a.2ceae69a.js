(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{157:function(e,t,i){"use strict";i.r(t),i.d(t,"frontMatter",(function(){return a})),i.d(t,"metadata",(function(){return s})),i.d(t,"toc",(function(){return l})),i.d(t,"default",(function(){return b}));var n=i(3),r=i(8),o=(i(0),i(189)),c=i(193),a={id:"css-position",title:"CSS \u5b9a\u4f4d",description:"CSS \u7684\u5b9a\u4f4d\u901a\u8fc7 position \u5c5e\u6027\u8bbe\u7f6e\uff0c\u5b83\u6709 static, relative, absolute, fixed, sticky \u8fd9\u51e0\u79cd\u3002",keywords:["css","position","\u5b9a\u4f4d","\u524d\u7aef","frontend"]},s={unversionedId:"videos/css/05-position/css-position",id:"videos/css/05-position/css-position",isDocsHomePage:!1,title:"CSS \u5b9a\u4f4d",description:"CSS \u7684\u5b9a\u4f4d\u901a\u8fc7 position \u5c5e\u6027\u8bbe\u7f6e\uff0c\u5b83\u6709 static, relative, absolute, fixed, sticky \u8fd9\u51e0\u79cd\u3002",source:"@site/docs/videos/css/05-position/index.md",slug:"/videos/css/05-position/css-position",permalink:"/Myblog/docs/videos/css/05-position/css-position",editUrl:"https://github.com/xiaobing1103/docs/videos/css/05-position/index.md",version:"current",sidebar:"videos",previous:{title:"CSS \u9009\u62e9\u5668",permalink:"/Myblog/docs/videos/css/04-selectors/css-selectors"},next:{title:"HTML \u57fa\u7840",permalink:"/Myblog/docs/videos/html/01-html-basics/html-basics"}},l=[{value:"static",id:"static",children:[]},{value:"relative",id:"relative",children:[]},{value:"absolute",id:"absolute",children:[{value:"\u5305\u542b\u5143\u7d20",id:"\u5305\u542b\u5143\u7d20",children:[]}]},{value:"fixed",id:"fixed",children:[]},{value:"sticky",id:"sticky",children:[]},{value:"z-Index",id:"z-index",children:[]}],p={toc:l};function b(e){var t=e.components,i=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},p,i,{components:t,mdxType:"MDXLayout"}),Object(o.b)(c.a,{src:"//player.bilibili.com/player.html?aid=541725652&bvid=BV1ni4y1g7tc&cid=224228999&page=1",bsrc:"https://www.bilibili.com/video/BV1ni4y1g7tc/",mdxType:"BVideo"}),Object(o.b)("p",null,"\u6211\u4eec\u5728\u8bbe\u8ba1\u9875\u9762\u7684\u65f6\u5019\uff0c\u4e0a\u8fb9\u7684\u5143\u7d20\u5e76\u4e0d\u662f\u6574\u9f50\u7684\uff0c\u4ece\u4e0a\u5230\u4e0b\uff0c\u4ece\u5de6\u5230\u53f3\u6392\u5217\u7684\uff0c\u800c\u662f\u6709\u5404\u4e2d\u5404\u6837\u7684\u5e03\u5c40\u65b9\u5f0f\uff0c\u6bd4\u5982\u9519\u4f4d\u7684\uff0c\u5c42\u53e0\u7684\uff0c\u56fa\u5b9a\u5728\u67d0\u4e2a\u5730\u65b9\u7684\uff0c\u8981\u5b9e\u73b0\u8fd9\u4e9b\u590d\u6742\u7684\u5e03\u5c40\uff0c\u9700\u8981\u719f\u7ec3\u638c\u63e1 CSS \u5b9a\u4f4d\u7684\u6982\u5ff5\u548c\u7528\u6cd5\u3002"),Object(o.b)("p",null,"CSS \u7684\u5b9a\u4f4d\u901a\u8fc7 position \u5c5e\u6027\u8bbe\u7f6e\uff0c\u5b83\u6709 static, relative, absolute, fixed, sticky \u8fd9\u51e0\u79cd\u3002"),Object(o.b)("h2",{id:"static"},"static"),Object(o.b)("p",null,"static \uff0c\u9759\u6001\u5b9a\u4f4d\uff0c\u662f position \u7684\u9ed8\u8ba4\u503c\uff0c\u4e5f\u662f CSS \u9ed8\u8ba4\u7684\u5e03\u5c40\u65b9\u5f0f\uff0c\u4ece\u4e0a\u5230\u4e0b\uff0c\u4ece\u5de6\u5230\u53f3\u6392\u5217\u5143\u7d20\uff0c\u5b83\u5c5e\u4e8e\u6b63\u5e38\u7684\u6587\u6863\u6d41\u3002"),Object(o.b)("h2",{id:"relative"},"relative"),Object(o.b)("p",null,"relative\uff0c\u76f8\u5bf9\u5b9a\u4f4d\uff0c\u5b83\u662f\u5728\u786e\u5b9a\u5143\u7d20\u7684\u9ed8\u8ba4\u4f4d\u7f6e\u4e4b\u540e\uff0c\u901a\u8fc7 left, top, right, bottom \u5c5e\u6027\u6765\u8bbe\u7f6e\u4f4d\u7f6e\u7684\u504f\u79fb\uff0c\u4f46\u662f\u5143\u7d20\u6240\u5360\u7684\u7a7a\u95f4\u8fd8\u4fdd\u7559\u5728\u539f\u4f4d\uff0c\u5176\u4ed6\u5143\u7d20\u4e0d\u4f1a\u6324\u5360\u5b83\u539f\u672c\u7684\u7a7a\u95f4\u3002"),Object(o.b)("h2",{id:"absolute"},"absolute"),Object(o.b)("p",null,"absolute\uff0c\u7edd\u5bf9\u5b9a\u4f4d\uff0c\u4f1a\u628a\u5143\u7d20\u79fb\u51fa\u6b63\u5e38\u7684\u6587\u6863\u6d41\uff0c\u540e\u8fb9\u7684\u5143\u7d20\u4f1a\u6324\u5360\u5b83\u7684\u7a7a\u95f4\uff0c\u800c\u5b83\u81ea\u5df1\u5219\u4f1a\u8986\u76d6\u5728\u6324\u5360\u5b83\u7684\u5143\u7d20\u7684\u4e0a\u65b9\uff0c\u5b83\u4e5f\u53ef\u4ee5\u901a\u8fc7 left, top, right, bottom \u5c5e\u6027\u8bbe\u7f6e\u4f4d\u7f6e\u504f\u79fb\uff0c\u4f46\u662f\u4e0e relative \u4e0d\u540c\u7684\u662f\uff0c\u8fd9\u4e9b\u5c5e\u6027\u662f\u76f8\u5bf9\u4e8e ",Object(o.b)("inlineCode",{parentName:"p"},"\u5305\u542b\u5b83\u7684\u5143\u7d20")," \u6765\u504f\u79fb\u7684\u3002\u4ec0\u4e48\u662f ",Object(o.b)("inlineCode",{parentName:"p"},"\u5305\u542b\u5143\u7d20")," \u5462\uff1f"),Object(o.b)("h3",{id:"\u5305\u542b\u5143\u7d20"},"\u5305\u542b\u5143\u7d20"),Object(o.b)("p",null,"\u5982\u679c\u8fd9\u4e2a\u5143\u7d20\u7684\u6240\u6709\u7236\u7ea7\u5143\u7d20\u90fd\u6ca1\u6709\u8bbe\u7f6e position \u6216\u8005 transform\u3001perspective \u5c5e\u6027\uff0c\u90a3\u4e48\u5305\u542b\u5143\u7d20\u5c31\u662f\u5305\u542b ",Object(o.b)("inlineCode",{parentName:"p"},"<html/>")," \u5143\u7d20\u7684\u5bb9\u5668\uff0c\u4e5f\u5c31\u662f\u6d4f\u89c8\u5668\u7a97\u53e3\uff0c\u8fd9\u65f6left, top, right, bottom \u662f\u76f8\u5bf9\u4e8e\u6d4f\u89c8\u5668\u5de6\u4e0a\u89d2\u8fdb\u884c\u504f\u79fb\u7684\u3002\u5982\u679c\u7236\u7ea7\u5143\u7d20\u4e2d\u6709\u8bbe\u7f6e\u4e86 position \uff08\u9664 static \u4e4b\u5916\uff09\u6216 transform\u3001perspective \u5c5e\u6027\u7684\uff0c\u90a3\u4e48\u5305\u542b\u5143\u7d20\u5c31\u662f\u79bb\u5b83\u6700\u8fd1\u7684\u8bbe\u7f6e\u4e86\u8fd9\u4e9b\u5c5e\u6027\u7684\u5143\u7d20\uff0c\u5b83\u662f\u76f8\u5bf9\u4e8e\u7236\u7ea7\u5143\u7d20\u7684 padding \u76d2\u5b50\u8fb9\u754c\u8fdb\u884c\u4f4d\u7f6e\u504f\u79fb\u7684\uff0c\u4e5f\u5c31\u662f\u65e0\u8bba\u7236\u7ea7\u5143\u7d20\u7684\u5185\u95f4\u8ddd\u6709\u591a\u5927\uff0c\u90fd\u4f1a\u4ece\u8fb9\u6846\u4e0e padding \u4ea4\u754c\u5904\u5f00\u59cb\u8ba1\u7b97\u504f\u79fb\u3002"),Object(o.b)("p",null,"\u6211\u4eec\u901a\u5e38\u4f7f\u7528 relative \u5b9a\u4f4d\u6765\u8bbe\u7f6e\u5305\u542b\u5143\u7d20\uff0c\u56e0\u4e3a\u5b83\u4e0d\u4f1a\u5f71\u54cd\u6b63\u5e38\u7684\u6587\u6863\u6d41\u3002"),Object(o.b)("p",null,"absolute \u662f\u7528\u9014\u6700\u5e7f\u7684\u5b9a\u4f4d\u65b9\u5f0f\uff0c\u53ef\u4ee5\u5b9e\u73b0\u5f39\u51fa\u5c42\u3001\u53e0\u52a0\u3001\u4e0d\u89c4\u5219\u7684\u4f4d\u7f6e\u7b49\u5e03\u5c40\u5f62\u5f0f\u3002"),Object(o.b)("h2",{id:"fixed"},"fixed"),Object(o.b)("p",null,"fixed\uff0c\u56fa\u5b9a\u5b9a\u4f4d\uff0c\u8ddf absolute \u5b9a\u4f4d\u7c7b\u4f3c\uff0c\u53ea\u662f\u5b83\u7684\u5305\u542b\u5143\u7d20\u662f\u5f53\u524d\u6d4f\u89c8\u5668\u7a97\u53e3\uff0c\u5f53\u901a\u8fc7 left, top, right, bottom\u5c5e\u6027\u8bbe\u7f6e\u597d\u504f\u79fb\u4e4b\u540e\uff0c\u65e0\u8bba\u9875\u9762\u5982\u4f55\u6eda\u52a8\uff0c\u5b83\u90fd\u4f1a\u56fa\u5b9a\u5728\u540c\u4e00\u4e2a\u4f4d\u7f6e\uff0c\u9002\u5408\u7528\u4e8e\u56fa\u5b9a\u6d6e\u7a97\u3001\u5bfc\u822a\u6761\u7684\u5e03\u5c40\u3002"),Object(o.b)("p",null,"absolute \u548c fixed \u8fd9\u79cd\u8131\u79bb\u6b63\u5e38\u6587\u6863\u6d41\u7684\u5b9a\u4f4d\u65b9\u5f0f\uff0c\u4f1a\u628a\u5143\u7d20\u7684\u5bbd\u9ad8\u8bbe\u7f6e\u6210\u5185\u5bb9\u7684\u5bbd\u9ad8\uff0c\u53ef\u4ee5\u901a\u8fc7\u8bbe\u7f6e left: 0, right: 0\u6765\u8ba9\u5bbd\u5ea6\u5360\u6ee1\u5305\u542b\u5bb9\u5668\uff0c\u4e5f\u53ef\u4ee5\u8bbe\u7f6e top: 0, bottom: 0\u6765\u8ba9\u9ad8\u5ea6\u5360\u6ee1\u5305\u542b\u5bb9\u5668\u3002"),Object(o.b)("h2",{id:"sticky"},"sticky"),Object(o.b)("p",null,"sticky \u662f\u4e00\u4e2a\u6bd4\u8f83\u65b0\u7684\u5c5e\u6027\uff0c\u76f8\u5f53\u4e8e relative \u548c fixed \u7684\u7ed3\u5408\u4f53\uff0c\u5b83\u53ef\u4ee5\u8ba9\u5143\u7d20\u5728\u8ddd\u79bb\u6d4f\u89c8\u5668\u7a97\u53e3\u4e00\u5b9a\u4f4d\u7f6e\u65f6\uff0c\u628a\u5b83\u53d8\u6210\u56fa\u5b9a\u5728\u8fd9\u4e2a\u4f4d\u7f6e\uff0c\u800c\u5176\u4ed6\u60c5\u51b5\u4e0b\uff0c\u5c31\u8fd8\u5728\u6b63\u5e38\u7684\u6587\u6863\u6d41\u4e2d\u3002\u5b83\u4e5f\u662f\u901a\u8fc7 left, top, right, bottom \uff0c\u6765\u5206\u522b\u8bbe\u7f6e\u8ddd\u79bb\u6d4f\u89c8\u5668\u5bb9\u5668\u5de6\u3001\u4e0a\u3001\u53f3\u3001\u4e0b\u591a\u5c11\u50cf\u7d20\u65f6\uff0c\u628a\u5b83\u56fa\u5b9a\u4f4f\u3002"),Object(o.b)("h2",{id:"z-index"},"z-Index"),Object(o.b)("p",null,"\u9664\u4e86 static \u9ed8\u8ba4\u5b9a\u4f4d\u4e4b\u5916\uff0c\u5176\u4ed6\u5b9a\u4f4d\u65b9\u5f0f\u8bbe\u7f6e\u4e86\u504f\u79fb\u4e4b\u540e\u5f88\u53ef\u80fd\u4f1a\u8986\u76d6\u5728\u5176\u4ed6\u5143\u7d20\u7684\u4e0a\u8fb9\uff0c\u6bd4\u5982\u8bf4\uff0c\u4e00\u4e2a\u5305\u542b\u5143\u7d20\u4e2d\u540c\u65f6\u6709\u4e24\u4e2a absolute \u7684\u5143\u7d20\uff0c\u90a3\u4e48\u540e\u5b9a\u4e49\u7684 absolute \u5143\u7d20\u4f1a\u8986\u76d6\u5728\u5148\u5b9a\u4e49\u7684\u4e0a\u8fb9\u3002\u5982\u679c\u8ba9\u5148\u5b9a\u4e49\u7684\u5728\u4e0a\u8fb9\u7684\u8bdd\uff0c\u53ef\u4ee5\u7ed9\u5b83\u8bbe\u7f6e\u4e00\u4e2a\u8f83\u5927\u7684 z-index \u6570\u503c\u6765\u5b9e\u73b0\u3002z-index\u662f\u8bbe\u7f6e z \u8f74\u65b9\u5411\u7684\u504f\u79fb\uff0c\u4e5f\u5c31\u662f\u6d4f\u89c8\u5668\u5230\u4eba\u773c\u7684\u65b9\u5411\uff0c\u6570\u503c\u5927\u7684\u79bb\u4eba\u773c\u8fd1\uff0c\u6240\u4ee5\u4f1a\u8986\u76d6\u5728\u6570\u503c\u5c0f\u7684\u4e0a\u8fb9\u3002\u6240\u6709\u5b9a\u4f4d\u7684\u5143\u7d20\uff0c\u4e5f\u5c31\u662f\u9664\u4e86 static \u4e4b\u5916\uff0c\u90fd\u53ef\u4ee5\u901a\u8fc7 z-index \u8bbe\u7f6e z \u8f74\u504f\u79fb\uff0c\u5b83\u7684\u9ed8\u8ba4\u503c\u662f0\uff0c\u53ef\u4ee5\u8bbe\u7f6e\u6b63\u6570\u4e5f\u53ef\u4ee5\u8bbe\u7f6e\u8d1f\u6570\u3002"),Object(o.b)("p",null,"\u9700\u8981\u6ce8\u610f\u7684\u662f\uff0c\u5982\u679c\u4e24\u4e2a\u5b9a\u4f4d\u5143\u7d20\u5206\u522b\u5728\u4e24\u4e2a\u4e0d\u540c\u7684\u5305\u542b\u5143\u7d20\u4e2d\uff0c \u5e76\u4e14\u4e24\u4e2a\u5305\u542b\u5143\u7d20\u4e5f\u8bbe\u7f6e\u4e86 z-index \u7684\u8bdd\uff0c\u90a3\u4e48\u8fd9\u4e24\u4e2a\u5143\u7d20\u7684\u5806\u53e0\u987a\u5e8f\u53d6\u51b3\u4e8e\u5305\u542b\u5143\u7d20\u7684 z-index\u3002"),Object(o.b)("p",null,"\u597d\u4e86\uff0c\u8fd9\u4e9b\u5c31\u662f CSS \u7684\u5b9a\u4f4d\u65b9\u5f0f\uff0c\u6709 static, relative, absolute, fixed, sticky \u51e0\u79cd\u65b9\u5f0f\uff0c\u5b83\u4eec\u90fd\u6709\u7279\u5b9a\u7684\u7528\u9014\uff0c\u53e6\u5916\u6211\u4eec\u4e5f\u4ecb\u7ecd\u4e86\u901a\u8fc7 z-index \u6765\u8bbe\u7f6e\u5143\u7d20\u7684\u5c42\u53e0\u987a\u5e8f\u3002\u4f60\u5b66\u4f1a\u4e86\u5417\uff1f\u5982\u679c\u89c9\u5f97\u89c6\u9891\u6709\u5e2e\u52a9\u8bf7\u4e09\u8fde\u5e76\u5173\u6ce8\uff0c\u6211\u662f\u4e8c\u59e8\uff0c\u611f\u8c22\u89c2\u770b\uff01"))}b.isMDXComponent=!0},189:function(e,t,i){"use strict";i.d(t,"a",(function(){return b})),i.d(t,"b",(function(){return f}));var n=i(0),r=i.n(n);function o(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function c(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function a(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?c(Object(i),!0).forEach((function(t){o(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):c(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function s(e,t){if(null==e)return{};var i,n,r=function(e,t){if(null==e)return{};var i,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)i=o[n],t.indexOf(i)>=0||(r[i]=e[i]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)i=o[n],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(r[i]=e[i])}return r}var l=r.a.createContext({}),p=function(e){var t=r.a.useContext(l),i=t;return e&&(i="function"==typeof e?e(t):a(a({},t),e)),i},b=function(e){var t=p(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var i=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),b=p(i),u=n,f=b["".concat(c,".").concat(u)]||b[u]||d[u]||o;return i?r.a.createElement(f,a(a({ref:t},l),{},{components:i})):r.a.createElement(f,a({ref:t},l))}));function f(e,t){var i=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=i.length,c=new Array(o);c[0]=u;var a={};for(var s in t)hasOwnProperty.call(t,s)&&(a[s]=t[s]);a.originalType=e,a.mdxType="string"==typeof e?e:n,c[1]=a;for(var l=2;l<o;l++)c[l]=i[l];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,i)}u.displayName="MDXCreateElement"},193:function(e,t,i){"use strict";var n=i(0),r=i.n(n),o=i(1),c=i.n(o),a=i(57),s=i.n(a);function l(e){var t=e.src,i=e.bsrc;return r.a.createElement(r.a.Fragment,null,r.a.createElement("iframe",{src:t,scrolling:"no",border:0,frameBorder:"no",framespacing:0,allowFullScreen:!0,className:s.a.videoFrame}),r.a.createElement("div",{style:{fontWeight:800,padding:"2em 0"}},r.a.createElement("a",{href:i},"\u70b9\u51fb\u8df3\u8f6c\u5230B\u7ad9\u8fdb\u884c\u89c2\u770b~\u8bb0\u5f97\u7ed9\u4e2a\u4e09\u8fde\u54e6\uff01")))}l.propTypes={src:c.a.string.isRequired,bsrc:c.a.string},t.a=l}}]);