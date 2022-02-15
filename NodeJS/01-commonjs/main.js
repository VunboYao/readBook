/*
返回导出的对象!!!
exports {name, age, sayHello}
*/

// exports导出测试
const obj = require('./bar')
console.log(obj)
console.log(obj.name)
console.log(obj.age)
obj.sayHello(obj.name)

// TODO：可以解构，确认返回的是一个对象
/* const { name, age, sayHello } = require('./bar')
console.log(name)
console.log(age)
sayHello(name) */

// 测试模块导出对象的值变更
setTimeout(() => {
	obj.name = '666'
	// console.log(obj.name)
}, 2000)
