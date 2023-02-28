---
id: 01-NInterview
title: 2021/8/26 -javascript继承
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


## javascript继承(一)—类的属性研究

首先从js的机制来回答，由于`javascript`是一种基于对象的语言，本身没有类的概念，所以对于javascript的类的定义有很多名字，例于原型对象，构造函数等，它们都是指`javascript`中的类。例如：` function Person(){} var p = new Person(); `这里的Person可以看作一个类，而p则是这个类的实例也可以称为对象。
- 这里主要分析js里面的四种属性。
  - 私有属性，指定义在类中用`var`声明的,即`var propertyName = sonmeValue`，只能在这个类里面进行访问，不能被继承，也不能在原型方法中访问的属性。

  - 特权属性(实例属性)，指在类中或者说在构造函数中(js里是同一个东西)，使用`this`关键字，即`this.propertyName = someValue`,该属性在类中可以访问，在原型方法中可以访问，在该类的对象中也 能被访问，甚至用`call`或`apply`继承时也能访问。
 
  -  共有属性，指通过`ClassName.prototype.propertyName=someValue` 来定义的，如果该属性在类中没定义，即没有重命的特权属性，则可以当特权属性被访问，即能在对象中调用，通过`prototype`继承的子类也能访问。
    静态属性，直接`ClassName.propertyName=someValue` 来定义,相当于一个命名空间，在类的内部外部都能访问。

例1: 各种属性定义
```js
function Person(){
     var private_name = "小明"; //私有属性
     var private_age = 10; //私有属性
     this.privilege_name = "小红"; //特权属性
     this.privilege_age = 9; //特权属性
  }
    Person.prototype.public_name = "小芳"; //公有属性
    Person.prototype.public_age =8; //共有属性
    Person.static_name = "小李"; //静态属性
    Person.static_age = 7; //静态属性
 
    var pp = new Person();
    pp.name = '小王'; //静态属性
    pp.age = 6; //静态属性
```
在这个例子里指出了这四种属性的定义方式。注意静态属性里，因为Person和pp都是Object实例，如下面代码执行结果可以看出。

console.log(Person instanceof Object,pp instanceof Object); //true true

所以都可以定义静态属性。

下面来分析一下这些属性的访问权限。

例2:各种属性的访问权限　

```js
function Person(){
    var private_name = '小明';
    var private_age = 10;    
　this.privilege_name = '小红'; 
　this.privilege_age = 9; 
 
    //定义一个特权方法
　this.showPrivilegeName = function(){
　　　　console.log(private_name);          // private_name is not defined .说明私有属性可以在特权方法中访问.
　　　　console.log(this.privilege_name );  //输出:"小红"。说明特权属性可以在特权方法中访问
　　　　console.log(this.public_name);      //输出："小芳"。说明共有属性可以在特权方法中访问
　　　　console.log(Person.static_name);    //输出:"小李"。说明类的静态属性可以在特权方法中访问
　　}
}
 
Person.prototype.public_name = '小芳';
Person.prototype.public_age =8;   
Person.static_name = '小李';   
Person.static_age = 7;    
var pp = new Person();
pp.name = '小王';       
pp.age = 6;
 
//定义一个原型方法
Person.prototype.showName = function(){
　　//console.log(private_name);        // private_name is not defined .说明私有属性不能在原型方法中访问.
　　console.log(this.privilege_name );  //输出:"小红"。说明特权属性可以在原型方法中访问       
　　console.log(this.public_name);      //输出："小芳"。说明共有属性可以在原型方法中访问
　　console.log(Person.static_name);    //输出:"小李"。说明类的静态属性可以在原型方法中访问
}   
 
pp.showPrivilegeName();
pp.showName();
console.log(pp.private_name);          //undefined 私有属性不能在实例化的对象中访问 
console.log(pp.privilege_name );       //输出:"小红"。说明特权属性可以在原型方法中访问
console.log(pp.public_name);           //输出："小芳"。说明共有属性可以在原型方法中访问
console.log(Person.static_name);       //输出:"小李"。说明类的静态属性可以在原型方法中访问
console.log(pp.name);                  //输出:"小王"。说明实例对象的静态属性可以在原型方法中访问
```


