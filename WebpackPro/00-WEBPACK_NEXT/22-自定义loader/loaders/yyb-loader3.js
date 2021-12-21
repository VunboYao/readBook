module.exports = function(content) {
	console.log('loader3===>', content)
	return content
}

module.exports.pitch = function () {
	console.log('loader3 ===> pitch')
}
