<h2 class="content-title">javascript 中的执行上下文</h2>
<small class="content-date">2018-02-24 21:50:22</small>


#### 起步
> 当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出

---

#### 执行上下文创建过程
- 进入函数上下文创建变量对象
- 函数上下文的变量对象叫做 (activation Object, AO)
- 函数上下文的变量对象初始化只包括`arguments`
- 进入了函数上下文, 变量对象才会被激活, 变量对象中的属性才可以访问
- 变量对象: `arguments`, `函数的形参`, `函数声明 var fun = function(){}`, `局部变量`
<!--more-->
---

#### 作用域链
由多个执行上下文的变量对象构成的链表就叫做作用域链。函数有一个内部属性 [[scope]]，当函数创建的时候，就会保存所有父变量对象到其中, [[scope]] 就是所有父变量对象的层级链
函数执行之前先创建一个 AO, 这个 AO 会被压入作用域链顶端,而函数的 scope 属性会被连接到后续的对象, 所以查找顺序是先从 AO 开始查找


```javascript
var scope = "global scope";
function checkscope(){
    var scope2 = 'local scope';
    return scope2;
}
checkscope();
```

##### 创建 `checkscope` 函数, 将父变量对象保存到内部`[[scope]]`属性

```
checkscope.[[scope]] = [
    globalContext.VO
]
```

##### 执行 `checkscope` 函数, 创建执行上下文, 将创建的上下文压入栈

```
ECStack = [
    checkscopeContext,
    globalContext
]
```

##### 复制函数 `[[scope]]`属性创建作用域链
checkscope执行的时候，会复制这个作用域链，作为自己作用域链的初始化
```
checkscopeContext = {
Scope: checkscope.[[scope]],
}
```
##### 初始化变量对象, 加入形参, 函数声明, 变量声明, 根据环境生成变量对象.
```
checkscopeContext = {
	AO: {
		arguments: {
			length: 0
		},
		scope2: undefined
	},
	Scope: checkscope.[[scope]]
}
```

##### 然后将这个变量对象，添加到这个复制的作用域链，这才完整的构建了自己的作用域链。
```
checkscopeContext = {
	AO: {
		arguments: {
			length: 0
		},
		scope2: undefined
	},
	Scope: [AO, checkscope.[[scope]]]
}
```

---
#### 总结
    - 创建函数, 保存父级变量到内部属性scope
    - 函数执行, 创建函数执行上下文, 将上下文压入执行上下文栈
    - 函数上下文初始化
      1. 复制函数的 scope 属性初始化作用域链
      2. 使用 arguments 创建 AO
      3. 初始化 AO
      4. 将 AO 压入作用域链顶端
      5. 函数执行完毕, 释放 AO, 函数执行上下文被弹出

#### 参考
 - [https://github.com/mqyqingfeng/Blog/issues/4](https://github.com/mqyqingfeng/Blog/issues/4)
 
 > 如有理解错误烦请指出