import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 响应式
  const firstName = ref('Vunbo')
  // 非响应式，最终直接在store上可以解构获取
  const lastName = 'Yao'

  // 方法直接在store上解构获取
  const concat = () => {
    return firstName.value + lastName
  }

  // 需要包装解构
  const reserveComputed = computed(() => {
    return firstName.value.split('').reverse().join('')
  })

  return {
    firstName, lastName, concat, reserveComputed,
  }
})
