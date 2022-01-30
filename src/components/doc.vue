<template>
  <div class="doc-item" v-bind="$attrs">
    <div>
      <h2 class="content-title">{{ doc.title }}</h2>
      <small class="content-date">{{ doc.date }}</small>
    </div>
    <component :is="require(`@/doc/${doc.path}.vue`).default" v-if="doc.type === 'component'" />
    <markdown v-else :content="doc.content" />
  </div>
</template>
<script>
import markdown from '@/components/markdown.vue'
export default {
  name: "Doc",
  props: ["doc"],
  components: { markdown }
};
</script>

<style>
.doc-item {
  padding: 15px;
  position: relative;
  height: auto;
}
.doc-item:not(:first-of-type)::after {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: 0 20px;
  display: block;
  border-bottom: 1px solid #f6f6f6;
  content: "";
}
.doc-item img {
  max-width: 80%;
  display: block;
  cursor: pointer;
  margin: 20px auto 0;
}

.content-date {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
  display: block;
}

.doc-item:not(:last-of-type) {
  margin: 0px auto 40px;
}
.markdown-body h2 {
  border-bottom: none !important;
}
.content-title {
  font-size: 18px;
  position: relative;
  transition: 0.3s ease all;
  margin-bottom: 10px;
}

.doc-item pre {
  position: relative;
 
}
.markdown-body>:first-child {
 margin-top: 15px !important;
}

.doc-item pre .copy {
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
  color: #fff;
}

@media (max-width: 767px) {
  .doc-item img {
    width: 100%;
    max-width: none;
  }
}
</style>
