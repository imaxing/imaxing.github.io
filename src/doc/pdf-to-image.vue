<template>
  <div>
    <input v-model="pdfUrl" style="width: 80%" />
    <br />
    <br />
    <button @click="loadPdf" :disabled="loading">{{ loading ? '加载中' : '加载pdf' }}</button>
  </div>
</template>

<script>
import pdfToImage from '@iamgx/pdf-to-image'
export default {
  name: 'PdfToImage',
  data: () => ({
    pdfUrl: 'https://cdn.jsdelivr.net/gh/imaxing/cdn@1.0.7/pdf/开口无模具费新建合同.pdf',
    loading: false
  }),
  methods: {
    loadPdf() {
      if (!this.pdfUrl) return
      this.loading = true
      pdfToImage({url: this.pdfUrl, pdfjsLib: window.pdfjsLib}).then(images => {
        this.imagePreview(images, { index: 0 })
        this.loading = false
      })
     
    }
  }
}
</script>
