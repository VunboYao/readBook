{
	// 冒泡排序
	let a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221]

	function bubbleSort(array) {
		const len = array.length
		if (len < 2) return array
		for (let i = 0; i < len; i++) {
			for (let j = 0; j < i; j++) {
				if (array[j] > array[i]) {
					// console.log(i, j);
					// debugger
					const temp = array[j]
					array[j] = array[i]
					array[i] = temp
				}
			}
		}
		return array
	}

	// console.log(bubbleSort(a))
}

{
	// 快速排序
	let a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221]

	function quickSort(array) {
		let quick = function (arr) {
			if (arr.length <= 1) return arr
			// 求中间值
			const index = Math.floor(arr.length >> 1)
			// 取第一位值
			const pivot = arr.splice(index, 1)[0]
			const left = []
			const right = []
			for (let i = 0; i < arr.length; i++) {
				if (arr[i] > pivot) {
					right.push(arr[i])
				} else if (arr[i] <= pivot) {
					left.push(arr[i])
				}
			}
			// console.log('right ' + pivot, right);
			// console.log('left ' + pivot, left);
			// debugger
			return quick(left).concat([pivot], quick(right))
		}
		return quick(array)
	}

	let c = quickSort(a)
	// console.log(c);
}

{
	// 插入排序
	let a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221]

	function insertSrot(array) {
		const len = array.length
		let current, prev
		for (let i = 1; i < len; i++) {
			current = array[i]
			prev = i - 1
			console.log(i, current)
			while (prev >= 0 && array[prev] > current) {
				debugger
				array[prev + 1] = array[prev]
				prev--
			}
			array[prev + 1] = current
		}
		return array
	}

	// console.log(insertSrot(a))
}

{
	// 选择排序
	const a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221]

	function selectSort(array) {
		const len = array.length
		let temp, minIndex
		for (let i = 0; i < len - 1; i++) {
			minIndex = i
			for (let j = i + 1; j < array; j++) {
				// console.log(i, j);
				if (array[j] < array[minIndex]) {
					minIndex = j
				}
			}
			temp = array[i]
			array[i] = array[minIndex]
			array[minIndex] = temp
		}
		return array
	}

	// console.log(selectSort(a))
}

{
	const a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221]

	function heap_sort(arr) {
		let len = arr.length
		let k = 0

		function swap(i, j) {
			let temp = arr[i]
			arr[i] = arr[j]
			arr[j] = temp
		}

		function max_heapify(start, end) {
			let dad = start
			let son = dad * 2 + 1
			if (son >= end) return
			if (son + 1 < end && arr[son] < arr[son + 1]) {
				son++
			}
			if (arr[dad] <= arr[son]) {
				swap(dad, son)
				max_heapify(son, end)
			}
		}

		for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
			max_heapify(i, len)
		}

		for (let j = len - 1; j < k; j--) {
			swap(0, j)
			max_heapify(0, j)
		}

		return arr
	}

	// console.log(heap_sort(a))
}

{
	let a = {
		name: 4,
		[Symbol.iterator]() {
			let name = this.name
			return {
				next() {
					if (name <= 0) {
						return {value: undefined, done: true}
					} else {
						return {value: name--, done: false}
					}
				},
			}
		},
	}
	for (let c of a) {
		// console.log(c);
	}
	setTimeout(() => {
		// window.close()
	}, 3000)
	/*   class Test {
		constructor(limit) {
			this.limit = limit
		}

		[Symbol.iterator]() {
			let count = 1, limit = this.limit
			return {
				next() {
					if (count <= limit) {
						return {done: false, value: count++}
					} else {
						return {done: true}
					}
				},
				return() {
					console.log('Exiting early');
					return {done: true}
				}
			}
		}
	}
	let c1 = new Test(4)
	for (let i of c1) {
		if (i > 2) {
			break
		}
		console.log(i);
	} */
}

{
/*	function demo() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('123')
			}, 1000)
		})
	}

	function test() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject('456')
			}, 1000)
		})
	}

	function foo() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('789')
			}, 1000)
		})
	}

	const arr = [demo, test, foo]
	// const subArr = arr.map(item => {
	//   return item()
	//     .then(res => {
	//       return res
	//     })
	//     .catch(err => {
	//       return err
	//     })
	// })
	Promise.any([demo(), test(), foo()])
			.then(res => {
				// console.log(res, 'ok')
			})
			.catch(err => {
				// console.log(err)
			})*/
}

