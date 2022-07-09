<template>
  <div>
    <img class="image-align-center" @click="imagePreview([proxyFunctionImage])" :src="proxyFunctionImage" /><br />

    <button @click="copyConsoleTestCode">{{ copyed ? '已复制' : `复制console.log('hello world')` }}</button>

    <section v-for="(contents, index) in consoleList" :key="index">
      <button style="margin-right: 4px">{{ index + 1 }}.</button>
      <button style="margin-right: 4px" v-for="(content, contentIndex) in contents" :key="contentIndex">
        {{ content }}
      </button>
    </section>
  </div>
</template>

<script>
import easyCopy from '@iamgx/easy-copy'
export default {
  name: 'ProxyFunction',
  data: () => ({
    consoleList: [],
    copyed: false,
    proxyFunctionImage: 'https://cdn.jsdelivr.net/gh/imaxing/cdn@1.0.8/image/proxy-function.png'
  }),
  methods: {
    copyConsoleTestCode() {
      easyCopy(`console.log('hello world')`)
      this.copyed = true
      setTimeout(() => {
        this.copyed = false
      }, 2000)
    }
  },
  mounted() {
    const _this = this
    window.console.log = new Proxy(window.console.log, {
      apply(target, context, args) {
        target.call(context, ...args)
        _this.consoleList.push(args)
      }
    })
  }
}
</script>
