import _ from 'lodash'
import './css/base.css'
import './css/scss.scss'

import Hello from './ts/foo'

Hello({ name: 'yyb', age: 28 })

const h2 = document.createElement('h2')
h2.className = 'title'
h2.innerHTML = 'Hello Vite'
document.body.appendChild(h2)

console.log(_.join(['abc', 'xxi']))
console.log('Hello Vite')