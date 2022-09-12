<template>
  Hello: {{ countStore.number }} - {{ doubleNumber }}
  <button @click="add">
    Add {{ number }}
  </button>
  <button @click="down">
    Down
  </button>
  <button @click="countStore.$reset">
    Reset
  </button>
</template>

<script setup lang="ts">
import { useCountStore } from '@/store/counter'
import { storeToRefs } from 'pinia'
import { useRouterFrom } from '@/hooks/useRouterFrom'
import { usePoint } from '../hooks/usePoint'

const countStore = useCountStore()
const useRouterFromData = useRouterFrom()
// 不能使用解构，如果用，必须使用toRefs或者 storeToRefs
const { number, doubleNumber } = storeToRefs(countStore)
const { add } = countStore

// 可以直接修改store中的state
const down = () => {
  countStore.number--
}
usePoint()
</script>

<style lang='scss' scoped>
</style>
