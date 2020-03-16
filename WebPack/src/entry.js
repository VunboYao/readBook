import img from './demo.jpg'
import less from './less.less'
const oImg = document.createElement('img')
oImg.src = img
oImg.setAttribute('class', 'size')
document.body.appendChild(oImg)
