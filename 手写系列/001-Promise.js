/*
1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
2. executor 接受两个参数：分别是resolve 和 reject
3. promise 只能从 pending 到 rejected， 或者从 pending 到 fulfilled
4. promise 的状态一旦确认，就不会再改变
5. promise 都有 then 方法， then接收两个参数，分别是promise成功的回调 onFulfilled 和 promise 失败的回调 onRejected
6. 如果调用 then 时， promise已经成功，则执行 onFulfilled，并将 promise 的值作为参数传递进去。
   如果 promise 已经失败，那么执行 onRejected，并将 promise 失败的原因作为参数传递进去
   如果 promise 的状态是 pending，需要将 onFulfilled 和 onRejected 函数存起来，等待确认后，再依次将对应的函数执行（发布订阅）
7. then 的参数 onFulfilled 和 onRejected 可以缺省
8. promise 可以 then 多次， promise 的 then 方法返回一个 promise
9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功回调（onFulfilled)
10.如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
11.如果 then 返回的是一个 promise，那么会等待这个 promise 执行完， promise 如果成功，就走下一个then的成功，如果失败，则走下一个then的失败
*/

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'


function YPromise(executor) {
  const self = this
  self.status = PENDING // 初始状态
  self.onFulfilledFns = [] // 多个then方法回调存储
  self.onRejectedFns = []

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED
      self.value = value
      self.onFulfilledFns.forEach(fn => fn()) // 状态变为 fulfilled，所有回调依次执行
    }
  }

  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED
      self.reason = reason
      // 如果promise变成了 rejected态，所有的onRejected回调都需要按照then的顺序执行
      self.onRejectedFns.forEach(fn => fn())
    }
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

YPromise.prototype.then = function (onFulfilled, onRejected) {
  // onFulfilled 和 onRejected 都是可选参数
  // onFulfilled 和 onRejected 必须作为函数被调用
  // 如果 onFulfilled 不是一个函数，promise2 以 promise1的 value fulfilled
  // 如果 onRejected 不是一个函数，promise2 以 promise1 的 reason rejected
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {
    throw reason
  } // 错误分支，需要抛出错误
  const self = this
  // then方法必须返回一个promise
  const promise2 = new YPromise((resolve, reject) => {
    // 成功则立即调用
    // 只能在状态是fulfilled时调用。value作为其参数。最多只能调用一次
    // onFulfilled和onRejected应该是微任务
    if (self.status === FULFILLED) {
      setTimeout(() => {
        try {
          // onFulfilled 或 onRejected 执行的结果为x,调用 resolvePromise
          const x = onFulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }

    // 失败立即调用
    if (self.status === REJECTED) {
      // 异步调用，reason作为参数，最多只能调用一次
      setTimeout(() => {
        try {
          const x = onRejected(self.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }

    // PENDING状态时需要暂存回调
    if (self.status === PENDING) {
      self.onFulfilledFns.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(self.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
      self.onRejectedFns.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }
  })

  return promise2
}

YPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

// 无论如何，都会执行
YPromise.prototype.finally = function (fn) {
  this.then(_ => fn(), _ => fn())
}

YPromise.resolve = function (arg) {
  if (arg instanceof YPromise) {
    return arg
  }
  return new YPromise(resolve => {
    resolve(arg)
  })
}

YPromise.reject = function (reason) {
  return new YPromise((resolve, reject) => {
    reject(reason)
  })
}

// 所有都成功才成功，一个失败则失败
YPromise.all = function (promises) {
  return new YPromise((resolve, reject) => {
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

// 谁先变更状态，就返回谁
YPromise.race = function (promises) {
  return new YPromise((resolve, reject) => {
    if (promises.length === 0) return resolve()
    promises.forEach(promise => {
      promise.then(resolve, reject)
    })
  })
}

// 所有执行完，执行resolve.返回所有promise的状态组成的数组。
YPromise.allSettled = function (promises) {
  return new YPromise((resolve, reject) => {
    const len = promises.length
    const result = []
    promises.forEach(promise => {
      promise.then(value => {
        result.push({status: FULFILLED, value: value})
        if (result.length === len) {
          resolve(result)
        }
      }, reason => {
        result.push({status: REJECTED, value: reason})
        if (result.length === len) {
          resolve(result)
        }
      })
    })
  })
}

// 只要一个Promise成功，就返回那个。如果都失败，返回一个失败的promise和AggregateError类型的实例
YPromise.any = function (promises) {
  return new YPromise((resolve, reject) => {
    const reasons = []
    const len = promises.length
    promises.forEach(promise => {
      promise.then(value => {
        resolve(value)
      }, reason => {
        reasons.push(reason)
        console.log(reasons.length, len)
        if (reasons.length === len) {
          // stage 4阶段
          reject(new AggregateError(reasons))
        }
      })
    })
  })
}

// Promise解析
function resolvePromise(promise2, x, resolve, reject) {
  // 1.防止死循环
  if (promise2 === x) {
    reject(new TypeError('重复调用'))
  }
  // 2.对象或者函数进行解析，否则直接resolve
  if (x && typeof x === 'object' || typeof x === 'function') {
    let called // 只能调用一次
    try {
      let then = x.then
      if (typeof then === 'function') {
        // 将x作为函数的作用域this调用。第一个参数是resolvePromise,第二个参数是rejectPromise
        then.call(x, y => {
          if (called) return
          called = true
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          // 如果抛出了错误，reject
          if (called) return
          called = true
          reject(r)
        })
      } else {
        // 如果不是函数，resolve(x)
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
    // 如果不是不是函数，或者对象。直接resolve
    resolve(x)
  }
}

/*
YPromise.defer = YPromise.deferred = function () {
  let dfd = {}
  dfd.promise = new YPromise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = YPromise*/


const p1 = new YPromise((resolve, reject) => {
  setTimeout(() => reject('123'), 2000)
})
const p2 = new YPromise((resolve, reject) => {
  setTimeout(() => reject('123'))
})
const p3 = new YPromise((resolve, reject) => {
  setTimeout(() => reject('error'), 1000)
})

YPromise.any([p1, p2, p3]).then(value => {
  console.log(value)
}, reason => {
  console.log(reason, '>')
})