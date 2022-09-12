<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { EventTrack } from './EventTrack'
import { provide } from 'vue'
const Point = new EventTrack()
provide('track', Point)
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
