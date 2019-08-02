/*
Promise 特点
1.1 创建时必须传入一个函数， 否则会报错
1.2 会给传入的函数设置两个回调函数
1.3 刚创建的 Promise 对象状态是 pending
1.4 状态一旦改变就不可再次改变
1.5 可以通过 then 来监听状态的改变
1.5.1 如果添加监听时状态已经改变， 立即执行监听的回调
1.5.2 如果添加监听时状态还未改变， 那么状态改变时再执行监听回调
1.5.3 同一个 Promise 对象可以添加多个 then 监听，状态改变时所有的监听按照添加顺序执行

2.1 then方法每次执行完毕都会返会返回一个新的Promise对象
2.2 上一个Promise对象的then可以给下一个Promise的then传递数据
2.2.1 无论上一个是在成功的回调还是失败的回调传递的参数都会传递给下一个成功的回调
2.2.2 如果上一个传递的是Promise对象，那么传给下一个的成功还是失败由传递的Promise状态决定
2.3 后一个then可以捕获前一个then的异常
2.4 catch 方法就是then方法的语法糖 then(undefined, function(){})

*/

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(handle) {
    // 0. format status
    this.status = PENDING;

    // define variable save parma
    this.value = null;
    this.reason = null;

    // Define a variable to hold the listener function
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    // 1. check typeof is Function
    if (!this._isFunction(handle)) {
      throw new Error('Please incoming Function');
    }

    // 2. add two arguments
    // 2.1 bind this
    handle(this._resolve.bind(this), this._reject.bind(this));
  }

  then(onResolved, onRejected) {
    return new MyPromise((nextResolve, nextReject) => {
      // 1. has resolve Function
      if (this._isFunction(onResolved)) {
        // 2. check status
        if (this.status === FULFILLED) {
          // 3. 拿到上一个Promise 成功回调执行的结果
          let result = onResolved(this.value);
          // 4. 将上一个Promise成功回调执行的结果传递给下一个Promise成功的回调
          nextResolve(result);
        }
      }

      // 1. has rejected Function
      if (this._isFunction(onRejected)) {
        // 2. check status
        if (this.status === REJECTED) {
          let result = onRejected(this.reason);
          nextResolve(result);
        }
      }

      // 2. Determine if the current state is the default state
      if (this.status === PENDING) {
        if (this._isFunction(onResolved)) {
          this.onResolvedCallbacks.push(onResolved);
        }
        if (this._isFunction(onRejected)) {
          this.onRejectedCallbacks.push(onRejected);
        }
      }

    })
  }

  _resolve(value) {
    // status only change once
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      this.onResolvedCallbacks.forEach(fn => fn(this.value))
    }
  }

  _reject(reason) {
    // status only change once
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach(fn => fn(this.reason))
    }
  }

  _isFunction(fn) {
    return typeof fn === 'function';
  }
}

let promise = new MyPromise(function (resolve, reject) {
  // resolve('aa');
  reject('error')
  // setTimeout(() => {
  // resolve('aa');
  // reject('bb');
  // }, 2000);
});
let p2 = promise.then(res => {
  console.log(res, 'success--111111');
  return '2222'
}, err => {
  console.log(err, 'error----111111');
  return 'bbb'
})

p2.then(res => {
  console.log(res, 'success-----22222');
}, err => {
  console.log(err, 'error----22222');
})
