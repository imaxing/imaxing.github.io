<template>
  <div>
    <div class="colors">
      <span
        class="color-item"
        :class="{ 'iconfont active': color === c }"
        @click="color = c"
        :style="{ background: c }"
        v-for="c in colors"
        :key="c"
      />
      <button @click="() => imagePreview([$refs.canvas.toDataURL('image/png')])">生成图片</button>
      <button @click="drawJavascript">回放测试数据</button>
    </div>
    <canvas ref="canvas"></canvas>
    <canvas ref="redrawCanvas"></canvas>
  </div>
</template>

<script>
import SmoothLine from '@iamgx/smooth-line'
import useMouse from '@iamgx/use-mouse'
const eventFormat = e => {
  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
  return isMobile
    ? {
        cx: e.touches[0].clientX,
        cy: e.touches[0].clientY,
        pageX: e.touches[0].pageX,
        pageY: e.touches[0].pageY,
        touches: e.touches
      }
    : {
        cx: e.offsetX,
        cy: e.offsetY,
        touches: []
      }
}

export default {
  data: () => ({
    color: '#e93423',
    colors: ['#000', '#e93423', '#fffd56', '#6ffa4c', '#0024f5', '#e6db74', 'purple']
  }),
  methods: {
    drawJavascript() {
      const points = window.getMockPoints()
      let index = 0
      const [start, ...rest] = points
      this.smoothLineReDrawInstance.onSmoothLineInit(start)
      this.smoothLineInstance.onSmoothLineInit(start)
      const timer = setInterval(() => {
        if (index < rest.length) {
          ++index
          rest[index] &&
            this.smoothLineReDrawInstance.onSmoothLineDrawing({
              ...rest[index],
              color: this.color
            })
          rest[index] && this.smoothLineInstance.onSmoothLineDrawing(rest[index])
        } else {
          clearInterval(timer)
          this.smoothLineReDrawInstance.points = []
          this.smoothLineInstance.points = []
          return
        }
      }, 30)
    }
  },
  mounted() {
    const width = document.querySelector('#app').getBoundingClientRect().width
    this.$refs.canvas.width = width - 50
    this.$refs.canvas.height = width / 2
    this.$refs.redrawCanvas.width = width - 50
    this.$refs.redrawCanvas.height = width / 2

    this.smoothLineInstance = new SmoothLine({
      canvas: this.$refs.canvas,
      color: '#000'
    })
    this.smoothLineReDrawInstance = new SmoothLine({
      canvas: this.$refs.redrawCanvas,
      color: '#000'
    })
    this.$watch('color', color => {
      this.smoothLineInstance.color = color
      this.smoothLineReDrawInstance.color = color
    })

    useMouse({
      el: this.$refs.canvas,
      onStart: e => {
        const event = eventFormat(e)
        this.smoothLineInstance.onSmoothLineInit({ ...event, t: Date.now() })
        this.smoothLineReDrawInstance.onSmoothLineInit({ ...event, t: Date.now() })
      },
      onMove: e => {
        const event = eventFormat(e)
        event.t = Date.now()
        this.smoothLineInstance.onSmoothLineDrawing(event)
        this.smoothLineReDrawInstance.onSmoothLineDrawing(event)
      },
      onEnd: () => {
        this.smoothLineInstance.points = []
        this.smoothLineReDrawInstance.points = []
      }
    })
  }
}
</script>

<style scoped>
canvas {
  box-shadow: 0 0 0 1px #ddd;
  max-width: 100vw;
  background-color: #fff;
}
.colors {
  max-width: 500px;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;
}
.colors .color-item {
  width: 30px;
  height: 30px;
  margin-right: 6px;
  border-radius: 6px;
  cursor: pointer;
}

.color-item.active {
  color: #fff;
  box-shadow: 0 0 0 1px #000;
}
</style>
