
<template>
  <div>
    DeepChild
    {{ message }}
  </div>
</template>

<script setup>
import { useAttrs } from 'vue'
import { inject } from 'vue'
const message = inject('message')
console.log(useAttrs());
</script>

<style lang="scss" scoped>

</style>
