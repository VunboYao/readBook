<template>
  <div>
    HelloWorld
    {{ (count as number).toFixed(2) }}
  </div>
</template>

<script setup lang="ts">
let count: string | number = 1
</script>

<style scoped>

</style>