可以看到如果特权属性和公共属性重名的话，访问特权属性，如果特权属性不存在的话则访问共有属性。 另外如果用delete对象的属性删掉是删的特权属性，删除后可以继续访问共有属性。 对于对象的静态属性只能该对象能访问，类的其它对象是不能访问的。

例3:特权属性和对象静态属性之间的优先级问题

```js
function Person(){
　　this.name = '小李';
}
var p1 = new Person();
p1.name = '小红';
p1.age = 10
console.log(p1.name); //小红
console.log(p1.age); //10
delete p1.name
console.log(p1.name); //undefined
```

例4:特权属性和对象静态属性之间的优先级问题

```js
function Person(){ 

this.name = '小李'; 

} 
var p1 = new Person(); 
p1.name = '小红'; 
p1.age = 10 
console.log(p1.name); //小红 console.log(p1.age); //10 delete p1.name console.log(p1.name); //undefined
```
可以看到如果创建了对象后，给该对象创建一个与特权属性同名的静态属性，特权属性的值会被覆盖，如果用delete删除后，再访问为undefined。


总结:对象的静态属性只能该对象本身能访问，优先级:对象的静态属性>类的特权属性>共有属性。其中对象的静态属性会覆盖类的特权属性，而类的特权属性并不会覆盖共有属性，即用delete删除该对象的属性是删除它的特权属性，并不能删除类的共有属性。　
对于类静态属性和方法，是到处都能访问的，即相当于命名空间。
对于类的共有属性，特权属性在外部是可以访问的。
对于私有属性和方法，只有类的内部能使用。其中类的共有属性和方法可以访问类的特权属性和方法，但不能访问类的私有属性和方法。



## javascript继承(二)—创建对象的三种模式

### 一、工厂模式
```js
function createPerson(name,age){
    var o = {};
    o.name = name;
    o.age = age;
    o.sayHi = function(){
        alert('my name is' + this.name);
    };
    return o;
}
var p1 = createPerson('小明',10);
var p2 = createPerson('小红',9);
p1.sayHi();
p2.sayHi();
console.log(p1.constructor); //Object
console.log(p2.constructor); //Object
```
工厂模式可以创建多个对象，但是并不知道对象的类型，因为都指向了Object

### 二、构造函数模式

```js
function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayHi = function(){
        alert('my name is' + this.name);
    }; 
}
var p1 = new Person('小明',10);
var p2 = new Person('小红',9); 
p1.sayHi();
p2.sayHi();
console.log(p1.constructor); //Person(name,age)
console.log(p2.constructor); //Person(name,age)
console.log(p1.sayHi==p2.sayHi);//false
```
p1的sayHi方法和p2的sayHi方法是不同的，说明每new一个对象就会创建一个sayHi方法，其实这完全没必要，也会浪费空间。

当然代码可以改写如下：
```js
function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayHi = sayHi;
}
function sayHi(){
alert('my name is' + this.name);
}
var p1 = new Person('小明',10);
var p2 = new Person('小红',9);
p1.sayHi();
p2.sayHi();
console.log(p1.constructor); //Person(name,age)
console.log(p2.constructor); //Person(name,age)
console.log(p1.sayHi==p2.sayHi);//true
```
这时它们方法所指向的代码块就相同，即共用了一个方法。但其实没有必要为了一个类的特权方法就创建一个全局的方法，也会使得这个类显得比较凌乱。

### 三、显示原型模式

```js
function Person(name,age){
    this.name = name;
    this.age = age;
}
Person.prototype.sayHi =function(){
    alert('my name is' + this.name);
}
var p1 = new Person('小明',10);
var p2 = new Person('小红',9);
p1.sayHi();
p2.sayHi();
console.log(p1.constructor); //Person(name,age)
console.log(p2.constructor); //Person(name,age)
console.log(p1.sayHi==p2.sayHi);//true
```
对于显示原型来创建对象，可以看到对象引用的方法是同一个方法，即类的共有方法。这样极大的节约了代码空间，不会每new一个对象就就类的所有方法创建一遍。

