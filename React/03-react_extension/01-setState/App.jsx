// 路由懒加载，引入lazy, Suspense
import React, { Component } from 'react'
import Demo from './components';
export default class App extends Component {
  render() {
    return (
      <div>
        <Demo/>
      </div>
    )
  }
}
