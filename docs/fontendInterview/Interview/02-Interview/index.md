---
id: 02-Interview
title: js基础面试题2
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


## 1.阅读代码，写出打印结果

```js
var x = 5;
function fn(x) {
    return function(y) {
        console.log(y + (++x));
    }
}
var f = fn(6);

f(7);   
console.log(x); 
```

- 本题考查的是主要是闭包的原理在fn函数调用时,将形参6传入了函数的栈内存空间之中里面的实参x就拿到了x的值为6,然后将函数地址值赋值给了f,当函数调用的时候,将形参7传入了函数,再次调用了函数,这时7与里面的6相加结果值则为`14`
- 第二个打印结果考查的是对作用域的理解,函数里面有形成自己的作用域,所以打印值为`5`

## 2.阅读代码，写出打印结果

```js
var o3 = {m: 3}
var o4 = o3
o3 = {m: 4}

console.log(o4.m, o4===o3) 
```

- 本题考查的是对象赋值的理解,对象赋值赋值的是基本值类型,赋值对象类型值时只能够将地址值赋值给变量.
- 这里o3的地址值假设为`0*123`,当o3赋值给o4时是将 `0*123`这个地址赋值给了o4,而后又赋值了一个新对象给o3此时是将o3的地址值更改了而不是将`0*123`这个对象给更新了,假设这里的地址值为`0*234`,所以当o4.m去访问m的时候其实是访问的是`0*123`的值 则第一个打印值为`3`
- o4和o3分别为两个不同地址值的对象所以互不相等,第二个打印值为false

## 3.写出你知道的数组方法

**数组方法**

**一、创建数组**

- 数组的每一项可以**保存任何类型的数据**，数组的大小可以动态调整，随着数据的添加自动增长以容纳新增数据。
- 使用Array构造函数创建数组

```js
var arr = new Array();
/*给构造函数传递数值，该数组会自动变成数组length属性的值*/
/*--创建length值为20的数组*/
var arr = new Array(20) 
```

- 使用字面量创建数组。 与对象一样，在使用字面量表示法时，不会调用Array构造函数

```js
/*数组字面量由一对包含数组项的方括号表示，多个项之间以逗号隔开*/
var arr =[1,2,3];
var names = []; //创建一个空数组
```

**二、数组值的读取与设置**

```js
var num = [1,2,3,4];
alert(num[0]) //显示第一项--> 1
num[2] = 'red'; //修改第三项 
num[4] = 5;  //新增第四项
```

**方括号中索引表示需要访问的值**

- 设置索引小于数组中项数，则返回对应项值。
- 修改值则会替换指定位置的值。
- 设置索引大于数组中项数，数组自动增加到索引值的长度，添加新项。 **可以通过数组的length属性向数组末尾移除项或者添加新项**

```js
/*移除*/
var colors=['red','yellow','blue'];
colors.length = 2;
alert(colors[2]) //undefined
alert(colors) // ['red','yellow']
/*添加*/
var num = [1,2,3,4];
num.length = 5;
alert(num[4]) //undefined
```

**三、转换方法**

**toString()**

- 调用数组的toString()方法会返回数组中每个值以逗号分隔的字符串

```js
var num = [1,2,3,4];
alert(num.toString()) //'1,2,3,4'
```

**join()**

- join()方法可以使用不同的分隔符来构建字符串。
- join()方法只接收一个参数，用作分隔符的字符串。不传值默认使用逗号分隔

```js
var colors=['red','blue','green'];
alert(colors.join()) //'red,blue,green'
alert(colors.join('||')) //'red||blue||green'
```

##### 如果数组中某项时null或undefined，那么该值在join()、toString()、toLocaleString()、valueOf()方法中返回的结果中以空字符串表示。

**四、数组方法**

- push()方法可以接收任意数量的参数，把它们**逐个添加到数组末尾**,并返回修改后的数组长度。

```js
var num =[];
var num1 = num.push(1,2)
alert(num) // [1,2]
alert(num1) //2
```

- pop()方法**从数组末尾移除最后一项**，减少数组的length值，返回移除的项。

```js
var num=[1,2,3,4];
var num1 = num.shift()
alert(num) //[2,3,4]
alert(num1) // 1
```

- unshift()方法可以在数组前端添加任意个项并返回新的数组长度。

