---
title: 记录一次线上 bug

date: 2020-11-01 18:46:00

tags:

  - element-ui

  - el-upload

  - d.upload.addEventListeners is not a function
categories:
  - element-ui
---



 上线后的项目出现了 el-upload 组件上传没反应的问题, 浏览了一遍代码, 在开发环境也没有任何问题(这就很程序了)

仔细排查一波, 终于 catch 到了一个错误信息

```d.upload.addEventListeners is not a function```

 <!--more-->






>  经过 debug发现是从 element ui 的源码中报错了, 根据报错定位到 是内部的handleError 方法
>
> 因为组件被我重写了 http request上传方法, 所以所有的错误信息都是由我自己进行抛出的





![内网开发, 所以没办法截图, 手机拍摄](https://tva1.sinaimg.cn/large/0081Kckwgy1gk9vh17wmjj30u00u0kjm.jpg)

![](https://tva1.sinaimg.cn/large/0081Kckwgy1gk9vj2s7ruj31400u07wj.jpg)



> 可以看出, 在**uploadFunction**函数是我手动 catch 了上传请求, 在单文件上传调用的时候就进入了 catch, 开始以为是 **singleUpload** 请求出错了,但经过 debug 没有发现任何错误, 打印 error定位到 handleError 后, 发现是在 elementui 组件上传的方法中, **new XhrHttpRequest()**的实例变量**d** 调用**upload** 方法出错了



>  这种情况就很尴尬, 不好定位, 经过 google 有人提到是 **mockjs源码污染了函数**, 这让我很迷, 这还能扯到一块去???



> 一般mockjs 这种库就是做些接口 mock,只会在本地使用,但我所做的项目是基于**vue-element-admin**进行二次开发的
>
> 这个模板是开源的, 因为这个模板是发布在线上方便大家进行预览效果的,里面包含了一些登录,用户权限等基础功能,所以用到了一些接口
>

![](https://tva1.sinaimg.cn/large/0081Kckwgy1gk9vyn9qutj310o0g4q5f.jpg)





**既然找到了问题在哪了, 直接把判断取个反, process.env.NODE_ENV  === 'development'或者不需要 mockjs 的话直接删掉,重新打包即可, 经过测试解决问题**