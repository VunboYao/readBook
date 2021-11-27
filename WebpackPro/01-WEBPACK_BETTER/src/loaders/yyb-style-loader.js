module.exports = function (content) {
	const styleDom = `
		let dom = document.createElement('style')
		dom.textContent=${content}
		document.head.appendChild(dom)
	`
	return styleDom
}