{
	function EventEmitter() {
		// 存放自定义事件，以及自定义事件的回调函数
		this._events = {}
	}

	EventEmitter.prototype.on = function (eventName, listener) {
		if (!eventName || !listener) return
		// 判断回调函数 listener 是否是函数
		if (!isValidListener(listener)) {
			throw new TypeError('listener must be a function')
		}
		// 获取事件池
		let events = this._events
		// 获取事件的回调【数组】
		let listeners = events[eventName] = events[eventName] || []
		let listenerIsWrapped = typeof listener === 'object'
		// 判断是否已存在该事件，没有则新增
		if (indexOf(listeners, listener) === -1) {
			// once 模式则直接传入，on 模式加工 listener 对象
			listeners.push(listenerIsWrapped ? listener : {
				listener: listener,
				once: false // 非 once 模式
			})
		}
		// return this
	}

	EventEmitter.prototype.emit = function (eventName, args) {
		// 通过内部对象获取对应自定义事件的回调函数
		let listeners = this._events[eventName]
		if (!listeners) return
		// 考虑多个 listener 的情况
		for (let i = 0, len = listeners.length; i < len; i++) {
			let listener = listeners[i]
			if (listener) {
				listener.listener.call(this, args || '')
				// once 为 true 执行回调关闭
				if (listener.once) {
					this.off(eventName, listener.listener)
				}
			}
		}
		// return this
	}

	EventEmitter.prototype.off = function (eventName, listener) {
		// 通过内部对象获取对应自定义事件的回调函数
		let listeners = this._events[eventName]
		if (!listener) return
		let index
		for (let i = 0, len = listeners.length; i < len; i++) {
			// 查询与传入的listener相同的索引值
			if (listeners[i] && listeners[i].listener === listener) {
				index = i
				break
			}
		}
		if (typeof index !== 'undefined') {
			listeners.splice(index, 1, null)
		}
		// return this
	}

	EventEmitter.prototype.once = function (eventName, listener) {
		// 直接调用 on 方法, once 参数传入 true
		this.on(eventName, {
			listener: listener,
			once: true
		})
	}

	EventEmitter.prototype.allOff = function (eventName) {
		// 如果eventName 存在，则将其对应的 listeners 的数组直接清空
		if (eventName && this._events[eventName]) {
			this._events[eventName] = []
		} else {
			// 否则清空所有注册事件
			this._events = {}
		}
	}

	// 判断是否是合法的 listener
	function isValidListener(listener) {
		if (typeof listener === 'function') {
			return true
		} else if (listener && typeof listener === 'object') {
			// 为了适配once情况，此处传入的是对象类型的listener
			return isValidListener(listener.listener)
		} else {
			return false
		}
	}

	// 判断新增的自定义事件是否存在
	function indexOf(array, item) {
		let result = -1
		// 针对once方法处理
		item = typeof item === 'object' ? item.listener : item
		for (let i = 0, len = array.length; i < len; i++) {
			// 判断事件回调数组中是否包含此方法，返回其索引值
			if (array[i].listener === item) {
				result = i
				break
			}
		}
		// 否则返回-1
		return result
	}

	let ET = new EventEmitter()

	function sayName(names) {
		// console.log('sayName', names)
	}

	function eatApple(names) {
		console.log(names, ' eat apple')
	}

	/*   ET.once('say', sayName) // 执行一次
		ET.emit('say', 'yao') // once执行一次
		ET.emit('say', 'yao') // once不再执行 */


	ET.on('say', sayName) // 注册事件
	ET.on('say', eatApple) // 注册多个事件
	ET.emit('say', 'Vunbo') // 触发2个不同的事件

	/*ET.on('say', sayName)
		ET.on('eat', sayName)
		ET.allOff('say') // 清空 say 的注册事件 */
}

