{
  /*   // TODO: Promise.reject(),任何参数都返回拒绝状态
  const p = new Promise((resolve, reject) => {
    reject('123')
  })
  p.catch(err => {
    console.log(err, '123')
  })
  Promise.reject(p).then(
    res => {
      console.log(res)
    },
    err => {
      console.log(err, 'err')
      console.log('----------------------------------')
    }
  )
  const s1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(1)
    }, 2000)
  })
  const s2 = new Promise((a, reject) => {
    setTimeout(() => {
      reject(2)
    }, 2000)
  })
  const s3 = new Promise((a, reject) => {
    setTimeout(() => {
      reject(2)
    }, 4000)
  })
  // TODO： allSettled所有都返回后
  Promise.allSettled([s1, s2, s3]).then(res => {
    console.log(res)
  })

  // TODO: any任何一个成功即可
  Promise.any([s1, s2, s3]).then(
    res => {
      console.log('res', res)
    },
    err => {
      console.log('err', err)
    }
  ) */
}

{
  // TODO：手写Promise
  /*
  1.默认参数，内置两个函数参数
  2.状态由pending=>fulfilled; pending=>rejected。
  3.then方法的实现
    1.onFulfilled onRejected
    2.判断默认值问题
    3.返回一个promise
    4.判断状态已变更，直接执行
    5.异步延迟调用，放到数组中
  4.多个then的实现。延迟调用then的处理
  5.catch方法的实现
  */

  function execFunctionWithCatchError(execFn, value, resolve, reject) {
    try {
      const result = execFn(value)
      resolve(result)
    } catch(e) {
      reject(e)
    }
  }

  const PROMISE_STATUS_PENDING = 'pending'
  const PROMISE_STATUS_FULFILLED = 'fulfilled'
  const PROMISE_STATUS_REJECTED = 'rejected'
  class YPromise {
    constructor(executor) {
      this.value = undefined
      this.reason = undefined
      this.status = PROMISE_STATUS_PENDING
      // 保存多个then调用
      this.onFulfilledFns = []
      this.onRejectedFnS = []

      const resolve = value => {
        if (this.status === PROMISE_STATUS_PENDING) {
          queueMicrotask(() => {
            // 判断状态为：pending.防止同时调用reject
            if (this.status !== PROMISE_STATUS_PENDING) return
            this.value = value
            this.status = PROMISE_STATUS_FULFILLED
            this.onFulfilledFns.forEach(fn => fn())
          })
        }
      }
      const reject = reason => {
        if (this.status === PROMISE_STATUS_PENDING) {
          queueMicrotask(() => {
            // 判断状态为: pending.防止同时调用resolve
            if (this.status !== PROMISE_STATUS_PENDING) return
            this.status = PROMISE_STATUS_REJECTED
            this.reason = reason
            this.onRejectedFnS.forEach(fn => fn())
          })
        }
      }
      // 直接调用
      try {
        executor(resolve, reject)
      } catch(e) {
        reject(e)
      }
    }

    then(onFulfilled, onRejected) {
      onRejected = onRejected || (err => {throw err})
      return new YPromise((resolve, reject) => {
        // 1.then调用时当前状态如果已经fulfilled,则立即调用回调函数【针对定时延迟调用情况】
        if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
        }
        if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
          execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
        }

        // 2.状态未更新时，将成功回调和失败的回调放到数组中
        if (this.status === PROMISE_STATUS_PENDING) {
          onRejected && this.onFulfilledFns.push(() => {
            execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
          })
          onRejected && this.onRejectedFnS.push(() => {
            execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
          })
        }
      })
    }

    catch(onRejected) {
      return this.then(undefined, onRejected)
    }

    finally(onFinally) {
      this.then(_ => {
        onFinally()
      }, _ => {
        onFinally()
      })
    }

    static resolve(value) {
      return new YPromise(resolve => resolve(value))
    }

    static reject(reason) {
      return new YPromise((undefined, reject) => reject(reason))
    }

    static all(promises) {
      return new YPromise((resolve, reject) => {
        const values = []
        promises.forEach(promise => {
          promise.then(res => {
            values.push(res)
            if (values.length === promises.length) {
              resolve(values)
            }
          }, err => {
            return reject(err)
          })
        })
      })
    }

    static allSettled(promises) {
      return new YPromise(resolve => {
        const result = []
        promises.forEach(promise => {
          promise.then(res => {
            result.push({status: PROMISE_STATUS_FULFILLED, value: res})
            if (result.length === promises.length) {
              resolve(result)
            }
          }, err => {
            result.push({status: PROMISE_STATUS_REJECTED, value: err})
            if (result.length === promises.length) {
              resolve(result)
            }
          })
        })
      });
    }

    static race(promises) {
      return new YPromise((resolve, reject) => {
        promises.forEach(promise => {
          /*promise.then(res => {
            resolve(res)
          }, err => {
            reject(err)
          })*/
          promise.then(resolve,reject)
        })
      })
    }

    static any(promises) {
      return new YPromise((resolve,reject) => {
        const reasons = []
        promises.forEach(promise => {
          promise.then(res => {
            resolve(res)
          }, err => {
            reasons.push(err)
            if (reasons.length === promises.length) {
              reject(new AggregateError(reasons))
            }
          })
        })
      })
    }
  }

 const p1 = new YPromise((resolve,reject) => {
   setTimeout(() => reject(1111), 3000)
 })
  const p2 = new YPromise((resolve,reject) => {
    setTimeout(() => reject(3322222222), 2000)
  })
  const p3 = new YPromise((resolve,reject) => {
    setTimeout(() => reject(12333333333), 3000)
  })
 YPromise.any([p1,p2,p3]).then(res => {
   console.log(res)
 }).catch(err => {
   console.log('catch', err)
 })
}
