---
id: 01-Interview
title: js基础面试题1
# hide_title: false
# hide_table_of_contents: false
# sidebar_label: Markdown :)
# custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: 欢迎访问二姨的博客！这个页面是由本人整理的一些前端面试题,能够给大家在面试的时候带来一些帮助。
keywords:
  - JavaScript
  - frontend
  - 视频教程
  - 前端
# image: https://i.imgur.com/mErPwqL.png
---



## 1.谈一谈你理解的盒子模型？

分为w3c标准盒子模型,和IE盒子模型(怪异盒模型)

标准盒子模型由margin,border,padding,content(content部分不包含其他的部分)

IE盒子模型由margin,border,padding,content,和标准W3C盒子不同的是:IE盒子模型的content部分包含了border和padding

备注：盒子默认为标准盒模型。

**扩展:JS如何设置、获取盒模型对应的宽和高** 

```js
//方式一：通过DOM节点的 style 样式获取
element.style.width/height;
//缺点：通过这种方式，只能获取行内样式，不能获取内嵌的样式和外链的样式。
//这种方式有局限性，但应该了解。
//方式二（通用型）
window.getComputedStyle(element).width/height;
//方式二能兼容 Chrome、火狐。是通用型方式。
//方式三（IE独有的）
element.currentStyle.width/height;
//和方式二相同，但这种方式只有IE独有。获取到的即时运行完之后的宽高（三种css样式都可以获取）。
//方式四
element.getBoundingClientRect().width/height;
//此 api 的作用是：获取一个元素的绝对位置。绝对位置是视窗 viewport 左上角的绝对位置。此 api 可以拿到四个属性：left、top、width、height。
```

总结:上面的四种方式，要求能说出来区别，以及哪个的通用型更强。

#### **margin塌陷/margin重叠**bfc问题

**标准文档流中，竖直方向的margin不叠加，只取较大的值作为margin**(水平方向的`margin`是可以叠加的，即水平方向没有塌陷现象)。

```makefile
PS：如果不在标准流，比如盒子都浮动了，那么两个盒子之间是没有margin重叠的现象的。
```

例图:

<img src="https://s3.ax1x.com/2020/11/26/D0gQjH.png" alt="D0gQjH.png" border="0" />

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>

        * {
            margin: 0;
            padding: 0;
        }

        .father {
            background: green;

        }

        /* 给儿子设置margin-top为10像素 */
        .son {
            height: 100px;
            margin-top: 10px;
            background: red;
        }

    </style>
</head>
<body>
<div class="father">
    <div class="son"></div>
