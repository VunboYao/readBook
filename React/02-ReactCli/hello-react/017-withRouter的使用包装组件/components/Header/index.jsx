import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Header extends Component {
  goBack = () => {
    this.props.history.goBack()
  }

  goForward = () => {
    this.props.history.goForward()
  }

  goTarget = () => {
    this.props.history.go(-2)
  }
  render() {
    return (
      <div>
        <h2>Hello React</h2>
        <button onClick={this.goBack}>GoBack</button>
        <button onClick={this.goForward}>GoForward</button>
        <button onClick={this.goTarget}>Go</button>
      </div>
    )
  }
}

export default withRouter(Header)

// withRouter加工一般组件，使其具有路由组件的属性
// withRouter返回一个新的组件
