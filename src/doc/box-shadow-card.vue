<template>
  <div>
    <markdown>
      <h4>需求</h4>
      <blockquote>
        <p>做一个优惠券的卡片功能, 优惠券的卡片涉及到了内凹圆角的效果, 通过 box-shadow 实现</p>
      </blockquote>
      <h4>思路</h4>
      <blockquote>
        <p>
          首先上下分别一个div 拼成一块, 形成这样的效果, 然后分别使用两个 div 的伪元素画两个圆定位在两个 div 对接的边上
          注意这里的 div1, div2 不要给背景色, 效果图的背景颜色通过 box-shadow 的颜色进行覆盖进行实现,
          然后伪元素的颜色给白色 这里有一个缺点就是没能实现内凹透明的效果, 如果页面的底色不是白色,
          那么需要手动修改伪元素 box-shadow 的颜色值进行同步才行
        </p>
      </blockquote>
    </markdown>
    <div id="card-app">
      <div class="top" />
      <div class="bottom" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Doc7'
}
</script>
<style type="text/css">
#card-app {
  /* 圆角半径 */
  --radiusWidth: 18px;
  /*盒子宽度*/
  --box-width: 300px;
  width: var(--box-width);
  height: 200px;
  margin: 100px auto;
  position: relative;
  overflow: hidden;
}
#card-app > div {
  position: relative;
  width: 100%;
  height: 50%;
  overflow: hidden;
}
#card-app > div > span {
  position: relative;
  z-index: 200;
  display: block;
  /* 内容两边不要超过圆角 */
  width: calc(var(--box-width) - var(--radiusWidth) * 2);
  margin: 0 auto;
  height: 100%;
}

#card-app .top::after,
#card-app .bottom::after,
#card-app .top::before,
#card-app .bottom::before {
  position: absolute;
  width: calc(var(--radiusWidth) * 2);
  height: calc(var(--radiusWidth) * 2);
  border-radius: 50%;
  z-index: 10;
  content: '';
}

#card-app .top::after,
#card-app .top::before {
  bottom: calc(var(--radiusWidth) * -1);
  box-shadow: 1px 0px 7px 250px RGBA(247, 140, 108, 1);
}
#card-app .bottom::after,
#card-app .bottom::before {
  top: calc(var(--radiusWidth) * -1);
  box-shadow: 1px 0px 7px 250px #aaa;
}

#card-app .top::after {
  left: calc(var(--radiusWidth) * -1);
}
#card-app .top::before {
  right: calc(var(--radiusWidth) * -1);
}
#card-app .bottom::after {
  left: calc(var(--radiusWidth) * -1);
}
#card-app .bottom::before {
  right: calc(var(--radiusWidth) * -1);
}
</style>
