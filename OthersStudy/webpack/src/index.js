/*
require('./demo.css');
require('./sass.scss');

import logo from './home.png'

let image = new Image();
image.src = logo;
document.body.appendChild(image);

class Log{
  constructor() {
    console.log('error')
  }
}
let log = new Log();*/

// import 'bootstrap'
// import './demo'
/*
let xhr = new XMLHttpRequest();
// http:localhost: 8080  webpack-dev-server => 3000
xhr.open('get', '/user', true)
xhr.send()
xhr.onload = function () {
  console.log(xhr.response);
}*/

let url = '';
if (DEV === 'DEV') {
  url = 'http://localhost:8080'
} else {
  url = 'http://www.zhufengpeixun.cn'
}
console.log(DEV, url);
console.log(typeof FLAG)
console.log(typeof expression,expression);