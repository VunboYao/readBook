{
  /*let a = {
		name: 'lee',
		age: 18
	}
	let b = a
	console.log(a.name)
	b.name = 'son'
	console.log(a.name)
	console.log(b.name)*/

  /*let a= {
		name: 'linda',
		age: 20
	}
	function change(o) {
		o.age = 23
		o = {
			name: 'Kath',
			age: 30
		}
		return o
	}
	let b = change(a)
	console.log(b.age)
	console.log(a.age)*/

  /*console.log(typeof 1) // 'number'
	console.log(typeof '1') // 'string'
	console.log(typeof undefined) // 'undefined'
	console.log(typeof true) // 'boolean'
	console.log(typeof Symbol()) // 'symbol
	console.log(typeof null) // 'object
	console.log(typeof []) // 'object
	console.log(typeof {}) // 'object
	console.log(typeof console) // 'object
	console.log(typeof console.log) // 'function'
	console.log(typeof /\d/) // 'object
	console.log(typeof new RegExp(/\d/)) // 'object
	let demo = null
	console.log(demo === null)*/

  /*function myInstanceof(left, right) {
		// typeof 判断基础数据类型，如果是， 直接返回 false
		if (typeof left !== 'object' || left === null) return false
		// 获取传入值的原型对象
		let proto = Object.getPrototypeOf(left)
		while (true) { // 循环往下执行，直到找到相同的原型对象
			if (proto === null) return false
			if (proto === right.prototype) return true
			proto = Object.getPrototypeOf(proto)
		}
	}
	function Person() {
	}

	let a = new Person()
	console.log(myInstanceof(a, Person)) // true
	console.log(myInstanceof(new Number(123), Number)) // true
	console.log(myInstanceof(123, Number)) // false*/
  /*function Person(){}
	console.log(Object.prototype.toString({})) // "[object Object]"
	console.log(Object.prototype.toString.call(Person)) // "[object Function]"
	console.log(Object.prototype.toString.call(1)) // "[object Number]"
	console.log(Object.prototype.toString.call("1")) // "[object String]"
	console.log(Object.prototype.toString.call(true)) // "[object Boolean]"
	console.log(Object.prototype.toString.call(function (){})) // "[object Function]"
	console.log(Object.prototype.toString.call(()=>{})) // "[object Function]"
	console.log(Object.prototype.toString.call(null)) // "[object Null]"
	console.log(Object.prototype.toString.call(undefined)) // "[object Undefined]"
	console.log(Object.prototype.toString.call(/123/g)) // "[object RegExp]"
	console.log(Object.prototype.toString.call(new RegExp(/123/, 'g'))) // "[object RegExp]"
	console.log(Object.prototype.toString.call(new Date())) // "[object Date]"
	console.log(Object.prototype.toString.call([])) // "[object Array]"
	console.log(Object.prototype.toString.call(document)) // "[object HTMLDocument]"
	console.log(Object.prototype.toString.call(window)) // "[object Window]"*/

  /*function getType(obj) {
		const type = typeof obj
		// 判断如果是基础数据类型，则直接返回
		if (type !== 'object') {
			return type
		}
		// 正则捕获非空白字符，转换为小写返回
		return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, (match, $1) => {
			return $1.toLocaleLowerCase()
		})
	}*/

  /*let obj = {
		value: 1,
		valueOf() {
			return 2
		},
		toString() {
			return '3'
		},
		[Symbol.toPrimitive]() {
			return 4
		}
	}
	console.log(obj + 1) // 5
	// 因为有Symbol.toPrimitive，就优先执行这个；如果Symbol.toPrimitive这段代码删掉，则执行valueOf打印结果为3；如果valueOf也去掉，则调用toString返回'31'(字符串拼接)

	console.log(10 + {})
	// {} 默认会调用 valueOf 是{},不是基础数据类型，调用toString, 返回"[object Object]"

	console.log([1, 2, undefined, 4, 5] + 10) // 1,2,,4,510
	// [1,2,undefined,4,5]会默认先调用valueOf结果还是这个数组，不是基础数据类型继续转换，也还是调用toString，返回"1,2,,4,5"，然后再和10进行运算*/

  /*	let target = {}
	let source = { a: { b: 1 }}
	Object.assign(target, source)
	console.log(target) // { a: { b: 1 } }
	source.a.b = 10
	console.log(source) // { a: { b: 10 } }
	console.log(target) // { a: { b: 10 } }*/

  /*	let obj1 = {
		a: {
			b: 1
		},
		sym: Symbol(1)
	}
	Object.defineProperty(obj1, 'innumerable', {
		value: '不可枚举属性',
		enumerable: false
	})
	let obj2 = {}
	Object.assign(obj2, obj1)
	obj1.a.b = 2
	console.log(obj1)
	console.log(obj2)*/
  /*	let obj1 = {
		a: 1,
		b: {
			c: 1
		}
	}
	let obj2 = {...obj1}
	obj2.a = 2
	obj1.b.c = 2
	console.log(obj1) // { a: 1, b: { c: 2 } }
	console.log(obj2) // { a: 2, b: { c: 2 } }*/

  /*	let arr = [1,2,3]
	let newArr = arr.concat()
	newArr[1] = 100
	console.log(arr) // [ 1, 2, 3 ]
	console.log(newArr) // [ 1, 100, 3 ]*/
  /*let arr = [1,2,{val:  4}]
	let newArr = arr.slice()
	newArr[2].val = 100
	console.log(arr) // [ 1, 2, { val: 100 } ]*/

  // TODO:手工实现一个浅拷贝
  /* 	const shallowClone = target => {
		// 判断是否是一个对象
		if (typeof target === 'object' && target !== null) {
			const cloneTarget = Array.isArray(target) ? [] : {}
			// 循环遍历对象中所有的key值
			for (let prop in target) {
				// 判断是否对象key值（非继承）为自身所有
				if (target.hasOwnProperty(prop)) {
					cloneTarget[prop] = target[prop]
				}
			}
			return cloneTarget
		} else {
			return target
		}
	}

	function Person() {
		this.age = 18
	}
	Person.prototype.name = 'yyb'
	const a = new Person()
	a.score = 100
	const b = shallowClone(a)
	console.log(b) */
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
    // 继承原型链：WeakMap的key值只能存储对象
    hash.set(obj, cloneObj)
    // Reflect.ownKeys: 遍历对象的所有属性。基本等同于Object.getOwnPropertyNames 与 Object.getOwnPropertySymbols之和
    for (let key of Reflect.ownKeys(obj)) {
      // 对象类型 && 非函数 ？ 继续递归遍历 ：赋值
      cloneObj[key] = isComplexDataType(obj[key]) && typeof obj[key] !== 'function' ? deepClone(obj[key], hash) : obj[key]
    }
    return cloneObj
  }

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
}
