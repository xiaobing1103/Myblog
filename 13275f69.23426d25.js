(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{189:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return O}));var r=n(0),a=n.n(r);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=a.a.createContext({}),o=function(e){var t=a.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):b(b({},t),e)),n},p=function(e){var t=o(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,c=e.originalType,l=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),p=o(n),d=r,O=p["".concat(l,".").concat(d)]||p[d]||u[d]||c;return n?a.a.createElement(O,b(b({ref:t},s),{},{components:n})):a.a.createElement(O,b({ref:t},s))}));function O(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var c=n.length,l=new Array(c);l[0]=d;var b={};for(var i in t)hasOwnProperty.call(t,i)&&(b[i]=t[i]);b.originalType=e,b.mdxType="string"==typeof e?e:r,l[1]=b;for(var s=2;s<c;s++)l[s]=n[s];return a.a.createElement.apply(null,l)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},193:function(e,t,n){"use strict";var r=n(0),a=n.n(r),c=n(1),l=n.n(c),b=n(57),i=n.n(b);function s(e){var t=e.src,n=e.bsrc;return a.a.createElement(a.a.Fragment,null,a.a.createElement("iframe",{src:t,scrolling:"no",border:0,frameBorder:"no",framespacing:0,allowFullScreen:!0,className:i.a.videoFrame}),a.a.createElement("div",{style:{fontWeight:800,padding:"2em 0"}},a.a.createElement("a",{href:n},"\u70b9\u51fb\u8df3\u8f6c\u5230B\u7ad9\u8fdb\u884c\u89c2\u770b~\u8bb0\u5f97\u7ed9\u4e2a\u4e09\u8fde\u54e6\uff01")))}s.propTypes={src:l.a.string.isRequired,bsrc:l.a.string},t.a=s},86:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return b})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return p}));var r=n(3),a=n(8),c=(n(0),n(189)),l=n(193),b={id:"grid-layout",title:"CSS Grid \u5e03\u5c40",description:"CSS Grid \u5e03\u5c40 2\u5206\u949f\u52a8\u753b\u5feb\u901f\u638c\u63e1\u3002",keywords:["css","flex","grid","frontend"]},i={unversionedId:"videos/css/01-grid-layout/grid-layout",id:"videos/css/01-grid-layout/grid-layout",isDocsHomePage:!1,title:"CSS Grid \u5e03\u5c40",description:"CSS Grid \u5e03\u5c40 2\u5206\u949f\u52a8\u753b\u5feb\u901f\u638c\u63e1\u3002",source:"@site/docs/videos/css/01-grid-layout/index.md",slug:"/videos/css/01-grid-layout/grid-layout",permalink:"/docs/videos/css/01-grid-layout/grid-layout",editUrl:"https://github.com/xiaobing1103/docs/videos/css/01-grid-layout/index.md",version:"current",sidebar:"videos",previous:{title:"Event Loop",permalink:"/docs/videos/js/01-event-loop/event-loop"},next:{title:"CSS Flex \u5e03\u5c40",permalink:"/docs/videos/css/02-flex-layout/flex-layout"}},s=[{value:"\u5f00\u542f grid \u5e03\u5c40",id:"\u5f00\u542f-grid-\u5e03\u5c40",children:[]},{value:"\u6539\u53d8\u5e03\u5c40",id:"\u6539\u53d8\u5e03\u5c40",children:[]},{value:"\u8bbe\u7f6e gap",id:"\u8bbe\u7f6e-gap",children:[]},{value:"grid template area",id:"grid-template-area",children:[]},{value:"\u5bf9\u9f50",id:"\u5bf9\u9f50",children:[]}],o={toc:s};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(c.b)("wrapper",Object(r.a)({},o,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)(l.a,{src:"//player.bilibili.com/player.html?aid=100672644&bvid=BV18p411A7JB&cid=171656332&page=1",bsrc:"https://www.bilibili.com/video/BV18p411A7JB/",mdxType:"BVideo"}),Object(c.b)("p",null,"css grid \u5e03\u5c40\u662f\u4e8c\u7ef4\u5e03\u5c40\u65b9\u5f0f\uff0c\u53ef\u4ee5\u540c\u65f6\u63a7\u5236\u884c\u548c\u5217\u7684\u6392\u5e03\u548c\u5bf9\u9f50\u65b9\u5f0f\u3002"),Object(c.b)("p",null,"grid \u7531\u6c34\u5e73\u7ebf\u548c\u5782\u76f4\u7ebf\u6784\u6210\uff0c\u4e24\u6761\u6c34\u5e73\u7ebf\u4e2d\u95f4\u7684\u533a\u57df\u53eb\u505a",Object(c.b)("strong",{parentName:"p"},"\u884c\u8f68\u9053"),"\uff0c\u4e24\u6761\u5782\u76f4\u7ebf\u4e2d\u95f4\u7684\u533a\u57df\u53eb\u505a",Object(c.b)("strong",{parentName:"p"},"\u5217\u8f68\u9053"),"\u3002"),Object(c.b)("h2",{id:"\u5f00\u542f-grid-\u5e03\u5c40"},"\u5f00\u542f grid \u5e03\u5c40"),Object(c.b)("p",null,"\u8981\u5f00\u542f grid \u5e03\u5c40\u53ea\u9700\u8981\u7ed9\u5916\u5c42\u5bb9\u5668\u8bbe\u7f6e\uff1a"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-css"}),"display: grid;\n")),Object(c.b)("p",null,"\u5bb9\u5668\u7684\u76f4\u63a5\u5b50\u5143\u7d20\u5c31\u4f1a\u81ea\u52a8\u6210\u4e3a grid \u5e03\u5c40\u7684\u5143\u7d20\u3002"),Object(c.b)("h2",{id:"\u6539\u53d8\u5e03\u5c40"},"\u6539\u53d8\u5e03\u5c40"),Object(c.b)("p",null,"\u4f8b\u5982\uff0c\u4e00\u4e2a\u5bb9\u5668\uff0c\u5305\u542b 6 \u4e2a\u5b50\u5143\u7d20\u3002\u628a\u5b83\u6539\u6210 3 \u5217\u5e03\u5c40\uff0c\u53ef\u4ee5\u4f7f\u7528",Object(c.b)("inlineCode",{parentName:"p"},"grid-template-columns"),"\u5c5e\u6027\uff0c\u6307\u5b9a\u6bcf\u5217\u7684\u5bbd\u5ea6\uff0c\u53ef\u4ee5\u662f\u56fa\u5b9a\u5bbd\u5ea6\uff1a"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-css"}),"grid-template-columns: 100px 100px 100px;\n")),Object(c.b)("p",null,"\u4e5f\u53ef\u4ee5\u7528 fr \u6307\u6d6e\u52a8\u5bbd\u5ea6\uff1a"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-css"}),"grid-template-columns: 1fr 1fr 1fr;\n")),Object(c.b)("p",null,Object(c.b)("inlineCode",{parentName:"p"},"fr"),"\u662f grid \u5e03\u5c40\u4e13\u7528\u5355\u4f4d\uff0c\u4ee3\u8868 grid \u5269\u4f59\u7a7a\u95f4\uff0c\u8fd9\u91cc\u4e09\u5217\u5404\u5360 3 \u5206\u4e4b\u4e00\u3002"),Object(c.b)("p",null,"\u5982\u679c\u628a\u7b2c\u4e8c\u5217\u6539\u4e3a 2fr\uff0c\u5219\u4f1a\u5360\u636e 1/2 \u7684\u7a7a\u95f4\u3002"),Object(c.b)("h2",{id:"\u8bbe\u7f6e-gap"},"\u8bbe\u7f6e gap"),Object(c.b)("p",null,"\u7ed9 grid \u8bbe\u7f6e\u95f4\u8ddd\u53ef\u4ee5\u901a\u8fc7 column-gap \u5c5e\u6027\u8bbe\u7f6e\u5217\u95f4\u8ddd"),Object(c.b)("p",null,"\u4e5f\u53ef\u4ee5\u901a\u8fc7 row-gap \u8bbe\u7f6e\u884c\u95f4\u8ddd"),Object(c.b)("p",null,"\u6216\u4f7f\u7528 gap \u5c5e\u6027\u7edf\u4e00\u8bbe\u7f6e\u3002"),Object(c.b)("h2",{id:"grid-template-area"},"grid template area"),Object(c.b)("p",null,"\u6392\u5217\u5143\u7d20\u6211\u4eec\u53ef\u4ee5\u4f7f\u7528 grid-template-area \u5c5e\u6027\u3002\u6bd4\u5982\u6709\u4e00\u4e2a\u9875\u9762\uff0c\u5934\u90e8\u548c\u5e95\u90e8\u5bbd\u5ea6\u5360\u6ee1\u5168\u5c4f\uff0c\u4fa7\u8fb9\u5360 1/3\uff0c\u5185\u5bb9\u5360 2/3\uff0c\u6211\u4eec\u53ef\u4ee5\u6307\u5b9a\u8fd9\u6837\u7684\u533a\u57df\uff1a"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-css"}),'grid-template-areas:\n  "header header header"\n  "sidebar content content"\n  "footer footer footer";\n')),Object(c.b)("p",null,"\u7136\u540e\u5404\u4e2a\u5143\u7d20\u5206\u522b\u6307\u5b9a\u5bf9\u5e94\u7684\u533a\u57df\uff1a"),Object(c.b)("p",null,"header:"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-css"}),"grid-area: header;\n")),Object(c.b)("p",null,"aside:"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-css"}),"grid-area: sidebar;\n")),Object(c.b)("p",null,"main:"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-css"}),"grid-area: content;\n")),Object(c.b)("p",null,"footer"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-css"}),"grid-area: footer;\n")),Object(c.b)("h2",{id:"\u5bf9\u9f50"},"\u5bf9\u9f50"),Object(c.b)("p",null,"grid \u5bf9\u9f50\u65b9\u5f0f\u8ddf flexbox \u5e03\u5c40\u7c7b\u4f3c\uff0c\u6709\u6c34\u5e73\u65b9\u5411\u7684\u884c\u8f74\uff0c\u548c\u5782\u76f4\u65b9\u5411\u7684\u5757\u8f74\u3002"),Object(c.b)("p",null,"\u5728\u5782\u76f4\u65b9\u5411\u4e0a\u5bf9\u9f50\u5b50\u5143\u7d20\u53ef\u4ee5\u4f7f\u7528 align-items \u5c5e\u6027\uff0c\u4f8b\u5982\u5c45\u4e2d\u5bf9\u9f50\uff1a"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-css"}),"align-items: center;\n")),Object(c.b)("p",null,"\u9760\u4e0b\u5bf9\u9f50\uff1a"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-css"}),"align-items: end;\n")),Object(c.b)("p",null,"\u5728\u6c34\u5e73\u65b9\u5411\u4e0a\u5bf9\u9f50\u5b50\u5143\u7d20\u53ef\u4ee5\u4f7f\u7528 justify-items \u5c5e\u6027\uff0c\u4f8b\u5982\uff1a"),Object(c.b)("p",null,"\u5c45\u4e2d\u5bf9\u9f50\uff1a"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-css"}),"justify-items: center;\n")),Object(c.b)("p",null,"\u9760\u53f3\u5bf9\u9f50\uff1a"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-css"}),"justify-items: end;\n")),Object(c.b)("p",null,"\u4e24\u7aef\u5bf9\u9f50\uff1a"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-css"}),"justify-items: space-between;\n")),Object(c.b)("p",null,"\u5982\u679c\u884c\u8f68\u9053\u548c\u5217\u8f68\u9053\u7684\u5c3a\u5bf8\u5c0f\u4e8e grid \u5bb9\u5668\uff0c\u8fd8\u53ef\u4ee5\u5bf9\u8f68\u9053\u8fdb\u884c\u5bf9\u9f50\uff0c\u5728\u5782\u76f4\u65b9\u5411\u4e0a\uff0c\u4f7f\u7528 align-content \u5c5e\u6027\uff0c\u4f8b\u5982:"),Object(c.b)("p",null,"\u5c45\u4e2d\u5bf9\u9f50\uff1a"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-css"}),"align-content: center;\n")),Object(c.b)("p",null,"\u9760\u4e0b\u5bf9\u9f50\uff1a"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-css"}),"align-content: end;\n")),Object(c.b)("p",null,"\u5728\u6c34\u5e73\u65b9\u5411\u4e0a\u4f7f\u7528 justify-content \u5c5e\u6027\uff0c\u4f8b\u5982\uff1a"),Object(c.b)("p",null,"\u5c45\u4e2d\u5bf9\u9f50\uff1a"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-css"}),"justify-content: center;\n")),Object(c.b)("p",null,"\u9760\u53f3\u5bf9\u9f50\uff1a"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-css"}),"justify-content: end;\n")),Object(c.b)("p",null,"\u4e24\u7aef\u5bf9\u9f50\uff1a"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-css"}),"justify-content: space-between;\n")),Object(c.b)("p",null,"\u597d\u4e86\uff0c\u8fd9\u5c31\u662f\u4eca\u5929\u7684 2 \u5206\u949f\u638c\u63e1 css grid \u5e03\u5c40\uff0c\u4f60\u5b66\u4f1a\u4e86\u5417\uff1f\u6709\u95ee\u9898\u8bf7\u5728\u8bc4\u8bba\u533a\u7559\u8a00\uff0c\u6211\u662f\u4e8c\u59e8\uff0c\u611f\u8c22\u89c2\u770b\u3002"))}p.isMDXComponent=!0}}]);