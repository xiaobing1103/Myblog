(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{189:function(e,r,n){"use strict";n.d(r,"a",(function(){return p})),n.d(r,"b",(function(){return b}));var t=n(0),o=n.n(t);function i(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function c(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function f(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?c(Object(n),!0).forEach((function(r){i(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function u(e,r){if(null==e)return{};var n,t,o=function(e,r){if(null==e)return{};var n,t,o={},i=Object.keys(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var a=o.a.createContext({}),d=function(e){var r=o.a.useContext(a),n=r;return e&&(n="function"==typeof e?e(r):f(f({},r),e)),n},p=function(e){var r=d(e.components);return o.a.createElement(a.Provider,{value:r},e.children)},s={inlineCode:"code",wrapper:function(e){var r=e.children;return o.a.createElement(o.a.Fragment,{},r)}},l=o.a.forwardRef((function(e,r){var n=e.components,t=e.mdxType,i=e.originalType,c=e.parentName,a=u(e,["components","mdxType","originalType","parentName"]),p=d(n),l=t,b=p["".concat(c,".").concat(l)]||p[l]||s[l]||i;return n?o.a.createElement(b,f(f({ref:r},a),{},{components:n})):o.a.createElement(b,f({ref:r},a))}));function b(e,r){var n=arguments,t=r&&r.mdxType;if("string"==typeof e||t){var i=n.length,c=new Array(i);c[0]=l;var f={};for(var u in r)hasOwnProperty.call(r,u)&&(f[u]=r[u]);f.originalType=e,f.mdxType="string"==typeof e?e:t,c[1]=f;for(var a=2;a<i;a++)c[a]=n[a];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,n)}l.displayName="MDXCreateElement"},190:function(e,r,n){"use strict";n.d(r,"b",(function(){return i})),n.d(r,"a",(function(){return c}));var t=n(22),o=n(191);function i(){var e=Object(t.default)().siteConfig,r=(e=void 0===e?{}:e).baseUrl,n=void 0===r?"/":r,i=e.url;return{withBaseUrl:function(e,r){return function(e,r,n,t){var i=void 0===t?{}:t,c=i.forcePrependBaseUrl,f=void 0!==c&&c,u=i.absolute,a=void 0!==u&&u;if(!n)return n;if(n.startsWith("#"))return n;if(Object(o.b)(n))return n;if(f)return r+n;var d=n.startsWith(r)?n:r+n.replace(/^\//,"");return a?e+d:d}(i,n,e,r)}}}function c(e,r){return void 0===r&&(r={}),(0,i().withBaseUrl)(e,r)}},191:function(e,r,n){"use strict";function t(e){return!0===/^(\w*:|\/\/)/.test(e)}function o(e){return void 0!==e&&!t(e)}n.d(r,"b",(function(){return t})),n.d(r,"a",(function(){return o}))},84:function(e,r,n){"use strict";n.r(r),n.d(r,"frontMatter",(function(){return f})),n.d(r,"metadata",(function(){return u})),n.d(r,"toc",(function(){return a})),n.d(r,"default",(function(){return p}));var t=n(3),o=n(8),i=(n(0),n(189)),c=n(190),f={id:"11frontend-pdf",title:"\u56fe\u89e3HTTP+\u5f69\u8272\u7248",sidebar_label:"\u56fe\u89e3HTTP+\u5f69\u8272\u7248"},u={unversionedId:"resources/frontend-pdf/11frontend-pdf/11frontend-pdf",id:"resources/frontend-pdf/11frontend-pdf/11frontend-pdf",isDocsHomePage:!1,title:"\u56fe\u89e3HTTP+\u5f69\u8272\u7248",description:"\u56fe\u89e3HTTP+\u5f69\u8272\u7248",source:"@site/docs/resources/frontend-pdf/11frontend-pdf/index.md",slug:"/resources/frontend-pdf/11frontend-pdf/11frontend-pdf",permalink:"/Myblog/docs/resources/frontend-pdf/11frontend-pdf/11frontend-pdf",editUrl:"https://github.com/xiaobing1103/docs/resources/frontend-pdf/11frontend-pdf/index.md",version:"current",sidebar_label:"\u56fe\u89e3HTTP+\u5f69\u8272\u7248",sidebar:"resources",previous:{title:"Koa\u4e0eNode.js\u5f00\u53d1\u5b9e\u6218",permalink:"/Myblog/docs/resources/frontend-pdf/10frontend-pdf/10frontend-pdf"}},a=[],d={toc:a};function p(e){var r=e.components,n=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(t.a)({},d,n,{components:r,mdxType:"MDXLayout"}),Object(i.b)("p",null,"\u56fe\u89e3HTTP+\u5f69\u8272\u7248"),Object(i.b)("iframe",{src:Object(c.a)("pdf/2022-2-17-tujiehttp/\u56fe\u89e3HTTP+\u5f69\u8272\u7248.pdf"),width:"100%",frameBorder:"0",height:"1000px;"}))}p.isMDXComponent=!0}}]);