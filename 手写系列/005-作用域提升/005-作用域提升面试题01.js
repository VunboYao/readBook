var n = 100
function foo() {
	n = 200 // 改变了全局变量n的值
}
foo()
console.log(n)
