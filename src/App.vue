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
      s.src = 'http://www.websiteasteroids.com/asteroids.min.js'
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
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1000px;
  margin: 30px auto;
  background: #fff;
  box-shadow: 0 2px 3px rgb(0 0 0 / 10%);
  border-radius: 3px;
}
.mgt10 {
  margin-top: 10px;
}
.mgb10 {
  margin-bottom: 10px;
}
</style>

<style>
.asteroid {
  position: fixed;
  left: -5px;
  bottom: -20px;
  width: 38px;
  height: 38px;
  object-fit: contain;
  border: none;
  font-size: 12px;
  background: crimson;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  border-radius: 0 4px 0 0;
  transition: all ease 0.3s;
  cursor: pointer;
}
.asteroid:hover {
  left: 0px;
  bottom: 0px;
}
</style>
<style>
@media (max-width: 767px) {
  .copy {
    display: none;
  }
  #app {
    margin: 0;
  }
}
</style>
