<template>
  <div>
    <section>
      封装了一个pc的图片查看工具, 不会设计 ui略丑
      <a target="_blank" href="https://www.npmjs.com/package/@iamgx/image-preview"> npm 仓库地址 </a>,
      <a target="_blank" href="https://github.com/imaxing/image-preview"> github地址 </a>
    </section>

    <br />
    <button @click="handleImagePreview">你可以直接打开图片预览或者点击下面codesandbox按钮去看看</button>

    <a
      target="_blank"
      href="https://codesandbox.io/s/image-preview-example-zekx32?fontsize=14&hidenavigation=1&theme=dark"
    >
      <img alt="Edit image-preview" src="https://codesandbox.io/static/img/play-codesandbox.svg" />
    </a>
  </div>
</template>

<script>
import imagePreview from '@iamgx/image-preview'
export default {
  name: 'ImagePreview',
  methods: {
    handleImagePreview() {
      imagePreview([
        'https://tva1.sinaimg.cn/large/008i3skNgy1gz8i4tglttj308207z749.jpg',
        'https://tva1.sinaimg.cn/large/e6c9d24egy1gzpuhh1kk1j20u00u0q44.jpg'
      ])
    }
  }
}
</script>
