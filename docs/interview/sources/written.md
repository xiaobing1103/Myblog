---
title: "前端开发工程师笔试题 00｜PDF 原文对照"
sidebar_label: "前端开发工程师笔试题 00 · 原文"
description: 完整逐页转录，保留原题号与原答案；请配合校订解析阅读。
pagination_prev: null
pagination_next: null
---

**[阅读校订题解](../written.md)** · [回到面试题库](../index.mdx)

:::warning 原文含有错误和过时答案
这里保留 PDF 可提取的全部逐页文本，方便检索、复制和核对，原答案不代表本站结论。请优先阅读上方校订题解。
自动提取可能保留断行、逐字空格，复杂公式、代码缩进及图片以原 PDF 为准；不要直接执行未经校订的原代码。
:::

来源：本站既有文件《前端开发工程师笔试题00.pdf》，共 **6 页**。原作者与版权信息仍以原文件为准；不将这些资料宣称为开源授权教材。

[下载原 PDF](/pdf/2022-2-16-mesatsu00/前端开发工程师笔试题00.pdf) · [下载本篇 Markdown](pathname:///Myblog/downloads/interview-written.md)

原 PDF SHA-256：`be759aa32254824a628a46166999994be0d8bc6a4f198885035bb2b41e03b1d5`。

## 原 PDF 第 1 页 {#page-1}

前端开发工程师面试题   
 1   

### 1、 请描述下面选择器的含义：

div#idSel div 并且带有 id 为 idSel 的元素   
div .classSel div class 为 classSel 的元素   
div.classSel  div 并带有 class 为 classSel 的元素   
div&gt;.classSel div 的子元素 class 为 classSel 的元素   
div+.classSel 兄弟选择器 与 div 同一级并 class 为 classSel 的元素   
div~.classSel div 元素后所有带有 class 为 classSel 的元素   
input\[type="button"\] 属性选择器 intpu type=button 的元素   


### 2、 请说明 CSS 优先级的判断法则

1000     100      10           1    
！important 等级最高 &gt; 内联样式 &gt; id &gt;伪类=属性=class &gt; 标签 &gt; \*   





### 3、 下图中，说明了每个 div（display 为 block)对象的 position 值，指出下列所有元素的包含块。并描述你对 css 中绝对

定位，相对定位，固定定位等定位方法的了解。   

div1 包含了 div12 和 div1 并且 div1 包含 div111 div113  其它都脱离文档流   

div2 包含了 div21 div22(父元素设置了 relative 所以会跟着移动，也算包含) div23    
div3 都不包含自身已经脱离文档流跟随窗口移动   
div4 包含 div42    

![笔试第 3 题原始定位结构图](/img/interview/written-position.png)

## 原 PDF 第 2 页 {#page-2}

前端开发工程师面试题   
 2   
Position:absolute 是相对于父级，脱离文档流   
Position:relative 是相对于当前自己位置   
Position:fixed 是相对于浏览器窗口来定位的 脱离文档流   



### 4、 简述一下 JavaScript 中，apply、call 与 bind 的用法、区别，以及他们与 this 的关系。


Call，apply，bind 都是可以用来改变 this 指向的他们的第一个参数就是指定谁是 this，   
Call 后续参数是传参方式是通过逗号隔开的，并且立即执行函数   
apply 是数组的方式，并且立即执行函数   
bind 和 call 一样，bind 返回一个新函数   








### 5、 请回答如下 3 端代码的 this 指向什么？为什么？


````text
<input id="name" type="text" name="name" value="Laruence" onclick="alert(this.value);" /> 
<input id="name" type="text" name="name" value="Laruence" /> 
````



````text
function showValue() { 
````

     alert(this.value);   

````text
} 
document.getElementById('name').onclick = showValue; 
function showValue() { 
````

     alert(this.value);   

````text
} 
<input id="name" type="text"  name="name"  value="Laruence"  onclick="showValue()"/>  
````


全都指向绑定元素本身，因为事件是绑定在谁身上 this 就是谁   






### 6、 写出如下 javascript 的运行结果



````text
var name = 'laruence'; 
function echo() { 
````

alert(name); undefined   

## 原 PDF 第 3 页 {#page-3}

前端开发工程师面试题   
 3   


````text
var name = 'eve'; 
````

alert(name); eve   
alert(age); 报错   

````text
} 
````

echo();   





### 7、 请写出下列代码的的执行结果和原因。


````text
var z = 10; 
````



````text
function foo() { 
    console.log(z); 10 
} 
````


(function () &#123;   

````text
    var z = 20; 
````

    foo(); 10   

````text
})(); 
````


