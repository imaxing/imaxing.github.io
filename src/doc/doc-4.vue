<template>
  <div>
    <markdown
      :content="
        $renderMarkdown(`
        
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

            styleNode.innerHTML = 
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
                // 此处的 canvas.toDataURL(), 替换成变量
                background: url(canvas.toDataURL()) repeat;
              }
            
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

        // 初始化
        window.watermaskIns = new WaterMask({ name: '测试水印' })

        // 控制切换
        window.watermaskIns.toggle()

        // 销毁
        window.watermaskIns.destroy()
      `)
      "
    />

    <div class="mgt10">
      <button class="primary-button" role="button" @click="init">
        生成水印
      </button>
      <button class="primary-button" role="button" @click="destroy">
        隐藏
      </button>
      <button class="primary-button" role="button" @click="toggle">切换</button>
    </div>

    <iframe
      src="https://codesandbox.io/embed/beautiful-proskuriakova-51u7w?fontsize=14&hidenavigation=1&theme=dark"
      style="
        width: 100%;
        height: 800px;
        border: 0;
        border-radius: 4px;
        overflow: hidden;
      "
      title="watermask"
      class="mgt10"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  </div>
</template>

<script>
import markdown from "@/components/markdown.vue";
import { WaterMask } from "@/utils";
export default {
  name: "WaterMaskDemo",
  components: { markdown, WaterMask },
  methods: {
    init() {
      window.watermaskIns = new WaterMask({ name: "一只小菜鸡" });
    },
    destroy() {
      window.watermaskIns.destroy();
    },
    toggle() {
      window.watermaskIns.toggle();
    },
  },
};
</script>
<style scoped>
.test-buttons {
  margin-top: 10px;
}
/* CSS */
</style>
