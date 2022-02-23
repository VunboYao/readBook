<script setup>

import { ref,onMounted } from 'vue'
const count = ref(0)


function increment() {
  count.value++
}
onMounted(() => {
  console.log(`The initial count is ${count.value}`);
})
</script>

<template>
  <button @click="increment">count is {{count}}</button>
</template>

<style scoped>
</style>
