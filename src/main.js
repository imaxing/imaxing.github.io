import Vue from 'vue'
import App from '@/App'
import Markdown from '@/components/markdown'
import doc from '@/components/doc'
import icon from '@/components/icon'
import imagePreview from '@iamgx/image-preview'
import loadStyle from '@iamgx/load-style'
import getAllCss from '@iamgx/get-all-css'
import quickPrint from '@iamgx/quick-print'

window.imagePreview = imagePreview
Vue.config.productionTip = false
Vue.component(Markdown.name, Markdown)
Vue.component(doc.name, doc)
Vue.component(icon.name, icon)
Vue.prototype.imagePreview = imagePreview

Vue.prototype.playGame = () => {
  const s = document.createElement('script')
  s.type = 'text/javascript'
  document.body.appendChild(s)
  s.src = 'https://cdn.jsdelivr.net/gh/imaxing/cdn@1.0.4/js/asteroids.min.js'
  setTimeout(() => {
    document.getElementById('ASTEROIDS-NAVIGATION').innerText = 'WAD键控制, 空格开枪'
  }, 1000)
}

Vue.prototype.quickPrint = async content => {
  const style = await getAllCss()
  quickPrint(content, {
    style: `${style} .print-hide {display: none}`
  })
}

new Vue({
  el: '#app',
  mounted() {
    loadStyle('https://at.alicdn.com/t/font_3326808_b5m4dl6nitf.css')
  },
  render: h => h(App)
})
