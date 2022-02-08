<template>
  <div id="app">
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
.primary-button {
  align-self: center;
  background-color: #fff;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 4px 3px;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, 0.2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  cursor: pointer;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 1rem;
  line-height: 23px;
  outline: none;
  padding: 0.2em 0.75rem;
  text-decoration: none;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-right: 4px;
}

.primary-button:hover {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.primary-button:focus {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 4px -6px;
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
