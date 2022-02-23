// @ts-nocheck

// css
import './css/index.css'
const dom = document.createElement('h2')
dom.innerHTML = 'Hello Vite2'
document.body.appendChild(dom)

// 静态资源
import imgUrl from './../01-综合体验版本/img/demo.jpg'
const img = document.createElement('img')
img.src = imgUrl
document.body.appendChild(img)