</div>
</body>
</html>
```

子div：

<img src="https://s3.ax1x.com/2020/11/26/D0Rn6e.png" alt="D0Rn6e.png" border="0" />

父div：

<img src="https://s3.ax1x.com/2020/11/26/D0RQ0A.png" alt="D0RQ0A.png" border="0" />

如果我们再上面的代码中给父div设置一个属性:overflow:hidden,

<img src="https://s3.ax1x.com/2020/11/26/D0Rh7R.png" alt="D0Rh7R.png" border="0" />

此时父亲的高度是110px，这个用到的就是BFC。

## 2.如何让一个不定宽高的div元素在父元素中水平垂直居中，请写出完整代码？

**一.定宽高元素在屏幕窗口水平垂直都居中，方法如下**:

```less
elementName{
	position:fixed;
    left:50%;
    top:50%;
    /*负值+宽的一半+单位*/
    margin-left: -width/2+px;
    /*负值+高的一半+单位*/
    margin-top: -height/2+px;
}
```

**二、不定宽高元素在屏幕窗口水平垂直都居中，方法如下：**

```less
elementName{
	position:fixed;
    left:0;
    top:0;
    right:0;
	bottom:0;
    margin:0 auto;
}
```

**三、不定宽高元素在父元素中水平垂直都居中，方法如下：**

  **方案一：**

```less
fatherElement{
    position:relative;
}
childElement{
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin:auto;
}
```

  **方案二：**

```less
fatherElement{
	display: table-cell;
	text-align: center;
	vertical-align: middle;
}
/*注:display:table-cell;是将元素转化为表格单元格形式*/
```

**四、定宽高元素在父元素中水平垂直都居中，方法如下：**

```less
fatherElement{
	position: relative;
}
childElement{
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -width/2+px;
	margin-top: -height/2+px;
```




## 3.请写出flex布局的一些属性（容器和项目分别3个）？

**1.Flex布局父容器属性**

flex-direction / flex-wrap / flex-flow / justify-content / align-items / align-content

1)水平（主轴上）对齐方式:

<img src="https://s3.ax1x.com/2020/12/03/DoHugH.png" alt="DoHugH.png" border="0" />

justify-content：flex-start | flex-end | center | space-between | space-around;

flex-start（默认值）：左对齐

flex-end：右对齐

center： 居中

space-between：两端对齐，子元素间隔相等。

space-around：子元素两侧的间隔相等。



2)十字交叉轴上对齐方式

<img src="https://s3.ax1x.com/2020/12/03/DoHvqI.png" alt="DoHvqI.png" border="0" />

align-items：flex-start | flex-end | center | baseline | stretch;

flex-start：上对齐。

flex-end：下对齐。

center：交叉轴对齐。

baseline: 第一行文字的基线对齐。

stretch（默认值）：如果子元素未设置高度或设为auto，将占满整个容器。

3)元素排列方向

<img src="https://s3.ax1x.com/2020/12/03/DoqmXd.png" alt="DoqmXd.png" border="0" />

flex-direction：row | row-reverse | column | column-reverse

row（默认值）：从左1/2/3/...。

row-reverse：从左../3/2/1。

column：从上1/2/3/...。

column-reverse：从上../3/2/1。

4)换行方式

<img src="https://s3.ax1x.com/2020/12/03/DoqBNV.png" alt="DoqBNV.png" border="0" />

flex-wrap：nowrap（不换行） | wrap（向下换） | wrap-reverse（向上换）;

5)flex-flow

flex-direction和flex-wrap的简写

`flex-flow：row nowrap`

6)多根轴线的对齐方式

<img src="https://s3.ax1x.com/2020/12/04/DH8nr6.png" alt="DH8nr6.png" border="0" />

align-content：flex-start | flex-end | center | space-between | space-around | stretch;

flex-start：上对齐。

flex-end：下对齐。

center：居中对齐。

space-between：两端对齐，间隔平均。

space-around：间隔相等。

stretch（默认值）：占满。

**2.Flex布局子元素属性**

order/flex-grow/flex-shrink/flex-basis/flex/align-self

1)order属性（num）

order定义自身排列顺序。数值越小，越靠前，默认为0。-1/0/1/2/3/...

2)flex-grow属性（num）

flex-grow 定义自身放大比例，默认为0不放大。例如：1/2/1=25%:50%:25%

3)flex-shrink属性（num）

flex-shrink定义了空间不足时自身缩小比例，默认为1自动缩小，0不缩小。

4)flex-basis属性

flex-basis定义最小空间，默认值为auto，即自身的本来大小。

5)flex属性

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

6)align-self属性

align-self定义自身对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

**3.Flex兼容性 **

`Webkit`内核的浏览器，必须加上`-webkit`前缀。

*/\* Safari \*/*

```css
.box{

  display: -webkit-flex; 

  display: flex;

}
```





## 4.请写出css3新增的一些属性（最少5个）？

**1.CSS3边框：**

- border-radius：CSS3圆角边框。在 CSS2 中添加圆角矩形需要技巧，我们必须为每个圆角使用不同的图片，在 CSS3 中，创建圆角是非常容易的，在 CSS3 中，border-radius 属性用于创建圆角。`border：2px solid;`

- box-shadow：CSS3边框阴影。在 CSS3 中，box-shadow 用于向方框添加阴影。

  `box-shadow:10px 10px 5px #888888;`

- border-image：CSS3边框图片。通过 CSS3 的 border-image 属性，您可以使用图片来创建边框。`border-image：url(border.png) 30 30 round;`

**2.CSS3背景：**

- background-size： 属性规定背景图片的尺寸。在 CSS3 之前，背景图片的尺寸是由图片的实际尺寸决定的。在 CSS3 中，可以规定背景图片的尺寸，这就允许我们在不同的环境中重复使用背景图片。您能够以像素或百分比规定尺寸。如果以百分比规定尺寸，那么尺寸相对于父元素的宽度和高度。
- background-origin ：属性规定背景图片的定位区域。背景图片可以放置于 content-box、padding-box 或 border-box 区域

**3.CSS3文字效果：**

- text-shadow：在 CSS3 中，text-shadow 可向文本应用阴影。

  `text-shadow:5px 5px 5px #FFFFFF;`

- word-wrap :单词太长的话就可能无法超出某个区域，允许对长单词进行拆分，并换行到下一行：`p{word-wrap:break-word;}`

**4.CSS3 2D转换：**

- transform：通过 CSS3 转换，我们能够对元素进行移动、缩放、转动、拉长或拉伸。

- translate()：元素从其当前位置移动，根据给定的 left（x 坐标） 和 top（y 坐标） 

  位置参数：`transform：translate（50px,100px）;`值 translate(50px,100px) 把元素从左侧移动 50 像素，从顶端移动 100 像素。

- rotate()：元素顺时针旋转给定的角度。允许负值，元素将逆时针旋转。

  `transform:rotate(30deg);`值 rotate(30deg) 把元素顺时针旋转 30 度。

- scale():元素的尺寸会增加或减少，根据给定的宽度（X 轴）和高度（Y 轴）

  参数：`transform:scale(2,4);`值 scale(2,4) 把宽度转换为原始尺寸的 2 倍，把高度转换为原始高度的 4 倍。

- skew():元素转动给定的角度，根据给定的水平线（X 轴）和垂直线（Y 轴）

  参数：`transform:skew(30deg,20deg);`值 skew(30deg,20deg) 围绕 X 轴把元素转动 30 度，围绕 Y 轴转动 20 度。

- matrix() :

  matrix() 方法把所有 2D 转换方法组合在一起。

  matrix() 方法需要六个参数，包含数学函数，允许您：旋转、缩放、移动以及倾斜元素。

**5.CSS3 3D转换：**

- rotateX()：元素围绕其 X 轴以给定的度数进行旋转。

  `transform：rotateX(120deg);`

- rotateY()：元素围绕其 Y 轴以给定的度数进行旋转。

  `transform：rotateY(120deg);`

**6.CSS3 过渡：**

- 当元素从一种样式变换为另一种样式时为元素添加效果。

**7.CSS3动画：**

- 通过 CSS3，我们能够创建动画，这可以在许多网页中取代动画图片、Flash 动画以及 JavaScript。

**8.CSS3多列：**

- column-count：属性规定元素应该被分隔的列数。
- column-gap：属性规定列之间的间隔。
- column-rule ：属性设置列之间的宽度、样式和颜色规则。

　**9.CSS3用户界面：**

- resize：属性规定是否可由用户调整元素尺寸。
- box-sizing：属性允许您以确切的方式定义适应某个区域的具体内容。
- outline-offset ：属性对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓。

## 5.说一说JavaScript中数据类型分为几种？分别有哪些？

**值类型（基本类型）：**
字符串（String）、数字（Number）、布尔（Boolean）、
对空（Null）、未定义（Undefined）、Symbol

**引用数据类型：**
对象（Object）、数组（Array）、函数（Function）

**字符串：**
字符串可以是任何文本内容，凡是用单引号或双引号括住的都是字符串
（在字符串里也能使用引号，只需用\不匹配字符串的引号即可）

## 6.阅读以下代码，说出结果？
```js
var age = 35;
var obj ={
    name:'xxx',
    age:'18',
    say:function(){
      console.log(this.age);  
    },
};
obj.say();
var res1 = obj.say;
res1();
```
- 这里的第一个调用因为是obj调用的say方法所以会去自身的作用域上面去查找所以值为`18`
- 这里的第一个调用因为obj.say是将地址值赋值给了res1所以造成了隐式丢失所以这里的this指向了全局所以打印的值为`35`

## 7.阅读以下代码,说出结果?

```js
function foo(){
    var a = 1;
    function bar(){
        a++;
        console.log(a);
    }
    return bar;
}

var newBar = foo();
newBar();
newBar();
newBar();
```
- 这题主要考查的是闭包的原理,由于foo函数在调用的时候将a存在函数之中,所以当内部的函数引用了外部函数的变量,产生了闭包,所以会将a保存在内存当中对a进行打印
- 所以这里的打印结果依次为`2`,`3`,`4`

## 8.阅读以下代码,说下结果?

```js
var a = 1;
var b = a;
a = 2;
console.log(b);
var c ={name:"小红",age:18};
var d = c;
d.name="小黄";
console.log(c.name);
```
- 本题考查的是基本作用域的运用,当a赋值给b时，因为a是基本值类型所以a直接将1赋值给了b,
  第一个打印结果`1`
- 这里的c是一个对象类型,将c赋值给d时直接时将地址值赋值给了d,此时d和c为用一个地址值所以打印值为`小黄`

## 9.阅读代码,写出结果

```js
var b = 3;
var a = b === '3' ? 4 : 1 == '1'? 5:6;
console.log(a)
```

- 这题主要是考查了三元表达式的运用,首先判断b是否全等于字符串类型的`'3'`很明显这里为false,而后进入第二个判断1是否等于字符串的`'1'`,由于这里是两个等于号,所以这里为true,故返回值为`5`

## 10.阅读以下代码,说出结果?

```js
var a = 1;
var b = 2;
var res = ++a + ++b + 1 + a++ ;
console.log(res)
```

- 这题主要考查了自增自减运算符的运算,首先要先弄清楚自增自减的先后顺序,如果`++`是在前面的应为先增加后进行计算.
- 所以这里的值应该为`2+3+1+2`等于`8`

## 11.阅读以下代码,说出结果?

```js
var a = {
	size : 'small',
};
var b = {
	name:'小红',
	small:true,
};
console.log(b[a.size]);
console.log(b[a['size']]);
console.log(b.a.size);
```

- 本题主要考查了js中对中括号的使用其实本质上[]和.调用没什么区别,但是中括号里面必须是字符串类型不是的话都会强制转换成字符串类型来进行访问
- 第一个打印结果是查找b对象里面是否有a.size也就是字符串`small`,然后成员访问`b.small`所以打印值为`true`
- 第二个打印结果与第一个打印结果相同,将字符串a.size来进行匹配small同理找到的还是true
- 第三个打印结果是成员访问,去访问b里面的a.size属性,所以结果值应为`报错`

## 12.css选择器有哪些?优先级?

CSS选择器分类：

用法如下：

| 选择器     | 类型   | 用法     | 说明                          |
| ---------- | ------ | -------- | ----------------------------- |
| id选择器   | #id    | #header  | 选择id="header"的所有元素     |
| 类选择器   | .class | .message | 选择class="message"的所有元素 |
| 标签选择器 | el     | div      | 选择所有的div元素             |

其中他们又可以以不同的方式进行组合，如下：

| 选择器         | 类型                                    | 用法                | 说明                                                         |
| -------------- | --------------------------------------- | ------------------- | ------------------------------------------------------------ |
| 后代选择器     | el el                                   | div p               | 选择div元素内部的所有p元素                                   |
| 子代选择器     | el>el                                   | div>p               | 选择div元素的第一子代的所有p元素                             |
| 相邻兄弟选择器 | el+el                                   | .msg+p              | 选择与class为"msg"的元素同级且紧跟其后的第一个p元素          |
| 通用兄弟选择器 | el~el                                   | .msg~p              | 选择class为"msg"的元素后面的所有p元素                        |
| 群组选择器     | el,el                                   | p, span, .blue,#box | 选择所有的p元素、span元素、class为"blue"的元素以及id为"box"的元素 |
| 伪类选择器     | :link,:visited, :hover, :active, :focus | a:hover             | 选择鼠标指针位于a标签之上的链接                              |
| 伪元素选择器   | :before, :after                         | p:before            | 在每个p元素内容之前插入内容                                  |
| 属性选择器     | [attribute]                             | [target]            | 选择带有target属性的所有元素                                 |
| 通用选择器     | *                                       | *                   | 选择所有的元素                                               |

优先级：!important > 内联样式 > id选择器 > 类、伪类、属性选择器 > 标签、伪元素选择器

权 重： !important：10000

内联： 1000

id选择器：100

类、伪类、属性选择器：10

标签、伪元素选择器：1

通用选择器（*）、子选择器（>）、相邻兄弟选择器（+）、通用兄弟选择器（~）权重值为0

## 13.请画图说明你对原型链的了解?

基础原型链

<img src="https://s3.ax1x.com/2020/11/26/DBnKJg.png" alt="DBnKJg.png" border="0" />

对象显示原型

![image-20201126203739030](C:\Users\47242\AppData\Roaming\Typora\typora-user-images\image-20201126203739030.png)

对象的隐式原型

<img src="https://s3.ax1x.com/2020/11/26/DBnLtS.png" alt="DBnLtS.png" border="0" />

## 14.JavaScript的typeof返回哪些数据类型?

```js
   undefined

　　String

　　boolean

　　number

　　symbol(ES6)

　　Object

　　Function
  
   *null也是object
```



## 15.call和apply的作用以及区别?

call与apply都属于Function.prototype(即原型对象身上的方法)的一个方法，所以每个function实例都有call、apply属性

call()和apply() 是静态方法，是构造函数的方法，

**作用**

`call（）`方法和`apply（）`方法的作用相同：改变this指向。

**区别**

`call（）`：第一个参数是this值没有变化，变化的是其余参数都直接传递给函数。在使用`call（）`方法时，传递给函数的参数必须逐个列举出来。

`apply（）`：传递给函数的是参数数组

```js
 function add(c, d){ 
     return this.a + this.b + c + d; 
 } 
 var o = {a:1, b:3}; 
 add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16 
 add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34 
```



## 16.封装一个函数,实现数组中每项值累加,返回累加后的结果?

例:var arr = [1,2,3];//结果6

普通for循环

```js
function add(arr){
    		var sum = 0;
    		for(var i = 0; i<arr.length; i++){
    		sum+=arr[i]
    		}
    		return sum
    	}
var arr = [1,2,3]
console.log(add(arr))
```

普通foreach循环

```js
function add(arr){
			var sum = 0
			arr.forEach(function(value,index,arr){
				sum+=value
			});
			return sum
		}
console.log(add(arr))
```

使用递归进行叠加

```js
function add(arr) {
		  var len = arr.length;
		  if(len == 0){
		    return 0;
		  } else if (len == 1){
		    return arr[0];
		  } else {
		    return arr[0] + add(arr.slice(1));
		  }
		}	
console.log(add(arr))
```

使用reduce进行叠加

```js
var arr = [1,2,3]
		function add(arr) {
	  	return arr.reduce(function(prev, curr, idx, arr){	
	    return prev + curr;
	  },0);
	}
		console.log(add(arr))
```

使用eval函数进行叠加

```js
function add(arr) {
  		return eval(arr.join("+"));
	};
console.log(add(arr))
```




## 17.封装一个函数,实现数组从小到大排序?

例:var arr = [3,2,5]; //结果[2,3,5]

**算法概述**

十种常见排序算法可以分为两大类：

- **比较类排序**：通过比较来决定元素间的相对次序，由于其时间复杂度不能突破O(nlogn)，因此也称为非线性时间比较类排序。
- **非比较类排序**：不通过比较来决定元素间的相对次序，它可以突破基于比较排序的时间下界，以线性时间运行，因此也称为线性时间非比较类排序。 

<img src="https://s3.ax1x.com/2020/11/26/DBrA6s.png" alt="DBrA6s.png" border="0" />

**算法复杂度**

<img src="https://s3.ax1x.com/2020/11/26/DBrm7V.png" alt="DBrm7V.png" border="0" />

**相关概念**

- **稳定**：如果a原本在b前面，而a=b，排序之后a仍然在b的前面。
- **不稳定**：如果a原本在b的前面，而a=b，排序之后 a 可能会出现在 b 的后面。
- **时间复杂度**：对排序数据的总的操作次数。反映当n变化时，操作次数呈现什么规律。
- **空间复杂度：**是指算法在计算机内执行时所需存储空间的度量，它也是数据规模n的函数

**1、冒泡排序（Bubble Sort）**

冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端

**算法描述**

- 比较相邻的元素。如果第一个比第二个大，就交换它们两个；

- 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；

- 针对所有的元素重复以上的步骤，除了最后一个；

- 重复步骤1~3，直到排序完成。

  <img src="https://s3.ax1x.com/2020/11/26/DBy7kV.gif" alt="DBy7kV.gif" border="0" />

```js
function bubbleSort(arr){
		var len = arr.length;
		for(var i=0;i<=len-1;i++){
			for(var j=0; j<=len-1-i;j++){
				if(arr[j]>arr[j+1]){
					var temp = arr[j+1];
					arr[j+1] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}
	console.log(bubbleSort(arr))
```

**2.选择排序**

选择排序(Selection-sort)是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。 

**算法描述**

n个记录的直接选择排序可经过n-1趟直接选择排序得到有序结果。具体算法描述如下：

- 初始状态：无序区为R[1..n]，有序区为空；
- 第i趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
- n-1趟结束，数组有序化了。

<img src="https://s3.ax1x.com/2020/11/27/DBfZng.gif" alt="DBfZng.gif" border="0" />

```js
function selectionSort(arr) {
	    var len = arr.length;
	    var minIndex, temp;
	    for(var i = 0; i <= len ; i++) {
	        minIndex = i;
	        for(var j = i + 1; j < len; j++) {
	            if(arr[j] < arr[minIndex]) {     // 寻找最小的数
	                minIndex = j;                // 将最小数的索引保存
	            }
	        }
	        temp = arr[i];
	        arr[i] = arr[minIndex];
	        arr[minIndex] = temp;
	    }
	    return arr;
	} 
	console.log(selectionSort(arr))
```

**算法分析**

表现最稳定的排序算法之一，因为无论什么数据进去都是O(n2)的时间复杂度，所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间了吧。理论上讲，选择排序可能也是平时排序一般人想到的最多的排序方法了吧。

**3、插入排序（Insertion Sort）**

插入排序（Insertion-Sort）的算法描述是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

**算法描述**

一般来说，插入排序都采用in-place在数组上实现。具体算法描述如下：

- 从第一个元素开始，该元素可以认为已经被排序；
- 取出下一个元素，在已经排序的元素序列中从后向前扫描；
- 如果该元素（已排序）大于新元素，将该元素移到下一位置；
- 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
- 将新元素插入到该位置后；
- 重复步骤2~5。

<img src="https://s3.ax1x.com/2020/12/22/rBxHrq.gif" alt="rBxHrq.gif" border="0" />

**代码实现**

```js
function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
}
```

**算法分析**

插入排序在实现上，通常采用in-place排序（即只需用到O(1)的额外空间的排序），因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。

**4、希尔排序（Shell Sort）**

1959年Shell发明，第一个突破O(n2)的排序算法，是简单插入排序的改进版。它与插入排序的不同之处在于，它会优先比较距离较远的元素。希尔排序又叫**缩小增量排序**。

**算法描述**

先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，具体算法描述：

- 选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；
- 按增量序列个数k，对序列进行k 趟排序；
- 每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

<img src="https://s3.ax1x.com/2020/12/22/rBxOaT.gif" alt="rBxOaT.gif" border="0" />

**代码实现**

```js
function shellSort(arr) {
    var len = arr.length;
    for (var gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // 注意：这里和动图演示的不一样，动图是分组执行，实际操作是多个分组交替执行
        for (var i = gap; i < len; i++) {
            var j = i;
            var current = arr[i];
            while (j - gap >= 0 && current < arr[j - gap]) {
                 arr[j] = arr[j - gap];
                 j = j - gap; 
            }
            arr[j] = current;
        }
    }
    return arr;
}
```

**算法分析**

希尔排序的核心在于间隔序列的设定。既可以提前设定好间隔序列，也可以动态的定义间隔序列。动态定义间隔序列的算法是《算法（第4版）》的合著者Robert Sedgewick提出的。

**5、归并排序（Merge Sort）**　

归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。 

**算法描述**

- 把长度为n的输入序列分成两个长度为n/2的子序列；
- 对这两个子序列分别采用归并排序；
- 将两个排序好的子序列合并成一个最终的排序序列。

<img src="https://s3.ax1x.com/2020/12/22/rBzPqx.gif" alt="rBzPqx.gif" border="0" />

**代码实现**

```js
function mergeSort(arr) {
    var len = arr.length;
    if (len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
 
function merge(left, right) {
    var result = [];
 
    while (left.length>0 && right.length>0) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
 
    while (left.length)
        result.push(left.shift());
 
    while (right.length)
        result.push(right.shift());
 
    return result;
}
```

**算法分析**

归并排序是一种稳定的排序方法。和选择排序一样，归并排序的性能不受输入数据的影响，但表现比选择排序好的多，因为始终都是O(nlogn）的时间复杂度。代价是需要额外的内存空间。

**6、快速排序（Quick Sort）**

快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。

**算法描述**

快速排序使用分治法来把一个串（list）分为两个子串（sub-lists）。具体算法描述如下：

- 从数列中挑出一个元素，称为 “基准”（pivot）；
- 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
- 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

<img src="https://s3.ax1x.com/2020/12/22/rBzAIO.gif" alt="rBzAIO.gif" border="0" />

**代码实现**

```js
function quickSort(arr, left, right) {
    var len = arr.length,
        partitionIndex,
        left = typeof left != 'number' ? 0 : left,
        right = typeof right != 'number' ? len - 1 : right;
 
    if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex-1);
        quickSort(arr, partitionIndex+1, right);
    }
    return arr;
}
 
function partition(arr, left ,right) {     // 分区操作
    var pivot = left,                      // 设定基准值（pivot）
        index = pivot + 1;
    for (var i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index);
            index++;
        }        
    }
    swap(arr, pivot, index - 1);
    return index-1;
}
 
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
```

**7、堆排序（Heap Sort）**

堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。

**算法描述**

- 将初始待排序关键字序列(R1,R2….Rn)构建成大顶堆，此堆为初始的无序区；
- 将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,……Rn-1)和新的有序区(Rn),且满足R[1,2…n-1]<=R[n]；
- 由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,……Rn-1)调整为新堆，然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2….Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。

