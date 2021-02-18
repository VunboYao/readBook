import avatar from '../images/demo.jpg' // 使用ES6模块化提代NodeJs的require方式
import '../css/index.css'
import '../font/iconfont.css'
import { addImg } from './moduleA'
import 'bootstrap'
// 同步加载
// import $ from 'jquery'
// import '@babel/polyfill'
// import less from './css/less.less'
// import scss from './css/sass.scss'

// CSS模块化测试
const oImg = document.createElement('img') // 获取file-loader处理后的文件路径
console.warn(avatar)
oImg.src = avatar
oImg.classList.add('size')
document.body.appendChild(oImg)
addImg()
// addImg.add()
// document.getElementById('btn').onclick = function () {
//   const oDiv = getComponent()
//   document.body.appendChild(oDiv)
// }
// function getComponent () {
//   const oDiv = $('<div>I am Div</div>')
//   return oDiv
// }
/* 异步加载 */
/* function getComponent () {
  return import(/!* webpackPrefetch: true *!//!* webpackChunkName: "jquery" *!/'jquery').then(({ default: $ }) => {
    return $('<div>i am Div</div>')
  })
}
document.getElementById('btn').onclick = function () {
  getComponent().then(res => {
    document.body.appendChild(res[0])
  })
} */
// $('img').css({
//   width: '444px',
//   height: '444px',
//   border: '2px solid #456'
// })

// 字体图标
const icon = document.createElement('h1')
icon.innerHTML = '<h1 class="iconfont icon-hanbao-01" style="font-size: 100px;"></h1>'
document.body.appendChild(icon)

// JS热更新
if (module.hot) {
  module.hot.accept('./moduleA', () => {
    console.warn('yes')
    // addImg.add()
  })
}

// ES678高级语法
const say = () => {
  console.warn('hello')
}
say()

Promise.resolve().then(res => {
  console.warn('yyb2')
})

/* imports-loader测试jQuery的引用 */
// eslint-disable-next-line no-undef
$('.demo-box').css({
  width: '200px',
  height: '200px',
  border: '4px solid #ddd'
})
