<template>
  <div id="app">
    <tinymce
      @content="getContent"
    />
  </div>
</template>

<script>
import Tinymce  from './components/Tinymce/Tinymce'
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
