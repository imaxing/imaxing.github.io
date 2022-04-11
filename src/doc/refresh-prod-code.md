<p><em>需求:</em> </p>
vue项目部署新版本后，用户如果不刷新页面，用户本地的代码还是旧的,，需要刷新后才能从服务器拉取最新文件，所以项目经理希望每次部署新版本后，提示用户刷新浏览器。

<br />
<br />

<p><em>方案:</em> </p>
每次打包后创建一个文件version.json, 通过vue-cli的生命周期钩子将一个时间戳(或者uuid等随机数据不重复即可)写入到version.json. 当用户访问项目后, 将随机版本号写入到用户本地缓存, 下次打包重复以上步骤, 当用户页面切换, 或者触发请求的时候比对当前项目下的version.json版本号和本地的项目版本号, 如果不一致则提示有新版本需要刷新

<br />
<br />
<p><em>第一步</em>:</p>

```javascript
// vue.config.js 同级目录新建 version-number-injection.js
class InjectionVersionNumberPlugin {
  constructor(props) {
    this.props = props
  }

  apply(compiler) {
    const { name, versionPath, htmlPath } = this.props
    compiler.hooks.done.tap('InjectionVersionNumberPlugin', () => {
      const version = Date.now().toString()

      // 版本号写入服务端文件
      fs.writeFile(
        versionPath,
        JSON.stringify({ version, content: '更新新版本, 修复bug问题等', title: '发现新版本' }),
        'utf8',
        () => {}
      )

      // 版本号写入用户本地缓存
      fs.readFile(htmlPath, 'utf8', (error, data) => {
        if (error) throw error

        const [bodyBefore, bodyAfter] = data.split('<body>')
        const injectScript = `
          <script>
            !localStorage.${name} && localStorage.setItem('${name}', ${version});
          </script>
        `
        fs.writeFile(htmlPath, [bodyBefore, injectScript, bodyAfter].join(''), 'utf8', () => {})
      })
    })
  }
}


```

<p><em>第二步: </em></p>

```javascript
// vue.config.js 配置plugin
module.exports = {
  configureWebpack: config => {
    // 添加 version plugin
    if (process.env.NODE_ENV !== 'development') {
      config.plugins.push(
        new VersionCheckPlugin({
          name: 'refreshKey',
          versionPath: 'dist/version.json',
          htmlPath: 'dist/index.html'
        })
      )
    }
  }
}


```
<p><em>第三步: </em></p>

```javascript
// 以下依赖按需安装
import debounce from 'lodash.debounce'
import axios from '@/router/axios'
import Vue from 'vue'
import { Notification } from 'element-ui'
import { dateFormat } from '@/util/date'
import * as config from '@/config/env'
const smallNotice = {
  instance: null,
  mounted: false,
  mount() {
    smallNotice.mounted = true
    const closeSmallNotice = () => {
      smallNotice.mounted = false
      smallNotice.instance.$el.remove()
      VersionCheck.mount()
    }
    const SmallTipsConstructor = Vue.extend({
      render: h => h('div', { class: 'small-tips', on: { click: () => closeSmallNotice() } }, '新版本')
    })
    smallNotice.instance = new SmallTipsConstructor().$mount()
    document.body.appendChild(smallNotice.instance.$el)
  },
  unmount() {
    smallNotice.instance.$el.remove()
    VersionCheck.mount()
  }
}

const VersionCheck = {
  mounted: false,
  appInstance: null,
  noticeInstance: null,
  unmount() {
    VersionCheck.appInstance.$destroy()
    VersionCheck.appInstance = null
    VersionCheck.noticeInstance.close()
    VersionCheck.noticeInstance = null
    VersionCheck.mounted = false
  },
  mount() {
    const { title = '', content = '', version } = VersionCheckUtil.state
    VersionCheck.noticeInstance = Notification({
      duration: 0,
      showClose: false,
      dangerouslyUseHTMLString: true,
      customClass: 'new-version__tip-notification',
      message: `<div class="new-version--tip"></div>`,
      onClose: () => {
        const timer = setTimeout(() => {
          smallNotice.mount()
          clearTimeout(timer)
        }, 300)
      }
    })

    VersionCheck.appInstance = new Vue({
      render: h => {
        return h('div', { class: 'new-version' }, [
          h('strong', { class: 'new-version__title' }, [h('i', { class: 'el-icon-info' }), ' ', title]),
          h('small', [h('b', '发布时间: '), h('br'), dateFormat(version, 'YYYY-MM-DD hh:mm:ss')]),
          h('br'),
          h('br'),
          content && h('small', [h('b', '更新内容: '), h('br'), content]),
          h('br'),
          h('br'),
          h('el-row', { class: 'new-version__button', props: { type: 'flex', justify: 'space-between' } }, [
            h(
              'small',
              {
                on: {
                  click: () => {
                    VersionCheckUtil.refresh()
                    window.location.reload()
                  }
                }
              },
              '立即刷新'
            ),
            h('small', { on: { click: () => VersionCheck.unmount() } }, '稍后')
          ])
        ])
      }
    }).$mount('.new-version--tip')
    VersionCheck.mounted = true
  }
}

const VersionCheckUtil = {
  refreskKey: 'srmVersionRefreshKey',
  state: {},
  inited: false,
  refresh() {
    localStorage.setItem(VersionCheckUtil.refreskKey, VersionCheckUtil.state.version)
  },
  async init() {
    const { local, origin } = await VersionCheckUtil.getState()
    local !== origin && VersionCheckUtil.refresh()
  },
  async getState() {
    const { data } = await axios.get(`${window.location.origin}/version.json?v=${+new Date()}`)

    // 版本号是否相同
    VersionCheckUtil.state = {
      local: localStorage.getItem(VersionCheckUtil.refreskKey),
      origin: data.version,
      ...data
    }
    VersionCheckUtil.inited = true
    return VersionCheckUtil.state
  },
  check: debounce(async () => {
    if (config.isDev) return
    if (!VersionCheckUtil.inited) return

    const { origin, local } = await VersionCheckUtil.getState()

    if (origin === local) return

    // 不重复打开弹窗
    if (VersionCheck.mounted || smallNotice.mounted) return

    // 页面切换触发检测, 打开弹窗逻辑
    VersionCheck.mount()
  }, 300)
}

export default VersionCheckUtil




// 使用

import VersionCheckUtil from '@/util/new-version-tips'

Vue.mixin({
  beforeRouteEnter (to, from, next) {
    next(() => {
      VersionCheckUtil.check()
    })
  }
})
```
