import avatar from './images/demo.jpg' // 使用ES6模块化提代NodeJs的require方式
import css from './index.css'
import './font/iconfont.css'
import addImg from './moduleA'
// import less from './less.less'
// import scss from './sass.scss'



// CSS模块化测试
const oImg = document.createElement('img') // 获取file-loader处理后的文件路径
console.log(avatar)
oImg.src = avatar
oImg.classList.add('size')
document.body.appendChild(oImg)
addImg()

// 字体图标
const icon = document.createElement('h1')
icon.innerHTML =  `<h1 class="iconfont icon-hanbao-01" style="font-size: 100px;"></h1>`
document.body.appendChild(icon)
