var n = 100 // GO

function foo1() {
	console.log(n) // 在当前FEC的AO+ParentScope： Window GO中查找
}

function foo2() {
	var n = 200 // FEC AO对象
	console.log(n) // 查找当前FEC中的AO变量
	foo1()
}

foo2()
console.log(n) // 全局GO中查找
