<script setup>
import { useStore } from './stores/userInfo'
const store = useStore()
</script>

<template>
  <h2>{{ store.doubleCount }}</h2>
  <RouterView />
</template>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
