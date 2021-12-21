const {validate} = require('schema-utils')
const schema = require('./schema.json')

module.exports = function (content) {
	console.log(this.query)
	// 获取参数
	const {name, age} = this.query
	validate(schema, this.query, {
		name: 'async-loader' // 报错时告知是什么loader
	})
	let res = content.replace('World', name)
	// return content // return 字符串
	// 异步处理
	const callback = this.async()
	setTimeout(() => {
		callback(null, res) // 返回多个结果
	}, 2000)
}

