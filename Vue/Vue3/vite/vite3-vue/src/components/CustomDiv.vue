<template>
<div v-bind="$attrs" @click.self="myClick"><slot></slot></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits(['myClick'])
let flag = ref(false)
const myClick = (el) => {
  if (!flag.value) {
    flag.value = true
    emit('myClick', 'surprize')
    setTimeout(() => {
      flag.value = false
    }, 2000)
  }
}
</script>

<style scoped>
</style>
