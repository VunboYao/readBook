import './math'
import React from "react"
import ReactDOM from "react-dom"
import ReactApp from './App.jsx'

import Vue from 'vue'
import VueApp from './App.vue'

const msg = 'Hello World'
console.log(msg)


// 自己配置热更新
if (module.hot) {
	module.hot.accept('./math', () => {
		console.log('HMR发生了更新')
	})
}

// React模块
ReactDOM.render(<ReactApp/>, document.getElementById('app'))

// Vue模块
new Vue({
	render: h => h(VueApp)
}).$mount('#root')
/*
React热更新处理
* npm i -D @babel/core babel-loader @babel/preset-env @babel/preset-react
npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh

Vue热更新
npm i vue vue-loader vue-compiler-template

HMR模块化热更新原理：
1.webpack-dev-server会创建两个服务：提供静态资源的服务（express）和Socket服务（net.Socket）
2. express server负责直接提供静态资源服务（打包后的资源直接被浏览器请求和解析）
p 长连接有一个最好的好处是建立连接后双方可以通信（服务器可以直接发送文件到客户端）；
p 当服务器监听到对应的模块发生变化时，会生成两个文件.json（manifest文件）和.js文件（update chunk）；
p 通过长连接，可以直接将这两个文件主动发送给客户端（浏览器）；
p 浏览器拿到两个新的文件后，通过HMR runtime机制，加载这两个文件，并且针对修改的模块进行更新；
* */

