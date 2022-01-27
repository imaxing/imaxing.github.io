
<h2 class="content-title">关于 JavaScript 中 this 的理解</h2>
<small class="content-date">2018-02-24 21:30:26</small>


#### 起步
> 首先,this的指向在函数定义的时候是确定不了的只有函数执行的时候才能确定this到底指向谁因为this的最终指向的是那个最后调用它的对象但是这么说也是有些问题存在
<!-- more -->


##### demo1 
 ```javascript
function a(){
  var name = 'axing';
  console.info(this.name); //undefined
  console.info(this); //Window
}
a(); 
// -> window.a();
 ```
 重点是看函数的调用者`window`全局调用`this`就指向了`window`, 这时候`window`下并没有`user`,所以值为`undefined`

---


 ##### demo2
```javascript
var obj = {
    name:'axing',
    fn:function(){
        console.info(this.name);  //axing
    }
}
obj.fn(); // -> 看此时的调用者是obj
```
按照开头所说`this`指向的是调用者的说法, 这个时候`this`指向的就是`obj`, 现在去找`obj.name`很显然就是`axing`在这个时候开头说的仍然是成立的

---

##### demo3
```javascript
var obj = {
    name:'axing',
    fn:function(){
        console.info(this.name);  //axing
    }
}
window.obj.fn();
```
跟上面的代码没有太大的区别在这段代码中,最终的调用者是`window`,按照上面说法`window`下是没有`name`的但是`this.name`还是输出了`axing`

---
```javascript
// 先看下面这段代码
var obj = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.info(this.a); // 12
        }
    }
}
obj.b.fn();
```
这里的最终调用者是`obj`,正常来说`this`应该指向了`obj`,此时obj的`name`值为10, 为什么没有输出10呢???
我自己理解的概念是这样的

> 1.在一个函数中,如果有`this`关键字,但是如果这个`this`没有被这个函数的上一级调用的话
这个时候`this`就会指向了`window`
2.相反,如果有`this`关键字并且`this`有被这个函数的上一级调用,`name`此时的`this`
就会指向上一级,反之指向`window`
3.如果函数中有`this`，并且函数中包含多个对象，尽管这个函数是被最外层的对象所调用，`this`指向的也是它上一级对象

---

```javascript
var obj = {
    a:10,
    b:{
        // a:12,
        fn:function(){
            console.info(this.a); //undefined
        }
    }
}
obj.b.fn();
```
这个时候输出`undefined`,说明this是去它的上一级寻找`this.a`

---

```javascript
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.info(this.a);
            console.info(this); 
        }
    }
}
var j = o.b.fn;     
j(); 
```
这个时候`j`是什么? 调用`j`会输出什么???  重点 -> 调用

---


##### 构造函数this
```javascript
function Person(){
    this.name = 'axing';
}
var a = new Person();
console.info(a.name); 
```
> 简单的实例一个对象  此时的`a.name`继承了`a`的构造函数原型上的`name`属性
因为去new一个对象时候会改变`this`的指向,并指向了实例化的对象
这个时候`a.name`就会去去实例化的对象上去寻找name属性,在实例化的对象的`__proto__`上并没有`name`属性,所以按照`js`构造函数的逻辑,实例化对象继承了构造函数`prototype`原型对象的`name`属性,这个时候继承的name值就是构造函数原型`prototype`原型对象上的`name`值`axing`
**这里涉及到了面向对象的继承**
继承就像是复制操作,去实例化一个对象的时候,会去继承构造函数上的属性和方法
只是在构造函数与实例化的对象之间创建一个关联
实例化的对象就可以通过委托访问构造函数的原型属性和方法
在实例化一个对象时候,实例化的对象会继承自己构造函数原型上的属性和方法
在实例化的对象上增加与构造函数相同的属性的话会覆盖原型上的属性

---


#### 当this碰到了return就出现了一些问题
1.
```javascript
function Person()  {  
    this.name = 'axing';  
    return {};
}
var a = new Person();  
console.log(a.name); //undefined
```
2.
```javascript
function Person()  {  
    this.name = 'axing';  
    return function(){}; 
}
var a = new Person();  
console.log(a.name); //undefined
```
3.
```javascript
function Person()  {  
    this.name = 'axing';  
    return 1; 
}
var a = new Person();  
console.log(a.name); //axing
```
如果返回值是一个对象，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例

---

```javascript
function Person(){  
    this.name = 'axing';  
    return null;
}
typeof null ???  -> object
var a = new Person();  
console.log(a.name);//axing

```
`null`在`js`是个比较特殊的对象,虽然值也是个对象,但是`this`遇到`null`仍然指向当前构造函数的实例对象

---

> 如有理解错误还请指出

#### 参考
  - [http://www.imooc.com/article/1758](http://www.imooc.com/article/1758)
