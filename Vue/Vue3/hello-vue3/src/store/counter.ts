import { defineStore } from "pinia"

export const useCountStore = defineStore({
  id: 'count',
  state: () => ({
    number: 2,
  }),
  getters: {
    doubleNumber(state) {
      return state.number * 2
    },
  },
  actions: {
    add() {
      this.number++
    },
  },
})
