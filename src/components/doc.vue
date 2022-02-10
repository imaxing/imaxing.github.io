<template>
  <div ref="docItem" class="doc-item" v-bind="$attrs">
    <div>
      <h2 class="head">
        <a :href="`#${doc.path.replace(/\.|vue|md/g, '')}`">#</a>
        {{ doc.title }}
      </h2>
    </div>
    <div v-if="doc.description" class="doc-description">
      <component v-if="typeof doc.description === 'function'" :is="{ render: h => doc.description(h) }" />
      <template v-else>{{ doc.description }}</template>
    </div>

    <component :is="require(`@/doc/${doc.path}`).default" v-if="doc.path.endsWith('.vue')" />
    <markdown v-else :content="doc.content" />
    <p style="text-align: right">
      &nbsp;&nbsp;
      <small>{{ doc.date }}</small>
      &nbsp;&nbsp;
      <a href="javascript: void 0" class="print-hide" @click.stop="handlePrint"> 打印 </a>
    </p>
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
  position: relative;
  padding: 30px 0 40px;
}
.doc-item img {
  max-height: 300px;
  max-width: 100%;
  object-fit: contain;
  border: 1px solid #eee;
}
.doc-item:not(:first-of-type)::after {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: 0 20px;
  border-bottom: 1px solid #eee;
  content: '';
}
.doc-item h2.head {
  font-weight: 400;
}
.doc-item h2.head a {
  text-decoration: none;
}

.doc-item pre {
  position: relative;
  margin: 10px 0;
  max-height: 500px;
  overflow-y: auto;
}

.doc-item pre .copy {
  position: absolute;
  right: 14px;
  top: 14px;
  cursor: pointer;
  color: #fff;
}

.doc-description img {
  max-width: 50%;
  display: inline-block;
  margin: 0 4px;
}
</style>
