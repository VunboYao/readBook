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
		add(state, payload = 1) {
			state.count+= payload
		},
		down(state, payload = 1) {
			state.count-= payload
		}
	}
})

export default store
