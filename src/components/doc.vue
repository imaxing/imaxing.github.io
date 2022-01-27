<template>
  <div class="doc-item">
    <div v-html="doc.content" />
  </div>
</template>
<script>
export default {
  name: "Doc",
  props: ["doc"],
};
</script>

<style>
.doc-item {
  padding: 15px;
  position: relative;
  color: #333;
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
  max-width: 50%;
  display: block;
  cursor: pointer;
}
.content-date {
  font-size: 12px;
  color: #999;
}

.doc-item:not(:last-of-type) {
  margin: 0px auto 40px;
}
.markdown-body h2 {
  border-bottom: none !important;
}
.content-title {
  color: #444;
  font-size: 18px !important;
  position: relative;
  transition: 0.3s ease all;
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
</style>