对于对象的特权属性、方法和共有属性、方法在 <a href="#javascript继承一类的属性研究">javascript中类的属性研究</a> 这篇文章中有所介绍。


## javascript继承(三)—继承的实现原理

面向对象的编程的核心是封装、继承和多态，js可以看作是一种面向对象的语言，而面向对象的扩展性最核心的部分是多态，多态的必要条件有三个，首先就是继承，其次父类的引用指向子类，最后是方法重写。对于js来说，由于其创建对象的方式多种多样，因此，需要对父类的多种属性和方法实现很好的继承，就必须找到一个比较完善的方法。本篇文章首选介绍三种最基本的继承方式，并分析这几种继承方式的缺陷。

### 第一种方式：对象冒充

对象冒充，是指将父类的属性和方法一起传给子类作为特权属性和特权方法

```js
function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayHi = function(){
        alert('hi');
    }
}

Person.prototype.walk = function(){
    alert('walk.......');
}

function Student(name,age,grade){
    this.newMethod = Person;
    this.newMethod(name,age);
    delete this.newMethod;
    this.grade = grade;
}

var s1 = new Student('xiaoming',10,3);
console.log(s1.name,s1.age,s1.grade);//xiaoming 10 3
//s1.walk();//s1.walk is not a function
```


可见Student类只继承了Person类的特权属性和方法，并没有继承Person类的共有属性和方法。

### 第二种方式：call或apply

使用call或apply改变对象的作用域来实现继承，让父类的this等于新创建的子类的对象(因为call和apply继承实现机制是一样的，就是传参方式不同，call传多个参数用逗号隔开，apply用数组)，本文主要介绍call来实现继承。


```js
function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayHi = function(){
        alert('hi');
    }
}

Person.prototype.walk = function(){
    alert('walk.......');
}

function Student(name,age,grade){
    Person.call(this,name,age);
    this.grade = grade;
}

var s1 = new Student('xiaoming',10,3);
console.log(s1.name,s1.age,s1.grade);//xiaoming 10 3
//s1.walk();//s1.walk is not a function
```

同第一种问题一样，没有继承共有属性和方法。call改变了Person中this的作用域，使其指向了Student。对于call方法举例如下:


```js
function Person(){
     this.name ='xiaoming';
}

Person.call(this);
alert(window.name);
```

此例将Person中this的作用域扩大到window上，使得Person中的name属性变为一个全局变量。

### 第三种方式：prototype

使用prototype属性实现继承,让父类的prototype赋给子类的prototype，也可以将父类的实例赋给子类的prototype,这里先介绍将父类的原型赋给子类的原型这种方式，并探讨这种方式的缺陷。在以后会着重介绍prototyp这种继承方式。

```js
function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayHi = function(){
        alert('hi');
    }
}

Person.prototype.walk = function(){
    alert('walk.......');
}

function Student(name,age,grade){   
    this.grade = grade;
}

Student.prototype = Person.prototype;

var s1 = new Student('xiaoming',6,3);
s1.walk();//walk.......
console.log(s1.name,s1.age,s1.grade);//xiaoming 6 3
console.log(s1.constructor); // Person(name,age)
Student.prototype.study = function(){
    alert('I am study');
}
var p1 = new Person();
p1.study();//I am study
```

主要缺陷:不能继承父类的特权属性和特权方法，子类的构造函数变成了Person(name,age)，直接导致修改子类的原型方法时，父类也跟着修改了，耦合度太高了。

如果将父类的实例指向子类的原型会出现什么情况呢？

