// for qiankun test
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

import Vue from 'vue'
import App from '@/App'
import Markdown from '@/components/markdown.vue'

let instance = null

const render = () => {
  Vue.config.productionTip = false
  Vue.component(Markdown.name, Markdown)
  instance = new Vue({
    el: '#app',
    render: h => h(App)
  })
}

!window.__POWERED_BY_QIANKUN__ && render()

export const bootstrap = async () => console.log(' bootstraped')

export const mount = async props => render(props)

export const unmount = async () => {
  instance.$destroy()
  instance = null
}
