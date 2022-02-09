Function.prototype.mApply = function (thisArg, argArray) {
	argArray = argArray ?? [] // 判断空字符串 null  undefined
	if (!Array.isArray(argArray)) throw new TypeError('CreateListFromArrayLike called on non-object')
	// 1.获取需要执行的函数
	var fn = this

	// 2.处理绑定的thisArg
	if (thisArg === '') {
		thisArg = Object(thisArg) // 利用Object加工基础变量
	} else if (thisArg === null || thisArg === undefined) {
		thisArg = window
	} else {
		thisArg = Object(thisArg)
	}

	// 3.执行函数
	const flag = Symbol('fn')
	thisArg[flag] = fn
	var result = thisArg[flag](...argArray) // 扩展运算符传入数据
	delete thisArg[flag]

	// 返回结果
	return result
}
// =========================================================
function sum(num1, num2) {
	console.log(this, num1, num2)
	return num1 + num2
}
let result = sum.apply({ name: 'yyb' }, [1, 2])
console.log('result', result) // 3
let result2 = sum.mApply({ name: 'yyb' }, [1, 2])
console.log('result2', result2) // 3
sum.apply(0, null) // Number{0}
sum.mApply(0, null) // Number{0}
