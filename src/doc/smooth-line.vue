<template>
  <div>
    <a target="_blank" href="https://github.com/linjc/smooth-signature">源代码库主页</a> <br />
    将原有代码的逻辑与canvas进行解耦, 满足多层画布重新绘制的需求 <br />
    <div class="colors">
      <span
        class="color-item"
        :class="{ 'iconfont active': color === c }"
        @click="color = c"
        :style="{ background: c }"
        v-for="c in colors"
        :key="c"
      />
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
    color: '#000',
    colors: ['#000', '#e93423', '#fffd56', '#6ffa4c', '#0024f5', '#e6db74', 'purple']
  }),
  mounted() {
    const width = document.querySelector('#app').getBoundingClientRect().width
    this.$refs.canvas.width = width - 50
    this.$refs.canvas.height = width / 2
    this.$refs.redrawCanvas.width = width - 50
    this.$refs.redrawCanvas.height = width / 2

    const smoothLineInstance = new SmoothLine({
      canvas: this.$refs.canvas,
      color: '#000'
    })
    const smoothLineReDrawInstance = new SmoothLine({
      canvas: this.$refs.redrawCanvas,
      color: '#000'
    })
    this.$watch('color', color => {
      smoothLineInstance.color = color
      smoothLineReDrawInstance.color = color
    })

    useMouse({
      el: this.$refs.canvas,
      onStart: e => {
        const event = eventFormat(e)
        smoothLineInstance.onSmoothLineInit({ ...event, t: Date.now() })
        smoothLineReDrawInstance.onSmoothLineInit({ ...event, t: Date.now() })
      },
      onMove: e => {
        const event = eventFormat(e)
        event.t = Date.now()
        smoothLineInstance.onSmoothLineDrawing(event)
        smoothLineReDrawInstance.onSmoothLineDrawing(event)
      },
      onEnd: () => {
        smoothLineInstance.points = []
        smoothLineReDrawInstance.points = []
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
  max-width: 300px;
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
