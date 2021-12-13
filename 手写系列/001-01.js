const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise {
	constructor(executor) {
		// 3.初始设置
		this.status = PENDING
		this.value = null
		this.reason = null
		this.onResolvedFNS = [] // 成功回调
		this.onRejectedFNS = []

		// 2.参数设置
		const resolve = value => {
			if (this.status === PENDING) {
				this.status = FULFILLED
				this.value = value // resolve(xxx)
				this.onResolvedFNS.forEach(fn => fn())
			}
		}

		const reject = reason => {
			if (this.status === PENDING) {
				this.status = REJECTED
				this.reason = reason // reject(xxx)
				this.onRejectedFNS.forEach(fn => fn())
			}
		}

		// 1.执行函数
		try {
			executor(resolve, reject)
		} catch (e) {
			reject(e)
		}
	}

	then(onFulfilled, onRejected) {
		//4. 如果onFulfilled不是函数，给一个默认函数，返回value
		onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
		//5. 如果onRejected不是函数，给一个默认函数，返回reason的Error
		onRejected = typeof onRejected === 'function' ? onRejected : reason => {
			throw reason
		}
		// TODO:6.then链式调用需要返回一个promise
		const promise2 = new Promise((resolve, reject) => {
			// 1.pending状态。延迟变更等。
			if (this.status === PENDING) {
				this.onResolvedFNS.push(() => {
					// 8.异步执行
					setTimeout(() => {
						// 7.如果抛出异常，promise2需要拒绝
						try {
							let x = onFulfilled(this.value)
							this.resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					})
				})
				this.onRejectedFNS.push(() => {
					// 8.异步执行
					setTimeout(() => {
						// 7.如果抛出异常，promise2需要拒绝
						try {
							let x = onRejected(this.reason)
							this.resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					})
				})
			}
			// 2.fulfilled
			if (this.status === FULFILLED) {
				// 8.异步执行
				setTimeout(() => {
					// 7.如果抛出异常，promise2需要拒绝
					try {
						let x = onFulfilled(this.value)
						this.resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				})
			}
			// 3.rejected
			if (this.status === REJECTED) {
				setTimeout(() => {
					// 7.如果抛出异常，promise2需要拒绝
					try {
						let x = onRejected(this.reason)
						this.resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				})
			}
		})
		return promise2
	}

	resolvePromise(promise2, x, resolve, reject) {
		// 1.防止死循环
		if (promise2 === x) {
			reject(new TypeError('The promise and the x are the equal'))
		}
		// 2.对象或者函数进行解析，否则直接resolve
		if (x && typeof x === 'object' || typeof x === 'function') {
			let called // 只能调用一次
			try {
				let then = x.then
				if (typeof then === "function") {
					// 将x作为函数的作用域this调用。第一个参数是resolvePromise,第二个参数是rejectPromise
					then.call(x, y => {
						if (called) return
						called = true
						this.resolvePromise(promise2, y, resolve, reject)
					}, r => {
						if (called) return
						called = true
						reject(r)
					})
				} else {
					// 如果不是函数， resolve(x).包含如果是一个null
					if (called) return
					called = true
					resolve(x)
				}
			} catch (e) {
				// 如果调用then方法抛出异常
				if (called) return
				called = true
				reject(e)
			}
		} else {
			// 如果不是函数，或者对象。直接resolve
			resolve(x)
		}
	}

	catch(onRejected) {
		return this.then(null, onRejected)
	}

	// 用then包括。异步调用
	finally(fn) {
		this.then(fn, fn)
	}

	static resolve(arg) {
		if (arg instanceof Promise) {
			return arg
		}
		return new Promise(resolve => {
			resolve(arg)
		})
	}

	static reject(reason) {
		return new Promise((resolve, reject) => {
			reject(reason)
		})
	}

	// 合力成金
	static all(arr) {
		return new Promise((resolve, reject) => {
			const result = [], len = arr.length
			arr.forEach(promise => {
				promise.then(value => {
					result.push(value)
					if (result.length === len) resolve(result)
				}, reason => {
					reject(reason)
				})
			})
		})
	}

	// 个人竞技
	static race(arr) {
		return new Promise((resolve, reject) => {
			if (arr.length === 0) return resolve()
			arr.forEach(promise => {
				promise.then(resolve, reject)
			})
		})
	}

	// 都解决
	static allSettled(arr) {
		return new Promise((resolve, reject) => {
			const len = arr.length,
					result = []
			arr.forEach(promise => {
				promise.then(value => {
					result.push({status: FULFILLED, value})
					if (result.length === len) resolve(result)
				}, reason => {
					result.push({status: REJECTED, value: reason})
					if (result.length === len) resolve(result)
				})
			})
		})
	}

	// 只要一个Promise成功，就返回那个。如果都失败，返回一个失败的promise和AggregateError类型的实例
	static any(arr) {
		return new Promise((resolve, reject) => {
			const result = [], len = arr.length
			arr.forEach(promise => {
				promise.then(resolve, reason => {
					result.push(reason)
					if (reason.length === len) {
						reject(new AggregateError(result))
					}
				})
			})
		})
	}
}


Promise.defer = Promise.deferred = function () {
	let dfd = {}
	dfd.promise = new Promise((resolve, reject) => {
		dfd.resolve = resolve
		dfd.reject = reject
	})
	return dfd
}

module.exports = Promise

