const babel = require('@babel/core')
const schema = require('./schema.babel.json')
const {validate} = require('schema-utils')

module.exports = function(content) {
	// 1.参数校验
	validate(schema, this.query)
	// 2.异步方法
	const callback = this.async()
	// 3.babel转换
	babel.transform(content, this.query, (err, result) => {
		if (err) {
			callback(err)
		} else {
			callback(null, result.code)
		}
	})
}
