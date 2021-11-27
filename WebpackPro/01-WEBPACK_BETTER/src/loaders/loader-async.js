/*
* loader是一个函数，但不可以是箭头函数
* loader必须有返回值，string or buffer
* loader 接受配置，通过loader API
* 如何返回多个信息。通过this.callback有同步/异步调用两种方式
* loader异步处理逻辑。 this.async()
* 多个loader
* 如何处理路径问题
* */


module.exports = function (content) {
	const info = content.replace('Hello', '你好')
	// 异步callback
	let callback = this.async()
	setTimeout(() => {
		callback(null, info)
	}, 1000)
}
