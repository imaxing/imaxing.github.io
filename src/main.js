import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$renderMarkdown = (text) => {
  if (!window.markdownit) return text
  const md = new window.markdownit()
  return md.render(text)
}


new Vue({
  render: h => h(App)
}).$mount('#app')
