var a = 100 // GO 变量
function foo() {
	console.log(a) // FEC中查找 AO+ParentScope
	return // 不会阻止预解析阶段代码分析
	var a = 100
}

foo()
