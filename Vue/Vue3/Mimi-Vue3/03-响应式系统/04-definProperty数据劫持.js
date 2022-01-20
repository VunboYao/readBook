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

	let dep = depsMap.get(key)
	if (!dep) {
		dep = new Dep()
		depsMap.set(key, dep)
	}
	return dep
}

function reactive(raw) {
	Object.keys(raw).forEach(key => {
		const dep = getDep(raw, key)
		let value = raw[key]
		Object.defineProperty(raw, key, {
			get() {
				dep.depend()
				return value
			},
			set(newVal) {
				if (newVal !== value) {
					value = newVal
					dep.notify()
				}
			},
		})
	})
	return raw
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
// info.counter++
info.name = 'yyb'
