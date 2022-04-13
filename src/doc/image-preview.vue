<template>
  <div>
    <img
      style="width: 200px; height: 200px"
      @click="imagePreview(list, { index: i })"
      v-for="(it, i) in list"
      :key="i"
      :src="it"
      alt=""
    />
  </div>
</template>

<script>
export default {
  name: 'ImagePreview',
  data: () => ({
    list: [
      'https://tva1.sinaimg.cn/large/008i3skNgy1gz8i4tglttj308207z749.jpg',
      'https://tva1.sinaimg.cn/large/e6c9d24egy1gzpuhh1kk1j20u00u0q44.jpg'
    ]
  })
}
</script>
