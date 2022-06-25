<template>
  <div>
    <template v-if="!watermark">
      <button @click="init">生成水印</button>
    </template>
    <template v-else>
      <button @click="watermark.toggle">切换显隐</button>&nbsp;
      <button
        @click="
          () => {
            watermark.destroy()
            watermark = null
          }
        "
      >
        销毁
      </button>
    </template>
  </div>
</template>

<script>
import watermark from '@iamgx/watermark'
export default {
  name: 'watermarkDemo',
  data: () => ({ watermark: null }),
  methods: {
    init() {
      if (this.watermark) return
      this.watermark = watermark({ text: '不困啊精神抖擞' })
    }
  }
}
</script>
