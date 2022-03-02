// TODO:组合函数，依次调用
function Compose(...fns) {
  let length = fns.length
  // 必须都是函数
  for (let i = 0; i < length; i++) {
    if (typeof fns[i] !== 'function') {
      throw new TypeError('not all are functions')
    }
  }

  // 返回一个函数
  return function (...args) {
    let index = 0
    // 执行第一个函数
    let result = length ? fns[index].apply(this, args) : args
    while (++index < length) {
      // 依次执行并返回结果
      result = fns[index].call(this, result)
    }
    return result
  }
}

function double(m) {
  return m * 2
}

function square(n) {
  return n ** 2
}

function add(z) {
  return z + z
}

let newFn = Compose(double, square, add)
console.log(newFn(10))