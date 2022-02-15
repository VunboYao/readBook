let name = 'yyb'
const age = 18
function sayHello(name) {
	console.log('Hello ' + name)
}

// 修改exports导出的属性
setTimeout(() => {
	exports.name = 'hello'
	console.log(exports.name)
}, 1000)

// 测试exports导出
exports.name = name
exports.age = age
exports.sayHello = sayHello

// TODO: exports默认是一个空对象。

// 测试module.exports
setTimeout(() => {
	console.log(module.exports.name, '>>')
}, 3000)

// module.exports导出
module.exports = {
	name: 'xixix',
	sayHello: name => {
		console.log('xixixi', name)
	},
}
