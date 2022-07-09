<template>
  <div>
    <img class="image-align-center" @click="imagePreview([proxyFunctionImage])" :src="proxyFunctionImage" /><br />
    <section v-for="(contents, index) in consoleList" :key="index">
      <button style="margin-right: 4px">{{ index + 1 }}.</button>
      <button style="margin-right: 4px" v-for="(content, contentIndex) in contents" :key="contentIndex">
        {{ content }}
      </button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ProxyFunction',
  data: () => ({
    consoleList: [],
    proxyFunctionImage: 'https://cdn.jsdelivr.net/gh/imaxing/cdn@1.0.8/image/proxy-function.png'
  }),
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
