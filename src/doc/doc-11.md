

<!--more-->

问题场景:

某业务页面, 在页面 mounted 生命周期内基于 bridge 注入的 token 信息加载数据

由于不确定 token 注入的时间节点, 页面在 mounted 加载数据在 token 注入之前发起了数据请求

由于 token 还未注入成功, 所以发生 401 权限认证报错

解决前代码

```

// token 注入

native_data_injection()




// 页面

created() {
  this.init()
}

```

解决办法:

在 bridge token 注入时候, 通过发布订阅者模式, 派发一个 token set 事件, 当页面接收到通知重新基于 token 数据发起数据请求即可

解决后代码

```

// 页面初始化, 客户端注入 token
native_data_injection((data) => {
  const timer = setTimeout(() => {
  emitter.$emit('token-set', token)
  timer && clearTimeout(timer)

  }, 100)
})




// 页面

created() {
  const token = getToken()
  !token && emitter.$on('token-set', this.init)
  this.init()
}

```
