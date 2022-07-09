<template>
  <div>
    <img
      style="width: 200px; height: 200px; object-fit: cover;margin: 4px"
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
      'https://cdn.jsdelivr.net/gh/imaxing/cdn@1.0.9/wallpaper/wallpaper_0.png',
      'https://cdn.jsdelivr.net/gh/imaxing/cdn@1.0.9/wallpaper/wallpaper_2.png',
      'https://cdn.jsdelivr.net/gh/imaxing/cdn@1.0.9/wallpaper/wallpaper_3.png',
      'https://cdn.jsdelivr.net/gh/imaxing/cdn@1.0.9/wallpaper/wallpaper_4.png',
    ]
  })
}
</script>
