<template>
  <div>
    <button @click="init">生成水印</button>&nbsp;
    <button
      v-if="watermask"
      @click="
        () => {
          watermask.destroy()
          watermask = null
        }
      "
    >
      销毁</button
    >&nbsp;
    <button v-if="watermask" @click="watermask.toggle">隐藏</button>
  </div>
</template>

<script>
import watermark from '@iamgx/watermark'
export default {
  name: 'WaterMaskDemo',
  data: () => ({ watermask: null }),
  methods: {
    init() {
      this.watermask = watermark({ text: '前端小辣鸡' })
    }
  }
}
</script>
