try {
	module.exports = Promise
} catch (e) {
}

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
				then.call(x, function rs(y) {
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

Promise.prototype.catch = function (onRejected) {
	return this.then(null, onRejected)
}

// 最后这个是测试用的，后面会说
Promise.deferred = Promise.defer = function () {
	let dfd = {}
	dfd.promise = new Promise(function (resolve, reject) {
		dfd.resolve = resolve
		dfd.reject = reject
	})
	return dfd
}
