import avatar from './images/demo.jpg' // 使用ES6模块化提代NodeJs的require方式
import css from './index.css'
import addImg from './a'
// import less from './less.less'
// import scss from './sass.scss'
const oImg = document.createElement('img') // 获取file-loader处理后的文件路径
oImg.src = avatar
oImg.classList.add('size')
document.body.appendChild(oImg)
addImg()
