<template>
  <div>
    <a target="_blank" href="https://www.npmjs.com/package/@iamgx/watermark">
      <button class="primary-button" role="button" @click="init">npm地址</button>
    </a>
    <button class="primary-button" role="button" @click="init">生成水印</button>
    <button
      v-if="watermask"
      class="primary-button"
      role="button"
      @click="
        () => {
          watermask.destroy()
          watermask = null
        }
      "
    >
      销毁
    </button>
    <button
      v-if="watermask"
      class="primary-button"
      role="button"
      @click="
        () => {
          watermask.toggle()
        }
      "
    >
      切换
    </button>

    <button class="primary-button" role="button" @click="showCodesandbox = true">view codesandbox</button>
    <iframe
      v-if="showCodesandbox"
      src="https://codesandbox.io/embed/beautiful-proskuriakova-51u7w?fontsize=14&hidenavigation=1&theme=dark"
      style="width: 100%; height: 800px; border: 0; border-radius: 4px; overflow: hidden"
      title="watermask"
      class="mgt10"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  </div>
</template>

<script>
import watermark from '@iamgx/watermark'
export default {
  name: 'WaterMaskDemo',
  data: () => ({ watermask: null, showCodesandbox: false }),
  methods: {
    init() {
      this.watermask = watermark({ text: '一只小菜鸡' })
    }
  }
}
</script>