<img src="https://s3.ax1x.com/2020/12/22/rBzleP.gif" alt="rBzleP.gif" border="0" />

**代码实现**

```js
var len;    // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
 
function buildMaxHeap(arr) {   // 建立大顶堆
    len = arr.length;
    for (var i = Math.floor(len/2); i >= 0; i--) {
        heapify(arr, i);
    }
}
 
function heapify(arr, i) {     // 堆调整
    var left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;
 
    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }
 
    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }
 
    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, largest);
    }
}
 
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
 
function heapSort(arr) {
    buildMaxHeap(arr);
 
    for (var i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i);
        len--;
        heapify(arr, 0);
    }
    return arr;
}
```

**8、计数排序（Counting Sort）**

计数排序不是基于比较的排序算法，其核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。 作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。

**算法描述**

- 找出待排序的数组中最大和最小的元素；
- 统计数组中每个值为i的元素出现的次数，存入数组C的第i项；
- 对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）；
- 反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1。

<img src="https://s3.ax1x.com/2020/12/22/rBzhex.gif" alt="rBzhex.gif" border="0" />

**代码实现**

```js
function countingSort(arr, maxValue) {
    var bucket = new Array(maxValue + 1),
        sortedIndex = 0;
        arrLen = arr.length,
        bucketLen = maxValue + 1;
 
    for (var i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }
 
    for (var j = 0; j < bucketLen; j++) {
        while(bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
    }
 
    return arr;
}
```

