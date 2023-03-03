/*! For license information please see 081efdd2.437515a9.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{184:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return v})),n.d(t,"metadata",(function(){return f})),n.d(t,"toc",(function(){return g})),n.d(t,"default",(function(){return h}));var a=n(3),r=n(8),o=n(0),c=n.n(o),i=n(189),s=n(200),l=n(263),u=n(199);function p(){var e=Object(s.a)(["\n  width: auto;\n  height: auto;\n  padding: 48px;\n  @media (max-width: 1300px) {\n    & > div {\n      grid-template-columns: 1fr 1fr;\n    }\n  }\n\n  @media (max-width: 535px) {\n    & > div {\n      grid-template-columns: 1fr;\n    }\n  }\n"]);return p=function(){return e},e}var d=Object(u.b)(l.a)(p());function m(){return c.a.createElement(d,null)}var b=n(193),v={id:"react-props-button",title:"React \u6309\u94ae",sidebar_label:"\u6309\u94ae",description:"\u4f7f\u7528\u6309\u94ae\u7ec4\u4ef6\u5c55\u793a React Props \u7684\u4f7f\u7528\u65b9\u6cd5"},f={unversionedId:"videos/react/01-react-props-buttons/react-props-button",id:"videos/react/01-react-props-buttons/react-props-button",isDocsHomePage:!1,title:"React \u6309\u94ae",description:"\u4f7f\u7528\u6309\u94ae\u7ec4\u4ef6\u5c55\u793a React Props \u7684\u4f7f\u7528\u65b9\u6cd5",source:"@site/docs/videos/react/01-react-props-buttons/index.md",slug:"/videos/react/01-react-props-buttons/react-props-button",permalink:"/Myblog/docs/videos/react/01-react-props-buttons/react-props-button",editUrl:"https://github.com/xiaobing1103/docs/videos/react/01-react-props-buttons/index.md",version:"current",sidebar_label:"\u6309\u94ae",sidebar:"videos",previous:{title:"HTTPS \u534f\u8bae\u57fa\u7840",permalink:"/Myblog/docs/videos/network/02-https-basics/https-basics"},next:{title:"\u6e10\u53d8\u80cc\u666f\u751f\u6210\u5668 - React State & Event \u793a\u4f8b",permalink:"/Myblog/docs/videos/react/02-gradient-bg-react-state-event/react-state-event-gradient"}},g=[{value:"\u6548\u679c",id:"\u6548\u679c",children:[]},{value:"\u89c6\u9891",id:"\u89c6\u9891",children:[]}],y={toc:g};function h(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},y,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"\u6548\u679c"},"\u6548\u679c"),Object(i.b)(m,{mdxType:"ButtonDemo"}),Object(i.b)("h2",{id:"\u89c6\u9891"},"\u89c6\u9891"),Object(i.b)(b.a,{src:"//player.bilibili.com/player.html?aid=96612743&cid=164934942&page=1",bsrc:"https://www.bilibili.com/video/av96612743/",mdxType:"BVideo"}))}h.isMDXComponent=!0},193:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(1),c=n.n(o),i=n(57),s=n.n(i);function l(e){var t=e.src,n=e.bsrc;return r.a.createElement(r.a.Fragment,null,r.a.createElement("iframe",{src:t,scrolling:"no",border:0,frameBorder:"no",framespacing:0,allowFullScreen:!0,className:s.a.videoFrame}),r.a.createElement("div",{style:{fontWeight:800,padding:"2em 0"}},r.a.createElement("a",{href:n},"\u70b9\u51fb\u8df3\u8f6c\u5230B\u7ad9\u8fdb\u884c\u89c2\u770b~\u8bb0\u5f97\u7ed9\u4e2a\u4e09\u8fde\u54e6\uff01")))}l.propTypes={src:c.a.string.isRequired,bsrc:c.a.string},t.a=l},200:function(e,t,n){"use strict";function a(e,t){return t||(t=e.slice(0)),e.raw=t,e}n.d(t,"a",(function(){return a}))},213:function(e,t,n){var a;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var o=typeof a;if("string"===o||"number"===o)e.push(a);else if(Array.isArray(a)&&a.length){var c=r.apply(null,a);c&&e.push(c)}else if("object"===o)for(var i in a)n.call(a,i)&&a[i]&&e.push(i)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(a=function(){return r}.apply(t,[]))||(e.exports=a)}()},263:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return f}));var a=n(0),r=n.n(a),o=n(65),c=n.n(o),i=n(213),s=n.n(i);var l=function({children:e,type:t="primary",color:n="blue"}){return r.a.createElement("button",{className:s()(c.a.button,{[c.a.red]:"red"===n,[c.a.black]:"black"===n,[c.a.secondary]:"secondary"===t})},e)},u=n(66),p=n.n(u);function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function m({className:e,...t}){return r.a.createElement("main",d({className:s()(p.a.mainContainer,e)},t),r.a.createElement("div",{className:p.a.btnContainer},r.a.createElement(l,null,"\u9ed8\u8ba4\u6309\u94ae"),r.a.createElement(l,{color:"red"},"\u7ea2\u8272\u6309\u94ae"),r.a.createElement(l,{color:"black"},"\u9ed1\u8272\u6309\u94ae"),r.a.createElement(l,{type:"secondary"},"\u7ebf\u6846\u6309\u94ae"),r.a.createElement(l,{type:"secondary",color:"red"},"\u7ebf\u6846\u6309\u94ae"),r.a.createElement(l,{type:"secondary",color:"black"},"\u7ebf\u6846\u6309\u94ae")))}var b=n(67),v=n.n(b);function f(){const[e,t]=Object(a.useState)("#00F260"),[n,o]=Object(a.useState)("#0575E6");function c(e){const{name:n,value:a}=e.target;"color1"===n?t(a):"color2"===n&&o(a)}return r.a.createElement("div",{className:v.a.container,style:{background:`linear-gradient(75deg, ${e}, ${n})`}},r.a.createElement("div",{className:v.a.inputGroup},r.a.createElement("label",null,"\u8bf7\u9009\u62e9\u7b2c\u4e00\u4e2a\u989c\u8272"),r.a.createElement("input",{type:"color",name:"color1",className:v.a.inputColor,value:e,onChange:c})),r.a.createElement("div",{className:v.a.inputGroup},r.a.createElement("label",null,"\u8bf7\u9009\u62e9\u7b2c\u4e8c\u4e2a\u989c\u8272"),r.a.createElement("input",{type:"color",name:"color2",className:v.a.inputColor,value:n,onChange:c})),r.a.createElement("button",{onClick:function(){t("#00F260"),o("#0575E6")},className:v.a.button},"\u91cd\u7f6e\u4e3a\u9ed8\u8ba4"))}}}]);