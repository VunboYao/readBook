class Dep {
	constructor() {
		this.subscribers = new Set() // 单一不会重复
	}

	addEffect(effect) {
		this.subscribers.add(effect)
	}

	notify() {
		this.subscribers.forEach(effect => effect())
	}
}

const dep = new Dep()

const info = { counter: 10 }
function doubleCounter(params) {
	console.log(info.counter * 2)
}
function powerCounter(params) {
	console.log(info.counter ** 2)
}

// 收集依赖
dep.addEffect(doubleCounter)
dep.addEffect(powerCounter)
info.counter++
dep.notify() // 触发变更
