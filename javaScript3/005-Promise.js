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

// 初始化状态常量
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise(executor) {
  let self = this
  self.status = PENDING
  self.onFulfilled = [] // 成功的回调
  self.onRejected = [] // 失败的回调

  //PromiseA+ 2.1
  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED
      self.value = value
      // 如果promise变成了 fulfilled态，所有的onFulfilled回调都需要按照then的顺序执行
      self.onFulfilled.forEach(fn => fn()); //PromiseA+ 2.2.6.1
    }
  }

  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED
      self.reason = reason
      // 如果promise变成了 rejected态，所有的onRejected回调都需要按照then的顺序执行
      self.onRejected.forEach(fn => fn()) //PromiseA+ 2.2.6.2
    }
  }

  try {
    executor(resolve, reject)
  } catch(e) {
    reject(e)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  //PromiseA+ 2.2.1 / PromiseA+ 2.2.5 / PromiseA+ 2.2.7.3 / PromiseA+ 2.2.7.4
  // onFulfilled 和 onRejected 都是可选参数
  // onFulfilled  和 onRejected 必须作为函数被调用
  // 如果 onFulfilled 不是一个函数，promise2 以promise1的值fulfilled
  // 如果 onRejected 不是一个函数，promise2 以promise1的reason rejected
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
  let self = this
  // PromiseA+ 2.2.7
  // then必须返回一个promise
  let promise2 = new Promise((resolve, reject) => {
    if (self.status === FULFILLED) {
      //PromiseA+ 2.2.2
      //PromiseA+ 2.2.4 --- setTimeout
      // onFulfilled 和 onRejected 应该是微任务
      setTimeout(() => {
        try {
          //PromiseA+ 2.2.7.1
          // onFulfilled 或 onRejected 执行的结果为x,调用 resolvePromise
          let x = onFulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          //PromiseA+ 2.2.7.2
          // 如果 onFulfilled 或者 onRejected 执行时抛出异常e,promise2需要被reject
          reject(e)
        }
      });
    } else if (self.status === REJECTED) {
       //PromiseA+ 2.2.3
        setTimeout(() => {
            try {
                let x = onRejected(self.reason);
                resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
                reject(e);
            }
        });
    } else if (self.status === PENDING) {
      self.onFulfilled.push(() =>{
        setTimeout(() => {
          try {
            let x = onFulfilled(self.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        });
      })
      self.onRejected.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        });
      })
    }
  })
  return promise2
}

function resolvePromise(promise2, x, resolve, reject) {
    let self = this
    //PromiseA+ 2.3.1
    // 如果 promise2 和 x 相等，那么 reject promise with a TypeError
    if (promise2 === x) {
      reject(new TypeError('Chaining cycle'))
    }
    if (x && typeof x === 'object' || typeof x === 'function') {
      let used; //PromiseA+2.3.3.3.3 只能调用一次
      try {
        let then = x.then
        if (typeof then === 'function') {
          //PromiseA+2.3.3
          then.call(x, y => {
            //PromiseA+2.3.3.1
            if (used) return
            used = true
            resolvePromise(promise2, y, resolve, reject)
          }, r => {
            //PromiseA+2.3.3.2
            if (used) return
            used = true
            reject(r)
          })
        } else {
          //PromiseA+2.3.3.4
          if (used) return
          used = true
          resolve(x)
        }
      } catch(e) {
        //PromiseA+ 2.3.3.2
        if (used) return
        used = true
        reject(e)
      }
    } else {
      // PromiseA+ 2.3.3.4
      resolve(x)
    }
  }

  Promise.resolve = function (params) {
    if (params instanceof Promise) {
      return params
    }
    return new Promise((resolve, reject) => {
      if (param && typeof param === 'object' && typeof param.then === 'function') {
        setTimeout(() => {
          param.then(resolve, reject)
        });
      } else {
        resolve(param)
      }
    })
  }


Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}

module.exports = Promise
