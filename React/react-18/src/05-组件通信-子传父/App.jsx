import React, { Component } from 'react'
import AddCounter from './AddCounter'
import SubCounter from './SubCounter'

export default class App extends Component {
  state = {
    counter: 100,
  }

  changeCounter(count) {
    const { counter } = this.state
    this.setState({ counter: counter + count })
  }

  render() {
    const { counter } = this.state
    return (
      <div>
        <h2>Counter: {counter} </h2>
        {/* 将父级的方法通过 props 传递给子元素调用 */}
        <AddCounter changeClick={counter => this.changeCounter(counter)} />
        <SubCounter changeClick={counter => this.changeCounter(counter)}/>
      </div>
    )
  }
}
