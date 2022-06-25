<template>
  <div id="app">
    <span @click="playGame" class="asteroid">王牌飞行</span>
    <doc v-for="(doc, index) in docs" :key="index" :doc="doc" :id="doc.path.replace(/\.|vue|md/g, '')" />
  </div>
</template>

<script>
import { docs, resume } from '@/data'

export default {
  name: 'App',
  data: () => ({ showResume: false, resume, docs })
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,
    Noto Sans, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', Segoe UI Symbol, 'Noto Color Emoji';
}

#app {
  -webkit-font-smoothing: antialiased;
  max-width: 1000px;
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
