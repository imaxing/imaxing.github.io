---
title: vue组件库共存开发导致编译错误的解决过程
date: 2020-04-14 18:46:31
categories: 
  - vue
  - element-ui
  - ant-design-vue
tags: 
  - vue
  - element-ui
  - ant-design-vue
  - $attr is readonly
  - $listeners is readonly
---

![ant-design-vue](https://vuejsexamples.com/content/images/2016/08/20160827214833.jpg)


**在 vue 组件库中, elementUI 是一个质量相对很高的组件库了, 组件比较全面也很好用
但在我使用`el-dialog`与`el-drawer`组件的并且出现多级嵌套的时候问题就来了, 经常遇到遮罩层无法关闭, 子弹窗在父弹窗的下面的情况, 也查了很多遍官方文档, 例如官方文档是使用 `append-to-body`与`modal-append-to-body`去解决这个问题, 但仍然无法根治, 但是项目初期就是选择的 `elementUI` 的组件库, 目前想去替换掉的话显然是不现实的, 所以只好考虑兼容的办法, 单独定义弹窗和抽屉组件到自己的组件库中进行使用**

<!--more-->

**先贴出错误截图**

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gdthydia7sj31380d4q3x.jpg)

遇到这个问题的时候我也是一脸懵逼, 正常来讲 $attrs与$listeners 是动态绑定属性不会去进行修改操作的,  为何 vue 会提示这个警告?? 于是我进行资料查询

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gdti3f2y5ij307i04n3yr.jpg)


首先找到了这个文章看了下

[Vue 踩坑： [Vue warn]: $attrs is readonly，[Vue warn]: $listeners is readonly](https://juejin.im/post/5d5b8959f265da039b249b2f)

这个大佬遇到的问题是出现了两次去 new Vue 的操作, 但是我并没有这个操作, 所以直接抬走下一个


---
然后在 elementUI 的 issues 里面找到一个类似问题

[#7690](https://github.com/ElemeFE/element/issues/7690)

有个大佬说是多个组件库混用导致的, 这可不就是我的情况吗~~
![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gdti8kogokj30mj06vq3t.jpg)

看提到的解决办法把 ant-design-vue 加入到模块白名单列表就完事了, 可是我特么找遍 webpack 文档也没找到 `whiteListedModules`配置字段
![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gdtib7nqkcj30kt0afab2.jpg)
仔细一看原来是 `electron-vue`的配置, 然后我查了下其实这个字段就是webpack 中的 externals 配置
, 继续查(问大佬)~

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gdtie1poqpj30j60ccabs.jpg)
![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gdtier1ugmj30km0aujs8.jpg)


看到这些人说的其实还是跟第一个掘金大佬遇到的情况是相同的, 解决办法就是统一下 vue 的加载路径, 试一下在 vue.config.js 加入下面的配置

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gdtihkxrgwj30vw0fyjtk.jpg)


重新跑一下还真特么解决了

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gdtiitr8q7j306o06owey.jpg)