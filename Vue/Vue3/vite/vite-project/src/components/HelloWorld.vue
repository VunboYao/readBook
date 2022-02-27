<template>
  <div>
    <h2>Component: {{ msg }}</h2>
  </div>
</template>

<script setup>
defineProps({
  msg: String
})
</script>

<style lang="scss" scoped>

</style>