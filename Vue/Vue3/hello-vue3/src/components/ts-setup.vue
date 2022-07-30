<template>
  <div>
    HelloWorld
    {{ (count as number).toFixed(2) }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"

let count: string | number = 1
interface Props {
  foo: string
  bar?: number
}
const { foo, bar = 100 } = defineProps<Props>()
</script>

<style scoped>

</style>
