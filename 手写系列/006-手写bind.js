Function.prototype.mBind = function (thisArg, ...argArray) {
	// 0对thisArg是基础类型进行加工
	if (thisArg === '') {
		thisArg = Object(thisArg) // 利用Object加工基础变量
	} else if (thisArg === null || thisArg === undefined) {
		thisArg = window
	} else {
		thisArg = Object(thisArg)
	}

	// 1. 获取需要执行的函数
	var fn = this

	// 2.定义一个新的函数
	return function proxyFn(...args) {
		// 3.将函数放到thisArg中并执行
		const flag = Symbol('fn')
		thisArg[flag] = fn
		const result = thisArg[flag](...argArray, ...args) // 参数拼接
		delete thisArg[flag] // 删除属性
		return result // 返回结果
	}
}
// =======================================================
function foo(a, b, c) {
	console.log(this, a, b, c)
	return a + b + c
}

let newFun = foo.bind(0, 1) // 参数可以分开传
let res = newFun(2, 3) // Number(0) 1 2 3
console.log(res) // 6 */