```js
var num = [1,2,3,4];
var num1 = num.unshift(5,6);
alert(num) // [1,2,3,4,5,6]
alert(num1) //6
```

- reverse()方法会翻转数组项的顺序，返回排序后的数组。

```js
var num = [1,2,3,4];
num.reverse() // [4,3,2,1]
```

- sort() 方法**默认排序顺序是根据字符串UniCode码**。因为排序是按照字符串UniCode码的顺序进行排序的，所以首先应该把数组元素都转化成字符串（如有必要），以便进行比较。

**语法：arrayObject.sort(sortby);**

##### 参数sortby 可选，用来规定排序的顺序，但必须是函数。

```js
<!--按字母排序-->
var arr = ['tom','ani','love','dav'];
arr.sort() // ['ani','dav','love','tom']
<!-- 数值排序-->
var num = [0,1,5,10,15];
num.sort() // [0,1,10,15,5]
<!--升序排列-->
var num = [0,1,5,10,15];
var snum = num.sort(function(a,b){
    return a-b;
})
alert(snum) // [0,1,5,10,15]
<!--降序排列-->
var num = [0,1,5,10,15];
var snum = num.sort(function(a,b){
    return b-a;
})
alert(snum) // [15,10,5,1,0]
```

- concat()方法先拷贝一个当前数组,将接收到的参数添加到拷贝的数组末尾,返回新构建的数组

```js
var num = [1,2,3];
var num2 = num.concat('red',[4,5])
alert(num) // [1,2,3]
alert(num2) // [1,2,3,'red',4,5]
```

- slice()方法基于当前数组中的一个或多个项创建一个新数组.该方法接收两个参数,即**返回项的起始和结束位置**.

**只有一个参数的情况下,slice()方法返回从开始位置到数组末尾的所有项.**

##### 如果有两个参数,slice()方法返回起始和结束位置之间的项,不包括结束位置的项.

##### slice()方法不会影响原数组

##### 如果slice()方法中有负数,则用数组长度加上该负数来确定相应位置

##### 如果结束的位置小于起始位置,则返回空数组

```js
var num=[1,2,3,4,5];
var num1 = num.slice(1) //[2,3,4,5]
var num2 = num.slice(1,4) // [2,3,4]
var num3 = num.slice(-4,-1) // [2,3,4]
var num4 = num.slice(2,1) // []
```

- splice()方法 **始终返回删除的项,没有删除项则返回空数组**

1. **删除:** 可以删除任意数量的项,指定2个参数:要删除的第一项位置和要删除项的个数

```js
var num = [1,2,3,4];
var remove = splice(1,2) //[2,3]
alert(num) // [1,4]
```

2. **插入:** 可以向指定位置插入任意数量的项,指定三个参数:起始位置,0(要删除的项数),要插入的项

```js
var num = [1,2,3,4];
var num2 = num.splice(1,0,5,6) // []
alert(num) // [1,5,6,2,3,4]
```

3. **替换 :** 可以向指定位置替换任意项,指定三个参数:起始位置,要删除的项数,要插入的项.插入的项可以不与删除的项相同.

```js
var num = [1,2,3,4];
var num2 = num.splice(1,2,5,6,7) // [2,3]
alert(num) //[1,5,6,7,3,4]
```

- indexOf()和lastIndexOf() 这两个方法都接收两个参数:**要查找的项和(可选)查找起点的索引**,indexOf()从开头往后找第一次出现的位置,lastIndexOf()从后往前找.没有找到返回-1,找到返回当前项在数组中的索引

```js
var num = [1,2,3,4,5,4,3,2,1];
num.indexOf(4); // 3
num.lastIndexOf(4) // 5
num.indexOf(4,4) // 5
num.lastIndexOf(4,4) // 3
num.indexOf(0) // -1
```

**ES5方法**

- every() 和 some() 用于查询数组中的项是否满足某个条件

1. every() 传入的函数必须对每一项返回true,every()才返回true,否则返回false
2. some() 传入的函数只要其中某一项返回true ,some()就返回true.

```js
var num =[1,2,3,4,5,4,3,2,1];
var num1 = num.every(function(item,index,array){
    return item > 2;
})
alert(num1) // false
var num2 = num.some(function(item,index,array){
    return item > 2;
})
alert(num2) // true
```

