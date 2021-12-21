const {validate} = require('schema-utils')
const schema = require('./schema.json')

module.exports = function (content) {
	console.log(this.query)
	// 获取参数
	const {name, age} = this.query
	// 参数校验。具名配置报错loader名称
	validate(schema, this.query, {
		name: 'async-loader' // 报错时告知是什么loader
	})
	// 数据替换
	let res = content.replace('World', name)
	// return content // return 字符串
	// 异步处理
	const callback = this.async()
	setTimeout(() => {
		this.callback(null, res) // 返回多个结果
	}, 100)
}