**算法分析**

计数排序是一个稳定的排序算法。当输入的元素是 n 个 0到 k 之间的整数时，时间复杂度是O(n+k)，空间复杂度也是O(n+k)，其排序速度快于任何比较排序算法。当k不是很大并且序列比较集中时，计数排序是一个很有效的排序算法。

**9、桶排序（Bucket Sort）**

桶排序是计数排序的升级版。它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。桶排序 (Bucket sort)的工作的原理：假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排）。

**算法描述**

- 设置一个定量的数组当作空桶；
- 遍历输入数据，并且把数据一个一个放到对应的桶里去；
- 对每个不是空的桶进行排序；
- 从不是空的桶里把排好序的数据拼接起来。

**图片演示**

<img src="https://s3.ax1x.com/2020/12/22/rBzjmt.png" alt="rBzjmt.png" border="0" />

**代码实现**

```js
function bucketSort(arr, bucketSize) {
    if (arr.length === 0) {
      return arr;
    }
 
    var i;
    var minValue = arr[0];
    var maxValue = arr[0];
    for (i = 1; i < arr.length; i++) {
      if (arr[i] < minValue) {
          minValue = arr[i];                // 输入数据的最小值
      } else if (arr[i] > maxValue) {
          maxValue = arr[i];                // 输入数据的最大值
      }
    }
 
    // 桶的初始化
    var DEFAULT_BUCKET_SIZE = 5;            // 设置桶的默认数量为5
    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
    var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;   
    var buckets = new Array(bucketCount);
    for (i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }
 
    // 利用映射函数将数据分配到各个桶中
    for (i = 0; i < arr.length; i++) {
        buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
    }
 
    arr.length = 0;
    for (i = 0; i < buckets.length; i++) {
        insertionSort(buckets[i]);                      // 对每个桶进行排序，这里使用了插入排序
        for (var j = 0; j < buckets[i].length; j++) {
            arr.push(buckets[i][j]);                      
        }
    }
 
    return arr;
}
```

