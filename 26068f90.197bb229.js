(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{189:function(e,r,n){"use strict";n.d(r,"a",(function(){return p})),n.d(r,"b",(function(){return b}));var t=n(0),o=n.n(t);function i(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function f(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function c(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?f(Object(n),!0).forEach((function(r){i(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function a(e,r){if(null==e)return{};var n,t,o=function(e,r){if(null==e)return{};var n,t,o={},i=Object.keys(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=o.a.createContext({}),d=function(e){var r=o.a.useContext(u),n=r;return e&&(n="function"==typeof e?e(r):c(c({},r),e)),n},p=function(e){var r=d(e.components);return o.a.createElement(u.Provider,{value:r},e.children)},s={inlineCode:"code",wrapper:function(e){var r=e.children;return o.a.createElement(o.a.Fragment,{},r)}},l=o.a.forwardRef((function(e,r){var n=e.components,t=e.mdxType,i=e.originalType,f=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),p=d(n),l=t,b=p["".concat(f,".").concat(l)]||p[l]||s[l]||i;return n?o.a.createElement(b,c(c({ref:r},u),{},{components:n})):o.a.createElement(b,c({ref:r},u))}));function b(e,r){var n=arguments,t=r&&r.mdxType;if("string"==typeof e||t){var i=n.length,f=new Array(i);f[0]=l;var c={};for(var a in r)hasOwnProperty.call(r,a)&&(c[a]=r[a]);c.originalType=e,c.mdxType="string"==typeof e?e:t,f[1]=c;for(var u=2;u<i;u++)f[u]=n[u];return o.a.createElement.apply(null,f)}return o.a.createElement.apply(null,n)}l.displayName="MDXCreateElement"},190:function(e,r,n){"use strict";n.d(r,"b",(function(){return i})),n.d(r,"a",(function(){return f}));var t=n(22),o=n(191);function i(){var e=Object(t.default)().siteConfig,r=(e=void 0===e?{}:e).baseUrl,n=void 0===r?"/":r,i=e.url;return{withBaseUrl:function(e,r){return function(e,r,n,t){var i=void 0===t?{}:t,f=i.forcePrependBaseUrl,c=void 0!==f&&f,a=i.absolute,u=void 0!==a&&a;if(!n)return n;if(n.startsWith("#"))return n;if(Object(o.b)(n))return n;if(c)return r+n;var d=n.startsWith(r)?n:r+n.replace(/^\//,"");return u?e+d:d}(i,n,e,r)}}}function f(e,r){return void 0===r&&(r={}),(0,i().withBaseUrl)(e,r)}},191:function(e,r,n){"use strict";function t(e){return!0===/^(\w*:|\/\/)/.test(e)}function o(e){return void 0!==e&&!t(e)}n.d(r,"b",(function(){return t})),n.d(r,"a",(function(){return o}))},98:function(e,r,n){"use strict";n.r(r),n.d(r,"frontMatter",(function(){return c})),n.d(r,"metadata",(function(){return a})),n.d(r,"toc",(function(){return u})),n.d(r,"default",(function(){return p}));var t=n(3),o=n(8),i=(n(0),n(189)),f=n(190),c={id:"09frontend-pdf",title:"\u627e\u5bcc\u5a46\u5305\u517b\u7684\u5fc5\u80dc\u6cd5\u5219",sidebar_label:"\u627e\u5bcc\u5a46\u5305\u517b\u7684\u5fc5\u80dc\u6cd5\u5219"},a={unversionedId:"resources/frontend-pdf/09frontend-pdf/09frontend-pdf",id:"resources/frontend-pdf/09frontend-pdf/09frontend-pdf",isDocsHomePage:!1,title:"\u627e\u5bcc\u5a46\u5305\u517b\u7684\u5fc5\u80dc\u6cd5\u5219",description:"\u5f88\u591a\u7a0b\u5e8f\u5458\u670b\u53cb\u4eec\u52aa\u529b\u4e86\u4e00\u8f88\u5b50\uff0c\u8fd8\u662f\u4f9d\u65e7\u5728\u62ff\u7740\u5fae\u8584\u7684\u85aa\u6c34\uff0c\u505a\u6253\u5de5\u4eba\uff0c\u4f60\u662f\u5426\u6709\u5bf9\u8fd9\u4e2a\u4e16\u754c\u8ff7\u832b\u8fc7\uff0c\u4f60\u662f\u5426\u5bf9\u81ea\u5df1\u5145\u6ee1\u4e86\u6000\u7591\uff0c\u4f60\u662f\u5426\u572820\u5f97\u5e74\u7eaa\u5c31\u88ab\u8981\u6c42\u5e74\u85aa\u767e\u4e07\uff0c\u88ab\u623f\u8d37\u3001\u8f66\u8d37\u538b\u7684\u5598\u4e0d\u8fc7\u6c14\u6765\uff0c\u90a3\u53ef\u80fd\u8fd9\u672c\u4e66\u5bf9\u4f60\u6709\u83ab\u5927\u7684\u5e2e\u52a9",source:"@site/docs/resources/frontend-pdf/09frontend-pdf/index.md",slug:"/resources/frontend-pdf/09frontend-pdf/09frontend-pdf",permalink:"/docs/resources/frontend-pdf/09frontend-pdf/09frontend-pdf",editUrl:"https://github.com/xiaobing1103/docs/resources/frontend-pdf/09frontend-pdf/index.md",version:"current",sidebar_label:"\u627e\u5bcc\u5a46\u5305\u517b\u7684\u5fc5\u80dc\u6cd5\u5219",sidebar:"resources",previous:{title:"JavaScript\u6b63\u5219\u8868\u8fbe\u5f0f\u8ff7\u4f60\u4e66",permalink:"/docs/resources/frontend-pdf/08frontend-pdf/08frontend-pdf"},next:{title:"Koa\u4e0eNode.js\u5f00\u53d1\u5b9e\u6218",permalink:"/docs/resources/frontend-pdf/10frontend-pdf/10frontend-pdf"}},u=[],d={toc:u};function p(e){var r=e.components,n=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(t.a)({},d,n,{components:r,mdxType:"MDXLayout"}),Object(i.b)("p",null,"\u5f88\u591a\u7a0b\u5e8f\u5458\u670b\u53cb\u4eec\u52aa\u529b\u4e86\u4e00\u8f88\u5b50\uff0c\u8fd8\u662f\u4f9d\u65e7\u5728\u62ff\u7740\u5fae\u8584\u7684\u85aa\u6c34\uff0c\u505a\u6253\u5de5\u4eba\uff0c\u4f60\u662f\u5426\u6709\u5bf9\u8fd9\u4e2a\u4e16\u754c\u8ff7\u832b\u8fc7\uff0c\u4f60\u662f\u5426\u5bf9\u81ea\u5df1\u5145\u6ee1\u4e86\u6000\u7591\uff0c\u4f60\u662f\u5426\u572820\u5f97\u5e74\u7eaa\u5c31\u88ab\u8981\u6c42\u5e74\u85aa\u767e\u4e07\uff0c\u88ab\u623f\u8d37\u3001\u8f66\u8d37\u538b\u7684\u5598\u4e0d\u8fc7\u6c14\u6765\uff0c\u90a3\u53ef\u80fd\u8fd9\u672c\u4e66\u5bf9\u4f60\u6709\u83ab\u5927\u7684\u5e2e\u52a9"),Object(i.b)("iframe",{src:Object(f.a)("pdf/2022-2-17-fupobaoyang/\u627e\u5bcc\u5a46\u5305\u517b\u7684\u5fc5\u80dc\u6cd5\u5219.pdf"),width:"100%",frameBorder:"0",height:"1000px;"}))}p.isMDXComponent=!0}}]);