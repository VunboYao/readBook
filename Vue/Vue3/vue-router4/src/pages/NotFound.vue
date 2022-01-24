<template>
<h2>Page Not Found</h2>
  <p>404</p>
  <h2>错误地址：{{this.$route.params.pathMatch}}</h2>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {}
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">

</style>
