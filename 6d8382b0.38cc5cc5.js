(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{122:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return b})),n.d(t,"default",(function(){return p}));var a=n(3),r=n(8),l=(n(0),n(189)),c=n(190),o={slug:"learn-react-event-and-state",title:"\u5236\u4f5c\u6e10\u53d8\u80cc\u666f\u751f\u6210\u5668 - React State\u548cEvent\u6559\u7a0b",author:"\u4e8c\u59e8",author_title:"\u524d\u7aef\u5de5\u7a0b\u5e08 / B\u7ad9UP\u4e3b",author_url:"https://github.com/zxuqian",author_image_url:"https://tvax3.sinaimg.cn/crop.0.0.1080.1080.180/b2745d44ly8g8s4muqeggj20u00u0n0k.jpg?KID=imgbed,tva&Expires=1582389585&ssig=EvXmyu%2FXsX",description:"Hello! \u4eca\u5929\u6765\u5e26\u4f60\u8d70\u8fdb React \u7684\u5927\u95e8\uff01\u6211\u7b2c\u4e00\u6b21\u542c\u8bf4 React \u662f\u6211\u5728\u7f8e\u56fd\u8bfb\u7814\u7684\u65f6\u5019\uff0c\u5ba4\u53cb\u9009\u4e86 web programming \u8fd9\u8282\u8bfe\uff0c\u7136\u540e\u9047\u5230\u4e86\u5173\u4e8e react \u7684\u597d\u591a\u95ee\u9898...",tags:["\u524d\u7aef","React"]},i={permalink:"/Myblog/learn-react-event-and-state",source:"@site/blog/2022-03-21-learn-react-event-state.md",description:"Hello! \u4eca\u5929\u6765\u5e26\u4f60\u8d70\u8fdb React \u7684\u5927\u95e8\uff01\u6211\u7b2c\u4e00\u6b21\u542c\u8bf4 React \u662f\u6211\u5728\u7f8e\u56fd\u8bfb\u7814\u7684\u65f6\u5019\uff0c\u5ba4\u53cb\u9009\u4e86 web programming \u8fd9\u8282\u8bfe\uff0c\u7136\u540e\u9047\u5230\u4e86\u5173\u4e8e react \u7684\u597d\u591a\u95ee\u9898...",date:"2022-03-21T00:00:00.000Z",tags:[{label:"\u524d\u7aef",permalink:"/Myblog/tags/\u524d\u7aef"},{label:"React",permalink:"/Myblog/tags/react"}],title:"\u5236\u4f5c\u6e10\u53d8\u80cc\u666f\u751f\u6210\u5668 - React State\u548cEvent\u6559\u7a0b",readingTime:1.995,truncated:!0,prevItem:{title:"CSS \u9009\u62e9\u5668\u4f18\u5148\u7ea7\uff08\u7279\u5f02\u6027\u3001\u6743\u91cd\uff09\u8be6\u89e3",permalink:"/Myblog/css-selector-specificity"},nextItem:{title:"\u4e00\u7ec4\u7f8e\u4e3d\u7684\u6309\u94ae - React Props \u6559\u7a0b",permalink:"/Myblog/learn-react-props-buttons"}},b=[{value:"\u521b\u5efa React \u5de5\u7a0b",id:"\u521b\u5efa-react-\u5de5\u7a0b",children:[]},{value:"\u521b\u5efa Gradient \u7ec4\u4ef6",id:"\u521b\u5efa-gradient-\u7ec4\u4ef6",children:[{value:"\u7f16\u5199 html \u7ed3\u6784",id:"\u7f16\u5199-html-\u7ed3\u6784",children:[]},{value:"\u521b\u5efa state",id:"\u521b\u5efa-state",children:[]},{value:"\u5904\u7406 input \u4e8b\u4ef6",id:"\u5904\u7406-input-\u4e8b\u4ef6",children:[]},{value:"\u5904\u7406\u6309\u94ae\u4e8b\u4ef6",id:"\u5904\u7406\u6309\u94ae\u4e8b\u4ef6",children:[]},{value:"\u7bad\u5934\u51fd\u6570\u5f62\u5f0f",id:"\u7bad\u5934\u51fd\u6570\u5f62\u5f0f",children:[]},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",children:[]}]}],u={toc:b};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(l.b)("wrapper",Object(a.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(l.b)("p",null,"Hello, \u4eca\u5929\u6559\u4f60\u5199\u4e00\u4e2a\u6e10\u53d8\u80cc\u666f\u751f\u6210\u5668\u3002\u6211\u4f1a\u7528\u8fd9\u4e2a\u4f8b\u5b50\u6765\u89e3\u91ca react \u7684 state\uff0c\u72b6\u6001\u7ba1\u7406\uff0c\u8fd8\u6709\u4e8b\u4ef6\u5904\u7406\u3002\u8fd9\u4e2a\u5c0f\u5de5\u5177\u63d0\u4f9b\u4e86\u4e24\u4e2a\u989c\u8272\u9009\u62e9\u5668\uff0c\u5206\u522b\u53ef\u4ee5\u9009\u62e9\u6e10\u53d8\u7684\u4e24\u4e2a\u989c\u8272\uff0c\u6e10\u53d8\u7684\u89d2\u5ea6\u662f 75 \u5ea6\uff0c\u7ebf\u6027\u6e10\u53d8\u3002\u53e6\u5916\u8fd8\u6709\u4e00\u4e2a\u91cd\u7f6e\u6309\u94ae\u53ef\u4ee5\u628a\u6e10\u53d8\u6062\u590d\u6210\u521d\u59cb\u503c\u3002"),Object(l.b)("p",null,"\u6548\u679c\u6f14\u793a\uff1a"),Object(l.b)("img",{alt:"",src:Object(c.a)("img/2020-03-21-learn-react-event-state/demo.gif")}),"## State \u7b80\u4ecb",Object(l.b)("p",null,"\u9996\u5148\u770b\u4e00\u4e0b\u4ec0\u4e48\u662f state\uff0c",Object(l.b)("a",Object(a.a)({parentName:"p"},{href:"https://zxuqian.cn/learn-react-props-buttons"}),"\u4e0a\u7bc7\u6587\u7ae0"),"\u8bb2\u4e86 props\uff1a"),Object(l.b)("ol",null,Object(l.b)("li",{parentName:"ol"},"\u7528\u6765\u7ed9\u7ec4\u4ef6\u4f20\u9012\u53c2\u6570\uff0c\u7ec4\u4ef6\u4f1a\u6839\u636e\u8fd9\u4e9b props \u6765\u63a7\u5236\u5b83\u81ea\u5df1\u751f\u6210\u7684 html"),Object(l.b)("li",{parentName:"ol"},"\u5b83\u7684\u503c\u4e0d\u4f1a\u53d1\u751f\u53d8\u5316\uff0c\u53ea\u8981\u4f20\u7ed9\u4ed6\u7684\u4e00\u4e2a\u56fa\u5b9a\u7684\u503c\uff0c\u90a3\u4e48\u5b83\u5c31\u4f1a\u6c38\u8fdc\u662f\u8fd9\u4e2a\u503c\u3002")),Object(l.b)("p",null,"\u5982\u679c\u60f3\u8ba9\u4e00\u4e2a\u5c5e\u6027\u6839\u636e\u6761\u4ef6\u53d1\u751f\u53d8\u5316\u7684\u8bdd\u3002\u90a3\u4e48\u8fd9\u91cc\u5c31\u8981\u7528 state \u72b6\u6001\u3002\u72b6\u6001\u5c31\u662f\u8bf4\u8fd9\u4e2a\u7ec4\u4ef6\u53ef\u80fd\u5728",Object(l.b)("strong",{parentName:"p"},"\u67d0\u4e00\u4e2a\u65f6\u95f4\u6216\u8005\u662f\u53d1\u751f\u4e86\u4ec0\u4e48\u4e8b\u4ef6\u4e4b\u540e"),"\uff0c\u4f1a\u53d1\u751f\u4e00\u4e9b\u53d8\u5316\uff0c\u5c31\u62ff\u8fd9\u4e2a\u4f8b\u5b50\u6765\u8bf4\uff0c\u54b1\u4eec\u8981\u5c55\u793a\u4e00\u4e2a\u6e10\u53d8\u7684\u80cc\u666f\uff0c\u90a3\u4e48\u8fd9\u4e2a",Object(l.b)("strong",{parentName:"p"},"\u80cc\u666f\u989c\u8272"),"\u5c31\u8981\u6839\u636e\u7528\u6237\u6240\u9009\u62e9\u7684\u989c\u8272\u6765\u53d1\u751f\u6539\u53d8\uff0c\u8fd9\u4e2a\u989c\u8272\u56e0\u4e3a\u662f\u53d8\u5316\u7684\uff0c\u6240\u4ee5\u8bf4\u5b83\u5c31\u8981\u5b9a\u4e49\u6210\u4e00\u4e2a state\uff0c\u5b83\u7684\u503c\u662f\u5728\u7528\u6237\u9009\u62e9\u5b8c\u989c\u8272\u4e4b\u540e\u6765\u8fdb\u884c\u66f4\u65b0\u7684\u3002"),Object(l.b)("p",null,"\u4f7f\u7528 State \u8ddf\u666e\u901a JavaScript \u76f8\u6bd4\uff0c\u5b83\u7684\u597d\u5904\u662f\uff1a"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"\u5728\u7ec4\u4ef6\u5185\u90e8\u7ba1\u7406\u72b6\u6001\uff0c\u4ee3\u7801\u5c01\u88c5\u6027\u597d\uff0c\u51fa\u9519\u7684\u8bdd\u4e5f\u5bb9\u6613\u5b9a\u4f4d\u5230\u95ee\u9898\u7ec4\u4ef6\u3002"),Object(l.b)("li",{parentName:"ul"},"\u6570\u636e\u548c\u5c55\u793a\u5206\u79bb\uff0c\u53ea\u9700\u8981\u4fee\u6539 state \u7684\u503c\uff0c\u5c31\u80fd\u66f4\u65b0\u5bf9\u5e94\u7684\u7ec4\u4ef6\u3002"),Object(l.b)("li",{parentName:"ul"},"state \u53ef\u4ee5\u901a\u8fc7 props \u5411\u4e0b\u4f20\u9012\u7ed9\u5176\u4ed6\u7ec4\u4ef6\uff0c\u53ea\u8981 state \u6539\u53d8\uff0c\u6240\u6709\u4f7f\u7528\u5b83\u7684\u7ec4\u4ef6\u90fd\u4f1a\u5237\u65b0\u3002")),Object(l.b)("p",null,"\u63a5\u4e0b\u6765\u770b\u4e00\u4e0b\u8fd9\u4e2a\u4f8b\u5b50\u600e\u4e48\u5b9e\u73b0\u3002"),Object(l.b)("h2",{id:"\u521b\u5efa-react-\u5de5\u7a0b"},"\u521b\u5efa React \u5de5\u7a0b"),Object(l.b)("p",null,"\u9996\u5148\u8fd8\u662f\u8981\u521b\u5efa\u4e00\u4e2a raect \u5de5\u7a0b\uff0c\u7528 create react app\u3002"),Object(l.b)("ol",null,Object(l.b)("li",{parentName:"ol"},Object(l.b)("p",{parentName:"li"},"\u4f7f\u7528 create-react-app \u521b\u5efa\u4e00\u4e2a\u5de5\u7a0b\uff1a"),Object(l.b)("pre",{parentName:"li"},Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"yarn create react-app react-gradient-bg\n")),Object(l.b)("p",{parentName:"li"},"\u7b49\u540c\u4e8e"),Object(l.b)("pre",{parentName:"li"},Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"npx create-react-app react-gradient-bg\n")))),Object(l.b)("h2",{id:"\u521b\u5efa-gradient-\u7ec4\u4ef6"},"\u521b\u5efa Gradient \u7ec4\u4ef6"),Object(l.b)("p",null,"\u5de5\u7a0b\u521b\u5efa\u597d\u4e4b\u540e\uff0c\u54b1\u4eec\u5728 src \u91cc\u9762\u521b\u5efa\u4e00\u4e2a\u65b0\u7684\u7ec4\u4ef6 (\u4e5f\u5c31\u662f\u6587\u4ef6\u5939) \u53eb ",Object(l.b)("inlineCode",{parentName:"p"},"Gradient"),"\u3002"),Object(l.b)("blockquote",null,Object(l.b)("p",{parentName:"blockquote"},"\u8fd9\u4e2a\u7b80\u5355\u7684\u793a\u4f8b\u7684\u4ee3\u7801\u6574\u4e2a\u90fd\u5728\u8fd9\u4e2a gradient \u7ec4\u4ef6\u91cc\u8fb9\u3002\u4ed6\u6709\u4e24\u4e2a\u989c\u8272\u9009>\u62e9\u5668\u3002\u7136\u540e\u4e00\u4e2a\u91cd\u7f6e\u6309\u94ae\u3002\u6574\u4e2a\u80cc\u666f\u662f\u7531\u7528\u6237\u9009\u62e9\u7684\u4e24\u4e2a\u989c\u8272\u7ec4\u6210\u7684\u4e00\u4e2a 75 \u5ea6\u7684\u6e10\u53d8\u3002\u5f53\u7528\u6237\u5728\u9009\u62e9\u989c\u8272\u7684\u65f6\u5019\uff0c\u8fd9\u4e2a\u80cc\u666f\u4f1a\u52a8\u6001\u7684\u6839\u636e\u7528\u6237\u9009\u62e9\u7684\u989c\u8272\u53d1\u751f\u53d8\u5316\uff0c\u70b9\u51fb\u91cd\u7f6e\u6309\u94ae\u4e4b\u540e\uff0c\u80cc\u666f\u989c\u8272\u4f1a\u53d8\u6210\u521d\u59cb\u7684\u9ed8\u8ba4\u503c\u3002")),Object(l.b)("p",null,"\u54b1\u4eec\u5148\u6765\u770b html \u7684\u7ed3\u6784\u3002"),Object(l.b)("h3",{id:"\u7f16\u5199-html-\u7ed3\u6784"},"\u7f16\u5199 html \u7ed3\u6784"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),'function Gradient() {\n  <div className={styles.container}>\n    <div className={styles.inputGroup}>\n      <label>\u8bf7\u9009\u62e9\u7b2c\u4e00\u4e2a\u989c\u8272</label>\n      <input type="color" name="color1" className={styles.inputColor} />\n    </div>\n    <div className={styles.inputGroup}>\n      <label>\u8bf7\u9009\u62e9\u7b2c\u4e8c\u4e2a\u989c\u8272</label>\n      <input type="color" name="color2" className={styles.inputColor} />\n    </div>\n\n    <button className={styles.button}>\u91cd\u7f6e\u4e3a\u9ed8\u8ba4</button>\n  </div>;\n}\n')),Object(l.b)("p",null,"\u8fd9\u91cc\uff1a"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"\u5b9a\u4e49\u4e86\u4e24\u4e2a ",Object(l.b)("inlineCode",{parentName:"li"},"type")," \u4e3a ",Object(l.b)("inlineCode",{parentName:"li"},"color"),"\u7684 ",Object(l.b)("inlineCode",{parentName:"li"},"input"),"\uff0c\u8fd9\u662f html \u539f\u751f\u7684\u989c\u8272\u9009\u62e9\u5668\u7ec4\u4ef6\uff0c \u5982\u679c\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u5c31\u4f1a\u53d8\u6210\u989c\u8272\u8f93\u5165\u6846\uff0c\u53ef\u4ee5\u8f93\u5165#FFFFFF \u4e4b\u7c7b\u7684\u989c\u8272\u503c\u3002"),Object(l.b)("li",{parentName:"ul"},"\u5b9a\u4e49\u4e86\u4e00\u4e2a\u91cd\u7f6e\u6309\u94ae\u3002"),Object(l.b)("li",{parentName:"ul"},"\u6837\u5f0f\u53ef\u4ee5\u5728\u6e90\u4ee3\u7801\u4e2d\u67e5\u770b\u3002")),Object(l.b)("h3",{id:"\u521b\u5efa-state"},"\u521b\u5efa state"),Object(l.b)("p",null,"\u521b\u5efa state \u7528 react \u5185\u7f6e\u7684 ",Object(l.b)("inlineCode",{parentName:"p"},"useState")," hook\u3002"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-javascript"}),'// \u8bbe\u7f6e\u4e24\u4e2a state\uff0c\u7ed9\u9ed8\u8ba4\u503c\nconst [color1, setColor1] = useState("#00F260");\nconst [color2, setColor2] = useState("#0575E6");\n')),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"\u5b83\u63a5\u53d7\u4e00\u4e2a\u53c2\u6570\uff0c\u662f state \u7684\u9ed8\u8ba4\u503c\uff0c\u7136\u540e\u8fd4\u56de\u4e00\u4e2a\u6570\u7ec4\uff0c\u6570\u7ec4\u91cc\u9762\u6709\u4e24\u4e2a\u5143\u7d20\uff0c\u7b2c 1 \u4e2a\u5143\u7d20\u662f state \u7684\u503c\uff0c\u7136\u540e\u7b2c 2 \u4e2a\u5143\u7d20\u662f\u6539\u53d8\u8fd9\u4e2a state \u7684\u51fd\u6570\u3002"),Object(l.b)("li",{parentName:"ul"},"\u8fd9\u91cc\u5b9a\u4e49\u4e86\u4e24\u4e2a color state\u3002")),Object(l.b)("p",null,"\u63a5\u7740\u7ed9\u6700\u5916\u5c42\u5bb9\u5668 div \u8bbe\u7f6e\u4e00\u4e2a style\uff0c\u8ba9\u5b83\u7684\u80cc\u666f\u8272\u4e3a\u6e10\u53d8\u7684\uff0c\u4f7f\u7528\u8fd9\u4e24\u4e2a color \u7684\u503c\uff1a"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx",metastring:"{4-6}","{4-6}":!0}),"return (\n    <div\n      className={styles.container}\n      style={{\n        background: `linear-gradient(75deg, ${color1}, ${color2})`\n      }}\n    >\n    // ...\n    </div>\n")),Object(l.b)("h3",{id:"\u5904\u7406-input-\u4e8b\u4ef6"},"\u5904\u7406 input \u4e8b\u4ef6"),Object(l.b)("p",null,"\u63a5\u4e0b\u6765\u5c31\u662f\u5904\u7406\u8fd9\u4e24\u4e2a\u989c\u8272\u72b6\u6001\u7684\u6539\u53d8\uff0c\u8868\u5355\u5143\u7d20 input\u3001 select \u7b49\u4f1a\u89e6\u53d1 ",Object(l.b)("inlineCode",{parentName:"p"},"onChange")," \u8fd9\u4e2a\u4e8b\u4ef6\uff0c\u4e5f\u5c31\u662f\u8bf4\u5f53\u7528\u6237\u5728\u91cc\u8fb9\u8f93\u5165\u503c\u6216\u8005\u662f\u9009\u62e9\u9009\u9879\u7684\u65f6\u5019\u3002"),Object(l.b)("p",null,"\u54b1\u4eec\u53ef\u4ee5\u5728\u8fd9\u4e2a\u7ec4\u4ef6\u7684\u51fd\u6570\u91cc\u8fb9\uff0c\u5148\u5b9a\u4e49\u4e00\u4e2a\u5904\u7406\u51fd\u6570\u3002\u6bd4\u5982\u8bf4\u53eb ",Object(l.b)("inlineCode",{parentName:"p"},"handleInputChange"),"\uff1a"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-javascript",metastring:"{5,7}","{5,7}":!0}),'function handleInputChange(e) {\n  const { name, value } = e.target;\n  // \u4f7f\u7528 name \u533a\u5206\uff0c\u8fd9\u91cc\u4e5f\u53ef\u4ee5\u7528 switch\n  if (name === "color1") {\n    setColor1(value);\n  } else if (name === "color2") {\n    setColor2(value);\n  }\n}\n')),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"react \u4f1a\u5728\u89e6\u53d1\u4e8b\u4ef6\u7684\u65f6\u5019\uff0c\u7ed9\u4e8b\u4ef6\u5904\u7406\u51fd\u6570\u4f20\u9012\u4e00\u4e2a\u53c2\u6570 ",Object(l.b)("inlineCode",{parentName:"li"},"event"),"\uff0c\u4ee3\u8868\u8fd9\u4e2a\u4e8b\u4ef6\u5b83\u7684\u672c\u8eab\uff0c\u4f46\u662f\u8fd9\u4e2a\u4e8b\u4ef6\u662f\u5408\u6210\u7684\uff0c\u5b83\u4e0d\u662f\u539f\u751f\u7684 html \u7684 event\uff0c\u4e0d\u8fc7\u5b83\u91cc\u9762\u7684\u5c5e\u6027\u548c html \u7684\u57fa\u672c\u4e0a\u4e00\u6837\u3002"),Object(l.b)("li",{parentName:"ul"},"\u8fd9\u4e2a ",Object(l.b)("inlineCode",{parentName:"li"},"event")," \u91cc\u9762\u6709\u4e00\u4e2a ",Object(l.b)("inlineCode",{parentName:"li"},"target")," \u5c5e\u6027\uff0c\u5c31\u662f\u8bf4\u662f\u8c01\u89e6\u53d1\u4e86\u4e00\u4e2a\u4e8b\u4ef6\uff0c\u90a3\u8fd9\u91cc\u5c31\u662f\u8fd9\u4e24\u4e2a input\u3002"),Object(l.b)("li",{parentName:"ul"},"\u83b7\u53d6\u5230 input \u7684 target \u4e4b\u540e\u5c31\u53ef\u4ee5\u83b7\u53d6\u5230 input \u6807\u7b7e\u91cc\u9762\u7684\u5c5e\u6027\uff0c\u6bd4\u5982\u8bf4 ",Object(l.b)("inlineCode",{parentName:"li"},"name")," \u548c ",Object(l.b)("inlineCode",{parentName:"li"},"value"),"\u3002"),Object(l.b)("li",{parentName:"ul"},"\u540e\u9762\u53ef\u4ee5\u6839\u636e name \u6765\u533a\u5206\u662f\u54ea\u4e2a input \u89e6\u53d1\u7684\u4e8b\u4ef6\uff0c\u7136\u540e\u628a\u65b0\u7684\u989c\u8272\u7528 ",Object(l.b)("inlineCode",{parentName:"li"},"setXXX")," \u7684\u51fd\u6570\uff0c\u6765\u628a\u989c\u8272\u66f4\u65b0\u3002")),Object(l.b)("p",null,"\u6700\u540e\u628a\u5904\u7406\u51fd\u6570\u548c\u72b6\u6001\u7684\u503c\u6dfb\u52a0\u5230 input \u7ec4\u4ef6\u4e0a\uff0c\u6ce8\u610f\u5728 JSX \u91cc\u8fb9\uff0chtml \u7684\u5c5e\u6027\u90fd\u662f\u9a7c\u5cf0\u547d\u540d\u6cd5\uff0c\u4e0d\u662f\u5168\u90e8\u5c0f\u5199\u7684\u90a3\u79cd\uff1a"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx",metastring:"{7,8,17,18}","{7,8,17,18}":!0}),'<div className={styles.inputGroup}>\n   <label>\u8bf7\u9009\u62e9\u7b2c\u4e00\u4e2a\u989c\u8272</label>\n   <input\n      type="color"\n      name="color1"\n      className={styles.inputColor}\n      value={color1}\n      onChange={handleInputChange}\n   />\n</div>\n<div className={styles.inputGroup}>\n   <label>\u8bf7\u9009\u62e9\u7b2c\u4e8c\u4e2a\u989c\u8272</label>\n   <input\n      type="color"\n      name="color2"\n      className={styles.inputColor}\n      value={color2}\n      onChange={handleInputChange}\n   />\n</div>\n\n')),Object(l.b)("h3",{id:"\u5904\u7406\u6309\u94ae\u4e8b\u4ef6"},"\u5904\u7406\u6309\u94ae\u4e8b\u4ef6"),Object(l.b)("p",null,"\u5b9a\u4e49\u6309\u94ae\u7684\u5904\u7406\u51fd\u6570\uff0c\u7528\u6765\u91cd\u7f6e\u989c\u8272\u4e3a\u9ed8\u8ba4\u503c\uff1a"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-javascript"}),'// \u91cd\u7f6e\u6309\u94ae\u4e8b\u4ef6\nfunction handleClick() {\n  setColor1("#00F260");\n  setColor2("#0575E6");\n}\n')),Object(l.b)("p",null,"\u6dfb\u52a0\u5230\u6309\u94ae\uff1a"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"<button onClick={handleClick} className={styles.button}>\n  \u91cd\u7f6e\u4e3a\u9ed8\u8ba4\n</button>\n")),Object(l.b)("h3",{id:"\u7bad\u5934\u51fd\u6570\u5f62\u5f0f"},"\u7bad\u5934\u51fd\u6570\u5f62\u5f0f"),Object(l.b)("p",null,"\u4e0a\u8fb9\u7684\u5904\u7406\u51fd\u6570\uff0c\u4e5f\u53ef\u4ee5\u4f7f\u7528\u7bad\u5934\u51fd\u6570\uff0c\u76f4\u63a5\u5728\u6807\u7b7e\u5904\u5b9a\u4e49\u5185\u8054\u7684\u4e8b\u4ef6\u5904\u7406\uff1a"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx",metastring:"{4,9,12-15}","{4,9,12-15}":!0}),'<input\n   //...\n   name="color1"\n   onChange={e => setColor1(e.target.value)}\n/>\n<input\n   //...\n   name="color2"\n   onChange={e => setColor2(e.target.value)}\n/>\n<button\n   onClick={() => {\n      setColor1("#00F260");\n      setColor2("#0575E6");\n   }}\n>\n   \u91cd\u7f6e\u4e3a\u9ed8\u8ba4\n</button>\n\n')),Object(l.b)("h3",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),Object(l.b)("p",null,"\u597d\uff0c\u8fd9\u4e2a\u6e10\u53d8\u80cc\u666f\u751f\u6210\u5668\u73b0\u5728\u5c31\u628a\u5b83\u5199\u5b8c\u4e86\uff0c\u4f60\u4e5f\u53ef\u4ee5\u628a\u5b83\u6269\u5c55\u4e00\u4e0b\uff0c\u6bd4\u5982\u53ef\u4ee5\u81ea\u5b9a\u4e49\u6e10\u53d8\u7684\u89d2\u5ea6\uff0c\u9009\u62e9\u591a\u4e2a\u989c\u8272\u7b49\u7b49\u3002\u4eca\u5929\u7528\u5b83\u628a React \u7684 state \u548c event \u4e24\u4e2a\u6982\u5ff5\u8bb2\u4e86\u4e00\u4e0b\uff0c\u4e5f\u5f88\u7b80\u5355\uff0c\u662f\u4e0d\u662f\uff1f\u6765\u590d\u4e60\u4e00\u4e0b\u9700\u8981\u6ce8\u610f\u7684\u51e0\u4e2a\u70b9\uff1a"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"Props \u7684\u503c\u662f\u53ea\u8bfb\u4e0d\u53ef\u53d8\u7684\uff0c\u6539\u53d8\u5b83\u7684\u503c\u4e0d\u4f1a\u5f15\u8d77\u7ec4\u4ef6\u66f4\u65b0\u3002"),Object(l.b)("li",{parentName:"ul"},"\u9700\u8981\u6539\u53d8\u7684\u503c\u8981\u7528 state\uff0c\u4f7f\u7528 useState hook \u6765\u521b\u5efa\u3002"),Object(l.b)("li",{parentName:"ul"},"\u4e8b\u4ef6\u5904\u7406\u4e2d\u7684 Event \u53c2\u6570\u662f\u5408\u6210\u7684\uff0c\u5c5e\u6027\u548c\u539f\u751f\u7684 event \u57fa\u672c\u4e00\u6837\u3002")))}p.isMDXComponent=!0},189:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return O}));var a=n(0),r=n.n(a);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var b=r.a.createContext({}),u=function(e){var t=r.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return r.a.createElement(b.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,c=e.parentName,b=i(e,["components","mdxType","originalType","parentName"]),p=u(n),m=a,O=p["".concat(c,".").concat(m)]||p[m]||s[m]||l;return n?r.a.createElement(O,o(o({ref:t},b),{},{components:n})):r.a.createElement(O,o({ref:t},b))}));function O(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,c=new Array(l);c[0]=m;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"==typeof e?e:a,c[1]=o;for(var b=2;b<l;b++)c[b]=n[b];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},190:function(e,t,n){"use strict";n.d(t,"b",(function(){return l})),n.d(t,"a",(function(){return c}));var a=n(22),r=n(191);function l(){var e=Object(a.default)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,n=void 0===t?"/":t,l=e.url;return{withBaseUrl:function(e,t){return function(e,t,n,a){var l=void 0===a?{}:a,c=l.forcePrependBaseUrl,o=void 0!==c&&c,i=l.absolute,b=void 0!==i&&i;if(!n)return n;if(n.startsWith("#"))return n;if(Object(r.b)(n))return n;if(o)return t+n;var u=n.startsWith(t)?n:t+n.replace(/^\//,"");return b?e+u:u}(l,n,e,t)}}}function c(e,t){return void 0===t&&(t={}),(0,l().withBaseUrl)(e,t)}},191:function(e,t,n){"use strict";function a(e){return!0===/^(\w*:|\/\/)/.test(e)}function r(e){return void 0!==e&&!a(e)}n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return r}))}}]);