- filter() 筛选出符合条件的项构建成新数组.

```js
var num = [1,2,3,4,5,4,3,2,1];
var num2= num.filter(function(item,index,array){
    return item > 2
})
alert(num2) // [3,4,5,4,3]
```

- map() 返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。

```js
var num = [1,2,3,4,5,4,3,2,1];
var num2 = num.map(function(item,index,array){
    return item * 2
})
alert(num2) // [2,4,6,8,10,8,6,4,2]
```

forEach() 与for循环一样遍历数组

reduce()和reduceRight() 都会迭代数组所有项,最后返回一个最终值.reduce()从第一项开始遍历,reduceRight() 从最后一项开始遍历.**接收4个参数:前一个值,当前值,项的索引,数组对象.** 第一次迭代发生在数组的第二项上,所以第一个参数是数组第一项,第二个参数是数组第二项.

```js
 var num = [1,2,3,4,5];
 var sum = num.reduce(function(prev,cur,index,array){
     return prev + cur;
 });
 alert(sum) // 15
```



## 4.写出 this 指向规则，并指出下面代码执行后里面打印的值

**JavaScript关于this指向问题**

**this指向的是它自身吗？**

请看下面代码：

```js
function foo(num) {
	console.log('foo' + num);
  
  // 记录foo被调用的次数
  this.count++;
}
foo.count = 0;
for (let i=0; i<10; i++) {
	foo(i);
}
console.log(foo.count); // 0
```

<img src="https://s3.ax1x.com/2020/12/23/rcnRZq.png" alt="rcnRZq.png" border="0" />

我们发现函数确实执行了10次，但是foo.count却是0. 难道foo中的this.count 和 foo.count不是同一个吗？确实不是同一个,请看下面代码

```js
function foo(num) {
	console.log('foo ' + num);
  
  // 记录foo被调用的次数
  this.count++;
  console.log(this.count);
}
foo.count = 0;
for (let i=0; i<10; i++) {
	foo(i);
}
console.log(foo.count); // 0
```

<img src="https://s3.ax1x.com/2020/12/23/rcuCyd.png" alt="rcuCyd.png" border="0" />

- 我们在foo中输出this.count 为 NaN。
- 外层的foo.count为0
- 所以this.count 和 foo.count并不是同一个
- foo 中 this并非是指向foo自身

**那么this到底是指向什么呢？**

this的指向是取决于**函数的调用方式**，因为this并不是在函数编写时绑定的，是由函数调用时决定this的指向(也可以叫做this绑定)

- 当函数调用时，JS引擎会为函数创建一个执行上下文(context)，
- 执行上下文会记录函数相关的一些信息(函数调用栈,函数的调用方法，传入的参数等),
- this则是执行上下文中的一个属性。

**如何确定函数的调用位置？**

我们已经知道this的指向却决于函数的调用方式，那么我们需要先确定函数的调用位置(不是声明的位置)

函数的调用会形成一个调用栈，如下代码

```js
function f1() {
    console.log('f1');
    debugger;
    f2();// f2调用位置
}
function f2() {
    console.log('f2');
    debugger;
    f3();// f3调用位置
}
function f3() {
    console.log('f3');
    debugger;
    f4();// f4调用位置
}
function f4() {
    console.log('f4');
    debugger;
}
f1(); // f1调用位置
```

<img src="https://s3.ax1x.com/2020/12/23/rcK25V.png" alt="rcK25V.png" border="0" />

点击对应的函数名字可以定位到函数调用位置

<img src="https://s3.ax1x.com/2020/12/23/rcK25V.png" alt="rcK25V.png" border="0" />

**确定位置后，this是如何绑定对象呢？**

this的绑定规则有4中，**1.默认绑定 2.隐试绑定 3.显式绑定 4.new 绑定**

**1.默认绑定：在我们身边经常可以看到**

```js
function foo () {
	console.log(this.a);
}
var a = 1;
foo(); // 1

//上面代码相当于 如下写法
window.foo = function () {
	console.log(this.a);
}
window.a = 1;
window.foo();
```

a 定义成全局变量, foo 也属于全局下的，

所以这里的this被默认绑定到全局对象window下，this指向是window，输出为 1，

