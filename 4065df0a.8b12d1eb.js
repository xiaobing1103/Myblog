(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{105:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return a})),r.d(t,"metadata",(function(){return c})),r.d(t,"toc",(function(){return l})),r.d(t,"default",(function(){return m}));var n=r(3),o=r(8),i=(r(0),r(189)),s=r(193),a={id:"effects-glassmorphism",title:"\u73bb\u7483\u7279\u6548",description:"CSS \u7684\u5b9a\u4f4d\u901a\u8fc7 position \u5c5e\u6027\u8bbe\u7f6e\uff0c\u5b83\u6709 static, relative, absolute, fixed, sticky \u8fd9\u51e0\u79cd\u3002",keywords:["css","glassmorphism","backdrop-filter","\u7279\u6548","\u524d\u7aef","frontend"]},c={unversionedId:"videos/effects/01-glassmorphism/effects-glassmorphism",id:"videos/effects/01-glassmorphism/effects-glassmorphism",isDocsHomePage:!1,title:"\u73bb\u7483\u7279\u6548",description:"CSS \u7684\u5b9a\u4f4d\u901a\u8fc7 position \u5c5e\u6027\u8bbe\u7f6e\uff0c\u5b83\u6709 static, relative, absolute, fixed, sticky \u8fd9\u51e0\u79cd\u3002",source:"@site/docs/videos/effects/01-glassmorphism/index.md",slug:"/videos/effects/01-glassmorphism/effects-glassmorphism",permalink:"/Myblog/docs/videos/effects/01-glassmorphism/effects-glassmorphism",editUrl:"https://github.com/xiaobing1103/docs/videos/effects/01-glassmorphism/index.md",version:"current",sidebar:"videos",previous:{title:"HTML \u57fa\u7840",permalink:"/Myblog/docs/videos/html/01-html-basics/html-basics"},next:{title:"DOM \u7b80\u4ecb",permalink:"/Myblog/docs/videos/browser/01-dom/what-is-dom"}},l=[],p={toc:l};function m(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},p,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"2 \u884c\u4ee3\u7801\u5b9e\u73b0\u6bdb\u73bb\u7483\u7279\u6548 Glassmorphsim\uff0c\u9644\u4ee3\u7801\u751f\u6210\u5de5\u5177\u63a8\u8350"),Object(i.b)(s.a,{src:"//player.bilibili.com/player.html?aid=500642727&bvid=BV1GK411G7ws&cid=268174683&page=1",bsrc:"https://www.bilibili.com/video/BV1GK411G7ws/",mdxType:"BVideo"}),Object(i.b)("p",null,"\u4e4b\u524d\u6211\u505a\u8fc7\u8fd9\u6837\u4e00\u671f\u89c6\u9891\uff0c\u5b9e\u73b0\u4e00\u4e2a\u6bdb\u73bb\u7483\u6548\u679c\u7684\u767b\u5f55\u8868\u5355\u3002\u5f53\u65f6\u7684\u601d\u8def\u662f\u8fd9\u6837\u7684\uff0c\u9996\u5148\u6709\u4e00\u4e2a\u539f\u59cb\u7684\u80cc\u666f\u56fe\u7247\uff0c\u5728\u5b83\u4e0a\u9762\u518d\u653e\u4e0a\u4e00\u5f20\u4e00\u6a21\u4e00\u6837\u7684\u56fe\u7247\uff0c\u7136\u540e\u7ed9\u4ed6\u8bbe\u7f6e\u6a21\u7cca\u6ee4\u955c\uff0c\u518d\u7528\u4e00\u4e2a\u5706\u89d2\u77e9\u5f62\u7684\u6846\uff0c\u628a\u5b83\u4f5c\u4e3a\u8499\u7248\uff0c\u628a\u56fe\u7247\u8d85\u51fa\u7684\u90e8\u5206\u7ed9\u9690\u85cf\u6389\uff0c\u53ea\u663e\u793a\u8868\u5355\u8fd9\u4e00\u5757\u533a\u57df\u6240\u7528\u5230\u7684\u90e8\u5206\uff0c\u7136\u540e\u518d\u7ed9\u5b83\u8bbe\u7f6e\u4e00\u4e2a\u5185\u90e8\u7684\u9634\u5f71\uff0c\u8ba9\u5b83\u770b\u8d77\u6765\u6709\u4e00\u4e2a\u73bb\u7483\u53cd\u5149\u7684\u6548\u679c\u3002\u8fd9\u4e2a\u662f\u6bd4\u8f83\u539f\u59cb\u7684\u65b9\u5f0f\u3002"),Object(i.b)("p",null,"\u73b0\u5728 css \u6709\u4e86\u4e00\u4e2a\u65b0\u7684\u5c5e\u6027\u53eb ",Object(i.b)("inlineCode",{parentName:"p"},"backdrop-filter")," \uff0c\u5b83\u53ef\u4ee5\u7ed9\u4e00\u4e2a\u5143\u7d20\u7684\u6240\u6709\u5e95\u5c42\u5143\u7d20\u8bbe\u7f6e\u4e00\u4e2a\u6ee4\u955c\u3002\u90a3\u56e0\u4e3a\u662f\u7ed9\u5e95\u5c42\u5143\u7d20\u8bbe\u7f6e\u6ee4\u955c\uff0c\u6240\u4ee5\u8bf4\u8fd9\u4e2a\u5143\u7d20\u7684\u80cc\u666f\u5fc5\u987b\u662f\u5e26\u900f\u660e\u5ea6\u7684\uff0c\u624d\u80fd\u5230\u6548\u679c\u3002\u90a3\u4e48\u8fd9\u6837\u7ed3\u5408 ",Object(i.b)("inlineCode",{parentName:"p"},"backdrop-filter")," \u548c ",Object(i.b)("inlineCode",{parentName:"p"},"background")," \u8fd9\u4e24\u4e2a\u5c5e\u6027\u7684\uff0c\u5c31\u53ef\u4ee5\u628a\u54b1\u4eec\u540e\u8fb9\u7684\u80cc\u666f\u56fe\u7247\uff0c\u8bbe\u7f6e\u6210\u4e00\u4e2a\u6bdb\u73bb\u7483\u7684\u6548\u679c\u3002"),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"backdrop-filter"),"\u91cc\u9762\u53ef\u4ee5\u8bbe\u7f6e\u591a\u79cd\u7c7b\u578b\u7684\u6ee4\u955c\uff0c\u6bd4\u5982\u8bf4\u6a21\u7cca\uff0c\u4eae\u5ea6\u548c\u5bf9\u6bd4\u5ea6\uff0c\u90a3\u54b1\u4eec\u8fd9\u6b21\u7528 ",Object(i.b)("inlineCode",{parentName:"p"},"blur")," \u8bbe\u7f6e\u6a21\u7cca\uff0c\u54b1\u4eec\u73b0\u5728\u7ed9\u5b83\u7684\u6a21\u7cca\u534a\u5f84\u8bbe\u7f6e\u4e3a8 \u50cf\u7d20\uff0c\u80cc\u666f\u989c\u8272\u8bbe\u7f6e\u4e3a\u767d\u8272\u5e26\u4e00\u70b9\u900f\u660e\u5ea6\uff0c\u8fd9\u6837\u5462\u5b83\u5c31\u6709\u4e86\u4e00\u4e2a\u6bdb\u73bb\u7483\u7684\u6548\u679c\u3002\u662f\u4e0d\u662f\u5f88\u7b80\u5355\u5462\uff1f\u8fd9\u4e2a\u6bdb\u73bb\u7483\u6548\u679c\u5728\u82f1\u6587\u91cc\u8fb9\u53c8\u53ebglass morphism \u73bb\u7483\u6001\u8bbe\u8ba1\uff0c\u5fae\u8f6f\u7684 fluent design \u8bbe\u8ba1\u7cfb\u7edf\uff0c\u8fd8\u6709\u82f9\u679c\u6700\u65b0\u51fa\u7684 MacOS Big Sur \u90fd\u6709\u8fd9\u79cd\u6bdb\u73bb\u7483\u7684\u6548\u679c\uff0c\u90a3\u4e48\u4ee5\u540e\u672a\u6765\u53ef\u80fd\u4e5f\u4f1a\u6210\u4e3a\u7f51\u9875\u8bbe\u8ba1\u7684\u8d8b\u52bf\u3002"),Object(i.b)("p",null,"\u53e6\u5916\uff0c\u7f51\u4e0a\u4e5f\u6709\u4e00\u4e2a\u6bdb\u73bb\u7483\u6548\u679c\u751f\u6210\u5668\u3002\u53ef\u4ee5\u8bbf\u95ee ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://glassmorphism.com/"}),"https://glassmorphism.com/")," \u4ed6\u8fd9\u4e2a\u7f51\u7ad9\u5462\uff0c\u53ef\u4ee5\u8c03\u8fd9\u4e2a\u6bdb\u73bb\u7483\u7684\u6548\u679c\u7684\u989c\u8272\uff0c\u8fd8\u6709\u6a21\u7cca\u534a\u5f84\uff0c\u4ee5\u53ca\u5b83\u7684\u80cc\u666f\u900f\u660e\u5ea6\u3002\u4e4b\u540e\u53f3\u8fb9\u4ed6\u751f\u6210\u7684\u8fd9\u4e2a css \u4ee3\u7801\u5c31\u53ef\u4ee5\u76f4\u63a5\u590d\u5236\u7c98\u8d34\u5e76\u4f7f\u7528\u4e86\u3002"),Object(i.b)("p",null,"\u6700\u540e\u8fd9\u4e2a\u5c5e\u6027\u5728\u6700\u65b0\u7248\u7684 chrome\u3001Edge\u3001safari \u90fd\u5df2\u7ecf\u652f\u6301\u4e86\uff0cFirefox \u5219\u9700\u8981\u5728\u8bbe\u7f6e\u4e2d\u5f00\u542f backdrop-filter \u7684\u652f\u6301\uff0cIE11 \u4e0d\u652f\u6301\u8fd9\u4e2a\u5c5e\u6027\u3002"),Object(i.b)("p",null,"\u597d\u4e86\uff0c\u8fd9\u4e2a\u5c31\u662f\u4e24\u884c\u4ee3\u7801\u5b9e\u73b0\u6bdb\u73bb\u7483\u7279\u6548\uff0c\u4f60\u5b66\u4f1a\u4e86\u5417\uff1f\u6709\u5e2e\u52a9\u8bf7\u4e09\u8fde\uff0c\u60f3\u4f18\u96c5\u7684\u5b66\u524d\u7aef\uff0c\u8bf7\u5173\u6ce8\u4e8c\u59e8\u524d\u7aef\u5de5\u7a0b\u5e08\uff0c\u611f\u8c22\u89c2\u770b\uff01"))}m.isMDXComponent=!0},189:function(e,t,r){"use strict";r.d(t,"a",(function(){return m})),r.d(t,"b",(function(){return u}));var n=r(0),o=r.n(n);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=o.a.createContext({}),p=function(e){var t=o.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},m=function(e){var t=p(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),m=p(r),b=n,u=m["".concat(s,".").concat(b)]||m[b]||f[b]||i;return r?o.a.createElement(u,a(a({ref:t},l),{},{components:r})):o.a.createElement(u,a({ref:t},l))}));function u(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,s=new Array(i);s[0]=b;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a.mdxType="string"==typeof e?e:n,s[1]=a;for(var l=2;l<i;l++)s[l]=r[l];return o.a.createElement.apply(null,s)}return o.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"},193:function(e,t,r){"use strict";var n=r(0),o=r.n(n),i=r(1),s=r.n(i),a=r(57),c=r.n(a);function l(e){var t=e.src,r=e.bsrc;return o.a.createElement(o.a.Fragment,null,o.a.createElement("iframe",{src:t,scrolling:"no",border:0,frameBorder:"no",framespacing:0,allowFullScreen:!0,className:c.a.videoFrame}),o.a.createElement("div",{style:{fontWeight:800,padding:"2em 0"}},o.a.createElement("a",{href:r},"\u70b9\u51fb\u8df3\u8f6c\u5230B\u7ad9\u8fdb\u884c\u89c2\u770b~\u8bb0\u5f97\u7ed9\u4e2a\u4e09\u8fde\u54e6\uff01")))}l.propTypes={src:s.a.string.isRequired,bsrc:s.a.string},t.a=l}}]);