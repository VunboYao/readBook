<template>
  <div>
    <h2 class="title">{{message}}</h2>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: 'Hello Vue2'
    }
  }
}
</script>
<style scoped lang="less">
.title {
  color: green;
  background: honeydew;
}
</style>
