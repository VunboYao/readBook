import React, { Component } from 'react'
import HelloWorld from './HelloWorld'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      isShow: true,
    }
  }

  toggleShow() {
    this.setState({ isShow: !this.state.isShow })
  }

  render() {
    const { isShow } = this.state
    return (
      <div>
        Hello React
        <button onClick={e => this.toggleShow(e)}>toggle</button>
        {isShow && <HelloWorld />}
      </div>
    )
  }
}
