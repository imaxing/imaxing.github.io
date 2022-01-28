


**先上完整代码**

``````javascript
class WaterMask {
  constructor(props) {
    props && this.init(props)
  }

  init(options) {
    const canvas = document.createElement('canvas')
    const styleNode = document.createElement('style')
    const headNode = document.querySelector('head')

    canvas.width = 250
    canvas.height = 80
    styleNode.setAttribute('type', 'text/css')

    document.body.appendChild(canvas)
    const context = canvas.getContext('2d')
    context.font = '15px Arial'
    context.textAlign = 'center'
    context.rotate(-15 * Math.PI / 180)
    context.fillText(options.name, canvas.width / 2, canvas.height)

    styleNode.innerHTML = `
      body.wm::after {
        position: fixed;
        content: '';
        left: -50px;
        top: -50px;
        width: 150vw;
        height: 100vh;
        transform: scale(1);
        opacity: 0.1;
        z-index: 99999999999999999;
        pointer-events: none;
        background: url(${canvas.toDataURL()}) repeat;
      }
    `
    headNode.appendChild(styleNode)
    document.body.removeChild(canvas)
    document.body.classList.add('wm')
  }

  destroy() {
    document.body.classList.remove('wm')
  }
  toggle() {
    document.body.classList.toggle('wm')
  }
}

 window.watermaskIns = new WaterMask({ name: '测试水印' })
``````





**关闭**

``````javascript
 window.watermaskIns.destroy()
``````





**切换显示**

``````javascript
 window.watermaskIns.toggle()
``````



**效果图**

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnyrt6btm6j31c00u04qp.jpg)





> 代码比较简单可以自行扩展, 谢谢观看


