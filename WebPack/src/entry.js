const img = require('./demo.jpg')
console.log(img);
const oImg = document.createElement('img')
oImg.src = img.default
document.body.appendChild(oImg)