<template>
  <div>
    <textarea ref="thee"></textarea>
  </div>
</template>

<script>
// import  tinymce from  './tinymce.min.js';
const tinymce = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      tinymce.init({
        selector: this.$refs.thee,
        language: "zh_CN",
        language_url: "./langs/zb_CN.js"
    })
    }
  }
}
</script>
