Promise 对象不是异步的, 只要创建 Promise 对象就会立即执行存放的代码

Promise 对象三种状态

- pending: 默认状态
- fulfilled(resolved): 调用 resolve 函数, 状态就会变为 fulfilled,  表示操作成功
- rejected: 调用 reject 函数, 状态就会变为 rejected, 表示操作失败
- **状态一旦改变则不可逆**

监听 Promise 状态改变

- resolved => then()
- rejected => catch()

# then 方法

- then 方法接受两个参数
  - 第一个参数是成功回调
  - 第二个参数是失败回调

- 改变 Promise 的状态时, 可以通过 **```resolve(data)/reject(data)```**传递参数给 then 方法中的回调函数

- 同一个 Promise 可以**多次**调用 then 方法
- then 方法每次执行完毕后都会返回一个新的 Promise 对象, **返回新的Promise的状态继承上一个Promise的状态**

- 可以通过上一个 Promise 对象的 then 方法给下一个 Promise 对象的 then 方法传参. `return data`
  - **无论是在上一个 promise 对象的成功回调还是失败回调中传递参数, 都会传递给下一个promise对象的成功回调**
- 如果 then 方法返回的是一个 Promise 对象, 下一个 Promise 对象的状态取决于返回的 Promise 的状态,成功或失败

# catch 方法

- catch 其实是 **`then(undefined, () => {})`** 的语法糖

- catch 方法监听错误, **用链式编程**
  - *如果 Promise 的状态是失败, 但是没有对应失败的监听就会报错*
  - 原因: then 方法返回的 Promise 会继承状态. **失败状态时,如果 Promise 没有方法监听错误, 会报错**.
- **和 then 一样**, 修改 Promise 状态时, 可以传递参数给 catch 方法中的回调函数.
- **和 then 一样**, 同一个 Promise 可以**多次**调用 catch方法
- **和 then 一样**, catch 方法每次执行完毕后都会返回一个新的 Promise 对象.

- **和 then 一样**, **无论在上一个 Promise 的成功回调还是失败回调中传递参数, 都会传入下一个 Promise 的成功回调**
- **和 then 一样**,  catch 方法如果返回一个 Promise 对象,  下一个 Promise 对象的状态取决于返回的 Promise 的状态,成功或失败

- catch 方法可以捕获上一个 Promise 对象 then 方法中的异常

  ```javascript
  const promise = new Promise((resolve, reject) => {
      resolve('OK')
      // reject('ERROR')
  })
  promise.then(res => {
      console.log(res)
      xxx
  }).catch(err => {
      console.log(err) // 捕获XXX的异常
  })
  ```

# 如何中断 Promise 链

- 返回一个状态为 `pending` 的新的 Promise 对象

# resolve注意点

- Promise.resolve(...)会将传入的真正的Promise直接返回，对传入的thenable则会展开。如果这个thenable展开得到一个拒绝状态，那么从Promise.resolve(...)返回的Promise实际上就是这同一个拒绝状态。
- Promise.resolve(...)是一个精确的名字，实际上的结果可能是完成或拒绝

- Promise(...)构造器的第一个参数回调会直接展开thenable（和Promise.resolve(...)一样）或真正的Promise

  ```js
  // 1
  let rejectTh = {
    then: function(resolve,reject) {
      reject('Oops')
    }
  }
  let rejectT = Promise.resolve(rejectTh)
  rejectT.then(res=> {
    console.log(res);
  }).catch(err => {
    console.log(err, 'err'); // 输出
  })
  
  // 2
  const rejectPr = new Promise((resolve,reject) => {
    resolve(Promise.reject('error'))
  })
  rejectPr.then(res => {
    console.log(res);
  }, err => {
    console.log(err, 'err'); // 输出
  })
  ```

  

# 手写 Promise

```javascript
/*
* https://www.ituring.com.cn/article/66566
* */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

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
				this.onResolvedCallbacks.forEach(fn => fn())
			}
		}

		// 失败回调
		const reject = reason => {
			if (this.state === PENDING) {
				this.state = REJECTED
				this.reason = reason
				this.onRejectedCallbacks.forEach(fn => fn())
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
		let i = 0

		function f(index, data, resolve) {
			arr[index] = data
			i++
			if (i === promises.length) {
				resolve(arr)
			}
		}

		return new YPromise((resolve, reject) => {
			for (let i = 0; i < promises.length; i++) {
				promises[i].then(data => {
					f(i, data, resolve)
				}, reject)
			}
		})
	}
}


```

```javascript
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
		onRejected = typeof onRejected === 'function' ? onRejected : reason => {
			throw reason
		} // 异常穿透
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
		return new Promise((resolve, reject) => {
			if (value instanceof Promise) {
				value.then(resolve, reject)
			} else {
				resolve(value)
			}
		})
	}

	/*
	* 函数对象 reject()
	* 返回一个 rejected 状态的 Promise
	* */
	Promise.reject = function (reason) {
		return new Promise((resolve, reject) => {
			reject(reason)
		})
	}

	/*
	* 函数对象 all()
	* 当所有 Promise 都成功时, 返回一个 Promise, 如果其中一个失败则失败
	* */
	Promise.all = function (promises) {
		// 用来保存成功 value 的数组
		const values = []
		// 用来保存成功 Promise 的数量
		let resolvedCount = 0
		// 返回一个新的 Promise
		return new Promise((resolve, reject) => {
			// 遍历 promises 获取每一个 Promise 的结果
			promises.forEach((p, index) => {
				Promise.resolve(p).then(value => {
					resolvedCount++
					values[index] = value

					// 如果全部成功了,将 return 的 Promise 改为成功
					if (resolvedCount === promises.length) {
						resolve(values)
					}
				}, reason => {
					// 只要一个失败, return 的 Promise 就失败
					reject(reason)
				})
			})
		})
	}

	/*
	* 函数对象 race()
	* 返回一个 Promise, 其结果由第一个完成的 Promise 决定
	* */
	Promise.race = function (promises) {
		return new Promise((resolve, reject) => {
			promises.forEach(p => {
				Promise.resolve(p).then(value => {
					resolve(value)
				}, reason => {
					reject(reason)
				})
			})
		})

	}

	/*
	* 返回一个 Promise 对象, 在指定的时间后才确定
	* */
	Promise.resolveDelay = function (value, time) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (value instanceof Promise) {
					value.then(resolve, reject)
				} else {
					resolve(value)
				}
			}, time)
		})
	}

	/*
	* 返回一个 Promise 对象, 在指定的时间后才失败
	* */

	Promise.rejectDelay = function (reason, time) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject(reason)
			}, time)
		})
	}

	// 向外暴露 Promise 函数
	window.Promise = Promise
})(window)
```

# 如何在Promise.all（）中捕获错误

```javascript
	function demo() {
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
	const arr = [demo,test, foo]
  const subArr = arr.map(item => {
  	return item().then(res => {
  		return res
    }).catch(err => {
  		return err
    })
  })
  Promise.all(subArr).then(res => {
		console.log(res,'ok')
	}).catch(err => {
		console.log(err)
	})
```

