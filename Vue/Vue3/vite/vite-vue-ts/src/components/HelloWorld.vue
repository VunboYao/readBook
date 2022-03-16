<script setup lang="ts">
defineProps<{ msg: string }>()
const count = ref(2)
</script>

<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="count++" title2="123">count is: {{ count }}</button>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
