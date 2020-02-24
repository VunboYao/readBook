/*
{
	/!*
* https://www.ituring.com.cn/article/66566
* *!/

	const PENDING = PENDING
	const FULFILLED = RESOLVED
	const REJECTED = REJECTED

	class YPromise {
		constructor(executor) {
			// 初始状态
			this.state = PENDING
			// 成功值
			this.value = undefined
			// 失败值
			this.reason = undefined
			// 成功存放的数组
			this.onResolvedCallbacks = []
			// 失败存放的数组
			this.onRejectedCallbacks = []

			// 成功回调
			const resolve = value => {
				if (this.state === PENDING) {
					this.state = FULFILLED
					this.value = value
				}
			}

			// 失败回调
			const reject = reason => {
				if (this.state === PENDING) {
					this.state = REJECTED
					this.reason = reason
				}
			}

			try {
				executor(resolve, reject)
			} catch (e) {
				reject(e)
			}
		}

		then(onFulfilled, onRejected) {
			// onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
			onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
			// onRejected如果不是函数，就忽略onRejected，直接扔出错误
			onRejected = typeof onRejected === 'function' ? onRejected : err => {
				throw err
			}
			const promise2 = new YPromise((resolve, reject) => {
				// 成功状态
				if (this.state === FULFILLED) {
					setTimeout(() => {
						try {
							const x = onFulfilled(this.value)
							this.resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					}, 0)

				}

				// 失败状态
				if (this.state === REJECTED) {
					setTimeout(() => {
						try {
							const x = onRejected(this.reason)
							this.resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					}, 0)
				}

				// Pending 状态
				if (this.state === PENDING) {
					// 传入成功数组
					this.onResolvedCallbacks.push(() => {
						setTimeout(() => {
							try {
								const x = onFulfilled(this.value)
								this.resolvePromise(promise2, x, resolve, reject)
							} catch (e) {
								reject(e)
							}
						}, 0)
					})

					// 传入失败数组
					this.onRejectedCallbacks.push(() => {
						setTimeout(() => {
							try {
								const x = onRejected(this.reason)
								this.resolvePromise(promise2, x, resolve, reject)
							} catch (e) {
								reject(e)
							}
						}, 0)
					})
				}
			})

			return promise2
		}

		resolvePromise(promise2, x, resolve, reject) {
			// 循环引用报错
			if (x === promise2) {
				return reject(new TypeError('Chaining cycle detected for promise'))
			}

			// 防止多次调用
			let called
			// x 不是null 且是对象或函数
			if (x !== null & (typeof x === 'object' || typeof x === 'function')) {
				try {
					// A+规定, 声明 then = x 的 then 方法
					let then = x.then
					// 如果 then 是函数, 默认是 promise
					if (typeof then === 'function') {
						// 让 then 执行, 第一个参数是 this 后面是成功的回调和失败的回调
						then.call(x, y => {
							// 成功和失败只能调用一个
							if (called) return
							called = true
							// resolve的结果依旧是promise那就继续解析
							this.resolvePromise(promise2, y, resolve, reject)
						}, err => {
							// 成功和失败只能调用一个
							if (called) return
							called = true
							reject(err)
						})
					} else {
						resolve(x)
					}
				} catch (e) {
					if (called) return
					called = true
					reject(e)
				}
			} else {
				resolve(x)
			}
		}

		static resolve(val) {
			return new YPromise((resolve, reject) => {
				resolve(val)
			})
		}

		static reject(val) {
			return new Promise((resolve, reject) => {
				reject(val)
			})
		}

		static race(promises) {
			return new Promise((resolve, reject) => {
				for (let i = 0; i < promises.length; i++) {
					promises[i].then(resolve, reject)
				}
			})
		}

		static all(promises) {
			let arr = []
			let count = 0
			return new YPromise((resolve, reject) => {
				for (let i = 0; i < promises.length; i++) {
					promises[i].then(data => {
						arr[i] = data
						if (count === promises.length) {
							resolve(arr)
						}
					}).catch(e => {
						reject(e)
					})
				}
			})
		}
	}

	/!*Promise.defer = Promise.deferred = function () {
		let dfd = {}
		dfd.promise = new Promise((resolve,reject)=>{
			dfd.resolve = resolve;
			dfd.reject = reject;
		});
		return dfd;
	}
	module.exports = Promise;*!/


	const p = new YPromise((resolve, reject) => {
		resolve('111')
	})
	const p1 = new YPromise((resolve, reject) => {
		resolve('222')
	})
	const p2 = new YPromise((resolve, reject) => {
		resolve('333')
	})
	const c = YPromise.all([p, p1, p2]).then(res => {
		console.log(res)
	})

}*/

