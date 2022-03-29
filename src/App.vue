<template>
  <div id="app">
    <div class="switch-button" @click="showResume = !showResume">{{ showResume ? '笔记' : '简历' }}</div>
    <span @click="startPlay" class="asteroid">王牌飞行</span>
    <div v-show="!showResume">
      <template v-for="(doc, index) in docs">
        <doc v-if="!doc.hide" :key="index" :doc="doc" :id="doc.path.replace(/\.|vue|md/g, '')" />
      </template>
    </div>
    <doc v-show="showResume" :doc="resume" id="resume" />
  </div>
</template>

<script>
import docList from '@/data'
import doc from '@/components/doc'
import imagePreview from '@iamgx/image-preview'
export default {
  name: 'App',
  components: { doc },
  data: () => ({ docs: [], showResume: true, resume: '' }),
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
    window.imagePreview = imagePreview
    this.$nextTick(() => {
      const tags = document.getElementsByTagName('a')
      for (let i = 0; i < tags.length; i++) {
        tags[i].target = '_blank'
      }
    })

    this.docs = docList.map(doc => ({
      ...doc,
      content: doc.path.endsWith('.md') ? require.context('@/doc', true)(`./${doc.path}`) : require(`@/doc/${doc.path}`)
    }))

    this.resume = this.docs.find(d => d.name === 'resume')
    this.resume.title = null
    this.resume.date = null
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

button {
  border: none;
  color: white;
  padding: 6px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  background-color: #3d87ef;
  cursor: pointer;
  border-radius: 6px;
}

.switch-button {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  min-width: 30px;
  height: 30px;
  background: #70757a;
  padding: 2px 5px;
  color: #fff;
  cursor: pointer;
  z-index: 100;
}
</style>