{
	try {
		module.exports = Promise
	} catch (e) {}

	function Promise(executor) {
		let self = this
		self.status = 'pending' // init Status
		self.data = undefined // Promise的值
		self.onResolvedCallback = [] // Promise resolve 时的回调函数集
		self.onRejectedCallback = [] // Promise reject 时的回调函数集
		function resolve(value) {
			if (value instanceof Promise) {
				return value.then(resolve, reject)
			}
			setTimeout(function () { // 异步执行所有的回调函数
				if (self.status === 'pending') {
					self.status = 'resolved'
					self.data = value
					for (let i = 0, len = self.onResolvedCallback.length; i < len; i++) {
						self.onResolvedCallback[i](value)
					}
				}
			})
		}

		function reject(reason) {
			setTimeout(function () {
				if (self.status === 'pending') {
					self.status = 'rejected'
					self.data = reason
					for (let i = 0, len = self.onRejectedCallback.length; i < len; i++) {
						self.onRejectedCallback[i](reason)
					}
				}
			})
		}

		try {
			executor(resolve, reject) // 执行 executor 并传入相应的参数
		} catch (e) {
			reject(e)
		}
	}

	function resolvePromise(promise2, x, resolve, reject) {
		let then, thenCallOrThrow = false
		if (promise2 === x) {
			return reject(new TypeError('Chaining cycle detected for promise'))
		}
		if (x instanceof Promise) {
			if (x.status === 'pending') {
				x.then(function (v) {
					resolvePromise(promise2, v, resolve, reject)
				}, reject)
			} else {
				x.then(resolve, reject)
			}
			return
		}
		if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
			try {
				then = x.then
				if (typeof then === 'function') {
					then.call(x, function rs(y){
						if (thenCallOrThrow) return
						thenCallOrThrow = true
						return resolvePromise(promise2, y, resolve, reject)
					}, function rj(r) {
						if (thenCallOrThrow) return
						thenCallOrThrow = true
						return reject(r)
					})
				} else {
					resolve(x)
				}
			} catch (e) {
				if (thenCallOrThrow) return
				thenCallOrThrow = true
				return reject(e)
			}
		} else {
			resolve(x)
		}
	}

	Promise.prototype.then = function (onResolved, onRejected) {
		let self = this
		let promise2
		// 如果 then 的参数不是 function，则忽略
		onResolved = typeof onResolved === 'function' ? onResolved : function (v) {
			return v
		}
		onRejected = typeof onRejected === 'function' ? onRejected : function (r) {
			throw r
		}
		if (self.status === 'resolved') {
			return promise2 = new Promise(function (resolve, reject) {
				setTimeout(function () { // 异步执行 onResolved
					try {
						let x = onResolved(self.data)
						resolvePromise(promise2, x, resolve, reject)
					} catch (reason) {
						reject(reason) // 如果出错，以捕获到的错误作为结果
					}
				})
			})
		}

		if (self.status === 'rejected') {
			return promise2 = new Promise(function (resolve, reject) {
				setTimeout(function () {
					try {
						let x = onRejected(self.data)
						resolvePromise(promise2, x, resolve, reject)
					} catch (reason) {
						reject(reason)
					}
				})
			})
		}

		if (self.status === 'pending') {
			// 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，只能等到Promise的状态确定后，才能确定如何处理
			return promise2 = new Promise(function (resolve, reject) {
				self.onResolvedCallback.push(function (value) {
					try {
						let x = onResolved(value)
						resolvePromise(promise2, x, resolve, reject)
					} catch (r) {
						reject(r)
					}
				})
				self.onRejectedCallback.push(function (reason) {
					try {
						let x = onRejected(reason)
						resolvePromise(promise2, x, resolve, reject)
					} catch (r) {
						reject(r)
					}
				})
			})
		}
	}

	Promise.prototype.catch = function(onRejected) {
		return this.then(null, onRejected)
	}

	// 最后这个是测试用的，后面会说
	Promise.deferred = Promise.defer = function() {
		let dfd = {}
		dfd.promise = new Promise(function(resolve, reject) {
			dfd.resolve = resolve
			dfd.reject = reject
		})
		return dfd
	}
}

