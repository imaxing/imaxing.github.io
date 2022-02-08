

#### javascript 的数据传递
 - 内存的分配方式
 - 内存的访问机制

---
#### 基础知识都知道, 在 ECMA2015 中 javascript 数据类型分为两种
- 基础类型: 比如Undefined, Null, Boolean, Number, String。
- 引用类型: 比如Object, Array, Function, Date等。
<!--more-->
---
#### javascript对不同的数据类型有不同的分配内存方式

 - 基础数据类型的值, 比较简单明了, 不会占据太大的内存控件, 一般是直接存放在栈内存中
 - 引用数据类型的值, 有时候根据业务场景会比较复杂, 所以不适合放在栈内存中, 所以引用数据存放在占内存中的只是一个对于该变量的值在堆内存中的一个引用地址
---
#### 既然内存的分配方式不同, 那么变量的查找机制肯定也是不同的

 - 基础数据类型的值占据的内存空间一般是固定的, 所以被存在栈中, 那么查找基础数据类型的时候, 比较迅速
 - 而引用类型的值比较复杂, 可能会比较庞大, 也有可能会比较小, 所以被存在堆内存中
  如果将引用类型的内存分配到栈内存中, 大小一直在变化, 会降低查找的效率, 当查找一个引用数据类型的变量的时候首先会找到存在栈内存中的一个位置, 这个位置存放着值在堆内存的引用地址, 然后根据这个地址去堆内存中去查找

---
 在《JavaScript高级程序设计》第三版 4.1.3，讲到传递参数：
> ECMAScript中所有函数的参数都是按值传递的。
也就是说，把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。

比如:
```
var value = 1;
function foo(v) {
    v = 2;
    console.log(v); //2
}
foo(value);
console.log(value) // 1
```
将 `value` 传递给 `foo` 函数后, 在函数内部改变了`v`的值, 但是没有改变外部`value`的值, 这就是按值传递

再看:

```
var obj = {
    value: 1
};
function foo(o) {
    o.value = 2;
    console.log(o.value); //2
}
foo(obj);
console.log(obj.value) // 2
```
将 `obj` 传递给 `foo` 函数后, 在函数内部改变了`o.value`的值,  这个时候外部的 `obj.value`同样被改变了,那么这时候 **把函数外部的值复制给函数内部的参数**这个说话就不成立了

---
#### 数据传递有三种

- 按值传递
- 引用传递
- 共享传递

第一个例子中就是按值传递, 将外部的值 copy 一份传递到函数内部, 改变值也是改变的 copy 过来的副本的值, 所以不会影响外部的变量的值
第二个例子中是引用传递, 因为上面讲到了变量值的内存分配方式和访问机制, 所以在第二个例子中, 函数外部的变量传递给函数内部后, 两个位置的变量保存的都是外部变量值都是从栈内存中找到的指向堆内存的地址, 所以在函数内部去修改 `obj`的时候, 外部也是指向的这个内存地址, 所以修改都都会发生变化

再看共享传递
```
var obj = {
    value: 1
};
function foo(o) {
    o = 2;
    console.log(o); //2
}
foo(obj);
console.log(obj.value) // 1
```
将 obj 传递给函数后在函数内部直接修改了 obj 的数据类型, 在上面修改 o.value 可以通过引用地址查找到引用地址去修改堆内存中的值, 但是直接修改`o`就不会去根据引用地址去查找原值进行修改, 所以外部没有发生变化
