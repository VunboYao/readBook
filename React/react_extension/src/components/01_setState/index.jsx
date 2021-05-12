import React, { Component } from 'react'

export default class Demo extends Component {
  state = {
    count: 0,
  }
  add = () => {
    // 对象式状态改变，setState是异步的
    /* const { count } = this.state
    this.setState({ count: count + 1 }, () => {
      console.log('状态更新后的回调', this.state.count);
    }) */

    // 函数式状态改变，返回一个状态改变对象 setState(updater(state,props), [callback])
    /* this.setState((state,props) => {
      return {count: state.count + 1}
    }) */
    this.setState(state => ({count: state.count + 1}), () => {
      console.log('回调更新', this.state.count);
    })
  }
  render() {
    return (
      <div>
        <h2>now total is {this.state.count}</h2>
        <button onClick={this.add}> Click Add 1 </button>
      </div>
    )
  }
}
