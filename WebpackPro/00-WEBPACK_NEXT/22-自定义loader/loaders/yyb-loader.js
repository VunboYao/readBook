module.exports = function (content) {
	console.log('loader1===>', content)
	return content
}


module.exports.pitch = function () {
	console.log('loader1 ===> pitch')
}
