import {createStore} from 'vuex'

const store = createStore({
	state() {
		return {
			count: 1,
			name: 'yyb',
			age: 20
		}
	},
	mutations: {
		add(state) {
			state.count++
		},
		down(state) {
			state.count--
		}
	}
})

export default store
