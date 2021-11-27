const less = require('less')

module.exports = function (content) {
	less.render(content, (error, {css}) => {
		this.callback(error, css)
	})
}
