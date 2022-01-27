<template>
  <div id="app" class="markdown-body">
    <doc
      v-for="doc in results.length > 0 ? results : docs"
      :key="doc.name"
      :doc="doc"
    />
  </div>
</template>

<script>
function copyText(content) {
  if (!content) return;

  let eleTextarea = document.querySelector("#tempTextarea");
  if (!eleTextarea && !navigator.clipboard) {
    eleTextarea = document.createElement("textarea");
    eleTextarea.style.width = 0;
    eleTextarea.style.position = "fixed";
    eleTextarea.style.left = "-999px";
    eleTextarea.style.top = "10px";
    document.body.appendChild(eleTextarea);
  }

  const funCopy = function (text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      eleTextarea.value = text;
      eleTextarea.select();
      document.execCommand("copy", true);
    }
  };

  funCopy(content);
}
import Doc from "@/components/doc";
export default {
  name: "App",
  components: { Doc },
  data: () => ({ results: [], value: "", docs: [] }),
  mounted() {
    const docs = require.context("@/doc", true, /\.md$/);
    const mds = docs.keys().map((key) => ({
      name: key.replace(/(\.\/|\.md)/g, ""),
      content: docs(key).replace(
        /<pre>/g,
        `<pre><span class="copy">复制</span>`
      ),
    }));
    this.docs = mds;

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
  margin: 20px auto;
  max-width: 1000px;
  background: #fff;
  padding: 30px;
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
}

@media (max-width: 767px) {
  #app {
    max-width: none;
    margin: 0 auto;
  }
}
</style>
