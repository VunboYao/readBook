## new原理介绍

new 生成实例的过程

- 创建一个新对象
- 将构造函数的作用域赋给新对象(this 指向新对象)
- 执行构造函数中的代码(为这个新对象添加属性)
- 返回新对象

**不使用new关键词，返回结果则是undefined**

**new 关键词执行之后总是会返回一个对象，要么是实例对象，要么是 return 语句指定的对象**

## call & apply & bind 原理介绍

```js
func.call(thisArg, param1, param2, ...)
func.apply(thisArg, [param1, param2, ...])
func.bind(thisArg, param1, param2, ....)
```

- 三个方法均改变 `this` 的指向
- `call`和`apply`的区别在于，传入的参数写法不同：`apply`的第二个参数为数组。`call`则是从第二个到第`N`个都是给`func`的传参
- `bind`不是马上执行，而`call`和`apply`是改变`this`指向之后立即执行

```js
let arr = [13, 6, 10, 11, 16];
const max = Math.max.apply(Math, arr); // Math.max(arg1, arg2, arg3)
const min = Math.min.apply(Math, arr);
console.log(max);  // 16
console.log(min);  // 6
```

## new 的实现

- 让实例可以访问到私有属性
- 让实例可以访问构造函数原型`(constructor.prototype)`所在原型链上的属性
- 构造函数返回的最后结果是引用数据类型

```js
function _new(ctor, ...args) {
  if(typeof ctor !== 'function') {
    throw 'ctor must be a function'
  }
  let obj = new Object()
  obj.__proto__ = Object.create(ctor.prototype)
  let res = ctor.apply(obj, [...args]) // 若构造函数返回对象，则有对应返回值
  let isObject = typeof res === 'object' && res !== null
  let isFunction = typeof res === 'function'
  return isObject || isFunction ? res : obj
}
```

## call 和 apply 的实现

```js
Function.prototype.call = function(context, ...args) {
  let context = context || window
  context.fn = this
  let result = eval('context.fn(...args)')
  delete context.fn
  return result
}

Function.prototype.apply = function(context, args) {
  let context = context || window
  context.fn = this
  let result = eval('context.fn(...args)')
  delete context.fn
  return result
}
```

## bind 的实现

```JS
Function.prototype.bind = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new Error('this must be a function')
  }
  let self = this
  let fbound = function() {
    self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)))
  }
  if (this.prototype) {
    fbound.prototype = Object.create(this.prototype)
  }
  return fbound
}
```

| 方法/特征 |       call       |      apply       |       bind       |
| :-------: | :--------------: | :--------------: | :--------------: |
| 方法参数  |       多个       |     单个数组     |       多个       |
| 方法功能  | 函数调用改变this | 函数调用改变this | 函数调用改变this |
| 返回结果  |     直接执行     |     直接执行     |  返回待执行函数  |
| 底层实现  |    通过`eval`    |    通过`eval`    | 间接调用`apply`  |