**算法分析**

桶排序最好情况下使用线性时间O(n)，桶排序的时间复杂度，取决与对各个桶之间数据进行排序的时间复杂度，因为其它部分的时间复杂度都为O(n)。很显然，桶划分的越小，各个桶之间的数据越少，排序所用的时间也会越少。但相应的空间消耗就会增大。 

**10、基数排序（Radix Sort）**

基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。

**算法描述**

- 取得数组中的最大数，并取得位数；
- arr为原始数组，从最低位开始取每个位组成radix数组；
- 对radix进行计数排序（利用计数排序适用于小范围数的特点）；

<img src="https://s3.ax1x.com/2020/12/22/rDSHEV.gif" alt="rDSHEV.gif" border="0" />

#### 代码实现

```js
var counter = [];
function radixSort(arr, maxDigit) {
    var mod = 10;
    var dev = 1;
    for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for(var j = 0; j < arr.length; j++) {
            var bucket = parseInt((arr[j] % mod) / dev);
            if(counter[bucket]==null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        var pos = 0;
        for(var j = 0; j < counter.length; j++) {
            var value = null;
            if(counter[j]!=null) {
                while ((value = counter[j].shift()) != null) {
                      arr[pos++] = value;
                }
          }
        }
    }
    return arr;
}
```

