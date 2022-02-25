<template>
  <div>
    <h2>Home</h2>
  </div>
</template>

<script setup>
import { useStore } from '../stores/userInfo';
import { storeToRefs } from 'pinia'
let store = useStore()
let {name, count} = storeToRefs(store)
count.value = '123'
</script>

<style lang="scss" scoped>

</style>
