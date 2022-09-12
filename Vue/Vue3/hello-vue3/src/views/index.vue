<template>
  <h1>当前所在路由：{{ route.path }}</h1>
  <div>
    <button @click="toPinia01">
      Pinia01
    </button>
    <button @click="toPinia02">
      Pinia02
    </button>
    <router-link to="/async-validator">
      <button>Async</button>
    </router-link>
  </div>
  <hr>
  <RouterView />
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useAwait } from '@/hooks/useAwait'
import { useRouterHooks } from '@/hooks/useRouterHooks'
const router = useRouter()
const route = useRoute()
useRouterHooks()
const toPinia02 = async () => {
  if (route.name === 'Pinia02') {
    return
  }
  router.push({
    name: 'Pinia02',
    query: {
      pinia: 2,
      func: 'foo',
    },
  })
}

const toPinia01 = () => {
  if (route.name === 'Pinia01') {
    return
  }
  router.push({
    name: 'Pinia01',
    query: {
      pinia: 1,
      func: 'bar',
    },
  })
}
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
