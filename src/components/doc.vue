<template>
  <div ref="docItem" class="doc-item" v-bind="$attrs">
    <div>
      <h2 class="content-title">
        <a class="anchor" :href="`#${doc.path.replace(/\.|vue|md/g, '')}`">#</a>
        {{ doc.title }}
      </h2>
      <p>
        <small>{{ doc.date }}</small>
        &nbsp;&nbsp;
        <small class="print-doc" style="text-decoration: underline; cursor: pointer" @click="handlePrint"> 打印 </small>
      </p>
      <br />
    </div>
    <component :is="require(`@/doc/${doc.path}`).default" v-if="doc.path.endsWith('.vue')" />
    <markdown v-else :content="doc.content" />
  </div>
</template>
<script>
import quickPrint from '@iamgx/quick-print'
import getAllCss from '@iamgx/get-all-css'

export default {
  name: 'Doc',
  props: ['doc'],
  methods: {
    async handlePrint() {
      const style = await getAllCss()
      quickPrint(this.$refs.docItem.innerHTML, {
        style: `${style} .print-doc {display: none}`
      })
    }
  }
}
</script>

<style>
.doc-item {
  padding: 15px;
  position: relative;
  height: auto;
  overflow-x: hidden;
}
.doc-item:not(:first-of-type)::after {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: 0 20px;
  display: block;
  border-bottom: 1px solid #f6f6f6;
  content: '';
}

.doc-item:not(:last-of-type) {
  margin: 0px auto 40px;
}
.markdown-body h2 {
  border-bottom: none !important;
}
.content-title {
  position: relative;
  margin-bottom: 10px;
}

.anchor {
  text-decoration: none;
  color: #000;
}

.doc-item pre {
  position: relative;
}

.doc-item pre .copy {
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
  color: #fff;
}
@media (max-width: 767px) {
  .print-doc {
    display: none;
  }
}
</style>
