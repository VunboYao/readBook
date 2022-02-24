<template>
  <div>
    <h1>origin</h1>
    <ProvideTest demo="hello" />
  </div>
</template>

<script setup>
import { ref, reactive,inject, defineAsyncComponent } from 'vue'
// import ProvideTest from '../../components/ProvideTest.vue'
const ProvideTest = defineAsyncComponent(() => {
  return new Promise(resolve => {
    resolve(import('./../../components/ProvideTest.vue'))
  })
})
</script>

<style lang="scss" scoped>
</style>
