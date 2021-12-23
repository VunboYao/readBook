const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'


class MyPromise {
	constructor(executor) {
		this.status = PENDING
		this.value = null
		this.reason = null
		this.onFulfilledFns = []
		this.onRejectedFns = []

		const resolve = value => {
			if (this.status === PENDING) {
				this.status = FULFILLED
				this.value = value
				this.onFulfilledFns.forEach(fn => fn())
			}
		}

		const reject = reason => {
			if (this.status === PENDING) {
				this.status = REJECTED
				this.reason = reason
				this.onRejectedFns.forEach(fn => fn())
			}
		}

		try {
			executor(resolve, reject)
		} catch (e) {
			reject(e)
		}
	}

	resolvePromise(promise2, x, resolve, reject) {
		if (promise2 === x) {
			reject(new TypeError('禁止循环调用'))
		}
		if (x && typeof x === 'object' || typeof x === 'function') {
			let called
			try {
				let then = x.then
				if (typeof then === 'function') {
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
					// 如果不是函数 .resolve
					if (called) return
					called = true
					resolve(x)
				}
			} catch (e) {
				// 如果调用then方法抛出异常。
				if (called) return
				called = true
				reject(e)
			}
		} else {
			// 如果不是函数，或者对象。直接resolve
			resolve(x)
		}
	}

	then(onFulfilled, onRejected) {
		onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
		onRejected = typeof onRejected === 'function' ? onRejected : e => {
			throw e
		}

		const promise2 = new MyPromise((resolve, reject) => {
			if (this.status === FULFILLED) {
				setTimeout(() => {
					try {
						const x = onFulfilled(this.value)
						this.resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				})
			}

			if (this.status === REJECTED) {
				setTimeout(() => {
					try {
						const x = onRejected(this.reason)
						this.resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				})
			}

			if (this.status === PENDING) {
				this.onFulfilledFns.push(() => {
					setTimeout(() => {
						try {
							const x = onFulfilled(this.value)
							this.resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					})
				})

				this.onRejectedFns.push(() => {
					setTimeout(() => {
						try {
							const x = onRejected(this.reason)
							this.resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					})
				})
			}
		})
		return promise2
	}

	catch(onRejected) {
		return this.then(null, onRejected)
	}

	finally(fn) {
		this.then(fn, fn)
	}

	static resolve(arg) {
		if (arg instanceof MyPromise) {
			return arg
		}
		return new MyPromise(resolve => {
			resolve(arg)
		})
	}

	static reject(arg) {
		return new MyPromise((resolve, reject) => {
			reject(arg)
		})
	}

	static all(promises) {
		return new MyPromise((resolve, reject) => {
			const result = []
			const len = promises.length
			promises.forEach(promise => {
				promise.then(value => {
					result.push(value)
					if (result.length === len) {
						resolve(result)
					}
				}, reason => {
					reject(reason)
				})
			})
		})
	}

	static race(promises) {
		return new MyPromise((resolve, reject) => {
			if (promises.length === 0) return resolve()
			promises.forEach(promise => {
				promise.then(resolve, reject)
			})
		})
	}

	static allSettled(promises) {
		return new MyPromise((resolve) => {
			const len = promises.length
			const result = []
			promises.forEach(promise => {
				promise.then(value => {
					result.push({status: FULFILLED, value})
					if (result.length === len) {
						resolve(result)
					}
				}, reason => {
					result.push({status: FULFILLED, value: reason})
					if (result.length === len) {
						resolve(result)
					}
				})
			})
		})
	}

	// 只要一个Promise成功，就返回那个。如果都失败，返回一个失败的promise和AggregateError类型的实例
	static any(arr) {
		return new MyPromise((resolve, reject) => {
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

MyPromise.defer = MyPromise.deferred = function () {
	let dfd = {}
	dfd.promise = new MyPromise((resolve, reject) => {
		dfd.resolve = resolve
		dfd.reject = reject
	})
	return dfd
}

module.exports = MyPromise
