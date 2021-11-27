module.exports = function (content) {
	const action = this.query.action
	const info = content.replace('WEBPACK', action)
	this.callback(null,info)
}
