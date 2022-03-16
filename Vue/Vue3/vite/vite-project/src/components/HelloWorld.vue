<template>
  <div>
    <h2 age="20">
      Component: {{ msg }}
    </h2>
  </div>
</template>

<script setup>
defineProps({
  msg: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
</style>
