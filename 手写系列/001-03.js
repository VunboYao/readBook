const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
	constructor(executor) {
		this.value = null
		this.reason = null
		this.status = PENDING
		this.onFulfilledFn = []
		this.onRejectedFn = []

		function resolve(value) {
			if (this.status === PENDING) {
				this.status = FULFILLED
				this.value = value
				this.onFulfilledFn.forEach(fn => fn())
			}
		}

		function reject(reason) {
			if (this.status === PENDING) {
				this.status = REJECTED
				this.reason = reason
				this.onRejectedFn.forEach(fn => fn())
			}
		}

		try {
			executor(resolve.bind(this), reject.bind(this))
		} catch (e) {
			reject(e)
		}
	}

	resolvePromise(promise2, x, resolve, reject) {
		if (promise2 === x) {
			reject(new TypeError('cycle call!!!'))
		}
		// object & func
		if ((x && typeof x === 'object') || typeof x === 'function') {
			let called
			try {
				let then = x.then
				if (typeof then === 'function') {
					then.call(
						x,
						y => {
							if (called) return
							called = true
							this.resolvePromise(promise2, y, resolve, reject)
						},
						r => {
							if (called) return
							called = true
							reject(r)
						}
					)
				} else {
					if (called) return
					called = true
					resolve(x)
				}
			} catch (e) {
				if (called) return
				called = true
				reject(e)
			}
		} else {
			// if not a func, resolve value
			resolve(x)
		}
	}

	then(onFulfilled, onRejected) {
		onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
		onRejected =
			typeof onRejected === 'function'
				? onRejected
				: reason => {
						throw reason
				  }
		const self = this
		const promise2 = new MyPromise((resolve, reject) => {
			if (self.status === FULFILLED) {
				setTimeout(() => {
					try {
						const x = onFulfilled(self.value)
						self.resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				})
			}

			if (self.status === REJECTED) {
				setTimeout(() => {
					try {
						const x = onRejected(self.reason)
						self.resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				})
			}

			if (self.status === PENDING) {
				self.onFulfilledFn.push(() => {
					setTimeout(() => {
						try {
							const x = onFulfilled(self.value)
							self.resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					})
				})
				self.onRejectedFn.push(() => {
					setTimeout(() => {
						try {
							const x = onRejected(self.reason)
							self.resolvePromise(promise2, x, resolve, reject)
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

	// TODO: Promise.rejected的参数会原封不动的作为reject的理由
	static reject(reason) {
		return new MyPromise(reject => {
			reject(reason)
		})
	}

	static all(promises) {
		let resultList = []
		let len = promises.length
		return new MyPromise((resolve, reject) => {
			promises.forEach(promise => {
				promise.then(
					value => {
						resultList.push(value)
						if (resultList.length === len) {
							resolve(resultList)
						}
					},
					reason => {
						reject(reason)
					}
				)
			})
		})
	}

	static race(promises) {
		return new MyPromise((resolve, reject) => {
			const len = promises.length
			if (len === 0) return resolve()
			promises.forEach(promise => {
				promise.then(resolve, reject)
			})
		})
	}

	static allSettled(promises) {
		return new MyPromise(resolve => {
			const len = promises.length
			const result = []
			promises.forEach(promise => {
				promise.then(
					value => {
						result.push({ status: FULFILLED, value })
						if (result.length === len) {
							resolve(result)
						}
					},
					reason => {
						result.push({ status: REJECTED, value: reason })
						if (result.length === len) {
							resolve(result)
						}
					}
				)
			})
		})
	}

	static any(promises) {
		return new MyPromise((resolve, reject) => {
			const reasons = []
			const len = promises.length
			promises.forEach(promise => {
				promise.then(resolve, reason => {
						reasons.push(reason)
						if (reasons.length === len) {
							reject(new AggregateError(reasons))
						}
					}
				)
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

// module.exports = MyPromise
/*const p = new MyPromise((resolve, reject) => {
  // resolve('ok')
  setTimeout(() => {
    reject('error')
  }, 2000)
})

p.then(res => {
  console.log(`成功：${res}`)
}, 3)

p.then(res => {
  console.log(`成功2：${res}`)
}, err => {
  console.log(`错误捕获2：${err}`)
})*/
