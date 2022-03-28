# 个人信息

- **葛星**/男/1994 <span style="cursor: pointer" onclick="imagePreview(['https://cdn.jsdelivr.net/gh/imaxing/cdn@1.0.5/image/identification.png', 'https://cdn.jsdelivr.net/gh/imaxing/cdn@1.0.5/image/daily.png'])">(查看照片)</span>
- 本科/南京东南科技研修学院
- 工作年限：5 年
- 技术博客：<a href="https://imaxing.github.io" style="text-decoration: underline">https://imaxing.github.io</a>
- Github：<a href="https://github.com/imaxing" style="text-decoration: underline">https://github.com/imaxing</a>
- 手机：18351710121
- Email：imaxing@126.com / axing0204@gmail.com
- 期望职位：前端开发工程师
- 目前薪资：税前月薪17k
- 期望薪资：税前月薪16k~20k
- 当前状态: 在职
- 期望城市：南通

<br />

---

<br />

# 技能清单
以下为我熟练使用的技能

- css基础：html规范， 常用css布局（定位/浮动/flex）
- JS基础（原型/闭包/事件循环/事件队列/异步 Promise/async&await&generateor/JsBridge等） 
- 熟悉框架 Jquery/Vuejs(2.x&3.0)/AngularJS/Reactjs/ElementUi
  /AntDesign/VantUi/Tarojs/Nuxtjs/uniapp/Echarts/
- 熟悉微信开放平台/公众平台生态/微信公众号/网易云信im
- 熟悉 webpack/rollup/vite/gulp打包工具, 基于webpack代码分割优化， 静态资源cdn处理， 代码逻辑解耦组件等等
- 熟悉小程序（原生/多端编译）， 有过WebApp开发经验（p基于vue3.0开发），熟悉客户端防抓包处理/
- 熟悉项目服务端渲染， h5 landing page(rem, 百分比, viewport等布局)
- 有丰富后台管理系统开发经验, 处理过接口防刷, xss攻击等
- 熟悉手动部署/docker部署项目(webhook+jenkins+docker+nginx+spug+kong集成一体化部署发布流程)
- 熟悉Nodejs服务接口转发等基础操作
- 主力 vscode，webstorm， intellij， 熟悉git版本控制流程

---

<br/>



<br/>

# 工作经历

<details open>
  <summary>
    <strong>苏州方正璞华信息科技有限公司</strong>
  </summary>

