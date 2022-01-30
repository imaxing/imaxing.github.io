<template>
  <div id="app">
    <div class="sidebar">
      <a v-for="(doc, index) in docs" :key="index" :href="'#' + doc.path">{{
        doc.title
      }}</a>
    </div>
    <div class="main">
      <doc
        v-for="(doc, index) in results.length > 0 ? results : docs"
        :key="index"
        :doc="doc"
        :id="doc.path"
      />
    </div>
  </div>
</template>

<script>

import docList from "@/data";
import doc from "@/components/doc";

export default {
  name: "App",
  components: { doc },
  data: () => ({ results: [], value: "", docs: [] }),
  mounted() {
    const docs = require.context("@/doc", true);
    this.docs = docList.map((doc) => ({
      ...doc,
      content: doc.type !== 'component' && docs(`./${doc.path}.md`),
    }));
    this.docs.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },
  methods: {
    
    getCurrentDoc() {
      this.results = this.value
        ? this.docs.filter((md) => md.content.includes(this.value))
        : [];
    },
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
.mgt10 {
  margin-top: 10px;
}
.mgb10 {
  margin-bottom: 10px;
}

.sidebar {
  width: 300px;
  height: 100vh;
  background: #fff;
  padding: 10px;
  transform: translateX(0px);
  color: #000;
  transition: all linear 0.3s;
  background: url("~@/bg.png") repeat #fff;
  position: fixed;
}
.sidebar a {
  color: #333;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}
.main {
  width: calc(100% - 300px);
  margin-left: 300px;
  overflow-y: auto;
  transition: all linear 0.3s;
  padding: 15px;
  color: #222;
}

@media (max-width: 767px) {
  .sidebar {
    transform: translateX(-100%);
  }
  .main {
    width: 100%;
    padding: 0;
    margin-left: 0px;
  }
}
</style>