**算法分析**

基数排序基于分别排序，分别收集，所以是稳定的。但基数排序的性能比桶排序要略差，每一次关键字的桶分配都需要O(n)的时间复杂度，而且分配之后得到新的关键字序列又需要O(n)的时间复杂度。假如待排数据可以分为d个关键字，则基数排序的时间复杂度将是O(d*2n) ，当然d要远远小于n，因此基本上还是线性级别的。

基数排序的空间复杂度为O(n+k)，其中k为桶的数量。一般来说n>>k，因此额外空间需要大概n个左右。

## 18.封装一个函数,实现数组的降维?

例:var arr = [[1,2,3,[4]],[5],6];//结果[1,2,3,4,5,6]

在业务场景或者刷 LeetCode 的时候，曾经碰到多次碰到一个问题：

- 如何将二维甚至多维的数组转换成一维数组？

``reduce()` 二维降一维`

```js
const oldArr = [1, 2, [3, 4]];

const newArr = oldArr.reduce((prev, curr) => (prev.concat(curr)), []);

console.log(newArr);
// [1, 2, 3, 4]
```

``concat()` 二维降一维`

```js
const oldArr = [1, 2, [3, 4]];

const newArr = [].concat(...oldArr);
const newnewArr = Array.prototype.concat.apply([], oldArr);

console.log(newArr);
// [1, 2, 3, 4]
console.log(newnewArr);
// [1, 2, 3, 4]
```

