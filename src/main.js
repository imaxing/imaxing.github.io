import Vue from 'vue'
import App from './App.vue'
import Markdown from '@/components/markdown.vue'
Vue.config.productionTip = false
Vue.prototype.marked = text => {
  if (!window.markdownit) return text
  const md = new window.markdownit()
  return md.render(text)
}
Vue.component(Markdown.name, Markdown)

new Vue({
  render: h => h(App)
}).$mount('#app')