/*
* 自定义 Promise 函数模块
* */

(function (window) {
	const PENDING = 'pending'
	const RESOLVED = 'resolved'
	const REJECTED = 'rejected'

	/*
	* Promise 构造函数
	* executor: 执行函数(同步执行)
	* */
	function Promise(executor) {
		const that = this
		that.status = PENDING
		that.data = undefined
		that.onResolvedCallbacks = []
		that.onRejectedCallbacks = []

		function resolve(value) {
			// 如果状态不是 pending, 直接结束
			if (that.status !== PENDING) return
			// 改变状态
			that.status = RESOLVED
			// 保留 value
			that.data = value
			// 如果有待执行的 callbacks, 立即执行异步回调函数
			if (that.onResolvedCallbacks.length > 0) {
				setTimeout(() => {
					that.onResolvedCallbacks.forEach(onResolved => {
						onResolved(value)
					})
				})
			}
		}

		function reject(reason) {
			// 如果状态不是 pending, 直接结束
			if (that.status !== PENDING) return
			// 改变状态
			that.status = REJECTED
			// 保留 reason
			that.data = reason
			// 如果有待执行的 callbacks, 立即执行异步回调函数
			if (that.onRejectedCallbacks.length > 0) {
				setTimeout(() => {
					that.onRejectedCallbacks.forEach(onRejected => {
						onRejected(reason)
					})
				})
			}
		}

		// 立即同步执行 executor
		try {
			executor(resolve, reject)
		} catch (error) { // 如果执行器抛出异常, Promise 对象变为 rejected 状态
			reject(error)
		}
	}

	/*
	* Promise 原型对象 then()
	* 指定成功和失败的回调函数
	* 返回一个新的 Promise 对象
	* */
	Promise.prototype.then = function (onResolved, onRejected) {

		onResolved = typeof onResolved === 'function' ? onResolved : value => value
		// 指定默认的失败的回调(实现错误/异常穿透的关键点)
		onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason } // 异常穿透
		const that = this

		// 返回一个新的 Promise 对象
		return new Promise((resolve, reject) => {
			/*
			* 调用指定的回调函数处理, 根据执行的结果.改变 return 的 Promise 的状态
			* */
			function handle(callback) {
				/*
					* 1. 执行抛出异常, return 的 Promise 失败, reason 就是 error
					* 2. 如果执行返回的非 Promise,  return 的 Promise 成功, value 就是 返回的值
					* 3. 如果回调函数返回的是 Promise, return 的 Promise 结果就是这个 Promise 的结果
					* */
				try {
					const result = callback(that.data)
					if (result instanceof Promise) {
						// 3.如果回调函数返回的是 Promise, return 的 Promise 结果就是这个 Promise 的结果
						/*result.then(
								value => resolve(value),
								reason => reject(reason)
						)*/
						result.then(resolve, reject)
					} else {
						// 2. 如果执行返回的非 Promise,  return 的 Promise 成功, value 就是 返回的值
						resolve(result)
					}
				} catch (error) {
					// 1. 执行抛出异常, return 的 Promise 失败, reason 就是 error
					reject(error)
				}
			}
			if (that.status === PENDING) {
				that.onResolvedCallbacks.push(() => {
					handle(onResolved)
				})
				that.onRejectedCallbacks.push(() => {
					handle(onRejected)
				})
			}
			if (that.status === RESOLVED) {
				setTimeout(() => {
					handle(onResolved)
				})
			}
			if (that.status === REJECTED) {
				setTimeout(() => {
					handle(onRejected)
				})
			}
		})
	}

	/*
	* Promise 原型对象 catch()
	* 指定失败的回调函数
 	* 返回一个新的 Promise 对象
	* */
	Promise.prototype.catch = function (onRejected) {
		return this.then(undefined, onRejected)
	}

	/*
	* 函数对象 resolve()
	* 返回一个 fulfilled 状态的 Promise
	* */
	Promise.resolve = function (value) {

	}

	/*
	* 函数对象 reject()
	* 返回一个 rejected 状态的 Promise
	* */
	Promise.reject = function (reason) {

	}

	/*
	* 函数对象 all()
	* 当所有 Promise 都成功时, 返回一个 Promise, 如果其中一个失败则失败
	* */
	Promise.all = function (promises) {

	}

	/*
	* 函数对象 race()
	* 返回一个 Promise, 其结果由第一个完成的 Promise 决定
	* */
	Promise.race = function (promises) {

	}


	// 向外暴露 Promise 函数
	window.Promise = Promise
})(window)
