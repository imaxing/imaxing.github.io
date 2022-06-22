export const resume = { title: '', name: 'resume', path: 'resume.vue', print: false }
export const docs = [
  {
    title: 'canvas绘制带笔锋效果线条',
    description: '此工具基于smooth-signature项目进行二次修改',
    date: '2022-06-22 19:12:22',
    path: 'smooth-line.vue',
    npm: 'https://www.npmjs.com/package/@iamgx/smooth-line',
    sandbox: 'https://codesandbox.io/s/smooth-line-redraw-j9trdv?file=/src/App.vue'
  },
  {
    title: '基于Vuejs的pc端图片查看工具',
    description: '封装了一个pc的图片查看工具, 点击图片测试',
    date: '2022-03-28 18:12:22',
    path: 'image-preview.vue',
    print: true,
    github: 'https://github.com/imaxing/image-preview',
    npm: 'https://www.npmjs.com/package/@iamgx/image-preview',
    sandbox: 'https://codesandbox.io/s/image-preview-example-zekx32?fontsize=14&hidenavigation=1&theme=dark'
  },
  {
    title: 'elemnt ui pro layout',
    date: '2022-03-28 18:07:22',
    description: '基于ant-pro-layout的api封装了下elementui版本的layout, 方便业务开发',
    path: 'pro-layout.md',
    print: true,
    npm: 'https://www.npmjs.com/package/@iamgx/pro-layout',
    github: 'https://github.com/imaxing/element-pro-layout',
    sandbox:
      'https://codesandbox.io/s/pro-layout-example-jmvbhr?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.vue'
  },
  {
    title: '动态设置elementui主题',
    description: '此方法封装了 vue-element-admin 中的实现, 修改为函数式调用',
    date: '2022-02-08 17:43:22',
    path: 'element-ui-theme-set.md',
    print: true,
    npm: 'https://www.npmjs.com/package/@iamgx/element-ui-theme-set',
    github: 'https://github.com/imaxing/element-ui-theme-set',
    sandbox: 'https://codesandbox.io/s/element-ui-theme-set-example-4d61d?fontsize=14&hidenavigation=1&theme=dark'
  },
  {
    title: '项目部署新版本后怎么提示用户刷新浏览器？',
    date: '2022-01-27 16:51:35',
    path: 'refresh-prod-code.md',
    hide: false,
    print: true
  },
  {
    title: '前端页面生成水印代码',
    date: '2020-06-18 17:02:18',
    path: 'water-mark.vue',
    npm: 'https://www.npmjs.com/package/@iamgx/watermark',
    github: 'https://github.com/imaxing/watermark',
    sandbox: 'https://codesandbox.io/embed/watermark-example-e0n2v?fontsize=14&hidenavigation=1&theme=dark',
    print: true
  },
  { title: 'github 设置和取消代理', date: '2020-02-07 18:38:22', path: 'github-proxy.md', print: true }
].map(doc => ({
  ...doc,
  content: doc.path.endsWith('.md') ? require.context('@/doc', true)(`./${doc.path}`) : require(`@/doc/${doc.path}`)
}))
