function _new(ctor, ...args) {
  if(typeof ctor !== 'function') {
    throw 'ctor must be a function'
  }
  let obj = new Object()
  obj.__proto__ = Object.create(ctor.prototype)
  let res = ctor.apply(obj, [...args]) // Date、RegExp、Array、等有返回值
  let isObject = typeof res === 'object' && res !== null
  let isFunction = typeof res === 'function'
  return isObject || isFunction ? res : obj
}

function Person(name) {
  this.name = name
}
let a = new Date()
console.log(a);

let a2 = _new(Date, 'jack')
console.log(a2);