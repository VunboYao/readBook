import avatar from './images/demo.jpg' // 使用ES6模块化提代NodeJs的require方式
import './css/index.css'
import './font/iconfont.css'
import addImg from './js/moduleA'
// import less from './css/less.less'
// import scss from './css/sass.scss'



// CSS模块化测试
const oImg = document.createElement('img') // 获取file-loader处理后的文件路径
console.log(avatar)
oImg.src = avatar
oImg.classList.add('size')
document.body.appendChild(oImg)
addImg.addImg()
addImg.add()

// 字体图标
const icon = document.createElement('h1')
icon.innerHTML =  `<h1 class="iconfont icon-hanbao-01" style="font-size: 100px;"></h1>`
document.body.appendChild(icon)

// JS热更新
if (module.hot) {
	module.hot.accept('./js/moduleA', () => {
		console.log('yes')
		addImg.add()
	})
}
