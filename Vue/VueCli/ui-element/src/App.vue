<template>
  <div id="app">
    <tinymce/>
  </div>
</template>

<script>
import Tinymce from './components/TinymceCDN/Tinymcd'
export default {
  name: 'app',
  components: {
    Tinymce
  },
  methods: {
    getContent(item) {
      console.log(item)
    }
  }
}
</script>
