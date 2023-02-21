import { Component } from 'react'

export default class App extends Component {
  state = {
    msg: 'App MSG',
  }

  render() {
    const { msg } = this.state
    return (
      <div>{msg}</div>
    )
  }
}
/**
 * render函数的返回值
 * 1.react元素： 通过jsx编写的代码就会被编译成React.createElement, 所以返回的就是一个React元素
 *   return <h2>{msg}</h2>
 * 2.组件或者fragments
 *   return ['abc', 'cba', 'nba']
 *   return [
 *      <h1>h1元素</h1>
 *      <h1>h2元素</h1>
 *      <h1>h3元素</h1>
 *    ]
 * 3.字符串/数字类型
 *   return "hello React"
 */
