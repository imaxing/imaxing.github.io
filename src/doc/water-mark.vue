<template>
  <div>
    <a target="_blank" href="https://www.npmjs.com/package/@iamgx/watermark"> npm仓库 </a>,
    <a target="_blank" href="https://github.com/imaxing/watermark"> github仓库 </a>,
    <a href="javascript: void 0" @click.stop="init">点这里生成水印看看</a>
    <a
      href="javascript: void 0"
      v-if="watermask"
      @click.stop="
        () => {
          watermask.destroy()
          watermask = null
        }
      "
    >
      销毁
    </a>
    <a href="javascript: void 0" v-if="watermask" @click.stop="watermask.toggle"> 切换 </a>

    <a
      target="_blank"
      href="https://codesandbox.io/embed/watermark-example-e0n2v?fontsize=14&hidenavigation=1&theme=dark"
    >
      <img alt="Edit element-ui-theme-set-example" src="https://codesandbox.io/static/img/play-codesandbox.svg" />
    </a>
  </div>
</template>

<script>
import watermark from '@iamgx/watermark'
export default {
  name: 'WaterMaskDemo',
  data: () => ({ watermask: null }),
  methods: {
    init() {
      this.watermask = watermark({ text: '一只小菜鸡' })
    }
  }
}
</script>
