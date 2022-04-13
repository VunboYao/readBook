import Vue from 'vue'
// import Vuex from './kvuex'
import Vuex from './Nuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 2,
  },
  mutations: {
    add(state, payload) {
      state.counter += payload
    }
  },
  actions: {
    add({commit}, payload) {
      setTimeout(() => {
        commit('add', payload)
      }, 1000);
    }
  },
  getters: {
    doubleState (state) {
      return state.counter * 2
    }
  },
  modules: {
  }
})
