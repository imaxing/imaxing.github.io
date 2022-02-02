

#### 前言
接到需求是做一个优惠券的功能, 优惠券的卡片涉及到了内凹圆角的效果, 通过 box-shadow 实现一波, 实现后的效果图是这样滴
![实现后的效果图](https://tva1.sinaimg.cn/large/0082zybpgy1gc7upmo3vpj319x0u0te3.jpg)
<!--more-->

---

#### 我想到的思路是这样的
  - 首先上下分别一个div 拼成一块, 形成这样的效果
  ![](https://tva1.sinaimg.cn/large/0082zybpgy1gc7ust2zi8j30og0dct98.jpg)
  - 然后分别使用两个 div 的伪元素画两个圆定位在两个 div 对接的边上, 效果图看起来是这样滴
  ![](https://tva1.sinaimg.cn/large/0082zybpgy1gc7uzv6xfrj30ru0fcabg.jpg)
  - 注意这里的 div1, div2 不要给背景色, 效果图的背景颜色通过 box-shadow 的颜色进行覆盖进行实现, 然后伪元素的颜色给白色, *这里有一个缺点就是没能实现内凹透明的效果, 如果页面的底色不是白色, 那么需要手动修改伪元素 box-shadow 的颜色值进行同步才行*
---

#### 完整代码
```html
<!DOCTYPE html>
<html lang="ch">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style type="text/css">
        body {
            background: cyan;
            /* 圆角半径 */
            --radiusWidth: 18px;
            /*盒子宽度*/
            --box-width: 300px;
        }
        #app {
            width: var(--box-width);
            height: 200px;
            margin: 100px auto;
            position: relative;
            overflow: hidden;

        }
        #app > div {
            position: relative;
            width: 100%;
            height: 50%;
            overflow: hidden;
        }
        #app > div > span {
            position: relative;
            z-index: 200;
            display: block;
            /* 内容两边不要超过圆角 */
            width: calc(var(--box-width) - var(--radiusWidth) * 2);
            margin: 0 auto;
            height: 100%;
        }

        #app .top::after,
        #app .bottom::after,
        #app .top::before,
        #app .bottom::before {
            position: absolute;
            width: calc(var(--radiusWidth) * 2);
            height: calc(var(--radiusWidth) * 2);
            border-radius: 50%;
            z-index: 10;
            content: '';
        }

        #app .top::after, #app .top::before {
            bottom: calc(var(--radiusWidth) * -1);
            box-shadow: 1px 0px 7px 250px RGBA(247, 140, 108, 1.00);
        }
        #app .bottom::after, #app .bottom::before {
            top: calc(var(--radiusWidth) * -1);
            box-shadow: 1px 0px 7px 250px #aaa;
        }

        #app .top::after {
            left: calc(var(--radiusWidth) * -1);
        }
        #app .top::before {
            right: calc(var(--radiusWidth) * -1);
        }
        #app .bottom::after {
            left: calc(var(--radiusWidth) * -1);
        }
        #app .bottom::before {
            right: calc(var(--radiusWidth) * -1);
        }
    </style>
</head>
<body>
    <div id="app">
        <div class="top">
            <!-- 内容 -->
            <span>123</span>
        </div>
        <div class="bottom">
            <!-- 内容 -->
            <span>456</span>
        </div>
    </div>
</body>
</html>
```
