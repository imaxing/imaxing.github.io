

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
const fs = require('fs')
module.exports = class VersionNumberInjectionPlugin {
  constructor(props) {
    this.props = props
  }
  apply(compiler) {
    const { name, versionPath, htmlPath } = this.props
    compiler.hooks.done.tap('VersionNumberInjectionPlugin', compilation => {
      const version = Date.now().toString()
      fs.writeFile(versionPath, JSON.stringify({ version }), 'utf8', () => {}) // 版本号写入服务端文件
      fs.readFile(htmlPath, 'utf8', (error, data) => { // 版本号写入用户本地缓存
        if (error) throw error
        const [bodyBefore, bodyAfter] = data.split('<body>')
        // 将版本号加入到html的script中, 用户访问的时候写入缓存
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

// vue.config.js 配置plugin
module.exports = {
  configureWebpack: config => {
    // 添加 version plugin
    if (process.env.NODE_ENV !== 'development') {
      config.plugins.push(
        new VersionNumberInjectionPlugin({
          name: 'test_spa_version', // 为当前项目创建一个唯一key, 解决多个项目之间出现混淆的情况
          versionPath: 'dist/version.json',
          htmlPath: 'dist/index.html'
        })
      )
    }
  }
}

```


<p><em>第二步: </em></p>

```javascript

// 版本号比对方法
async function diffVersion(versionName) {
  if (!versionName) return true
  const localVersion = localStorage.getItem(versionName)
  // nativeGet 封装的xhr的get请求, 百度找一个, 也可以直接使用axios.get
  const data = await nativeGet(`${window.location.origin}/version.json`)
  if (!data || !localVersion) return true

  const originVersion = JSON.parse(data).version
  return {
    state: localVersion === originVersion,
    reload: () => localStorage.setItem(versionName, originVersion)
  }
}

// 客户端代码加入检测逻辑
router.beforeEach(async (to, from, next) => {
  if (!isDev) {
    // state: true 版本号相同 false 版本号不相同
    // reload, 更新最新版本号到本地
    const { state, reload } = await diffVersion(versionName)
    if (state) return
    // 版本号不相同提示刷新页面
    const action = await MessageBox.confirm('检测到新版本, 是否刷新页面?')
    if (action !== 'confirm') return
    reload()
    window.location.reload()
  }
})


```



