<template>
  <div id="app">
    <input
      type="text"
      class="filter-input"
      v-model.trim="value"
      @keyup.enter="getCurrentDoc"
      placeholder="关键词过滤"
    />
    <div class="docs">
      <div
        class="markdown-body doc-item"
        v-for="doc in results.length > 0 ? results : docs"
        :key="doc.name"
        v-html="doc.content"
      >
        {{ doc.name }}
      </div>
    </div>
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
export default {
  name: "App",
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
        ? this.docs
            .filter((md) => md.content.includes(this.value))
            .map((item) => ({
              name: item.name,
              content: item.content.replace(
                new RegExp(this.value, "g"),
                `<span class="keyword">${this.value}</span>`
              ),
            }))
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
  margin: 0 auto;
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.filter-input {
  width: 100%;
  height: 40px;
  outline: none;
  border: none;
  color: #fff;
  background: transparent;
  padding: 0 20%;
  margin: 0 auto;
}
.docs {
  height: calc(100vh - 40px);
  overflow-y: auto;
  padding: 20px 20% 80px;
  margin: 0 auto;
}

.doc-item pre {
  position: relative;
}
.doc-item .keyword {
  background: yellow;
  color: #333;
  font-size: 12px;
  padding: 4px;
  font-weight: bold;
  font-style: italic;
}
.doc-item pre .copy {
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
}
.doc-item:not(:last-of-type) {
  margin: 0px auto 80px;
  position: relative;
}

.doc-item:not(:last-of-type)::after {
  position: absolute;
  left: 0;
  bottom: -60px;
  content: "此文结束";
  text-align: center;
  width: 100%;
  height: 20px;
  color: #f40;
}
@media (max-width: 767px) {
  #app {
    width: 100%;
  }
  .markdown-body {
    padding: 15px;
  }
  .docs {
    padding: 0;
  }
  .filter-input {
    text-indent: 15px;
    padding: 0;
  }
}
</style>