z = 30;   
foo(); 30   

(function (funArg) &#123;   

````text
    var z = 40; 
````

    funArg(); 40   

````text
})(foo); 
````





### 8、 请看如下代码，写出程序执行的结果以及原因。


````text
var FUN = function () { 
    function a() { console.log('a1'); }; 
    function b() { console.log('b1'); }; 
    function c() { console.log('c1'); }; 
    var a = function() { console.log('a2'); }; 
    var b = function() { console.log('b2'); }; 
    var c = function() { console.log('c2'); }; 
}; 
````

Object.prototype.a = function () &#123; console.log('a3'); &#125;;   
Function.prototype.b = function () &#123; console.log('b3'); &#125;   
FUN.prototype.c = function () &#123; console.log('c3'); &#125;   

````text
var fun = new FUN(); 
````


## 原 PDF 第 4 页 {#page-4}

前端开发工程师面试题   
 4   
fun.a(); a2   
fun.b(); b2   
fun.c(); c3   
FUN.a(); a1   
FUN.b(); b1   
FUN.c(); c1   





### 9、 题目：我们都知道 Fibonacci 数列如下：1,1,2,3,5,8,13,21,34,…

数学定义 Fibonacci 数列如下：    
        /  0                      n=0   
f(n)=      1                      n=1   
        \\  f(n-1)+f(n-2)          n=2   
输入 n，用最快的方法求该数列的第 n 项。   


````text
function fb(n，res1=1,res2=1) { 
if (n<=2) return res2; 
return  fb(n -1,res2,res1+res2) 
} 
````












### 10、 讲讲你对面向对象编程的理解，并简述一下前端编程中可以如何实现面向对象的类。

面向对象提高了可用性,拓展性，灵活性   
使用 es6 的 class 来对程序进行编写   




### 11、 请简述您对跨浏览器 WEB 前端开发的认识，以及方法。

跨端就是对代码进行多端的适配，一套代码运行多端   
uniapp 跨端，flutter   


## 原 PDF 第 5 页 {#page-5}

前端开发工程师面试题   
 5   




### 12、 请列出你所熟悉的 CSS 预处理器，并简述其工作原理。

Scss less   




### 13、 请列出 Javascript 前端开发方面你所知道的性能优化方式。

路由，图片等的懒加载   
减少 http 请求   
图片尽量用字体图标   
使用 cdn   
gzip 压缩   
减少修改 dom 的操作尽量少触发重排   
对文件进行压缩和分片   




智力选作题：（选作任意多个题目）   

### 14、 有两位盲人， 他们都各自买了两对黑袜和两对白袜， 八只袜了的布质、 大小完全相同， 而每对袜了都有一张商标纸连着，

商标手感一样。两位盲人不小心将四对袜了混在一起。他们每人怎样才能取回黑袜和白袜各两对呢？   

放在太阳底下晒，比较热的是黑袜子，因为黑色吸热。   





### 15、 有许多根长短不同， 粗细不均匀的绳子， 只知道每根绳子都要烧要一个小时才烧完， 如何用两根绳子燃烧的时间， 算出

45 分钟来呢？   










### 16、 你有四人装药丸的罐子，每个药丸都有 1 克，被污染的药丸是 2 克，有一个药罐被污染，用秤（不是天平秤）只称量

一次，如何判断哪个罐子的药被污染了？   



## 原 PDF 第 6 页 {#page-6}

前端开发工程师面试题   
 6   








### 17、 请把一盒蛋糕切成 8 份，分给 8 个人，但蛋糕盒里还必须留有一份。

 把蛋糕切成 8 份，先分 7 份给 7 个人，剩下一份把蛋糕和盒子一起分给第 8 个人。   
