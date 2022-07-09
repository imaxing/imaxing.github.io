<template>
  <div ref="docItem" class="doc-item" v-bind="$attrs">
    <h2 v-if="doc.title" class="title">
      <a :href="`#${doc.path.replace(/\.|vue|md/g, '')}`">#</a>
      {{ doc.title }}
    </h2>

    <h3 class="description" v-if="doc.description">{{ doc.description }}</h3>

    <component :is="require(`@/doc/${doc.path}`).default" v-if="doc.path && doc.path.endsWith('.vue')" />
    <markdown v-else :content="doc.content" />

    <div class="info">
      <quick-icon class="print-hide" v-if="doc.date">{{ doc.date }}</quick-icon>
      <span>
        <quick-icon class="print-hide" v-if="doc.github" icon="icon-github" :href="doc.github" />
        <quick-icon class="print-hide" v-if="doc.npm" icon="icon-npm" :href="doc.npm" />
        <quick-icon class="print-hide" v-if="doc.sandbox" icon="icon-CodeSandbox" :href="doc.sandbox" />
        <quick-icon
          class="print-hide"
          v-if="doc.print"
          @click="quickPrint($refs.docItem.innerHTML)"
          icon="icon-print"
        />
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Doc',
  props: ['doc']
}
</script>

<style>
.doc-item {
  position: relative;
  padding: 10px 0;
  margin: 10px auto 0;
  border-bottom: 1px solid #eee;
  color: #555;
}

.doc-item img {
  max-height: 300px;
  max-width: 100%;
  object-fit: contain;
}

.doc-item .title {
  color: #222;
  font-size: 1.5em;
  font-weight: 400;
  position: relative;
}
.doc-item .title:hover a {
  opacity: 1;
}
.doc-item .title a {
  position: absolute;
  left: -30px;
  width: 28px;
  height: 100%;
  text-align: center;
  top: 0;
  text-decoration: none;
  opacity: 0;
}

.doc-item .description {
  margin: 15px 0;
}

.doc-item .info {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
</style>
