import _ from 'lodash'

// css的处理
import './css/base.css'
import './css/scss.scss'

// ts的处理
import Hello from './ts/foo'

// img图片处理
// @ts-ignore
import img from './img/demo.jpg'

Hello({ name: 'yyb', age: 28 })

const h2 = document.createElement('h2')
h2.className = 'title'
h2.innerHTML = 'Hello Vite'
document.body.appendChild(h2)


const imgEl = document.createElement('img')
imgEl.src = img
document.body.appendChild(imgEl)

// vue
import { createApp } from 'vue'
import App from './vue/App.vue'
createApp(App).mount(document.getElementById('root'))

// react
import AppReact from './react/main'
import ReactDom from 'react-dom'
import React from 'react';

ReactDom.render(<AppReact />, document.getElementById('app'))

console.log(_.join(['abc', 'xxi']))
console.log('Hello Vite')
