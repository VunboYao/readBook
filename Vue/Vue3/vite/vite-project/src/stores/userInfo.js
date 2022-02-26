
import { defineStore } from 'pinia'

// 第一个参数是唯一id，组件中可以通过其调用
export const useStore = defineStore('userInfo', {
  state: (state) => {
    return {
      name: 'yyb',
      count: 0,
      score: 100
    }
  }
})

export const useCounterStore = defineStore('counterStore', {
  state: () => ({ counter: 45 })
})
