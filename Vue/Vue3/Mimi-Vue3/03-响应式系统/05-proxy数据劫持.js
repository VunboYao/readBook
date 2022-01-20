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

function watchEffect(effect) {
	// 收集依赖
	Dep.activeFn = effect
	effect() // 传进的函数先执行一次
	Dep.activeFn = null
}

/*
[
  [info,{
    name: 'yyb',
    age: 12
  }],
  [
    info,{
    name: 'vunbo',
    }]
  ]
]
*/
const targetMap = new WeakMap()
function getDep(target, key) {
	// 根据target对象取出对应的Map对象
	let depsMap = targetMap.get(target)
	if (!depsMap) {
		depsMap = new Map()
		targetMap.set(target, depsMap)
	}

	// 取出具体的dep对象
	let dep = depsMap.get(key)
	if (!dep) {
		dep = new Dep()
		depsMap.set(key, dep)
	}
	return dep
}

function reactive(raw) {
	return new Proxy(raw, {
		get(target, key) {
			const dep = getDep(target, key)
			dep.depend()
			return target[key]
		},
		set(target, key, newVal) {
			const dep = getDep(target, key)
			target[key] = newVal
			dep.notify()
		},
	})
}

// =========================================================
const info = reactive({ counter: 10, name: 'yyb' })
const foo = reactive({ height: 1.44 })
watchEffect(function (params) {
	console.log('A', info.counter * 2)
})
watchEffect(function (params) {
	console.log('B', info.counter ** 2)
})
watchEffect(function (params) {
	console.log('B', info.name)
})
info.counter++
// info.name = 'yyb'
