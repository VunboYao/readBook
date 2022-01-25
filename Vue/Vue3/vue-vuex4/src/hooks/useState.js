import {mapState, useStore} from "vuex"
import {computed} from "vue"

export function useState(mapper) {
	const store = useStore()
	// 获取到对应的对象的functions: {name: function, age: function}
	const storeStateFns = mapState(mapper)
	const newState = {}
	Object.keys(storeStateFns).forEach(fnKey => {
		const fn = storeStateFns[fnKey].bind({$store: store})
		newState[fnKey] = computed(fn)
	})
	return newState
}
