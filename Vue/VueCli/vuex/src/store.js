import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 9,
    todos: [
      { id: 1, text: 'one', done: true },
      { id: 2, text: 'two', done: false },
      { id: 3, text: 'three', done: true },
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state,getters) => {
      return getters.doneTodos.length
    },
    getTodoById: state => id => state.todos.find(todo => todo.id === id)
  },
  mutations: {
    increment(state,data) {
      state.count+=data.num;
    }
  },
  actions: {
    incrementAsync({commit},datas) {
        commit('increment',datas);
    }
  }
})
