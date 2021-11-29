// 1.导入方式

// import dlam from '../img/dlam.jpg'
const dlam = require('../img/dlam.jpg')
const vImg = new Image()
// vImg.src = dlam.default // webpack5 资源导入方式时,不用取default
vImg.src = dlam
document.body.appendChild(vImg)

// css背景方式
const bgDiv = document.createElement('div')
bgDiv.style.cssText = 'width: 200px;height:200px;display:inline-block;'
bgDiv.className = "bg-image";
document.body.appendChild(bgDiv)
