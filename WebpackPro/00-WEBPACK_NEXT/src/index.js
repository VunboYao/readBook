import js0 from './js/00-test'
import './css/00-test.css';

const name = js0.getFullName()
const element = js0.component(name)
document.body.appendChild(element)

// 处理less scss
import './css/01-less.less';
import './css/01-sass.scss';

// JS中图片处理
import './js/01-img';

// 处理字体文件
import './js/02-font';

// polyfill
import './js/03-polyfill';
// babel.config.js中 useBuiltIns: 'entry'
 import 'core-js/stable';
 import 'regenerator-runtime/runtime';

 // react JSX
import './js/04-reactJSX'

// typeScript
import {foo, message} from './js/05-typeScript.ts'
foo(message)

// Vue

import Vue from 'vue'
import App from './js/06-app.vue'

new Vue({
  render: h => h(App)
}).$mount('#app')
