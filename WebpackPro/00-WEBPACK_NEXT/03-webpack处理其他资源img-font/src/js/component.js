// import 'style-loader!css-loader!./../css/index.css' // 内联
import './../css/index.css'
import './../css/less.less'
import imgSrc from './../img/logo.png' // 用file-loader处理 import/require()引入的文件资源。后url-loader替换。可进行小资源base64转换
function component() {
	const div = document.createElement('div')
	div.innerHTML = ['Hello', 'Webpack'].join(' ')
	div.className = 'content'


	const imgEl = document.createElement('img')
	imgEl.src = imgSrc
	div.appendChild(imgEl)

	const imgDiv = document.createElement('div')
	imgDiv.className = 'bg-img'
	div.appendChild(imgDiv)
	return div
}

document.body.appendChild(component())
