import './../css/01-style.css'
import './../css/02-less.less'
function component() {
  const element = document.createElement('div')

  element.innerHTML = ['Hello', 'Webpack'].join('')
  element.className = 'content'

  return element
}
document.body.appendChild(component())
