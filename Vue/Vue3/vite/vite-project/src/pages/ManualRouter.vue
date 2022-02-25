<script setup>
import { ref, computed } from 'vue'
import About from '@comp/About.vue'
import Home from '@comp/Home.vue'
import NotFound from '@comp/NotFound.vue'
const routes = {
  '/': Home,
  '/about': About
}
const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <el-button><a href="#/">Home</a></el-button>
  <el-button><a href="#/about">About</a></el-button>
  <el-button><a href="#/non-existent">Error</a></el-button>
  <component :is="currentView" />
</template>
