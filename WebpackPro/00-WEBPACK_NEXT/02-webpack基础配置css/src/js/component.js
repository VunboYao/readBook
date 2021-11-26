// import 'style-loader!css-loader!./../css/index.css' // 内联
import './../css/index.css'
import './../css/less.less'
function component() {
	const div = document.createElement('div')
	div.innerHTML = ['Hello', 'Webpack'].join(' ')
	div.className = 'content'

	return div
}

document.body.appendChild(component())
