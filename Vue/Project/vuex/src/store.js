import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 5,
    todos: [{
        id: 1,
        text: 'one',
        done: true
      },
      {
        id: 2,
        text: 'two',
        done: false
      },
      {
        id: 3,
        text: 'three',
        done: true
      },
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    add({
      dispatch
    }) {
      dispatch('increment')
    }
  }
})
