/* import js0 from './js/00-test'
import './css/00-test.css';

const name = js0.getFullName()
const element = js0.component(name)
document.body.appendChild(element)

// 热更新
if (module.hot) {
  module.hot.accept('./js/00-test', () => {
    console.log('模块热更新了')
  })
}

// 处理less scss
import './css/01-less.less';
import './css/01-sass.scss';

// JS中图片处理
import '@/01-img';

// 处理字体文件
import '@/02-font';

// polyfill
import './js/03-polyfill';
// babel.config.js中 useBuiltIns: 'entry'
 import 'core-js/stable';
 import 'regenerator-runtime/runtime';

 // react JSX
import './js/04-reactJSX'

// typeScript
import {foo, message} from './js/05-typeScript'
foo(message)

// Vue

import Vue from 'vue'
import App from './js/06-app'

new Vue({
  render: h => h(App)
}).$mount('#app') */


import (/* webpackChunkName: "VueDemo" */'./js/Test-01').then(res => {
  console.log(`res`, res)
})
console.log(`分包测试`)
