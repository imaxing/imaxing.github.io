export const resume = { title: '', name: 'resume', path: 'resume.vue', print: false }
export const docs = [
  {
    title: '使用 Proxy 劫持函数执行',
    description:
      '使用Proxy来劫持函数执行，可以在函数执行前后做一些操作，比如添加日志、添加异常处理等。比如劫持 console.log方法, 实时显示在页面上! 代码非常简单, 核心就是劫持function的apply参数, 打开控制台, 尝试输入console.log("hello world")。',
    date: '2022-07-09',
    path: 'proxy-function.vue',
    references: [
      {
        name: '扩展构造函数',
        href: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy#%E6%89%A9%E5%B1%95%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0'
      }
    ]
  },
  {
    title: '通过 Pdf.js 加载 PDF 文件并转换为图片',
    description: '读取pdf转为图片展示, 输入框内输入有效的pdf地址可以进行测试',
    date: '2022-06-26',
    path: 'pdf-to-image.vue',
    npm: 'https://www.npmjs.com/package/@iamgx/pdf-to-image',
    sandbox: 'https://codesandbox.io/s/pdf-to-image-2wrepn?file=/src/App.vue',
    github: 'https://github.com/imaxing/pdf-to-image'
  },
  {
    title: '使用 canvas 绘制带笔锋效果的线条',
    description:
      '此工具基于smooth-signature项目进行二次修改, 将原有代码的逻辑与canvas进行解耦, 满足多层画布重新绘制的需求, <a target="_blank" href="https://github.com/linjc/smooth-signature">源代码库主页</a>',
    date: '2022-06-22',
    path: 'smooth-line.vue',
    npm: 'https://www.npmjs.com/package/@iamgx/smooth-line',
    sandbox: 'https://codesandbox.io/s/smooth-line-redraw-j9trdv?file=/src/App.vue'
  },
  {
    title: '基于Vuejs2封装图片快捷查看工具',
    description: '封装一个图片查看工具, 点击下面图片进行测试, 函数调用方便, 具体使用方法可参考文档或者codesandbox',
    date: '2022-03-28',
    path: 'image-preview.vue',
    print: true,
    github: 'https://github.com/imaxing/image-preview',
    npm: 'https://www.npmjs.com/package/@iamgx/image-preview',
    sandbox: 'https://codesandbox.io/s/image-preview-example-zekx32?fontsize=14&hidenavigation=1&theme=dark'
  },
  {
    title: '封装基于ElementUi的布局组件',
    date: '2022-03-28',
    description: '参照@ant/pro-layout项目的api封装了下elementui版本的layout, 为了方便开发后台系统类型的业务',
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
    date: '2022-02-08',
    path: 'element-ui-theme-set.md',
    print: true,
    npm: 'https://www.npmjs.com/package/@iamgx/element-ui-theme-set',
    github: 'https://github.com/imaxing/element-ui-theme-set',
    sandbox: 'https://codesandbox.io/s/element-ui-theme-set-example-4d61d?fontsize=14&hidenavigation=1&theme=dark'
  },
  {
    title: '项目部署新版本后怎么提示用户刷新浏览器？',
    description: '在不使用websocket的情况下, 实现项目部署新版本后提示用户刷新浏览器',
    date: '2022-01-27',
    path: 'refresh-prod-code.md',
    hide: false,
    print: true
  },
  {
    title: '页面中快速生成水印效果',
    date: '2020-06-18',
    description: '使用canvas绘制水印, 不额外创建dom元素, 可以在页面中快速生成水印效果',
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