注意这里foo() 调用位置在全局环境下

**需要注意的是在严格模式下(use strict)this无法绑定到window,会报错**

**2.隐式绑定**

隐式绑定通常常发生在‘.’调用下

```js
function foo() {
	console.log(this.a);
}
var obj = {
	a: 1,
  foo: foo,
};
obj.foo();// 1
```

foo调用位置在obj.foo(),这里this指向obj，正常来说foo是属于window

```js
function foo() {
	console.log(this.a, this);
}
var obj = {
	a: 1,
  foo: foo,
};
window.foo();
obj.foo();// 1
```

<img src="https://s3.ax1x.com/2020/12/23/rcMfot.png" alt="rcMfot.png" border="0" />

- 从输出结果可以看出，直接调用foo()或者window.foo() 输出this是window,
- 而通过obj.foo()调用输出this是obj,
- 这里foo的this就是发生**隐式绑定**.
- 所以这里的this指向取决于它 **调用位置 和 调用方式**

**3.显式绑定**

在js中显式绑定通常是通过调用call,apply方法来强制改变this的指向，这种方式被称为显示绑定

```js
function foo() {
	console.log( this.a );
}
var obj = {
	a:2
};
// 将foo的this绑定到obj上,此时foo的this指向obj,因此this.a 相当于 obj.a
foo.call( obj ); // 2
```

<img src="https://s3.ax1x.com/2020/12/23/rcMIW8.png" alt="rcMIW8.png" border="0" />

值得注意的是如果绑定的是原始值，js引擎会进行自动装箱操作，如下

<img src="https://s3.ax1x.com/2020/12/23/rcMTSS.png" alt="rcMTSS.png" border="0" />

上面例子中我们发现每次call都会改变this的指向，那么如何能保证foo函数this的指向不变呢？

```js
function foo() {
	console.log( this.a );
}
var obj = {
	a:2
};
// 将foo包装一层，每次调用都会绑定obj
var bar = function() {
	foo.call( obj );
};
bar(); // 2
setTimeout( bar, 100 ); // 2
// 硬绑定的 bar 不可能再修改它的 this
bar.call( window ); // 2
```

以上也叫做 **硬绑定**

**4.new 绑定**

使用new 构建对象的时候this会被绑定到对象上

```js
function foo(a) {
	this.a = a;
}
const f1 = new foo(1);
console.log(f1.a) // 1
```

至此我们已经知道this绑定为3步：**调用位置=>调用方式=>绑定规则**
绑定规则又有4个规则，分别是: **默认绑定、隐式绑定、显式绑定、new绑定**
那么倒是使用哪个规则来绑定呢？取决于规则的优先级，规则优先级从左到右为：**new绑定>显式绑定>隐式绑定>默认绑定**

**总结：如何判断this?**

1. 函数是否存在new  创建(new 绑定)，如果存在则this绑定是新创建的对象

2. 函数是否通过call,apply,bind(显式绑定)，如果是怎绑定到指定的对象,**注意：如果是传递是null,undefined作为this,则会忽略，会使用默认绑定**

3. 函数是否在某个对象上调用: object.func()?如果是，则绑定到这个对象上

4. 如果以上都不是则使用默认绑定，在严模式下绑定到undefined,非严格绑定到window

**法外狂徒：箭头函数**

ES6中的箭头函数的this是继承于外层函数或者全局作用域的，不受上面4条规则限制.

```js
this.x = 9;   
var module = {
  x: 81,
  getX: function() { return this.x; },
  newX: function() { this.x = 8 }
};

console.log( module.getX() ); 

var retrieveX = module.getX;
console.log( retrieveX() );   

var boundGetX = retrieveX.bind(module);
console.log( boundGetX() ); 

var obj = new module.newX()
console.log(obj.x)
console.log(module.x)
```

- 本题主要考察的是this的指向问题
- 第一个打印是module直接使用.调用getx所以属于默认绑定的规则getx返回了this.x所以this指向的是module第一个打印值结果为`81`
- 第二个打印是将module.getx的地址值赋值给了retrievex所以当retrievex调用时,调用的就是module.getx,这里的this属于默认绑定的规则,this指向的是window所以打印值为`9`
- 第三个打印结果值是属于硬绑定的规则retrieveX强制将this绑定给了module,这里的retrieveX就是module.getX,然后赋值给了boundGetX,其实就是module.getX调用所以this的指向为module自己本身,打印值为`81`
- 第四个打印结果是属于new绑定的方式,this的指向为此对象的实例,然后将module.newx赋值给了obj,obj调用其实就是调用了newx,this指向obj,则打印值为`8`
- 第五个就是成员访问打印值就是`81`




