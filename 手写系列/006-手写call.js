// add Function for allFun
Function.prototype.mCall = function (thisArg, ...arg) {
	// 0对thisArg是基础类型进行加工
	if (thisArg === '') {
		thisArg = Object(thisArg) // 利用Object加工基础变量
	} else if (thisArg === null || thisArg === undefined) {
		thisArg = window
	} else {
		thisArg = Object(thisArg)
	}
	// 在这里可以去执行调用的那个函数foo
	// 问题：获取到哪一个函数执行了mCall => 隐式绑定

	// 1. 获取需要执行的函数
	var fn = this
	// 2. 获取需要被执行的函数
	const flag = Symbol('fn')
	thisArg[flag] = fn
	// 3.利用扩展运算符，将参数传入
	const result = thisArg[flag](...arg)
	delete thisArg[flag] // 删除多余的属性
	// 4.函数返回值处理
	return result
}
// ==========================================================
function foo(a, b, c) {
	console.log('foo函数被执行', this, a, b, c)
	return a + b + c
}
let b = foo.mCall({ name: 'yyb' }, 1, 2, 3)
console.log(b) // 6
let c = foo.call({ name: 'yyb' }, 1, 2, 3)
console.log(c) // 6
foo.mCall(null) // window
foo.mCall('') // String{''}
foo.mCall(false) // Boolean{false}
