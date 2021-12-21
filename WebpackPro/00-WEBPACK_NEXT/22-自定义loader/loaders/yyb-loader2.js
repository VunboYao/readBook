module.exports = function(content) {
	console.log('loader2===>', content)
	return content
}

module.exports.pitch = function () {
	console.log('loader2 ===> pitch')
}
