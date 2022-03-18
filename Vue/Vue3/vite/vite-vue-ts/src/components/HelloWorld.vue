<script setup lang="ts">
defineProps<{ msg: string }>()
const count = ref(2)
</script>

<template>
  <h1>{{ msg }}</h1>
  <button
    type="button"
    title2="123"
    @click="count++"
  >
    count is: {{ count }}
  </button>
</template>
