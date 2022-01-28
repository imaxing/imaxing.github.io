<template>
  <div id="app">
    <div class="sidebar">
      <a v-for="(doc, index) in docs" :key="index" :href="'#' + doc.path">{{
        doc.title
      }}</a>
    </div>
    <div class="main markdown-body">
      <doc
        v-for="(doc, index) in results.length > 0 ? results : docs"
        :key="index"
        :doc="doc"
      />
    </div>
  </div>
</template>

<script>
import { copyText } from "@/utils";
import docList from "@/data";
import Doc from "@/components/doc";

export default {
  name: "App",
  components: { Doc },
  data: () => ({ results: [], value: "", docs: [] }),
  mounted() {
    const docs = require.context("@/doc", true);
    this.docs = docList.map((doc) => ({
      ...doc,
      content: docs(`./${doc.path}.md`).replace(
        /<pre>/g,
        `<pre><span class="copy">复制</span>`
      ),
    }));
    this.docs.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    this.$nextTick(this.initCopyFeat);
  },
  methods: {
    initCopyFeat() {
      let pre = document.querySelectorAll("pre");
      for (let i = 0; i < pre.length; i++) {
        const preItem = pre[i];
        const copyEl = preItem.querySelector(".copy");
        const codeEl = preItem.querySelector("code");
        window.hljs.highlightBlock(preItem.querySelector("code"));
        copyEl.onclick = () => {
          copyText(codeEl.innerHTML.replace(/<\/?.+?>/g, ""));
          copyEl.innerText = "复制成功";
          const timer = setTimeout(() => {
            copyEl.innerText = "复制";
            clearTimeout(timer);
          }, 2000);
        };
      }
    },
    getCurrentDoc() {
      this.results = this.value
        ? this.docs.filter((md) => md.content.includes(this.value))
        : [];
      this.$nextTick(this.initCopyFeat);
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