{
	class Node {
		constructor(element) {
			this.element = element
			this.next = null
		}
	}

	class LinkedList {
		constructor() {
			this.head = null
			this.length = 0
		}
		append(element) {
			const node = new Node(element)
			let current = null
			if (this.head === null) {
				this.head = node
			} else {
				current = this.head
				while(current.next) {
					current = current.next
				}
				current.next = node
			}
			this.length++
		}
		insert(position, element) {
			if (position < 0 && position > this.length) {
				return false
			} else {
				const node = new Node(element)
				let current = this.head
				let previous = null
				let index = 0
				if (position === 0) {
					this.head = node
					node.next = current
				} else {
					while(index++ < position) {
						previous = current
						current = current.next
					}
					node.next = current
					previous.next = node
				}
				this.length++
				return true
			}
		}

		removeAt(position) {
			if (position < 0 && position > this.length) {
				return false
			} else {
				let current = this.head
				let previous = null
				let index = 0
				if (position === 0) {
					this.head = current.next
				} else {
					while(index++ < position) {
						previous = current
						current = current.next
					}
					previous.next = current.next
				}
				this.length--
				return true
			}
		}
		findIndex(element) {
			let current = this.head
			let index = -1
			while(current) {
				if (current.element === element) {
					return index + 1
				}
				index++
				current = current.next
			}
			return -1
		}

		remove(element) {
			const index = this.findIndex(element)
			return this.removeAt(index)
		}

		get size() {
			return this.length
		}

		get isEmpty() {
			return !this.length
		}

		toString() {
			let current = this.head
			let slink = ''
			while(current) {
				slink += `${current.element}-`
				current = current.next
			}
			return slink
		}
	}

	let s = new LinkedList()
	s.append(1)
	s.append(2)
	s.append(3)
	s.append(4)
	// console.log(s)
}

// this面试题一
{
  console.log('------------------------------分割线-------------------------------')
  var name = 'window'
  var person = {
    name: 'person',
    sayName: function () {
      console.log('one=', this.name);
    }
  }

  function sayName() {
    var sss = person.sayName;
    sss(); //
    person.sayName(); //
    (person.sayName)(); //
    (b = person.sayName)(); //
  }
  sayName()
}

// this面试题二
{
  var name = 'window'
  var person1 = {
    name: 'person1',
    foo1: function () {
      console.warn('two', this.name);
    },
    foo2: () => console.warn('two', this.name),
    foo3: function () {
      return function () {
        console.warn('two', this.name);
      }
    },
    foo4: function () {
      return () => {
        console.warn('two', this.name);
      }
    }
  }
  var person2 = { name: 'person2' }

  person1.foo1(); //
  person1.foo1.call(person2) //

  person1.foo2(); //
  person1.foo2.call(person2) //

  person1.foo3()() //
  person1.foo3.call(person2)() //
  person1.foo3().call(person2) //

  person1.foo4()() //
  person1.foo4.call(person2)() //
  person1.foo4().call(person2) //
}

// this面试题Three
{
  var name = 'window'
  function Person(name) {
    this.name = name
    this.foo1 = function () {
      console.log('three>>', this.name)
    }
    this.foo2 = () => console.log('three>>', this.name)
    this.foo3 = function () {
      return function () {
        console.log('three>>', this.name)
      }
    }
    this.foo4 = function () {
      return () => console.log('three>>', this.name)
    }
  }
  var person1 = new Person('person1')
  var person2 = new Person('person2')

  person1.foo1() //
  person1.foo1.call(person2) //

  person1.foo2() //
  person1.foo2.call(person2) //

  person1.foo3()() //
  person1.foo3.call(person2)() //
  person1.foo3().call(person2) //

  person1.foo4()() //
  person1.foo4.call(person2)() //
  person1.foo4().call(person2) //
}

// this面试题Si
{
  var name = 'window'
  function Person(name) {
    this.name = name
    this.obj = {
      name: 'obj',
      foo1: function () {
        return function () {
          console.warn('four', this.name)
        }
      },
      foo2: function () {
        return () => {
          console.warn('four', this.name)
        }
      }
    }
  }
  var person1 = new Person('person1')
  var person2 = new Person('person2')
  person1.obj.foo1()() //
  person1.obj.foo1.call(person2)() //
  person1.obj.foo1().call(person2) //

  person1.obj.foo2()() //
  person1.obj.foo2.call(person2)() //
  person1.obj.foo2().call(person2) //
}

{
  Function.prototype.myCall = function(targetObj, arg = []) {
    const fn = this
    targetObj = Object(targetObj)
    targetObj.fn = fn
    targetObj.fn(arg)
  }
  function showCall(a,b,c) {
    console.log('myCall is running', this);
  }
  showCall.myCall('123', 1,2,3)

  Function.prototype.myBind = function(targetObj, bindArgs) {
    targetObj = targetObj ? Object(targetObj) : window
    targetObj.fn = this
    return function (...newArgs) {
      let args = [...bindArgs, ...newArgs]
      return targetObj.fn(...args)
    }
  }
}
