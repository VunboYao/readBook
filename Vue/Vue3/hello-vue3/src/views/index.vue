<template>
  <h1>当前所在路由：{{ route.path }}</h1>
  <div>
    <RouterLink to="./pinia-01">
      Pinia01
    </RouterLink>
  </div>
  <hr>
  <RouterView />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang='scss' scoped>

</style>
