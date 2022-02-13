// add Function for allFun
Function.prototype.mCall = function (thisArg, ...arg) {
	if (thisArg === '') {
		thisArg = Object(thisArg)
	} else if (thisArg === undefined || thisArg === null) {
		thisArg = window
	} else {
		thisArg = Object(thisArg)
	}

	let flag = Symbol()
	thisArg[flag] = this
	let result = thisArg[flag](...arg)
	delete thisArg[flag]
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
/* foo.mCall(null) // window
foo.mCall('') // String{''}
foo.mCall(false) // Boolean{false} */
