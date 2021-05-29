## 自定义报错类型

```js
function CustomError(message) {
    this.name = 'CustomError'
    this.message = message;
}
CustomError.prototype = new Error();
throw new CustomError('My message');
```

## 数据类型检测

```js
function getType(obj) {
    const type = typeof obj
    // 判断如果是基础数据类型，则直接返回
    if (type !== 'object') {
        return type
    }
    // 正则捕获非空白字符，转换为小写返回
    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, (match, $1) => {
        return $1.toLocaleLowerCase()
    })
}
```

## 深拷贝

- 针对能够遍历对象的不可枚举属性以及 Symbol 类型，我们可以使用 `Reflect.ownKeys` 方法；
- 当参数为 `Date、RegExp` 类型，则直接生成一个新的实例返回
- 利用 `Object 的 getOwnPropertyDescriptors` 方法可以获得对象的所有属性，以及对应的特性，顺便结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链
- 利用 `WeakMap` 类型作为 Hash 表，因为`WeakMap` 是弱引用类型，可以有效防止内存泄漏（你可以关注一下 Map 和 `weakMap` 的关键区别，这里要用 `weakMap`），作为检测循环引用很有帮助，如果存在循环，则引用直接返回 `WeakMap` 存储的值。

```js
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null
const deepClone = function (obj, hash = new WeakMap()) {
if (obj.constructor === Date) return new Date(obj) // 日期对象直接返回一个新的日期对象
if (obj.constructor === RegExp) return new RegExp(obj) // 正则对象直接返回一个新的正则对象
// 如果循环引用了就用 weakMap 来解决
if (hash.has(obj)) return hash.get(obj)
/*
ES2017 新增 API:返回对象中所有属性的属性描述符对象
当数据类型为数组、对象时，执行二次遍历
*/
let allDesc = Object.getOwnPropertyDescriptors(obj)
/*
遍历传入参数所有键的特性
1. getPrototypeOf 返回obj的__proto__（指向prototype）。克隆原型
2. allDesc 传入对应的属性描述对象
cloneObj.__proto__ === obj.__proto__ // true
*/
let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
// 继承原型链
hash.set(obj, cloneObj)
// Reflect.ownKeys: 遍历对象的所有属性。基本等同于Object.getOwnPropertyNames 与 Object.getOwnPropertySymbols之和
for (let key of Reflect.ownKeys(obj)) {
    // 对象类型 && 非函数 ？ 继续递归遍历 ：赋值
    cloneObj[key] = isComplexDataType(obj[key]) && typeof obj[key] !== 'function' ? deepClone(obj[key], hash) : obj[key]
}
return cloneObj

let obj = {
    num: 0,
    str: '',
    boolean: true,
    unf: undefined,
    nul: null,
    obj: { name: '我是一个对象', id: 1 },
    arr: [0, 1, 2],
    func: function () {
        console.log('我是一个函数')
    },
    date: new Date(0),
    reg: new RegExp('/我是一个正则/ig'),
    [Symbol('1')]: 1,
}
Object.defineProperty(obj, 'innumerable', {
    enumerable: false,
    value: '不可枚举属性',
})
obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj))
obj.loop = obj
let cloneObj = deepClone(obj)
cloneObj.arr.push(4)
console.log('obj', obj)
console.log('cloneObj', cloneObj)
```
