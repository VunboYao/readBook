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
