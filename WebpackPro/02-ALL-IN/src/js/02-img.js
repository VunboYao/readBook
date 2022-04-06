
import imgSrc from './../assets/a.jpeg'

const img = new Image()
img.src = imgSrc

document.body.appendChild(img)

// create a div to wrap img
const box = document.createElement('div0')
box.style.width = `${200}px`
box.style.height = `${184}px`
box.style.display = 'inline-block'
box.className = 'bg-image'
document.body.appendChild(box)
