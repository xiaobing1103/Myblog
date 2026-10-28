---
id: 01-NInterview
title: JavaScript 原型、类与继承
description: 区分实例属性、原型方法、静态成员和私有字段，校订旧继承教程。
---

[回到面试题库](../../../interview/index.mdx)

## 先纠正几个常见误解

- 现代 JavaScript 有 `class` 语法，实例的属性查找仍以原型链为基础。
- `instance.name = '小王'` 是实例属性，不是静态属性。
- 构造函数中的 `let secret` 是局部绑定；只有被闭包捕获时才会在调用结束后继续被访问，不等于实例上有一个私有属性。
- 原型成员不等于语言强制的“公有属性”权限；真正的类私有字段使用 `#name`，并有访问检查。

## 一份可运行的现代示例

```js
class Person {
  static species = 'human';
  #age;
  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }
  describe() { return `${this.name}, ${this.#age}`; }
  birthday() { this.#age++; }
}
class Student extends Person {
  constructor(name, age, school) {
    super(name, age);
    this.school = school;
  }
  describe() { return `${super.describe()}, ${this.school}`; }
}
const student = new Student('小王', 18, '示例学校');
console.log(student.describe()); // 小王, 18, 示例学校
console.log(Object.hasOwn(student, 'name')); // true
console.log(Object.hasOwn(student, 'describe')); // false
console.log(Person.species, Student.species); // human human
console.log(student.species); // undefined
console.log(Object.getPrototypeOf(student) === Student.prototype); // true
```

实例自有 `name`、`school`。`describe` 方法共享在原型上；`species` 在构造器对象上，子类构造器可以继承它，实例不沿这条链查找。`#age` 不能由类外用点语法读取，也不是普通可枚举属性。

## 两条原型链

```text
student → Student.prototype → Person.prototype → Object.prototype → null
Student → Person → Function.prototype → Object.prototype → null
```

`Student.prototype` 是构造器公开的属性；`Object.getPrototypeOf(Student)` 是构造器自身的原型，两者不是一回事。实例调用方法先找自有属性，再向上找，找到同名自有属性会遮蔽原型属性。

## 构造函数写法与边界

```js
function Counter(start = 0) {
  this.value = start;
}
Counter.prototype.increment = function () {
  return ++this.value;
};
const a = new Counter();
const b = new Counter(10);
console.log(a.increment(), b.increment()); // 1 11
console.log(a.increment === b.increment); // true，共享原型方法
```

每次在构造函数内写 `this.method = function(){}` 会创建独立函数；是否需要每实例函数取决于场景。不要给 `Object.prototype` 随意加业务成员，否则所有普通对象都可能受影响。

## 继承还是组合？

继承适合稳定的“是一种”关系。多个独立能力可通过组合注入，避免深层父类耦合；例如服务接收存储接口，而不是为了复用一个请求函数建立多层继承。类方法默认不会自动绑定 `this`，脱离对象调用仍需考虑调用方式。

## 自测

1. 为什么 `student.species` 是 undefined？因为静态成员在构造器链上，不在实例链上。
2. `student.name = '小李'` 会改变其他实例吗？不会，它是该实例的自有属性。
3. 子类能直接读 `this.#age` 吗？不能，父类声明的私有字段只能在其声明的类体中访问，可通过父类方法间接操作。

参考：[MDN 类](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)、[原型链](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain)。
