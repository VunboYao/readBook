<template>
  <div>
    <el-button type="error">404</el-button>
  </div>
</template>

<script>
export default {
  name: 'E404',
  mounted() {
    console.log(this.$route.params);
  }
}
</script>

<style>

</style>