```js
function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayHi = function(){
        alert('hi');
    }
}

Person.prototype.walk = function(){
    alert('walk.......');
}

function Student(name,age,grade){   
    this.grade = grade;
}

Student.prototype = new Person();

var s1 = new Student('xiaoming',6,3);
s1.walk();//walk.......
console.log(s1.name,s1.age,s1.grade);//undefined undefined 3
console.log(s1.constructor); // Person(name,age)
Student.prototype.study = function(){
    alert('I am study');
}
var p1 = new Person();
//p1.study();// p1.study is not a function
```

虽然子类Student的实例s1仍然指向父类Person的构造函数，但此时修改子类的共有方法并不会对父类有所影响。然后这种方式存在一个更为严重的问题是，子类虽然继承父类的特权属性，但是没法进行修改。并且每创建一个子类的实例时都会把父类的所有属性和方法创建一遍，相对于继承父类的prototype属性中共有方法使用同一代码块对代码空间存在较为严重的浪费。

总结：几种继承方式各有各的缺陷，那么如何实现完美的继承呢。也许将其中的某两种继承方式结合起来才行。在以后会接着介绍call和prototype结合实现js的继承功能。

## javascript继承(四)—prototype属性介绍

js里每一个function都有一个prototype属性，而每一个实例都有constructor属性，并且每一个function的prototype都有一个constructor属性，这个属性会指向自身。这会形成一个非常有意思的链式结构。举例如下：

```js
function Person(){
    this.name =12;
}
console.log(Person.prototype);
console.log(Person.prototype.constructor);//输出Person，指向自身
console.log(Person.prototype.constructor.prototype.constructor);//输出Person，指向自身
```

**再看一下这个类的输出，则会出现如下情况**
```js

function Person(){}
Person.prototype.name = 'xiaoming';
var p1 = new Person();
console.log(p1);
```

输出结果如下：

```js
Person = {name = 'xiaoming'}
```
会把这个实例显示出来，展开如下。p1有一个原型属性，这个属性有一个构造方法Person(),而这个构造方法又有prototype属性，这个属性有constructor方法…

<img src="https://z3.ax1x.com/2021/08/26/hnXse0.png" alt="hnXse0.png" border="0" />

这里主要让我们了解一下prototype是属于类（或者说函数function）的属性，指向这个类的共有属性和方法，而constructor是实例的属性，指向它的构造函数（也可以说是类,js里构造函数和类是一个概念）。

通过前面的两篇文章

- <a href="#javascript继承三继承的实现原理">javascript继承—继承的实现原理(1)</a>

- <a href="#javascript继承二创建对象的三种模式">javascript继承二创建对象的三种模式</a>

我们知道用prototype来实现继承可以使子类拥有父类的共有属性和方法，其它两种不行。所以这里主要讨论如何用prototype实现继承。

由于采用prototype继承父类的实例在<a href="#javascript继承三继承的实现原理">javascript继承—继承的实现原理(1)</a>
中已有论述，下面着重介绍用prototype继承实现的几种方式。


### 方案一:

直接将父类的prototype属性赋给子类，同时用call继承父类的特权属性，然后再修改子类prototype的constructor


```js
function Person(name,age){
    this.name = name;
    this.age = age;
}

Person.prototype = {
    sayHi:function(){
        alert('hi');
    }
}

function Student(name,age,grade){
    Person.call(this,name,age);
    this.grade = grade;
}

Student.prototype = Person.prototype; 
//Student.prototype.constructor = Student;
Student.prototype.study = function(){
    alert('study');
}
var p1 = new Person('xiaoming',10);
var s1 = new Student('xiaohong',9,3);
//p1.study();// p1.study is not a function 说明Person的实例没有study方法，即子类的共有方法没有被父类共享
console.log(p1);//Person { name="xiaoming", age=10, sayHi=function()}
console.log(s1);//Student { name="xiaohong", age=9, grade=3, 更多...}
console.log(p1.constructor);//Object() 
console.log(s1.constructor);//Object() 子类父类实例相同都为Object

/**
如果在原文中加上Student.prototype.constructor = Student;
则
console.log(p1.constructor);//Student() 
console.log(s1.constructor);//Student() 子类父类实例相同都为Student
***/
```


