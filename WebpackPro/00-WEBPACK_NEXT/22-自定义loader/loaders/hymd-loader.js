const {marked} = require('marked')
const hljs = require('highlight.js');

module.exports = function (content) {
	marked.setOptions({
		highlight: function (code) {
			return hljs.highlightAuto(code).value
		}
	})
	const html = marked(content)

	// 1. html-loader可以独立处理
	// 2.拼接模块数据
	const innerContent = "`" + html + "`"
	return `var code=${innerContent};export default code;`
}
