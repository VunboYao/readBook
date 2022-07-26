<script setup>
import { useStore } from './stores/userInfo'
const store = useStore()
</script>

<template>
  <h2>{{ store.doubleCount }}</h2>
  <RouterView />
</template>

<style>
:root {
  --main-bg-color: rgb(105, 231, 216);
}

#app {
  padding: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: var(--main-bg-color);
}
</style>