``flat()` 二维降一维`

```js
const oldArr = [1, 2, [3, 4]];

const newArr = oldArr.flat();

console.log(newArr);
// [1, 2, 3, 4]
```

**四.递归降维**

既然二维降一维的小伙伴们看过之后，我们就可以进一步了解多维降一维数组了。

我们先了解下通过递归降维。

关于递归降维，这里有两个方法：

- `forEach` 递归
- `reduce` 递归

下面一一分析：

`forEach 递归降维`

```js
const oldArr = [
  1,
  [
    2, [3],
    [4, 5, 6],
    [7, 8, 9],
    10,
    11,
  ],
  12,
  13,
  14,
  [15, 16, 17],
];

const newArr = [];

const ergodic = (arr) => {
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      ergodic(item);
    } else {
      newArr.push(item);
    }
  })
}

ergodic(oldArr, newArr);

console.log(newArr);
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ]
```

**五.flat() 降维**

`flat()` 是 ES6 提供的一个将嵌套的数组 “拉平” 的方法。

`flat 降维`

```js
const oldArr = [
  1,
  [
    2, [3],
    [4, 5, 6],
    [7, 8, 9],
    10,
    11
  ],
  12,
  13,
  14,
  [15, 16, 17],
];

const newArr = oldArr.flat(Infinity);

console.log(newArr);
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ]
```

关于 `flat()`，更多的可以查阅 **MDN**

这里大致讲下这个方法：

- **入参**：
- `arr.flat(depth)`。
- 这个 `depth` 即拉平几层的意思，就好比：

```js
// 二维数组：默认拉平一层
[1, 2, [3, 4, [5]]].flat();
// [1, 2, 3, 4, [5]]

// 四维数组：设置拉平两层
[1, 2, [3, 4, [5, [6, 7]]]].flat(2);
// [1, 2, 3, 4, 5, [6, 7]]

// 设置拉平所有层
[1, 2, [3, 4, [5]]].flat(Infinity);
// [1, 2, 3, 4, 5]
```

- **注意事项**：

值得注意的是：使用 `flat()` 拉平数组过程中，会移除数组的空项：

- **扩展了解**：

在你运用 `flat()` 自如的时候，不妨了解下它的同辈 `flatMap()`？

`flatMap()` 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。

这里不一一介绍，感兴趣的可以了解下。

> flatMap() 使用

```js
const arr = [1, 2, 3, 4];

arr.flatMap(x => x * 2);
// [2, 4, 6, 8]

arr.flatMap(x => [[x * 2]])
// [[2], [4], [6], [8]]
```

六 参考文献

致敬在前端路上不断探索的大佬们，本篇文章参考自：

