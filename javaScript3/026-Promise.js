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
  4.多个then的实现。延迟调用then的处理
  5.catch方法的实现
  */

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
            this.onFulfilledFns.forEach(fn => fn(this.value))
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
            this.onRejectedFnS.forEach(fn => fn(this.reason))
          })
        }
      }
      executor(resolve, reject)
    }

    then(onFulfilled, onRejected) {
      // 1.then调用时当前状态如果已经fulfilled,则立即调用回调函数
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        onFulfilled(this.value)
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        onRejected(this.reason)
      }

      // 2.状态未更新时，将成功回调和失败的回调放到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onFulfilledFns.push(onFulfilled)
        this.onRejectedFnS.push(onRejected)
      }
    }
  }

  let yp = new YPromise((resolve, rejected) => {
    // resolve(12)
    rejected(12354)
  })
  yp.then(
    res => {
      console.log(`res`, res)
    },
    err => {
      console.log(`err`, err)
    }
  )
}

