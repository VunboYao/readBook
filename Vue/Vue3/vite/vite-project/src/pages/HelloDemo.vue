<template>
  <div>
    <HelloWorld :msg="msg" />
    <input
      v-model="msg"
      v-focus="msg"
    >
  </div>
</template>

<script setup>
import HelloWorld from '../components/HelloWorld.vue'
import { ref } from 'vue'
let msg = ref('Hello Vue3')
</script>

<style lang="scss" scoped>

</style>