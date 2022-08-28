<template>
  <h1>当前所在路由：{{ route.path }}</h1>
  <div>
    <RouterLink to="pinia-01">
      <button>Pinia01</button>
    </RouterLink>
    <RouterLink to="pinia-02">
      <button>Pinia02</button>
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
button {
  padding: 8px 14px;
  margin: 4px 10px;
  border-radius: 4px;
  border-color: transparent;
  background-color: rgba(82, 202, 213, 0.2);
  cursor: pointer;

  &:hover {
    background-color: rgba(82, 202, 213, 0.4);
  }
}
</style>
