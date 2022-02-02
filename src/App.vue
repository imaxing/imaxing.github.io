<template>
  <div id="app" :class="{ 'menu-show': menuShow }">
    <div class="sidebar">
      <img
        class="menu"
        src="@/menu.png"
        alt="菜单"
        @click="menuShow = !menuShow"
      />
      <a v-for="(doc, index) in docs" :key="index" :href="'#' + doc.path">{{
        doc.title
      }}</a>
    </div>
    <div class="main" id="main">
      <doc
        v-for="(doc, index) in results.length > 0 ? results : docs"
        :key="index"
        :doc="doc"
        :id="doc.path"
      />
    </div>

    <div class="backtop" @click="scrollToTop">top</div>
  </div>
</template>

<script>
import docList from "@/data";
import doc from "@/components/doc";

export default {
  name: "App",
  components: { doc },
  data: () => ({ results: [], value: "", docs: [], menuShow: true }),
  mounted() {
    const docs = require.context("@/doc", true);
    this.docs = docList.map((doc) => ({
      ...doc,
      content: doc.type !== "component" && docs(`./${doc.path}.md`),
    }));
    this.docs.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },
  methods: {
    scrollToTop() {
      document.querySelector(".main").scrollTo(0, 0);
    },
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
.backtop {
  position: fixed;
  right: 12px;
  bottom: 12px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  width: 40px;
  height: 40px;
  color: #8590a6;
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
}
.mgt10 {
  margin-top: 10px;
}
.mgb10 {
  margin-bottom: 10px;
}
</style>
<style>
.sidebar {
  width: 299px;
  height: 100vh;
  background: #fff;
  padding: 10px;
  transform: translateX(-100%);
  color: #000;
  transition: all linear 0.2s;
  position: fixed;
  z-index: 199;
  border-right: 1px solid #f6f6f6;
}
.sidebar a {
  color: #333;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 4px;
  text-decoration: none;
}
.sidebar .menu {
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  border: 1px solid #f6f6f6;
  border-left: 1px solid #ffff;
  z-index: 200;
  background: #fff;
  border-radius: 0 2px 2px 0;
}

.menu-show .sidebar {
  transform: translateX(0);
}
</style>
<style>
.main {
  overflow-y: auto;
  padding: 30px;
  width: 100%;
  margin-left: 0px;
}
.menu-show .main {
  width: calc(100% - 300px);
  margin-left: 300px;
}
</style>
<style>
@media (max-width: 767px) {
  .main {
    padding: 0;
  }
  .menu-show .main {
    width: 100%;
    margin-left: 0px;
  }
}
</style>
