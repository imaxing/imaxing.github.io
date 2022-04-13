<template>
  <div ref="resume" class="markdown-body">
    <h1>
      个人信息
      <quick-icon class="print-hide" @click="quickPrint($refs.resume.innerHTML)" icon="icon-print" />
    </h1>
    <ul>
      <li><strong>葛星</strong>/男/1994</li>
      <li>本科/南京东南科技研修学院</li>
      <li>
        技术博客：<a href="https://imaxing.github.io" style="text-decoration: underline">https://imaxing.github.io</a>
      </li>
      <li>
        Github：<a href="https://github.com/imaxing" style="text-decoration: underline">https://github.com/imaxing</a>
      </li>
      <li>手机：18351710121</li>
      <li>Email：<a href="mailto:imaxing@126.com">imaxing@126.com</a></li>
      <li>工作年限：5</li>
      <li>期望职位：前端开发工程师</li>
      <li>期望薪资：15k</li>
      <li>当前状态: 离职</li>
      <li>期望城市：南通</li>
      <li class="print-hide">
        照片：<span @click="imagePreview(['https://cdn.jsdelivr.net/gh/imaxing/cdn@1.0.5/image/identification.png'])"
          >点击查看</span
        >
      </li>
    </ul>
    <br />
    <h1 id="技能清单">技能清单</h1>
    <ul>
      <li><code>熟练掌握html/css布局技能(position/float/flex/grid/rem/viewport)</code></li>
      <li><code>熟练掌握JS基础(作用域链/原型链/闭包/异步生成器/EventLoop)等</code></li>
      <li><code>熟悉MVVM技术框架使用/实现(Vuejs/ReactJs)</code></li>
      <li><code>熟练掌握框架相关组件库的使用(ELement/AntDesign/Vant), 对组件有熟练的封装经验</code></li>
      <li><code>有基于Vuejs3.0框架的webapp项目开发经验(基于JsBridge通信)</code></li>
      <li><code>有较多的后台管理系统开发经验</code></li>
      <li><code>有服务端端渲染框架使用经验(Nuxtjs/nextjs)</code></li>
      <li><code>熟悉小程序开发上线流程及微信开放平台等周边生态, 小程序开发周边框架(uniapp/Tarojs)</code></li>
      <li><code>熟悉webpack/roolup/vite/gulp的使用配置, 有webpack插件开发经验, 有基于rollup打包发布npm包</code></li>
      <li><code>熟悉前端项目部署, 了解CI/CD流程(gitlab webhook/jenkins)等</code></li>
      <li><code>有npm工具函数/ui组件封装开发经验</code></li>
    </ul>
    <br />
    <h1 id="工作经历">工作经历</h1>
    <h3 id="苏州方正璞华信息科技有限公司20203--至今"><strong>苏州方正璞华信息科技有限公司(2020/3 ~ 至今)</strong></h3>
    <p>
      <strong>技术栈</strong>: <code>vue@2.6.11</code> <code>element-ui@2.15.1</code> <code>charts</code>
      <code>axios</code><br /><strong>岗位职责</strong>: 负责SRM系统产品的迭代开发,
      解决项目组中的疑难杂症及实现客户提出的业务需求<br /><strong>工作内容</strong>:
    </p>
    <ul>
      <li>负责客户现场前端的功能开发推进(和府捞面/广发银行/振德医疗等项目组)</li>
      <li>基于业务功能拆分npm包(el-pro-layout/quick-el-modal)等</li>
      <li>负责内研函数库的/组件库的开发发布等工作</li>
      <li>负责项目实施过程中客户无法及时知晓产品新版本推送的问题</li>
      <li>负责产品性能优化, 产品加载慢/重复代码量多/静态资源拆分/webpack配置</li>
      <li>
        负责开发业务功能需要的webpack插件(<code
          >例: 非socket实现每次新版本推送后用户端可以及时体验最新业务功能, 支持配置标题/描述/时间</code
        >)
      </li>
      <li>负责基于vue3.0版本的后台系统模板的开发</li>
      <li>基于remaxjs框架开发和府捞面的消息通知业务小程序</li>
      <li>基于三方框架的源码二次开发业务功能</li>
    </ul>
    <hr />
    <h3 id="苏州中知联信息科技有限公司20193--2020-2"><strong>苏州中知联信息科技有限公司(2019/3 ~ 2020-2)</strong></h3>
    <p>
      <strong>技术栈</strong>: <code>vue@2.6.10</code> <code>element-ui@2.14.1</code> <code>nuxtjs@2.x</code>
      <code>charts</code> <code>axios</code><br /><strong>岗位职责</strong>: 负责产品企服服/权查查的功能迭代开发<br /><strong
        >工作内容</strong
      >:
    </p>
    <ul>
      <li>重构权查查C端门户项目(基于Nuxtjs重构)</li>
      <li>
        替换原有prerender-spa-plugin方案, 使用Nuxtjs实现全项目服务端渲染于seo收录, 通过 nginx error_page 配置，在 ssr
        的路由响应出错的时候进行降级处理, 对于不需要seo功能的模块使用客户端渲染
      </li>
      <li>开发新项目企服服, 负责项目的搭建/代码规范/功能开发</li>
      <li>负责企服服的订单小程序开发(原生开发)</li>
      <li>负责权查查商标查询功能小程序开发</li>
      <li>实现企服服项目的权限设计, 通过nuxt的middleware+nuxtServerinit生命周期实现用户权限控制</li>
      <li>负责权查查旧项目优化, 维护工作</li>
    </ul>
    <hr />
    <h3 id="苏州通付盾信息科技有限公司201712--20193"><strong>苏州通付盾信息科技有限公司(2017/12 ~ 2019/3)</strong></h3>
    <p>
      <strong>技术栈</strong>: <code>reactjs@15.x</code> <code>ant-design</code> <code>dvajs</code>
      <code>backbonejs</code> <code>redux</code> <code>charts</code> <code>d3</code> <code>axios</code><br /><strong
        >岗位职责</strong
      >: 负责产品反欺诈系统等其他多个后台的功能迭代开发<br /><strong>工作内容</strong>:
    </p>
    <ul>
      <li>负责开发及维护通付盾反欺诈系统的功能</li>
      <li>基于echarts开发决策引擎管理平台, 开发大屏数据系统, 可对数据模块动态配置JSON渲染</li>
      <li>负责催收机器⼈平台的开发, 通过调用三方收费api, 对预期贷款人进行拨通机器人通话, 对通话进行录音/回放等</li>
      <li>基于d3实现关系图表展示, 对d3节点改造可以嵌入三方框架</li>
      <li>基于dvajs/reactjs框架开发工具函数/通用组件</li>
    </ul>
    <hr />
    <h3 id="苏州罗想软件股份有限公司20164--201712"><strong>苏州罗想软件股份有限公司(2016/4 ~ 2017/12)</strong></h3>
    <p>
      <strong>技术栈</strong>: <code>vuejs@15.x</code> <code>eleemnt-ui</code> <code>jquery</code> <code>easyui</code>
      <code>bootstrap</code><br /><strong>岗位职责</strong>: 负责产品即链供应商管理系统的功能迭代开发<br /><strong
        >工作内容</strong
      >:
    </p>
    <ul>
      <li>负责订单管家系统的系统搭建功能开发工作</li>
      <li>基于vuecli搭建新项目订单管家, 集成路由/请求/组件/权限等功能</li>
      <li>负责组件库rs-ui的迭代工作</li>
      <li>负责维护军工项目基于jquery+bootstrap开发, 静态部署到军队船舶系统</li>
    </ul>
    <br />
    <h1 id="开源工具">开源工具</h1>
    <ul>
      <li>
        <a href="https://www.npmjs.com/package/@iamgx/easy-upload"><code>@iamgx/easy-upload</code></a>
      </li>
      <li>
        <a href="https://www.npmjs.com/package/@iamgx/element-ui-theme-set"><code>@iamgx/element-ui-theme-set</code></a>
      </li>
      <li>
        <a href="https://www.npmjs.com/package/@iamgx/pro-layout"><code>@iamgx/pro-layout</code></a>
      </li>
      <li>
        <a href="https://www.npmjs.com/package/@iamgx/quick-el-drawer"><code>@iamgx/quick-el-drawer</code></a>
      </li>
      <li>
        <a href="https://www.npmjs.com/package/@iamgx/quick-el-modal"><code>@iamgx/quick-el-modal</code></a>
      </li>
      <li>
        <a href="https://www.npmjs.com/package/@iamgx/image-preview"><code>@iamgx/image-preview</code></a>
      </li>
      <li>
        <a href="https://www.npmjs.com/package/@iamgx/quick-print"><code>@iamgx/quick-print</code></a>
      </li>
      <li>
        <a href="https://www.npmjs.com/package/@iamgx/easy-copy"><code>@iamgx/easy-copy</code></a>
      </li>
      <li>
        <a href="https://www.npmjs.com/package/@iamgx/watermark"><code>@iamgx/watermark</code></a>
      </li>
    </ul>
    <br />
    <h1 id="致谢">致谢</h1>
    <blockquote>
      <p>
        <strong>本人有多个独立项目开发经验， 可以快速熟悉新项目， 快速融入新团队。</strong
        ><strong>感谢您花时间阅读我的简历，期待能有机会和您共事。</strong>
      </p>
    </blockquote>
  </div>
</template>

<script>
export default {
  name: 'Resume'
}
</script>
