
<h2 class="content-title">解决momentjs使用webpack打包文件过大的问题</h2>
<small class="content-date">2020-03-06 18:28:36</small>


```javascript
# 在 webpack 的 plugins 配置中导入此配置即可
new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
```

