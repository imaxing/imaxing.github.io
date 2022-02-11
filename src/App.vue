<template>
  <div id="app">
    <span @click="startPlay" class="asteroid">王牌飞行</span>
    <doc v-for="(doc, index) in docs" :key="index" :doc="doc" :id="doc.path.replace(/\.|vue|md/g, '')" />
  </div>
</template>

<script>
import docList from '@/data'
import doc from '@/components/doc'
export default {
  name: 'App',
  components: { doc },
  data: () => ({ docs: [] }),
  methods: {
    startPlay() {
      const s = document.createElement('script')
      s.type = 'text/javascript'
      document.body.appendChild(s)
      s.src = 'https://cdn.jsdelivr.net/gh/imaxing/cdn@1.0.4/js/asteroids.min.js'
      setTimeout(() => {
        document.getElementById('ASTEROIDS-NAVIGATION').innerText = 'WAD键控制, 空格开枪'
      }, 1000)
    }
  },
  mounted() {
    this.docs = docList.map(doc => ({
      ...doc,
      content: doc.path.endsWith('.md') ? require.context('@/doc', true)(`./${doc.path}`) : require(`@/doc/${doc.path}`)
    }))
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  -webkit-font-smoothing: antialiased;
  max-width: 800px;
  margin: 0px auto;
  padding: 30px;
}
.asteroid {
  position: fixed;
  left: 30px;
  bottom: 30px;
  color: transparent;
  cursor: pointer;
}

img[src="https://codesandbox.io/static/img/play-codesandbox.svg"]
{
  display: block;
  margin: 10px 0;
}
a {
  text-decoration: underline;
  font-weight: bold;
}

@media (max-width: 767px) {
  .print-hide {
    display: none;
  }
  #app {
    padding: 15px;
  }
}
</style>
