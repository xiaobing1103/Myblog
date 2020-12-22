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
- 这题主要考查的是闭包的原理,由于foo函数在调用的时候将a存在了栈内存之中,所以当newBar调用的时候会去找到栈中的a进行打印
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
- 本题考查的是基本作用域的运用,当a赋值给b时，因为a时基本值类型所以a直接将1赋值给了b,
  而后第一个打印结果`1`
- 这里的c是一个对象类型,将c赋值给d时直接时将地址值赋值给了d,d就可以沿着地址值找到上面的 属性进行设置所以打印出来的结果为`小黄`