## 5.阅读代码，写出函数执行结果

```js
Function.prototype.a = function(){
  console.log(1);
}
Object.prototype.b = function() {
  console.log(2);
}
function A() {}
var a = new A();

a.a();   	// 报错
a.b();		// 2
A.a();		// 1
A.b();		// 2

```

## 6.简述使用new实例化一个对象的时候，new操作符做了什么？

1.	创建一个空对象obj( {} )
2.	将obj的[__proto__]属性指向构造函数的原型（即obj.[[__protot__]] = constrc.prototype）
3.	将构造函数内部的this绑定到新建的对象obj，执行构造函数（也就是跟调用普通函数一样，只是此时函数的this为新创建的对象obj而已）
4.	若构造函数没有返回非原始值（即不是引用类型），则返回该新建的对象obj（默认会添加return this）。否则，返回引用类型。
- 备注：能理解手写new即能理解上面的的意思

    
## 7、call()，apply() ，bind() 怎么使用?
1. 第一个参数都是this的指向（想不传的时候不填或者写undefined）
2. 前面2个用于指定this指向后函数直接调用函数，不同在于他们参数的传递方式，apply()是通过数组去传递的，call则是一个个传递
例如：

```js
function hello(name,age) {
 console.log(name);
 console.log(age);
}	
hello.call(this,"tsrot",24);
hello.apply(this,["tsrot",24]);
```

3.	bind()则不是直接调用，而是做一个硬绑定（通过参数把里面的值写死，不可再改），需要再一次调用
    例如：
```js
  function createPerson(name){
    console.log( “hello ” + name)
    }
  var bindFunc = createPerson.bind(undefined,“LaoWang”)
  bindFunc()    // “hello LaoWang”
```

## 8.简述闭包是什么？它有什么作用？ 根据定义写出一个简单的闭包

- 当一个嵌套的内部(子)函数引用了嵌套的外部(父)函数的变量(函数)时, 就产生了闭包
作用：
 1. 使用函数内部的变量在函数执行完后, 仍然存活在内存中(延长了局部变量的生命周期)
 2.	让函数外部可以操作(读写)到函数内部的数据(变量/函数)


- 简单的闭包例子：
```js
function outerFunc(){
var count = 0;
  function innerFunc(){
       count++;
       console.log(count)
    }
        return innerFunc
    }
var f = outerFunc()
f()
f()
```

## 9.简述立即执行函数是什么？它的作用是什么？
- 创建一个匿名函数，然后立即自调用
- 作用：
  - 不污染外部命名空间（创建一个独立的作用域）

## 10.写出下面DOM相关方法和属性
获取类名为“box”的DOM元素
   `getElementByClassName(“box”)`    `querySelector(“.box”)`

创建元素
`createElement()`

添加节点
`appendChild()`

删除节点
`removeChild()`

替换节点
`replaceChild()`

克隆节点
`cloneNode()`

