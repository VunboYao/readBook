class Dep {
	constructor() {
		this.subscribers = new Set() // 单一不会重复
	}

	depend() {
		if (Dep.activeFn) {
			this.subscribers.add(Dep.activeFn)
		}
	}

	notify() {
		this.subscribers.forEach(effect => effect())
	}
}

const dep = new Dep()

function watchEffect(effect) {
	// 收集依赖
	Dep.activeFn = effect
	dep.depend()
	effect() // 传进的函数先执行一次
	Dep.activeFn = null
}

// =========================================================
const info = { counter: 10, name: 'yyb' }
watchEffect(function (params) {
	console.log(info.counter * 2)
})
watchEffect(function (params) {
	console.log(info.counter ** 2)
})

info.counter++
dep.notify() // 触发变更
