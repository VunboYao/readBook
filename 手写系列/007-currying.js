// 将多个参数，转换为每一次调用一个参数的函数
function currying(fn) {
  function curried(...arg) {
    // 判断当前已经接收到的参数的个数，和参数本身需要接受的参数是否一致
    if (arg.length >= fn.length) {
      // fn(...arg)
      return fn.apply(this, arg) // this绑定
    } else {
      // 没有达到个数时，需要返回一个新的函数，继续来接收参数
      return function (...arg2) {
        // 递归调用，参数拼接
        return curried.apply(this, [...arg, ...arg2])
      }
    }
  }
  return curried
}


function add(a, b, c) {
  return a + b + c
}

// 柯里化
let curryAdd = currying(add)
console.log(curryAdd(10,20,30));
console.log(curryAdd(10,20)(30));
console.log(curryAdd(10)(20)(30));

/* function foo(a, b, c) { }
console.log(foo.length) // TODO:拿到参数的个数 */