import React, { Component, Fragment } from 'react'
import ComA from './components/ComponentA'
import ComB from './components/ComponentB'

import MyEventEmitter from './utils/pubSub'

window.MyEvent = new MyEventEmitter()
export default class App extends Component {
  state = {}

  render() {
    return (
      <Fragment>
        <h2>我是父组件</h2>
        <ComA />
        <ComB />
      </Fragment>
    )
  }
}
