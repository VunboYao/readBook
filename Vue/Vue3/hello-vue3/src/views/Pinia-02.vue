<template>
  测试pinia中, 非响应式解构是否正确
  <p>
    <button @click="join">
      Concat
    </button>
    <button @click="changeFirstName()">
      changeFirstName
    </button>
  </p>

  <h1>{{ name }}</h1>
  <h2>{{ reserveComputed }}</h2>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const user = useUserStore()
console.log(user)

// 响应式需要包装暴露： reactive => refs
const { firstName, reserveComputed } = storeToRefs(user)

// lastName不是响应式, 方法是直接暴露
const { lastName, concat } = user

// 直接更改Store数据
const changeFirstName = () => {
  firstName.value = 'Anna'
}

// call actions get data
const name = ref('')
const join = () => {
  name.value = concat()
}
</script>

<style lang='scss' scoped>

</style>
