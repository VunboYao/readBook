function foo() {
	console.log(n) // FEC中 AO中提前声明了n：undefined
	var n = 200
	console.log(n) // 从FEC中 AO里找到了n
}
var n = 100
foo()
