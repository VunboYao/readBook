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
*/

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(handle) {
    // 0. format status
    this._status = PENDING;

    // define variable save parma
    this.value = null;
    this.reason = null;

    // Define a variable to hold the listener function
    this.onResolvedCallback = null;
    this.onRejectedCallback = null;

    // 1. check typeof is Function
    if (!this._isFunction(handle)) {
      throw new Error('Please incoming Function');
    }

    // 2. add two arguments
    // 2.1 bind this
    handle(this._resolve.bind(this), this._reject.bind(this));
  }

  then(onResolved, onRejected) {
    // 1. has resolve Function
    if (this._isFunction(onResolved)) {
      // 2. check status
      if (this._status === FULFILLED) {
        onResolved(this.value);
      }
    }

    // 1. has rejected Function
    if (this._isFunction(onRejected)) {
      // 2. check status
      if (this._status === REJECTED) {
        onRejected(this.reason);
      }
    }

    // 2. Determine if the current state is the default state
    if (this._status === PENDING) {
      if (this._isFunction(onResolved)) {
        this.onResolvedCallback = onResolved;
      }
      if (this._isFunction(onRejected)) {
        this.onRejectedCallback = onRejected;
      }
    }
  }

  _resolve(value) {
    // status only change once
    if (this._status === PENDING) {
      this._status = FULFILLED;
      this.value = value;
      this.onResolvedCallback(this.value);
    }
  }

  _reject(reason) {
    // status only change once
    if (this._status === PENDING) {
      this._status = REJECTED;
      this.reason = reason;
      this.onRejectedCallback(this.reason)
    }
  }

  _isFunction(fn) {
    return typeof fn === 'function';
  }
}

let promise = new MyPromise(function (resolve, reject) {
  setTimeout(() => {
     // resolve('aa');
     reject('bb');
  }, 2000);
});
promise.then(res => {
  console.log(res);
}, err => {
  console.log(err);
})
