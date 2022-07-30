<template>
  <div ref="el">
    HelloWorld
    {{ count }}
    <button @click="show">
      {{ bar }}
    </button>
    {{ count2 }}
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, inject, onMounted, provide, ref, watchEffect } from "vue"
import type { InjectionKey, Ref } from "vue"

let count: Ref<string | number> = ref()
let count2 = ref<string | number>('2020')
interface Props {
  foo?: string
  bar?: number
}

const { foo, bar = 100 } = defineProps<Props>()

// 基于类型
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

watchEffect(() => {
  console.log(foo, bar)
})

const show = (event: Event) => {
  console.log((event.target as HTMLInputElement).value)
  emit('update', '><>')
}

const key = Symbol() as InjectionKey<string>
provide(key, '123')

const foo2 = inject<string>('foo', 'bar')

const el = ref<HTMLInputElement | null>(null)
onMounted(() => {
  el.value?.focus()
})
</script>

<style scoped>

</style>
