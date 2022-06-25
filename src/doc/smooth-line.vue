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
    <div style="display: flex;">
      <canvas ref="canvas"></canvas>&nbsp;
      <canvas ref="redrawCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import SmoothLine from '@iamgx/smooth-line'

const eventFormat = e => {
  return {
    cx: e.offsetX,
    cy: e.offsetY,
    touches: []
  }
}
const useMouse = ({ el, onMove, onStart, onEnd }) => {
  if (!el) return

  let isTouchStart = false
  let startPoint = null

  const start = () => {
    stop()
    el.addEventListener('mousedown', onTouchStart, false)
    el.addEventListener('mousemove', onTouchMove, false)
    el.addEventListener('mouseup', onTouchEnd, false)
  }

  const stop = () => {
    el.removeEventListener('mousedown', onTouchStart, false)
    el.removeEventListener('mousemove', onTouchMove, false)
    el.removeEventListener('mouseup', onTouchEnd, false)
  }

  const onTouchStart = e => {
    e.preventDefault()
    isTouchStart = true
    startPoint = eventFormat(e)
    onStart && onStart({ event: startPoint, start: startPoint })
  }
  const onTouchEnd = e => {
    isTouchStart = false
    onEnd && onEnd(e)
  }
  const onTouchMove = e => {
    e.preventDefault()
    if (!isTouchStart) return
    onMove && onMove({ event: eventFormat(e), start: startPoint })
  }
  start()
  return stop
}

export default {
  data: () => ({
    color: '#000',
    colors: ['#000', '#e93423', '#fffd56', '#6ffa4c', '#0024f5', '#e6db74', 'purple']
  }),
  mounted() {
    this.$refs.canvas.width = 400
    this.$refs.canvas.height = 400
    this.$refs.redrawCanvas.width = 400
    this.$refs.redrawCanvas.height = 400

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
      onStart: ({ event }) => {
        smoothLineInstance.onSmoothLineInit({ ...event, t: Date.now() })
        smoothLineReDrawInstance.onSmoothLineInit({ ...event, t: Date.now() })
      },
      onMove: ({ event }) => {
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
