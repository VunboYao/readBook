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

	function getType(obj) {
		const type = typeof obj
		if (type !== 'object') {
			return type
		}
	}

}

