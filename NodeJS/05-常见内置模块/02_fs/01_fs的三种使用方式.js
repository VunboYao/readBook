const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, 'abc.txt')

// 一：同步状态：查看文件状态
const info = fs.statSync(filePath)
// console.log(info)

// 二：异步
fs.stat(filePath, (err, info) => {
	if (err) {
		throw err
	} else {
		// console.log(info)
	}
})
// console.log('异步执行')

// 三：Promise
fs.promises.stat(filePath).then(res => {
	console.log('Promise状态信息')
	console.log(res)
})
console.log('Promise方式调用信息')
