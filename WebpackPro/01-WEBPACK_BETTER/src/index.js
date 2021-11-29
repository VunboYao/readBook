import bar from './js/bar.js'

import add from './js/foo.js'

import './style/index.css'
import './style/less.less'

function dom() {
  const test = document.createElement('div')
  test.innerHTML = 'Hello WEBPACK'
  return test
}

import imgSrc from './img/logo.png'
function genImg() {
  const img = document.createElement('img')
  img.src = imgSrc
  document.body.appendChild(img)
}
// genImg()

document.body.appendChild(dom())
console.log(add(4, 5))
