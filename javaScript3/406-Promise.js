const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(fn) {
    // 0. 初始化状态
    this.status = PENDING;

    // 参数
    this.value = null;
    this.reason = null;

    // 定义变量存储监听函数
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    // 1. 判断是否是函数
    if (!this._isFunction(fn)) {
      throw new Error('请传一个函数！');
    }

    // 2. 添加2个回调函数
    fn(this._resolve.bind(this), this._reject.bind(this));

  }

  then(onResolve, onReject) {
    // 1. 函数判断
    if (this._isFunction(onResolve)) {
      // 2. 状态值判断
      if (this.status === FULFILLED) {
        onResolve(this.value);
      }
    }

    // 1. 函数判断
    if (this._isFunction(onReject)) {
      // 2. 状态值判断
      if (this.status === REJECTED) {
        onReject(this.reason);
      }
    }

    // 2 判断当前状态值是否是默认状态
    if (this.status === PENDING) {
      if (this._isFunction(onResolve)) {
        // 多个函数添加到数组中
        this.onResolvedCallbacks.push(onResolve);
      }
      if (this._isFunction(onReject)) {
        this.onRejectedCallbacks.push(onReject);
      }
    }
  }

  _resolve(value) {
    // 状态值只改变一次
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      // 执行事件
      this.onResolvedCallbacks.forEach(fn => fn(this.value))
    }
  }

  _reject(reason) {
    // 状态值只改变一次
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach(fn => fn(this.reason))
    }
  }

  // 验证是否是函数
  _isFunction(fn) {
    return typeof fn === 'function';
  }
}


let promise = new MyPromise((resolve, reject) => {
 setTimeout(() => {
   // reject('error');
   resolve('success');
 },2000)
})
promise.then(res => {
    console.log(res,'成功----11111------');
}, err => {
    console.log(err, '失败----11111-------')
})
promise.then(res => {
    console.log(res,'成功----22222------');
}, err => {
    console.log(err, '失败----22-------')
})
promise.then(res => {
    console.log(res,'成功----33333------');
}, err => {
    console.log(err, '失败----33-------')
})
console.log(promise);