// import "@babel/polyfill"; // 方式一，配合entry
// import Demo from './demo.vue'
// import Vue from "vue"
import foo from './js/foo'
const arr = [new Promise(() => {}), new Promise(() => {})]

arr.map(item => {
	console.log(item, 'ABC')
})
// TODO:Vue挂载的实现
/*new Vue({
	el: '#login',
	render: h => h(Demo)
})

// TODO:React的实现
import React, {Component} from 'react'
import ReactDom from 'react-dom'

class App extends Component {
	render() {
		return <div>Hello React</div>
	}
}

ReactDom.render(<App/>, document.getElementById('app'))*/
/*
* useBuiltIns: entry usage false
* entry: 在入口模块执行，import "@babel/polyfill"。没有使用到的不会导入
* usage: 不需要在入口模块写入import.自动检测
* false: 关闭。全量导入
* */
