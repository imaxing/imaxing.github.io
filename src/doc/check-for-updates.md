<h2 class="content-title">项目部署新版本后怎么提示用户刷新浏览器？</h2>
<small class="content-date">2022-01-27 16:51:35</small>



#### 需求
> vue项目部署新版本后，用户如果不刷新页面，用户本地的代码还是旧的,，需要刷新后才能从服务器拉取最新文件，所以项目经理希望每次部署新版本后，提示用户刷新浏览器。


#### 解决思路
> 每次打包后创建一个文件version.json, 通过vue-cli的钩子将一个时间戳(或者uuid等随机数据不重复即可)写入到version.json. 当用户访问项目后, 将随机版本号写入到用户本地缓存, 下次打包重复以上步骤, 当用户页面切换, 或者触发请求的时候比对当前项目下的version.json版本号和本地的项目版本号, 如果不一致则提示有新版本需要刷新


#### 解决步骤
- 创建version.json文件到项目中
```javascript

// 新建 version-number-injection.js
const fs = require('fs')
class VersionNumberInjectionPlugin {
  constructor(props) {
    this.props = props
  }

  apply(compiler) {
    // name, 是为了区分不同项目定制的key
    // versionPath version.json的存放位置
    // htmlPath html模板的存放位置
    const { name, versionPath, htmlPath } = this.props
    compiler.hooks.done.tap('VersionNumberInjectionPlugin', compilation => {
      const version = Date.now().toString()

      // 版本号写入服务端文件
      fs.writeFile(versionPath, JSON.stringify({ version }), 'utf8', () => {})

      // 版本号写入用户本地缓存
      fs.readFile(htmlPath, 'utf8', (error, data) => {
        if (error) throw error
        // 将版本号加入到html的script中, 用户打开文件的时候写入
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

module.exports = VersionNumberInjectionPlugin



// vue.config.js
module.exports = {
  //...,
  configureWebpack: config => {
    // your code


    // 添加 version plugin
    if (process.env.NODE_ENV !== 'development') {
      config.plugins.push(
        new VersionNumberInjectionPlugin({
          name: 'test_spa_version',
          versionPath: 'dist/version.json',
          htmlPath: 'dist/index.html'
        })
      )
    }
  }
}

```


- 客户端加入检测代码
```javascript



const nativeGet = url => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      xhr.readyState === 4 && xhr.status === 200 && resolve(xhr.responseText)
    }
    xhr.open('GET', url)
    xhr.send()
  })
}


async function diffVersion(versionName) {
  if (!versionName) return true
  const localVersion = localStorage.getItem(versionName)
  // nativeGet 封装的xhr的get请求, 百度找一个即可
  const data = await nativeGet(`${window.location.origin}/version.json`)
  if (!data || !localVersion) return true

  const originVersion = JSON.parse(data).version
  return {
    state: localVersion === originVersion,
    reload: () => localStorage.setItem(versionName, originVersion)
  }
}


// 路由守卫处配置检测
router.beforeEach(async (to, from, next) => {
  // other code
  // 版本号检测(此处示例使用emitter派发通知)
  emitter.emit('updates-check')
})

// main.js 或者 App.vue 
emitter.on('updates-check', async () => {
  if (isDev) return
  // state: true 版本号相同 false 版本号不相同
  // reload, 更新最新版本号到本地
  const { state, reload } = await diffVersion(versionName)
  if (state) return

  // 版本号不相同提示刷新页面
  const action = await MessageBox.confirm('检测到新版本, 是否刷新页面?')
  if (action !== 'confirm') return
  reload()
  window.location.reload()
})


```


#### 效果图

**本地版本号**
![https://tva1.sinaimg.cn/large/008i3skNgy1gysd46w9vpj31ux0u0adm.jpg](本地版本号)
**服务端版本号**
![https://tva1.sinaimg.cn/large/008i3skNgy1gysd6e3bqdj327c0u0q6s.jpg](服务端版本号)


