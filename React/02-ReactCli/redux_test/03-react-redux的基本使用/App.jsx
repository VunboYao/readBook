import React, { Component } from 'react'
import store from './redux/store'
// 引入容器组件
import Count from './containers/Count'
export default class App extends Component {
  render() {
    return (
      <div>
        {/* 注册容器组件，传入Store */}
        <Count store={store}/>
      </div>
    )
  }
}