[《JavaScript 学习笔记 - 多维数组变为一维数组》 - MADAO是不会开花的](https://juejin.im/post/6844903809659961357)

[《es6--javascript数组降维，从es5分析到es6，（详解reduce方法）欢迎补充》 - 程序喵timy](https://blog.csdn.net/liuchao1987330/article/details/78903151)

[《数组实例的-flat，flatMap》 - 阮一峰](http://es6.ruanyifeng.com/?search=一维&x=0&y=0#docs/array#数组实例的-flat，flatMap)

[《Array.prototype.flat() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

## 19.封装一个函数,实现数组的去重?

例:var arr =[1,2,3,1,2,3,5,3]; //结果[1,2,3,5]

**JavaScript数组-去重**

**Set (ES6)**

let newArr = [...new Set(arr)]

**数组filter**

```js
const arr = [1, 2, 1, 2, 3, 4, 'l', 2, 1, 3, 'l'];
const newArr = arr.filter(function(ele, index, array) {
	return index === array.indexOf(ele)
});
console.log(newArr); // [ 1, 2, 3, 4, 'l' ]
```

**数组indexOf**

```js
var arr = [1, 2, 1, 2, 3, 4, 'l', 2, 1, 3, 'l'];
Array.prototype.unique2 = function() {

    var newArr = [];

    var len = this.length;

    for(var i = 0; i < len; i++) {

        var cur = this[i];

        if(newArr.indexOf(cur) === -1) {

            newArr[newArr.length] = cur;

        }

    }

    return newArr;

}
console.log(arr.unique2());  // (5) [1, 2, 3, 4, "l"]
```

**利用普通对象object去重（对象中key名不能有重复的）**

```js
Array.prototype.unique3 = function() {

    var newArr = this.slice(0);

    var len = this.length;

    var obj = {};

    for(var i = 0; i < len; i++) {

      var cur = newArr[i];

      if(obj[cur]) {

        newArr[i] = newArr[newArr.length - 1];

        newArr.length--;

        i--;

        continue;

      }

      obj[cur] = cur;

    }

  return newArr;

}

console.log(arr.unique3());  // (5) [1, 2, "l", 3, 4]

var arr = [1, 2, 1, 2, 3, 4, 'l', 2, 1, 3, 'l'];
```

// 利用对象另种处理方式

```js
Array.prototype.unique4 = function() {

    var json = {}

    var newArr = []

    var len = this.length

    for(var i = 0; i < len; i++) {

      var cur = this[i];

      if (typeof json[cur] === 'undefined') {

        json[cur] = true;

        newArr.push(cur)

      }

    }

  return newArr;

}
var arr = [1, 2, 1, 2, 3, 4, 'l', 2, 1, 3, 'l'];
console.log(arr.unique4());  // (5) [1, 2, 3, 4, "l"]
```

**双循环去重**

```js
Array.prototype.distinct1 = function () {
      var arr = this
      
      for (var i = 0; i < arr.length - 1; i++) {
        var cur = arr[i]
        for (var j = i + 1; j < arr.length;) {
          cur === arr[j] ? arr.splice(j, 1) : j++
        }
      }
      return arr;
    }

    var arr = [1, 2, 3, 4, 4, 1, 1, 2, 1, 1, 1]

    console.log(arr.distinct1()) // (4) [1, 2, 3, 4]
```

```js
/*
 还是得调用“indexOf”性能跟方法1差不多，
 实现思路：如果当前数组的第i项在当前数组中第一次出现的位置不是i，
 那么表示第i项是重复的，忽略掉。否则存入结果数组。
 */
function uniq(array){
    var temp = [];
    for(var i = 0; i < array.length; i++) {
        //如果当前数组的第i项在当前数组中第一次出现的位置是i，才存入数组；否则代表是重复的
        if(array.indexOf(array[i]) == i){
            temp.push(array[i])
        }
    }
    return temp;
}

var aa = [1,2,"2",4,9,"a","a",2,3,5,6,5];
console.log(uniq(aa));
```

```js
var obj = {} 
   var ary = []
   for (var i = 0; i < arr.length; i++) {
      var cur = arr[i]
      if (!obj[cur]) {
        obj[cur] = true
        ary.push(cur)
      }
    }
    obj = null
```

```js
var arr = [1, 1, 2, 3, 2]
    var ary = []

    for (var i = 0; i < arr.length; i++) {
      var cur = arr[i]
      if (ary.indexOf(cur) === -1) {
        ary.push(cur)
      }
    }
```

```js
function unique(arr) {
      // [1, 1, 1, 2, 2, 2]
      arr = arr.slice(0) // 完全克隆一个新数组
      for (var i = 0; i < arr.length; i++) {
        var cur = arr[i]
        for (var j = i + 1; j < arr.length;) {
          cur === arr[j] ? arr.splice(j, 1) : j++
        }
      }
      return arr
    }
```

## 20.行内元素有哪些?块级元素有哪些?有什么区别?

1、行内元素：a img span b strong input select section 

2、块级元素：div p table ul lo li h1-h6 dl dt 

3、空元素：br hr img input link meta 

区别：

1、块级元素会独占一行 默认的宽度占满父级元素，行内元素不会换行

2、行内元素的width height 无效

3、块级元素可以设置margin和padding属性，行内元素padding-left、padding-right，margin-left，margin-right（水平方向），有边距效果，padding-top，padding-bottom，margin-top，margin-bototm，（垂直方向）没有边距效果，

本质（浏览器将块级元素的dispaly属性默认为block，行内元素属性默认为inline，因此行内元素与块级元素的切换可以通过修改display属性实现）

