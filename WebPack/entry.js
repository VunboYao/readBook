const avatar = require('./src/images/demo.jpg')
console.log(avatar)
// 获取file-loader处理后的文件路径
const oImg = document.createElement('img')
oImg.src = avatar.default

document.body.appendChild(oImg)