修改 ele (某个dom元素）的样式的属性
`ele.style.xxx`

修改ele（某个dom元素）的css类 的属性
`ele.className` `ele.classList`

## 11.写出标准的事件流模型
- 事件流：
  - 捕获阶段-目标阶段-冒泡阶段

## 12.简述事件委托是什么，以及它的使用场景，优点

- 事件委托（delegate） 也称为事件托管或者事件代理，就是把目标节点的事件绑定到祖先的节点上
    - 使用场景：
     一个父元素下有多个附带事件的子元素，可以将子元素的事件委托到父元素
    - 优点：
    可以大量节省内存占用，减少事件注册
    可以实现当新增子对象时无需再次对其绑定（动态绑定事件）


## 13.说明clientHeight，offsetHeight，scrollTop是什么 ？
-  clientHeight：元素高度，包含width和padding，不包含滚动条和border
-  如图：
<img src="https://z3.ax1x.com/2021/06/14/2H9K1K.png" alt="2H9K1K.png" border="0" />

-  offsetHeight：元素高度，包含滚动条和border
- 如图：
<img src="https://z3.ax1x.com/2021/06/14/2H9zHH.png" alt="2H9zHH.png" border="0" />

- scrollTop：
- 如图：
<img src="https://z3.ax1x.com/2021/06/14/2HCiCt.png" alt="2HCiCt.png" border="0" />

## 14.说明clientHeight，offsetHeight，scrollTop是什么 ？
- clientHeight：元素高度，包含width和padding，不包含滚动条和border
- 如图：
<img src="https://z3.ax1x.com/2021/06/14/2HCZDg.png" alt="2HCZDg.png" border="0" />

- offsetHeight：元素高度，包含滚动条和border
- 如图：
<img src="https://z3.ax1x.com/2021/06/14/2HCl80.png" alt="2HCl80.png" border="0" />

- scrollTop：
- 如图：
<img src="https://z3.ax1x.com/2021/06/14/2HCNVJ.png" alt="2HCNVJ.png" border="0" />

## 15.说明clientX,offsetX,screenX,pageX是什么 ？

- 在鼠标事件对象中：
  -  clientX：点击位置距离当前body可视区域(视口)的x坐标
  -  offsetX：相对于父盒子的x，y坐标
  -  screenX：点击位置距离当前电脑屏幕的x，y坐标
  -  pageX：对于整个页面来说，包括了被卷去的body部分的长度
- 如图：
<img src="https://z3.ax1x.com/2021/06/14/2HPFo9.png" alt="2HPFo9.png" border="0" />

## 16.手写一个数组去重函数
- 方法1：
```js
	function unique(arr){  
	  for( var i=0; i<arr.length; i++ ){  
	    for( var j=i+1; j<arr.length; j++){  
	      if( arr[i]==arr[j] ){  
	        Arr.splice(j,1);  
	        j--;  
	      }  
	    }  
	  }  
	  return arr  
	} 
```

- 方法2：
```js
	function unique(arr){  
	  var array = [];  
	  for( var i=0; i<arr.length; i++){  
	    if(array.indexOf(arr[i]) === -1){  
	      array.push(arr[i])  
	    }  
	  }  
	  return array  
	}  
```

## 17.请为 Array 对象添加一个求平均值的函数，使得如下代码可以正常工作
- 题
```js
var arr = [1, 2, 3, 4, 5];
var avg = arr.average();
console.log(avg);
```
- 解：
```js
	Array.prototype.average = function(){  
	    var sum = 0;  
	    var result;  
	    this.forEach(function(item){  
	      sum += item  
	    })  
	    return result = sum / arr.length  
	}  
```

## 18.写出函数实现下面需求，要求分别用迭代和递归的方式实现
- 求斐波拉切数列第n个数的值是多少？ 
- 数列：1,1,2,3,5,8,13,21...... <br/>

迭代实现 方法1：
```js
	// i代表第三项，res代表第i项的时候的值，通过前面2项相加去实现，n项的时候跳出循环，输出res  
	function fbnq(n) {  
	  var a,b,res;  
	  a = b =1;  
	  for(var i=3;i<=n;i++){  
	    res = a + b;  
	    a = b;  
	    b = res;  
	  }  
	  return res  
	}  
```
迭代实现 方法2：
```js
	// 数组方法实现  
	// 思路：创建数组的前两项，然后按照斐波拉契数列的规则，添加这个数列的项的数组中。注意for循环里面的初始和判断条件。  
	function fbnq(n){  
	  var res = [1,1];  
	  if(n == 1 || n==2){  
	    return 1;  
	  }  
	  for(var i=2;i<n;i++){  
	    res[i] = res[i-1] + res[i-2]  
	  }  
	  return res[n-1]  
	}  
```
递归实现
```js
	// 递归实现  
	// 思路：抓住规律，第一项和第二项是1，后一项是前面两项之和。所以第n项是前面两项之和。那两项又是前面两项之和。可以递归。直到最后变成第一项和第二项，return 1, 结束递归，累加得到最后的N的值。  
	function fbnq(n) {  
	  if(n==1 || n==2){  
	    return 1;  
	  }  
	  return fbnq( n-1 ) + fbnq( n-2 )  
	}  
```