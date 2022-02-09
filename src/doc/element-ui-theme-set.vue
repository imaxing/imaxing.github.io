<template>
  <div>
    <section class="mgb10">
      此方法封装了
      <a
        target="_blank"
        href="https://github.com/PanJiaChen/vue-element-admin/blob/master/src/components/ThemePicker/index.vue"
      >
        vue-element-admin
      </a>
      中的实现, 修改为函数式调用,
      <a target="_blank" href="https://www.npmjs.com/package/@iamgx/element-ui-theme-set"> npm 仓库地址 </a>,
      <a target="_blank" href="https://github.com/imaxing/element-ui-theme-set"> github地址 </a>
    </section>

    <iframe
      src="https://codesandbox.io/embed/quirky-darkness-4d61d?fontsize=14&hidenavigation=1&theme=dark"
      style="width: 100%; height: 500px; border: 0; border-radius: 4px; overflow: hidden"
      title="element-ui-theme-set-example"
      class="mgt10"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  </div>
</template>

<script>
export default {
  name: 'ElementUiThemeSetDemo'
}
</script>