**时间**: 2020/3 ~ 至今 <br />
**职位**: 前端开发工程师<br />
**公司核心技术栈**: `vue@2.6.11` `element-ui@2.15.1` `charts` `axios`<br />
**产品相关**: SRM 采云链 (SRM 致力于改善核心企业与供应商上游供应商的关系，实现和
供应商建立和维持长久、稳定紧密的伙伴关系，从而达到降低采购成本、提升工作效率的目
的)<br />
**岗位职责**:
> - 基于业务拆分了一些 npm 包解决项目最初三个仓库修改配置无法及时同步及一些日常开发中的痛点
> - 对于业务使用 remaxjs 及 tarojs 三方多段打包框架开发了供应商相关的小程序(和府供应商小程序)
> - 基于 externals 配置将三方 npm 项目依赖生产环境替换为内部阿里云 oss 云储存 cdn 加速, 静态资源全部由阿里云提供使用, 代码分割拆分了公共/业务/核心包等 chunks, 路由懒加载等常见配置
> - 通过 webpack 提供的打包生命周期函数, 开发 webpack 比对版本插件([具体思路实现方式](https://imaxing.github.io/#refresh-prod-code)), 实现每次新版本推送后用户端可以及时体验最新业务功能, 并支持配置发版标题, 发版描述, 发版时间等, <a href="https://tva1.sinaimg.cn/large/e6c9d24egy1h0pmk5v7crj22js0k2n0r.jpg" target="blank">效果图点击这里</a>
> - 自己使用 vuejs3.0 开发了一个后台壳子, 还需完善, [github 地址](https://github.com/imaxing/vue_quick_start_template)
> - 动态路由, 指令级别权限控制, pro-layout, 生成页面水印([水印效果可以看这里](https://imaxing.github.io/#water-mark))等等其他简单的业务功能组件
> - 基于开发的次系统, 为客户上线了稳定的系统环境, 如: 广发信用卡中心, 和府捞面, 振德医疗, 世纪互联等知名公司

---

</details>

<details open>
  <summary>
    <strong>苏州中知联信息科技有限公司</strong>
  </summary>

**时间**: 2019/3 ~ 2020-2<br />
**职位**: 前端开发工程师<br />
**公司核心技术栈**: `vue@2.6.10` `element-ui@2.14.1` `nuxtjs@2.x` `charts` `axios`<br />
**产品相关**: [企服服](https://www.qcc.com/firm/53ae4ecb1021cc9942f83b0112a0ffb8.html), 权查查(相关小程序目前已下线, [点此查看小程序助手记录](https://tva1.sinaimg.cn/large/e6c9d24egy1h0pnyxas76j20wd0u0abr.jpg)<a href=""></a>)<br />
**岗位职责**:

> - 负责前期权查查由 vue 开发的 spa 门户的重构, 使用基于 vue 开发的 ssr 框架 nuxtjs 配置 seo 权重收录
> **(没有> 使用 prerender-spa-plugin 的方案是因为预渲染只能渲染指定的静态页面进行 seo 配置, 动态路由的详情页面无法使用)**
  <br />进行服务端渲染重构, 将原有的 spa 门户前端页面及 spa 的后台系统通过 nuxt 的 layout 配置区可以分集成到一个项目中使用, 提升用户的使用体验
> - 权限控制这块使用 nuxt 提供的 nuxtServerinit 方案及 middleware 配置可以很好的实现用户的权限控制
> - 负责企服服的订单小程序开发工作, 基于微信小程序原生语法开发, 包括订单发起, 查询, 付款等功能模块
> - 负责权查查旧项目优化, 维护工作

---

</details>
<details open>
  <summary>
    <strong>江苏通付盾信息科技有限公司</strong>
  </summary>

**时间**: 2017/12 ~ 2019/3 <br/>
**职位**: 前端开发工程师<br/>
**公司核心技术栈**: `reactjs@15.x` `ant-design` `dvajs` `backbonejs` `redux` `charts` `d3` `axios`<br/>
**产品相关**:

> - 通付盾反欺诈系统 (检测欺诈⾏为性质的平台, 通付盾核心项目, 技术栈较老, mvc 模式的框架)
> - 通付盾决策引擎管理平台(基于 echarts 的大屏展示项目, 概括就是轮训+图表 没有接入长连接)；
> - 通付盾催收机器⼈平台 (⼀个调用三方 api 对预期状态的贷款⼈自动进⾏电话催收的管理平台, 就点一下或者配置时间范围, 电话机器人自动打过去了)
> - 涵盖通⽤版本和各分⽀版本，包括策略引擎，审核管理，系统管理，模板管理等功能模块。
> - 负责前端公共函数⽅法维护，一些通⽤ ui 组件的开发工作, 及一些业务模块
> - 都是一些管理系统, dvajs(个人维护项目, 已不再维护) 将 redux 的麻烦的写法封装了成了配置 model 层提供了简单的 api 上手简单, 跟 umijs 异曲同工. dva-loading 的配置很好用, 不用机械的写一遍又一遍的 loading 打开和关闭; 业务部分都是进行一些数据的增删改查字段联动

---

</details>

<details open>
  <summary>
    <strong>苏州罗想软件股份有限公司</strong>
  </summary>

**时间**:  2016/4 ~ 2017/12<br/>
**职位**:  前端开发工程师<br/>
**公司核心技术栈**:  `vuejs@15.x` `eleemnt-ui` `jquery` `easyui` `bootstrap`<br/>
**岗位职责**:
> - 负责订单管家系统的系统搭建功能开发工作, 早起第一次使用vuecli搭建一个vue项目从0-1, 熟悉了vuejs的路由, 请求, 组件, ui等知识, 麻雀虽小五脏俱全, 使用本地化路由+meta进行权限控制, 前期使用了vue-resource请求库, 后期vue官方不维护了替换为了axios
> - 负责老项目 erp  的功能开发维护工作, 基于jquery+bootstrap的老项目, 没什么可讲的, 学到了通过jquery.extends 开发jquery 插件的一些知识
> - 负责公司内部 ui库 rs-ui  的组件迭代工作, 订单管家项目上线后, 自己动手搭了一套简单的ui库, 在公司内部分享, 虽然后期不用了 但第一次积累下了开发组件的一些心得
> - 公司内部有较好的技术氛围每周进行一次简单的技术分享, 分享了组件的搭建过程, 如何创建一个自己的table组件等等
</details>

<br/>

# 开源工具
  [@iamgx/easy-upload](https://www.npmjs.com/package/@iamgx/easy-upload)<br />
  [@iamgx/element-ui-theme-set](https://www.npmjs.com/package/@iamgx/element-ui-theme-set)<br />
  [@iamgx/pro-layout](https://www.npmjs.com/package/@iamgx/pro-layout)<br />
  [@iamgx/quick-el-drawer](https://www.npmjs.com/package/@iamgx/quick-el-drawer)<br />
  [@iamgx/quick-el-modal](https://www.npmjs.com/package/@iamgx/quick-el-modal)<br />
  [@iamgx/image-preview](https://www.npmjs.com/package/@iamgx/image-preview)<br />
  [@iamgx/quick-print](https://www.npmjs.com/package/@iamgx/quick-print)<br />
  [@iamgx/easy-copy](https://www.npmjs.com/package/@iamgx/easy-copy)<br />
  [@iamgx/watermark](https://www.npmjs.com/package/@iamgx/watermark)<br />

<br/>


# 致谢
> 本人有多个独立项目开发经验， 可以快速熟悉新项目， 快速融入新团队。<br/>
> 感谢您花时间阅读我的简历，期待能有机会和您共事。
