---
title: 解决momentjs使用webpack打包文件过大的问题
date: 2020-03-06 18:28:36
tags: 
 - webpack
---


```javascript
# 在 webpack 的 plugins 配置中导入此配置即可
new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
```