<a >这种方案经测试是行不通的，因为不管怎么变，子类和父类的实例都会共有相同的constructor，这种情形下修改子类的共有方法，同时会修改了父类的共有方法，说明此法不通。</a>

### 方案二:

将父类的实例赋给子类的原型对象，同时使用call方法使子类继承父类的特权属性。


```js
function Person(name,age){
    this.name = name;
    this.age = age;
}

Person.prototype = {
    constructor:Person,
    sayHi:function(){
        alert('hi');
    }
}

function Student(name,age,grade){
    Person.call(this,name,age);
    this.grade = grade;
}

Student.prototype = new Person();
Student.prototype.constructor = Student;
Student.prototype.study = function(){
    alert('study');
}
var p1 = new Person('xiaoming',10);
var s1 = new Student('xiaohong',9,3);
//p1.study();// p1.study is not a function 说明Person的实例没有study方法，即子类的共有方法没有被父类共享
console.log(p1);//Person { name="xiaoming", age=10, sayHi=function()}
console.log(s1);//Student { name="xiaohong", age=9, grade=3, 更多...}
console.log(p1.constructor);//Person(name,age) 父类的实例指向仍是父类
console.log(s1.constructor);//Student(name,age,grade) //子类的实例指向仍是子类
```
得到的结果基本符合我们继承的要求，但是这个继承实现方式所继承的是父类实例所有的属性和方法，即实例方法（也可以说是特权方法），每创建一个子类对象都会把父类的特权方法都复制一遍，这样会耗费资源并且是无意义的。这时创建子类的实例就相当于javascript创建对象的三种模式 中的第二种构造函数模式。


### 方案三：
```js
function Person(name,age){
    this.name = name;
    this.age = age;
}
//第一种创建共有方法方式
Person.prototype.sayHi = function(){
    alert('hi');
}
//第二种创建共有方法方式
/*--------------------------------------------------------
Person.prototype = {
    constructor:Person,
    sayHi:function(){
        alert('hi');
    }
}
-------------------------------------------------------*/

function Student(name,age,grade){
    Person.call(this,name,age);
    this.grade = grade;
}

for(var i in Person.prototype){Student.prototype[i] = Person.prototype[i]}

//第二种创建共有方法方式继承时需要加上这句，不然子类实例会指向Person
/*--------------------------------------------------------
Student.prototype.constructor = Student
-------------------------------------------------------*/
Student.prototype.study = function(){
    alert('study');
}
var p1 = new Person('xiaoming',10);
var s1 = new Student('xiaohong',9,3);
//p1.study();// p1.study is not a function 说明Person的实例没有study方法，即子类的共有方法没有被父类共享
console.log(p1);//Person { name="xiaoming", age=10, sayHi=function()}
console.log(s1);//Student { name="xiaohong", age=9, grade=3, 更多...}
console.log(p1.constructor);//Person(name,age) 父类的实例指向仍是父类
console.log(s1.constructor);//Student(name,age,grade) //子类的实例指向仍是子类
/*--------------------------------------------------------
第二种方式
console.log(p1.constructor);//Person() 父类的实例指向仍是Person
-------------------------------------------------------*/
```
用prototype实现原型链继承。对于第三种创建共有方法，如果创建的时候不加constructor: Person,得到的父类实例会指向Object，是因为创建共有方法的时候直接将一个包含共有方法的Object对象赋给了父类的prototype属性，将父类原有的constructor属性Person修改为Object。所以会出现这种情形。

经过测试，这种继承方式是可行的。使用这种方式继承，可以看到基本实现了子类继承父类的所有属性和方法，并且子类的构造函数仍是子类，父类的构造函数是父类。自认为这是比较完美的方案。


### javascript继承(五)—prototype最优两种继承（空函数和循环拷贝）

### javascript继承(六)—实现多继承

### javascript继承（七）—用继承的方式实现照片墙功能

### javascript继承(八)－封装