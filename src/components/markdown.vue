<template>
  <div v-if="content" v-html="content.replace(/<pre>/g, copyEL)" v-highlight class="markdown-body" />
  <div v-else-if="$slots.default" class="markdown-body">
    <component
      v-for="(vnode, index) in $slots.default"
      :key="index"
      :is="{ render: h => h(vnode.tag, vnode.children) }"
    />
  </div>
</template>
<script>
import copyText from '@iamgx/easy-copy'
export default {
  name: 'Markdown',
  data: () => ({ copyEL: `<pre><span class="copy">复制</span>` }),
  props: {
    content: {
      type: String,
      default: null,
      required: false
    }
  },
  directives: {
    highlight: el => {
      el.querySelectorAll('pre code').forEach(block => {
        window.hljs && window.hljs.highlightElement(block)
      })
    }
  },
  mounted() {
    this.$nextTick(this.initCopyCode)
  },
  methods: {
    initCopyCode() {
      let pre = document.querySelectorAll('pre')
      for (let i = 0; i < pre.length; i++) {
        const preItem = pre[i]
        const copyEl = preItem.querySelector('.copy')
        const codeEl = preItem.querySelector('code')
        copyEl.onclick = () => {
          copyText(codeEl.innerHTML.replace(/<\/?.+?>/g, ''))
          copyEl.innerText = '复制成功'
          const timer = setTimeout(() => {
            copyEl.innerText = '复制'
            clearTimeout(timer)
          }, 2000)
        }
      }
    }
  }
}
</script>
<style>
.markdown-body {
  --color-canvas-default: transparent;
  --color-fg-default: #222;
  --color-fg-muted: #222;
  --color-canvas-subtle: #222;
}
.markdown-body pre code {
  padding: 0;
}
</style>
