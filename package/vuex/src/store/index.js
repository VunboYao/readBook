import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    dialogVisible: false,
  },
  mutations: {
    increment(state, payload) {
      state.count+=payload
    },
    show(state, bool) {
      state.dialogVisible = bool
    }
  },
  actions: {
    add1({commit}, payload) {
      commit('increment', payload)
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        resolve('ok')
      })
    },
  },
  modules: {
  }
})
