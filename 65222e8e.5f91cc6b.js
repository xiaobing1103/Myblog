(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{118:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return p}));var i=n(3),a=n(8),b=(n(0),n(189)),r=(n(190),{slug:"deploy-a-docusaurus-site-part2",title:"\u8d85\u7b80\u5355\uff01\u4f7f\u7528 Docusaurus \u642d\u5efa\u4e2a\u4eba\u535a\u5ba2\uff08\u4e8c\uff09",author:"\u4e8c\u59e8",author_title:"\u524d\u7aef\u5de5\u7a0b\u5e08 / B\u7ad9UP\u4e3b",author_url:"https://github.com/",author_image_url:"https://s3.ax1x.com/2020/12/19/rtW9iR.png",tags:["\u524d\u7aef","\u804c\u4e1a"]}),l={permalink:"/Myblog/deploy-a-docusaurus-site-part2",source:"@site/blog/2020-03-08-deploy-a-docusaurus-site-part2.md",description:"\u5982\u679c\u4f60\u770b\u4e86\u4e0a\u671f\u89c6\u9891\u7684\u8bdd\uff0c\u90a3\u4e48\u4f60\u5e94\u8be5\u5b66\u4f1a\u4e86\u600e\u4e48\u5728\u672c\u5730\u642d\u5efa\u4e00\u4e2a docusaurus \u535a\u5ba2\uff0c\u4f46\u662f\u4f60\u4e0d\u80fd\u53ea\u5728\u672c\u5730\u6765\u770b\u8fd9\u4e2a\u535a\u5ba2\u5427\uff0c\u5f97\u8ba9\u5168\u4e16\u754c\u6765\u6b23\u8d4f\u4f60\u7684\u6770\u4f5c\uff0c\u6240\u4ee5\u8bf4\u54b1\u4eec\u5f97\u628a\u8fd9\u4e2a\u535a\u5ba2\u90e8\u7f72\u5230\u670d\u52a1\u5668\u4e0a\u3002\u90e8\u7f72\u6709\u4e24\u79cd\u65b9\u5f0f\uff1a",date:"2020-03-08T00:00:00.000Z",tags:[{label:"\u524d\u7aef",permalink:"/Myblog/tags/\u524d\u7aef"},{label:"\u804c\u4e1a",permalink:"/Myblog/tags/\u804c\u4e1a"}],title:"\u8d85\u7b80\u5355\uff01\u4f7f\u7528 Docusaurus \u642d\u5efa\u4e2a\u4eba\u535a\u5ba2\uff08\u4e8c\uff09",readingTime:2.235,truncated:!0,prevItem:{title:"\u7b2c\u4e00\u7bc7\u535a\u5ba2",permalink:"/Myblog/first-blog"},nextItem:{title:"\u8d85\u7b80\u5355\uff01\u4f7f\u7528 Docusaurus \u642d\u5efa\u4e2a\u4eba\u535a\u5ba2\uff08\u4e00\uff09",permalink:"/Myblog/deploy-a-docusaurus-site"}},c=[{value:"\u53d1\u5e03\u5230 github",id:"\u53d1\u5e03\u5230-github",children:[]},{value:"\u90e8\u7f72",id:"\u90e8\u7f72",children:[{value:"Zeit",id:"zeit",children:[]},{value:"\u90e8\u7f72\u5230\u56fd\u5185",id:"\u90e8\u7f72\u5230\u56fd\u5185",children:[]}]}],o={toc:c};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(b.b)("wrapper",Object(i.a)({},o,n,{components:t,mdxType:"MDXLayout"}),Object(b.b)("p",null,"\u5982\u679c\u4f60\u770b\u4e86\u4e0a\u671f\u89c6\u9891\u7684\u8bdd\uff0c\u90a3\u4e48\u4f60\u5e94\u8be5\u5b66\u4f1a\u4e86\u600e\u4e48\u5728\u672c\u5730\u642d\u5efa\u4e00\u4e2a docusaurus \u535a\u5ba2\uff0c\u4f46\u662f\u4f60\u4e0d\u80fd\u53ea\u5728\u672c\u5730\u6765\u770b\u8fd9\u4e2a\u535a\u5ba2\u5427\uff0c\u5f97\u8ba9\u5168\u4e16\u754c\u6765\u6b23\u8d4f\u4f60\u7684\u6770\u4f5c\uff0c\u6240\u4ee5\u8bf4\u54b1\u4eec\u5f97\u628a\u8fd9\u4e2a\u535a\u5ba2\u90e8\u7f72\u5230\u670d\u52a1\u5668\u4e0a\u3002\u90e8\u7f72\u6709\u4e24\u79cd\u65b9\u5f0f\uff1a"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"\u90e8\u7f72\u5230\u56fd\u5916\uff0c\u662f\u514d\u8d39\u7684\u3002"),Object(b.b)("li",{parentName:"ul"},"\u90e8\u7f72\u5728\u56fd\u5185\uff0c\u9700\u8981\u81ea\u5df1\u8d2d\u4e70\u4e00\u4e2a\u57df\u540d\uff0c\u8fd8\u6709\u670d\u52a1\u5668\uff0c\u5927\u6982\u6709\u4e2a 300 \u6765\u5757\u94b1\u5c31\u5dee\u4e0d\u591a\u4e86\u3002")),Object(b.b)("h2",{id:"\u53d1\u5e03\u5230-github"},"\u53d1\u5e03\u5230 github"),Object(b.b)("p",null,"\u5728\u53d1\u535a\u5ba2\u4e4b\u524d\u5f97\u5148\u628a\u9879\u76ee\u53d1\u5e03\u5230 github \u4e0a\uff0c\u8fd9\u4e2a\u4e4b\u524d\u6211\u7b80\u5355\u7684\u4ecb\u7ecd\u8fc7\uff0c\u5b83\u5c31\u662f\u4e00\u4e2a\u8fdc\u7a0b\u7684 git \u7684\u4ee3\u7801\u4ed3\u5e93\uff0c\u6240\u6709\u4eba\u90fd\u53ef\u4ee5\u770b\u5230\u4f60\u7684\u4ee3\u7801\uff0c\u8fd8\u80fd\u4e00\u8d77\u7ef4\u62a4\u3002\u6216\u8005\u4e5f\u53ef\u4ee5\u628a\u5b83\u5f53\u6210\u79c1\u6709\u7684\uff0c\u8fd9\u6837\u7684\u8bdd\u53ef\u4ee5\u5f53\u6210\u81ea\u5df1\u7684\u4e00\u4e2a\u4e91\u7aef\u7684\u4ee3\u7801\u4ed3\u5e93\uff0c\u4f5c\u4e3a\u4ee3\u7801\u7684\u7248\u672c\u8ddf\u8e2a\u7ba1\u7406\u3002"),Object(b.b)("p",null,"\u9996\u5148\u8981\u5728 github \u4e0a\u521b\u5efa\u4e00\u4e2a\u4ed3\u5e93\uff0c\u6253\u5f00\u5b83\u7684\u5b98\u7f51\uff1a"),Object(b.b)("p",null,Object(b.b)("a",Object(i.a)({parentName:"p"},{href:"https://github.com/"}),"github")),Object(b.b)("p",null,"\u6ca1\u6709\u8d26\u53f7\u7684\u8bdd\u5148\u53bb\u6ce8\u518c\u4e00\u4e2a\uff0c\u6709\u7684\u8bdd\u5c31\u76f4\u63a5\u767b\u5f55\uff0c\u767b\u5f55\u4e4b\u540e\u5728\u81ea\u5df1\u7684\u4e3b\u9875\u5de6\u8fb9\u70b9\u51fb ",Object(b.b)("inlineCode",{parentName:"p"},"New")," \u8fd9\u4e2a\u6309\u94ae\u521b\u5efa\u4e00\u4e2a\u4ed3\u5e93\uff0c\u8fd9\u91cc\u9700\u8981\u586b\u4e00\u4e9b\u4fe1\u606f\uff1a"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"Repository Name")," - \u4ed3\u5e93\u7684\u540d\u5b57\uff0c\u5fc5\u586b\u7684\uff0c\u6bd4\u5982\u6211\u8fd9\u91cc\u53eb",Object(b.b)("inlineCode",{parentName:"li"},"fh-blog"),"\u3002"),Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"Description")," - \u4ed3\u5e93\u7684\u63cf\u8ff0\uff0c\u8fd9\u4e2a\u662f\u53ef\u9009\u7684\uff0c\u8fd9\u91cc\u6211\u5199\u4e00\u4e2a",Object(b.b)("inlineCode",{parentName:"li"},"\u6211\u7684\u535a\u5ba2"),"\u3002"),Object(b.b)("li",{parentName:"ul"},"\u9009\u62e9",Object(b.b)("inlineCode",{parentName:"li"},"\u79c1\u6709"),"\u8fd8\u662f",Object(b.b)("inlineCode",{parentName:"li"},"\u516c\u5f00")," - \u5982\u679c\u540e\u8fb9\u5728 Zeit \u4e0a\u90e8\u7f72\uff0c\u8fd9\u91cc\u9009\u516c\u5f00\u3002"),Object(b.b)("li",{parentName:"ul"},"\u662f\u4e0d\u662f\u6dfb\u52a0",Object(b.b)("inlineCode",{parentName:"li"},"README")," - \u8fd9\u91cc\u4e0d\u6dfb\u52a0\u4e86\uff0c\u56e0\u4e3a\u54b1\u4eec\u672c\u5730\u5df2\u7ecf\u6709\u4e86\uff0c\u53e6\u5916",Object(b.b)("inlineCode",{parentName:"li"},".gitignore"),"\u548c",Object(b.b)("inlineCode",{parentName:"li"},"add a licence"),"\u4e5f\u90fd\u4e0d\u7528\u6dfb\u52a0\u3002")),Object(b.b)("p",null,"\u5b8c\u4e86\u4e4b\u540e\u70b9\u51fb ",Object(b.b)("inlineCode",{parentName:"p"},"Create repository")," \u4ed3\u5e93\u521b\u5efa\u597d\u4e86\u3002\u4e4b\u540e\u5b83\u4f1a\u8df3\u8f6c\u5230\u4ed3\u5e93\u7684\u9996\u9875\uff0c\u4e0b\u8fb9\u5199\u4e86\u4e24\u79cd\u65b9\u5f0f\u628a\u4ee3\u7801\u63d0\u4ea4\u5230 github\uff0c\u7b2c\u4e00\u79cd\u662f\u6309\u5168\u65b0\u7684\u4ed3\u5e93\uff0c\u5c31\u662f\u672c\u5730\u8fd8\u6ca1\u6709\u7684\u3002\u54b1\u4eec\u8fd9\u91cc\u7528\u7b2c\u4e8c\u79cd\uff0c\u628a\u73b0\u6709\u7684\u4ee3\u7801\u63a8\u9001\u5230 github \u4e0a\u3002\u5177\u4f53\u64cd\u4f5c\uff1a"),Object(b.b)("ol",null,Object(b.b)("li",{parentName:"ol"},"\u5728 VS Code \u91cc\u6253\u5f00\u4f60\u7684\u535a\u5ba2\u5de5\u7a0b\uff0c\u70b9\u51fb\u83dc\u5355\u4e2d\u7b2c\u4e09\u4e2a\u6309\u94ae ",Object(b.b)("inlineCode",{parentName:"li"},"source control"),"\u3002"),Object(b.b)("li",{parentName:"ol"},"\u5982\u679c\u4ed3\u5e93\u8fd8\u6ca1\u6709\u521d\u59cb\u5316\u7684\u8bdd\uff0c\u70b9\u51fb ",Object(b.b)("inlineCode",{parentName:"li"},"initialize repository")," \u6309\u94ae\u8fdb\u884c\u521d\u59cb\u5316\u3002"),Object(b.b)("li",{parentName:"ol"},"\u5728\u4e0a\u8fb9\u7684 message \u8f93\u5165\u6846\u4e2d\u8f93\u5165 commit \u4fe1\u606f\uff0c\u6bd4\u5982\u8bf4 ",Object(b.b)("inlineCode",{parentName:"li"},"initial commit"),"\uff0c\u518d\u70b9\u51fb\u4e0a\u8fb9\u7684\u5bf9\u52fe\u63d0\u4ea4\u4ee3\u7801\u3002"),Object(b.b)("li",{parentName:"ol"},"\u6309\u4e0b\u952e\u76d8\u7684 ",Object(b.b)("inlineCode",{parentName:"li"},"command(Mac)/ctrl(Windows) + shift + p"),"\uff0c \u6253\u5f00\u5feb\u6377\u547d\u4ee4\u884c\u5de5\u5177\uff0c\u8f93\u5165 ",Object(b.b)("inlineCode",{parentName:"li"},"add remote"),"\uff0c\u5728\u51fa\u6765\u7684\u63d0\u793a\u4e2d\u9009\u62e9 ",Object(b.b)("inlineCode",{parentName:"li"},"Git: Add Remote"),"\u3002"),Object(b.b)("li",{parentName:"ol"},"\u7ed9\u8fd9\u4e2a\u8fdc\u7a0b\u4ed3\u5e93\u7684\u7684 url \u4fe1\u606f\u8d77\u4e2a\u540d\u5b57\uff0c\u4e00\u822c\u53eb\u505a ",Object(b.b)("inlineCode",{parentName:"li"},"origin"),"\uff0c\u4ee3\u8868\u8fd9\u662f\u54b1\u4eec\u9879\u76ee\u7684\u8d77\u6e90\u4ed3\u5e93\u3002\u6309\u4e0b\u56de\u8f66\u3002"),Object(b.b)("li",{parentName:"ol"},"\u63a5\u4e0b\u6765\u8981\u6c42\u8f93\u5165\u4ed3\u5e93\u7684 url\uff0c\u5728\u91cc\u8fb9\u8d34\u4e0a\u4f60\u7684 github \u4ed3\u5e93\u7684 url, \u6bd4\u5982 ",Object(b.b)("inlineCode",{parentName:"li"},"https://github.com/zxuqian/fh-blog.git"),"\uff0c\u7136\u540e\u6309\u4e0b\u56de\u8f66\u3002"),Object(b.b)("li",{parentName:"ol"},"\u6dfb\u52a0\u597d\u8fdc\u7a0b\u4ed3\u5e93\u4e4b\u540e\uff0c\u518d\u70b9\u51fb source control \u4e2d\u7684 ",Object(b.b)("inlineCode",{parentName:"li"},"...")," \u83dc\u5355\uff0c\u9009\u62e9 push\uff0c\u7b49\u5b8c\u6210\u4e4b\u540e\uff0c\u518d\u5237\u65b0\u4e00\u4e0b github \u4ed3\u5e93\uff0c\u6709\u4e86\u4ee3\u7801\u5c31\u4ee3\u8868\u63a8\u9001\u6210\u529f\u4e86\u3002")),Object(b.b)("h2",{id:"\u90e8\u7f72"},"\u90e8\u7f72"),Object(b.b)("p",null,"\u4ee3\u7801\u63a8\u9001\u5230 github \u4e4b\u540e\uff0c\u5c31\u80fd\u6109\u5feb\u7684\u90e8\u7f72\u5230\u670d\u52a1\u5668\u4e0a\u4e86\u3002"),Object(b.b)("h3",{id:"zeit"},"Zeit"),Object(b.b)("p",null,Object(b.b)("a",Object(i.a)({parentName:"p"},{href:"http://zeit.co/"}),"Zeit")),Object(b.b)("p",null,"\u8fd9\u91cc\u63a8\u8350\u7ed9\u4f60\u4e00\u4e2a\u6bd4\u8f83\u597d\u7528\u7684\u56fd\u5916\u7684\u670d\u52a1\u5668\uff0c\u914d\u7f6e\u8d85\u7ea7\u7b80\u5355\uff0c\u5b83\u53eb zeit\uff0c\u4e5f\u662f docusaurus \u5b98\u65b9\u63a8\u8350\u7684\uff0c\u4e0d\u8fc7\u53ef\u80fd\u6709\u4e9b\u5730\u65b9\u56e0\u4e3a\u67d0\u4e9b\u539f\u56e0\uff0c\u4f1a\u8bbf\u95ee\u4e0d\u4e86\uff0c\u6216\u8005\u975e\u5e38\u6162\u3002\u4e0d\u8fc7\u56e0\u4e3a\u5b83\u592a\u65b9\u4fbf\u4e86\uff0c\u6240\u4ee5\u8fd8\u662f\u8981\u4ecb\u7ecd\u4e00\u4e0b\u3002\u5b83\u7684\u514d\u8d39\u7248\u5305\u62ec\u4e0b\u8fb9\u7684\u7279\u6027\uff1a"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"HTTPS-enabled Custom Domains")," - \u53ef\u4ee5\u81ea\u52a8\u7ed9\u81ea\u5b9a\u4e49\u57df\u540d\u6dfb\u52a0 https \u652f\u6301"),Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"Continuous Deployment with Git")," - \u80fd\u591f\u5229\u7528 git \u8fdb\u884c\u6301\u7eed\u96c6\u6210"),Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"High-performance Smart CDN")," - \u9ad8\u6027\u80fd\u7684\u667a\u80fd CDN"),Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"Unlimited Websites & APIs")," - \u652f\u6301\u521b\u5efa\u65e0\u6570\u4e2a\u7f51\u7ad9\u548c api"),Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"Serverless Functions in Node.js, Go, and more")," - \u652f\u6301\u4f7f\u7528 Node.js \u548c Go \u8bed\u8a00\u7b49\u521b\u5efa\u65e0\u670d\u52a1\u7684\u51fd\u6570\u3002")),Object(b.b)("p",null,"\u63a5\u4e0b\u6765\u6ce8\u518c\u4e00\u4e2a\u8d26\u53f7\uff0c\u6839\u636e\u5b83\u7684\u8981\u6c42\u5b8c\u6210\u4e4b\u540e\u5c31\u53ef\u4ee5\u5f00\u59cb\u90e8\u7f72\u4e86\u3002"),Object(b.b)("h4",{id:"\u53d1\u5e03\u5230-zeit"},"\u53d1\u5e03\u5230 zeit"),Object(b.b)("p",null,"\u8981\u53d1\u5e03\u5230 zeit \u4e0a,\u9996\u5148\u5b89\u88c5\u5b83\u7684\u547d\u4ee4\u884c\u5de5\u5177\uff1a"),Object(b.b)("pre",null,Object(b.b)("code",Object(i.a)({parentName:"pre"},{className:"language-shell"}),"npm i -g now\n")),Object(b.b)("p",null,"\u63a5\u4e0b\u6765\u5728 VS Code \u4e2d\u6253\u5f00\u4e00\u4e2a\u547d\u4ee4\u884c\u7a97\u53e3\uff0c\u7528\u5feb\u6377\u952e ctrl + `, \u9ed8\u8ba4\u7684\u8def\u5f84\u5c31\u662f\u5f53\u524d\u5de5\u7a0b\u7684\u6839\u76ee\u5f55\uff0c\u8f93\u5165\u547d\u4ee4\uff1a"),Object(b.b)("pre",null,Object(b.b)("code",Object(i.a)({parentName:"pre"},{className:"language-shell"}),"now\n")),Object(b.b)("p",null,"\u5b83\u4f1a\u8981\u6c42\u4e00\u4e9b\u4fe1\u606f\uff0c\u6bd4\u5982\u7528\u6ce8\u518c\u90ae\u7bb1\u63a5\u6536\u4e00\u4e2a\u9a8c\u8bc1\u7801\uff0c\u9879\u76ee\u540d\u79f0\uff0c\u914d\u7f6e\u4fe1\u606f\u3002\u7b49\u5b83\u8fd0\u884c\u5b8c\u6bd5\u4e4b\u540e\uff0c\u9879\u76ee\u5c31\u53ef\u4ee5\u90e8\u7f72\u5230 zeit \u4e0a\u4e86\u3002\u53bb zeit \u5b98\u7f51\uff0c\u53ef\u4ee5\u770b\u5230\u5b83\u81ea\u52a8\u5173\u8054\u4e86 github \u7684\u9879\u76ee\uff0c\u4e5f\u53ef\u4ee5\u770b\u5230\u5b83\u7ed9\u54b1\u4eec\u751f\u6210\u7684\u57df\u540d\uff0c\u70b9\u5f00\u5b83\u5c31\u53ef\u4ee5\u8bbf\u95ee\u4e86\uff0c\u5982\u679c\u8981\u6dfb\u52a0\u81ea\u5b9a\u4e49\u7684\u57df\u540d\uff0c\u5c31\u70b9\u5f00 ",Object(b.b)("inlineCode",{parentName:"p"},"domains")," \u83dc\u5355\uff0c\u70b9\u51fb ",Object(b.b)("inlineCode",{parentName:"p"},"add"),"\uff0c\u9009\u62e9\u4e00\u4e2a\u90e8\u7f72\u7684\u9879\u76ee\uff0c\u518d\u70b9 ",Object(b.b)("inlineCode",{parentName:"p"},"continue"),"\uff0c\u8f93\u5165\u81ea\u5df1\u7684\u57df\u540d\uff0c\u70b9\u51fb ",Object(b.b)("inlineCode",{parentName:"p"},"Add")," \u5c31\u53ef\u4ee5\u6dfb\u52a0\u4e86\uff0c\u6700\u540e\u8981\u628a\u57df\u540d\u7684 DNS \u6307\u5411 zeit \u63d0\u4f9b\u7684\u90a3\u51e0\u4e2a\u3002\u600e\u4e48\u4fee\u6539\u57df\u540d DNS \u6211\u7a0d\u540e\u4f1a\u8bb2\uff0c\u4e0d\u540c\u7684\u57df\u540d\u63d0\u4f9b\u5546\u4e5f\u6709\u4e0d\u540c\u7684\u64cd\u4f5c\u3002"),Object(b.b)("h3",{id:"\u90e8\u7f72\u5230\u56fd\u5185"},"\u90e8\u7f72\u5230\u56fd\u5185"),Object(b.b)("p",null,"Zeit \u53ef\u80fd\u5728\u56fd\u5185\u67d0\u4e9b\u5730\u65b9\u8bbf\u95ee\u4e0d\u592a\u7a33\u5b9a\uff0c\u90a3\u54b1\u4eec\u53ef\u4ee5\u90e8\u7f72\u5728\u56fd\u5185\u670d\u52a1\u5668\u4e0a\u3002\u4e4b\u524d\u5728\u524d\u7aef\u8def\u7ebf\u56fe\u7684\u89c6\u9891\u91cc\u6211\u5927\u81f4\u8bb2\u8fc7\u4e86\u57df\u540d\u548c\u670d\u52a1\u5668\u7684\u6982\u5ff5\uff0c\u8981\u90e8\u7f72\u54b1\u4eec\u7684\u7f51\u7ad9\uff0c\u5c31\u9700\u8981\u8d2d\u4e70\u4e00\u4e2a\u57df\u540d\u548c\u4e00\u53f0\u670d\u52a1\u5668\uff0c\u56e0\u4e3a\u54b1\u4eec\u8fd9\u4e2a\u7f51\u7ad9\u662f\u9759\u6001\u7684\uff0c\u4e0d\u9700\u8981\u592a\u8fc7\u590d\u6742\u7684\u529f\u80fd\uff0c\u6240\u4ee5\u670d\u52a1\u5668\u7528\u4e00\u53f0\u865a\u62df\u4e3b\u673a\u5c31\u53ef\u4ee5\u4e86\uff0c\u865a\u62df\u4e3b\u673a\u662f\u4e00\u53f0\u670d\u52a1\u5668\u91cc\u8fb9\uff0c\u5206\u9694\u51fa\u6765\u4e86\u4e0d\u540c\u7684\u76ee\u5f55\u7ed9\u4e0d\u540c\u7684\u7528\u6237\uff0c\u6240\u6709\u7684\u8fd9\u4e00\u53f0\u670d\u52a1\u5668\u4e0a\u7684\u7528\u6237\u90fd\u5171\u4eab\u5b83\u7684 cpu\u3001\u5185\u5b58\u7b49\u8d44\u6e90\uff0c\u7136\u540e\u6709\u56fa\u5b9a\u7684\u5e26\u5bbd\u3001\u5b58\u50a8\u5bb9\u91cf\u8fd8\u6709\u6570\u636e\u5e93\u7b49\u7b49\u3002"),Object(b.b)("h4",{id:"\u8d2d\u4e70\u57df\u540d"},"\u8d2d\u4e70\u57df\u540d"),Object(b.b)("p",null,"\u8fd9\u91cc\u4ee5\u963f\u91cc\u4e91\u4e3a\u793a\u4f8b\uff0c\u6253\u5f00\u5b83\u7684",Object(b.b)("a",Object(i.a)({parentName:"p"},{href:"https://www.aliyun.com/"}),"\u5b98\u7f51 https://www.aliyun.com/"),"\uff0c\u5728\u641c\u7d22\u6846\u4e0a\u8fb9\u9009\u62e9\u57df\u540d\uff0c\u7136\u540e\u8f93\u5165\u4e00\u4e2a\u81ea\u5df1\u60f3\u8981\u7684\u57df\u540d\uff0c\u6bd4\u5982 ",Object(b.b)("inlineCode",{parentName:"p"},"fhdev"),"\uff0c\u518d\u9009\u62e9\u4e00\u4e2a\u53ef\u7528\u7684\u57df\u540d\uff0c\u52a0\u5165\u5230\u6e05\u5355\u4e2d\uff0c\u5b8c\u6210\u4e4b\u540e\u70b9\u51fb\u7acb\u5373\u7ed3\u7b97\uff0c\u9009\u62e9\u5e74\u9650\uff0c\u6dfb\u52a0\u5b9e\u540d\u4fe1\u606f\u4e4b\u540e\uff0c\u4ed8\u6b3e\u8d2d\u4e70\u5c31\u53ef\u4ee5\u4e86\u3002"),Object(b.b)("h4",{id:"\u8d2d\u4e70\u670d\u52a1\u5668"},"\u8d2d\u4e70\u670d\u52a1\u5668"),Object(b.b)("p",null,"\u670d\u52a1\u5668\u7528\u5171\u4eab\u7684\u865a\u62df\u4e3b\u673a\u5373\u53ef\uff0c",Object(b.b)("a",Object(i.a)({parentName:"p"},{href:"https://wanwang.aliyun.com/hosting/vhost-buy/?spm=5176.8060947.858675.gaongxiang1.a5305c71VGo8vo&productId=38001&cdn=t"}),"\u70b9\u51fb\u4f20\u9001"),"\uff0c\u65b0\u7528\u6237\u7684\u8bdd\u53ef\u4ee5\u9009\u62e9\u4e91\u865a\u62df\u4e3b\u673a\uff0c\u53ef\u80fd\u4f1a\u6709\u4f18\u60e0\u3002\u64cd\u4f5c\u7cfb\u7edf\u9009\u62e9 ",Object(b.b)("inlineCode",{parentName:"p"},"linux"),"\uff0c\u7136\u540e\u9009\u62e9\u8d2d\u4e70\u65f6\u957f\uff0c\u6700\u540e\u8d2d\u4e70\u5c31\u53ef\u4ee5\u4e86\u3002"),Object(b.b)("h4",{id:"\u5907\u6848"},"\u5907\u6848"),Object(b.b)("p",null,"\u5728\u963f\u91cc\u4e91\u4e70\u4e86\u670d\u52a1\u5668\u4e4b\u540e\uff0c\u5b83\u5c31\u63d0\u4f9b\u5907\u6848\u670d\u52a1\u4e86\uff0c\u53ef\u4ee5\u70b9\u51fb\u53f3\u4e0a\u89d2\u5907\u6848\u83dc\u5355\uff0c\u6839\u636e\u63d0\u793a\u8fdb\u884c\u5907\u6848\uff0c\u7528\u624b\u673a\u5907\u6848\u586b\u5199\u8d44\u6599\u4f1a\u66f4\u5feb\u4e00\u4e9b\u3002"),Object(b.b)("h4",{id:"\u914d\u7f6e\u4e3b\u673a\u548c\u57df\u540d"},"\u914d\u7f6e\u4e3b\u673a\u548c\u57df\u540d"),Object(b.b)("p",null,"\u767b\u5f55\u5230\u963f\u91cc\u4e91\u7684\u63a7\u5236\u53f0\uff0c\u5728\u5de6\u4fa7\u6298\u53e0\u83dc\u5355\u91cc\u9009\u62e9\u4e91\u865a\u62df\u4e3b\u673a\uff0c\u5c31\u80fd\u770b\u5230\u4f60\u8d2d\u4e70\u7684\u865a\u62df\u4e3b\u673a\u4e86\uff0c\u70b9\u51fb\u5b83\u53f3\u8fb9\u7684",Object(b.b)("inlineCode",{parentName:"p"},"\u7ba1\u7406"),"\u83dc\u5355\uff0c\u5c31\u53ef\u4ee5\u770b\u5230\u5b83\u7684\u4fe1\u606f\u4e86\uff0c\u8fd9\u91cc\u8981\u628a\u57df\u540d\u6307\u5411\u8fd9\u53f0\u865a\u62df\u4e3b\u673a\uff0c\u4e0b\u8fb9\u5b83\u6709\u7f51\u7ad9\u5f00\u901a\u53c2\u8003\uff0c\u5927\u5bb6\u53ef\u4ee5\u81ea\u5df1\u770b\u4e00\u4e0b\u64cd\u4f5c\u3002\u8fd9\u91cc\u6211\u70b9\u51fb\u5de6\u4fa7\u83dc\u5355\u7684\u4e3b\u673a\u4fe1\u606f\uff0c\u627e\u5230\u5b83\u7684 IP \u5730\u5740\uff0c\u590d\u5236\u5b83\uff0c\u8fd4\u56de\u5230\u63a7\u5236\u53f0\uff0c\u5728\u83dc\u5355\u4e2d\u9009\u62e9",Object(b.b)("inlineCode",{parentName:"p"},"\u57df\u540d"),"\uff0c\u627e\u5230\u521a\u624d\u8d2d\u4e70\u7684\u57df\u540d\uff0c\u70b9\u51fb\u7ba1\u7406\u3002"),Object(b.b)("p",null,"\u8fd9\u91cc\u63d0\u4e00\u4e0b\uff0c\u5982\u679c\u8981\u628a DNS \u6307\u5411 zeit \u63d0\u4f9b\u7684\uff0c\u90a3\u5c31\u5728\u83dc\u5355\u9009\u62e9 ",Object(b.b)("inlineCode",{parentName:"p"},"DNS\u4fee\u6539"),"\uff0c\u518d\u70b9\u51fb\u53f3\u4fa7 ",Object(b.b)("inlineCode",{parentName:"p"},"\u4fee\u6539DNS\u670d\u52a1\u5668"),"\uff0c\u628a zeit \u63d0\u4f9b\u7684 dns \u5730\u5740\u4e00\u9879\u4e00\u9879\u586b\u8fdb\u53bb\u3002"),Object(b.b)("p",null,"\u89e3\u6790\u5230\u81ea\u5df1\u7684\u670d\u52a1\u5668\u4e0a\u7684\u8bdd\uff0c\u53ef\u4ee5\u76f4\u63a5\u5c31\u7528\u963f\u91cc\u4e91\u9ed8\u8ba4\u7684 dns \u5c31\u53ef\u4ee5\u4e86\uff0c\u7136\u540e\u5728\u83dc\u5355\u9879\u91cc\u9009\u62e9",Object(b.b)("inlineCode",{parentName:"p"},"\u57df\u540d\u89e3\u6790"),"\uff0c\u70b9\u5f00\u4e4b\u540e\u70b9\u51fb",Object(b.b)("inlineCode",{parentName:"p"},"\u6dfb\u52a0\u8bb0\u5f55"),"\uff0c\u8bb0\u5f55\u7c7b\u578b\u9009\u62e9 A \u8bb0\u5f55\uff0cA \u8bb0\u5f55\u5c31\u662f\u8bf4\u8fd9\u4e2a\u57df\u540d\u8981\u89e3\u6790\u5230\u4e00\u4e2a ip \u5730\u5740\u4e0a\u8fb9\uff0c\u8fd9\u91cc\u54b1\u4eec\u6709\u865a\u62df\u4e3b\u673a\u7684 IP \u5730\u5740\uff0c\u6240\u4ee5\u9009\u62e9",Object(b.b)("inlineCode",{parentName:"p"},"A"),"\uff0c\u4e3b\u673a\u8bb0\u5f55\u586b\u5199",Object(b.b)("inlineCode",{parentName:"p"},"@"),"\uff0c\u8fd9\u4e2a\u610f\u601d\u662f\u8bbf\u95ee\u6839\u57df\u540d\u65f6\u5bf9\u5e94\u7684 ip\uff0c\u4e5f\u5c31\u662f\u8bf4\u4e0d\u5e26",Object(b.b)("inlineCode",{parentName:"p"},"www"),"\u8fd9\u4e2a\u524d\u7f00\u7684\uff0c\u6bd4\u5982",Object(b.b)("inlineCode",{parentName:"p"},"zxuqian.cn"),"\uff0c\u7136\u540e\u89e3\u6790\u7ebf\u8def\u4fdd\u6301\u9ed8\u8ba4\u5c31\u597d\uff0c\u8bb0\u5f55\u503c\u628a\u521a\u590d\u5236\u7684 ip \u5730\u5740\u7c98\u8d34\u4e0a\u5c31\u53ef\u4ee5\u4e86\uff0c\u7136\u540e\u70b9\u51fb\u786e\u5b9a\u3002"),Object(b.b)("p",null,"\u518d\u6dfb\u52a0\u4e00\u6761\uff0c\u8fd9\u91cc\u4e3b\u673a\u8bb0\u5f55\u586b\u5199",Object(b.b)("inlineCode",{parentName:"p"},"www"),"\uff0c\u5176\u5b83\u7684\u8ddf",Object(b.b)("inlineCode",{parentName:"p"},"@"),"\u7684\u4e00\u81f4\uff0c\u8fd9\u4e2a\u5c31\u662f\u8bbf\u95ee ",Object(b.b)("inlineCode",{parentName:"p"},"www.zxuqian.cn")," \u8fd9\u4e2a\u57df\u540d\u65f6\uff0c\u6307\u5411\u7684 IP \u5730\u5740\uff0c\u8ddf",Object(b.b)("inlineCode",{parentName:"p"},"@"),"\u8bb0\u5f55\u662f\u4e00\u6837\u7684\u3002"),Object(b.b)("h4",{id:"\u914d\u7f6e-github-actions"},"\u914d\u7f6e github actions"),Object(b.b)("p",null,"\u63a5\u4e0b\u6765\u5c31\u662f\u4e0a\u4f20\u7f51\u7ad9\u6587\u4ef6\u5230\u670d\u52a1\u5668\u4e0a\u5c31\u884c\u4e86\uff0c\u53ef\u4ee5\u4f7f\u7528 ftp \u5de5\u5177\uff0c\u6bd4\u5982 FileZilla\uff0c\u4e0d\u8fc7\u8fd9\u6837\u6bcf\u6b21\u5199\u5b8c\u535a\u5ba2\u4e4b\u540e\u90fd\u8981\u624b\u52a8\u518d\u4e0a\u4f20\u4e00\u6b21\u7f51\u7ad9\u6587\u4ef6\uff0c\u6bd4\u8f83\u9ebb\u70e6\uff0c\u8fd9\u91cc\u53ef\u4ee5\u5229\u7528\u4e00\u4e0b github actions \u8fd9\u4e2a\u6301\u7eed\u96c6\u6210\u5de5\u5177\u3002\u5728\u9879\u76ee\u7684\u6839\u76ee\u5f55\u4e0b\u521b\u5efa ",Object(b.b)("inlineCode",{parentName:"p"},".github/workflows")," \u8fd9\u6837\u5c42\u7ea7\u7684\u6587\u4ef6\u5939\uff0c\u7136\u540e\u5728\u91cc\u8fb9\u521b\u5efa",Object(b.b)("inlineCode",{parentName:"p"},"nodejs.yml"),"\u6587\u4ef6\uff0c\u91cc\u8fb9\u5199\u4e0a\u4e0b\u8fb9\u7684\u4ee3\u7801\uff1a"),Object(b.b)("pre",null,Object(b.b)("code",Object(i.a)({parentName:"pre"},{className:"language-yml"}),"name: Node.js CI\n\non: [push]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n\n    strategy:\n      matrix:\n        node-version: [12.x]\n\n    steps:\n      - uses: actions/checkout@v2\n      - name: Use Node.js ${{ matrix.node-version }}\n        uses: actions/setup-node@v1\n        with:\n          node-version: ${{ matrix.node-version }}\n      - run: npm install\n      - run: npm run build --if-present\n      - name: FTP Deploy\n        uses: SamKirkland/FTP-Deploy-Action@3.0.0\n        with:\n          ftp-server: \u4f60\u7684\u865a\u62df\u4e3b\u673a FTP \u4e0a\u4f20\u5730\u5740/ftp \u76ee\u5f55\n          ftp-username: ${{ secrets.ftp_user }}\n          ftp-password: ${{ secrets.ftp_pwd }}\n          local-dir: build/\n        env:\n          CI: true\n")),Object(b.b)("p",null,"\u8fd9\u4e2a\u6587\u4ef6\u662f\u544a\u8bc9 github actions\uff0c\u8fd9\u4e2a\u9879\u76ee\u5728 Node.js 12 \u7248\u672c\uff0cunbuntu \u6700\u65b0\u7248\u672c\u4e0b\uff0c\u8fd0\u884c\u4e0b\u8fb9\u7684\u547d\u4ee4\uff1a"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"npm install - \u5b89\u88c5\u4f9d\u8d56\u5e93"),Object(b.b)("li",{parentName:"ul"},"npm run build - \u6253\u5305\u9879\u76ee\u4e3a\u9759\u6001\u7f51\u7ad9"),Object(b.b)("li",{parentName:"ul"},"FTP Deploy\uff0c\u53d1\u5e03\u5230 FTP \u670d\u52a1\u5668\u4e0a\u3002")),Object(b.b)("p",null,"\u8fd9\u91cc\u53d1\u5e03 FTP \u7684\u65f6\u5019\uff0c\u9700\u8981\u51e0\u4e2a\u53c2\u6570\uff1a"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"ftp-server - \u4f60\u7684\u865a\u62df\u4e3b\u673a FTP \u4e0a\u4f20\u5730\u5740\uff0c\u6bd4\u5982",Object(b.b)("inlineCode",{parentName:"li"},"ftp://byu*********.my3w.com/htdocs"),"\u3002"),Object(b.b)("li",{parentName:"ul"},"ftp-username - ftp \u7528\u6237\u540d\u3002"),Object(b.b)("li",{parentName:"ul"},"ftp-password - ftp \u5bc6\u7801\uff0c\u8fd9\u4e9b\u662f\u79c1\u5bc6\u4fe1\u606f\uff0c\u6240\u4ee5\u7528\u4e86 github \u7684\u79c1\u6709\u73af\u5883\u53d8\u91cf\uff0c\u7a0d\u540e\u518d\u8bb2\u600e\u4e48\u914d\u7f6e\u3002"),Object(b.b)("li",{parentName:"ul"},"local-dir - \u4e0a\u4f20\u54ea\u4e2a\u76ee\u5f55\u3002")),Object(b.b)("p",null,"\u9700\u8981\u6ce8\u610f\u7684\u662f\uff0c\u56e0\u4e3a\u54b1\u4eec\u4e0a\u4f20\u5230 github \u4e0a\u7684\u4ee3\u7801\u4e0d\u5305\u62ec",Object(b.b)("inlineCode",{parentName:"p"},"build"),"\u6587\u4ef6\u5939\uff0c\u6240\u4ee5\uff0c\u9700\u8981\u628a github actions \u8fd0\u884c\u4e4b\u540e\u751f\u6210\u7684 build \u6587\u4ef6\u5939\u4e0a\u4f20\u5230\u670d\u52a1\u5668\uff0c\u8fd9\u91cc\u5728\u9879\u76ee\u7684\u6839\u76ee\u5f55\u91cc\uff0c\u6dfb\u52a0\u4e00\u4e2a ",Object(b.b)("inlineCode",{parentName:"p"},".git-ftp-include")," \u6587\u4ef6\uff0c\u5199\u4e0a\uff1a"),Object(b.b)("pre",null,Object(b.b)("code",Object(i.a)({parentName:"pre"},{}),"!build/\n")),Object(b.b)("p",null,"\u610f\u601d\u5c31\u662f\u628a ",Object(b.b)("inlineCode",{parentName:"p"},"npm run build")," \u4e4b\u540e\u751f\u6210\u7684 build \u76ee\u5f55\u4e0a\u4f20\u5230\u670d\u52a1\u5668\u4e2d\u3002"),Object(b.b)("p",null,Object(b.b)("inlineCode",{parentName:"p"},"ftp-password")," \u8fd9\u79cd\u673a\u5bc6\u4fe1\u606f\u7684\u8bbe\u7f6e\u65b9\u6cd5\u662f\uff1a"),Object(b.b)("ol",null,Object(b.b)("li",{parentName:"ol"},"\u6253\u5f00\u4ed3\u5e93\u7684\u9996\u9875\uff0c\u70b9\u51fb",Object(b.b)("inlineCode",{parentName:"li"},"settings"),"\u3002"),Object(b.b)("li",{parentName:"ol"},"\u5728\u5de6\u8fb9\u7684\u83dc\u5355\u9009\u62e9",Object(b.b)("inlineCode",{parentName:"li"},"Secretes"),"\u3002"),Object(b.b)("li",{parentName:"ol"},"\u70b9\u51fb",Object(b.b)("inlineCode",{parentName:"li"},"Add a new secret"),"\u3002"),Object(b.b)("li",{parentName:"ol"},"\u5728",Object(b.b)("inlineCode",{parentName:"li"},"name"),"\u5904\u8f93\u5165\u53d8\u91cf\u7684\u540d\u5b57\u3002"),Object(b.b)("li",{parentName:"ol"},"\u5728",Object(b.b)("inlineCode",{parentName:"li"},"value"),"\u5904\u8f93\u5165\u53d8\u91cf\u7684\u503c\u3002")),Object(b.b)("p",null,"\u6700\u540e\u70b9\u51fb",Object(b.b)("inlineCode",{parentName:"p"},"Add secret"),"\u6309\u94ae\u6dfb\u52a0\u5c31\u53ef\u4ee5\u4e86\u3002"),Object(b.b)("h4",{id:"\u53d1\u5e03\u535a\u5ba2"},"\u53d1\u5e03\u535a\u5ba2"),Object(b.b)("p",null,"\u5728\u628a\u6240\u6709\u7684\u8fd9\u4e9b\u6587\u4ef6\u5f04\u597d\u4e4b\u540e\uff0c\u628a\u4ee3\u7801\u63a8\u9001\u5230 github \u4e0a\u7b49 github actions \u8fd0\u884c\u5b8c\u4e4b\u540e\uff0c\u5c31\u53ef\u4ee5\u8bbf\u95ee\u81ea\u5df1\u7684\u7f51\u7ad9\u4e86\u3002\u4ee5\u540e\u518d\u53d1\u8868\u6587\u7ae0\uff0c\u53ea\u9700\u8981\u5728\u672c\u5730\u5199\u597d\u4e4b\u540e\uff0c\u63a8\u9001\u5230 github \u4e0a\u5b8c\u4e8b\u513f\u4e86\u3002\u5230\u8fd9\u91cc\u4f60\u81ea\u5df1\u7684\u535a\u5ba2\u5c31\u642d\u5efa\u597d\u4e86\uff0c\u5411\u5168\u4e16\u754c\u5c55\u793a\u4f60\u7684\u6587\u91c7\u5427\uff01"))}p.isMDXComponent=!0},189:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return O}));var i=n(0),a=n.n(i);function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},b=Object.keys(e);for(i=0;i<b.length;i++)n=b[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var b=Object.getOwnPropertySymbols(e);for(i=0;i<b.length;i++)n=b[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=a.a.createContext({}),p=function(e){var t=a.a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=p(e.components);return a.a.createElement(o.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,b=e.originalType,r=e.parentName,o=c(e,["components","mdxType","originalType","parentName"]),u=p(n),m=i,O=u["".concat(r,".").concat(m)]||u[m]||d[m]||b;return n?a.a.createElement(O,l(l({ref:t},o),{},{components:n})):a.a.createElement(O,l({ref:t},o))}));function O(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var b=n.length,r=new Array(b);r[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:i,r[1]=l;for(var o=2;o<b;o++)r[o]=n[o];return a.a.createElement.apply(null,r)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},190:function(e,t,n){"use strict";n.d(t,"b",(function(){return b})),n.d(t,"a",(function(){return r}));var i=n(22),a=n(191);function b(){var e=Object(i.default)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,n=void 0===t?"/":t,b=e.url;return{withBaseUrl:function(e,t){return function(e,t,n,i){var b=void 0===i?{}:i,r=b.forcePrependBaseUrl,l=void 0!==r&&r,c=b.absolute,o=void 0!==c&&c;if(!n)return n;if(n.startsWith("#"))return n;if(Object(a.b)(n))return n;if(l)return t+n;var p=n.startsWith(t)?n:t+n.replace(/^\//,"");return o?e+p:p}(b,n,e,t)}}}function r(e,t){return void 0===t&&(t={}),(0,b().withBaseUrl)(e,t)}},191:function(e,t,n){"use strict";function i(e){return!0===/^(\w*:|\/\/)/.test(e)}function a(e){return void 0!==e&&!i(e)}n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return a}))}}]);