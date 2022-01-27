---
title: 解决npm安装node-sass依赖过慢的问题
date: 2020-03-06 18:33:04
tags: 
 - npm
---


**这种一般是 npm 从国外下载比较慢, 更新成国内的就可以了**



```bash
# npm
npm config set sass-binary-site 
http://npm.taobao.org/mirrors/node-sass
```


```bash
# yarn
yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass
```
<!-- more -->
