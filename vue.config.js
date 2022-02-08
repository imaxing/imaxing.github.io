const { run } = require('node-run-cmd')
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
class MoveIndexHtml {
  apply(compiler) {
    compiler.hooks.done.tap('MoveIndexHtml', () => {
      run(`rm -rf ${path.resolve(__dirname, 'index.html')}`)
      run(`mv ${path.resolve(__dirname, 'dist/index.html')} ${path.resolve(__dirname, './')}`)
    })
  }
}

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    resolve: {
      extensions: ['.md']
    },
    plugins: [new MoveIndexHtml()]
  },
  publicPath: '/', //使用相对路径
  outputDir: 'dist',
  productionSourceMap: false,
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .end()

    config.plugin('preload').tap(args => {
      args[0].fileBlacklist.push(/\.css/, /\.js/)
      return args
    })
    config.plugin('inline-source').use(require('html-webpack-inline-source-plugin'))
    config.plugin('html').tap(args => {
      args[0].chunksSortMode = 'none'
      args[0].inlineSource = '(.css|.js$)'
      if (isProd) {
        args[0].cdn = {
          css: [],
          js: ['https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js']
        }
      }
      return args
    })

    if (isProd) {
      config.externals({ vue: 'Vue' })
    }
  },
  css: {
    extract: false
  }
}
