import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.css'
class Index extends Component {
  static propTypes = {
    children: PropTypes.array,
  }

  /*
  * 1.通过 children 属性的方式实现插槽，不够优雅
  * 2.当用户只传入一个参数的时候, children 不是一个 array
  * 3.可以通过 propTypes 限制 children 必须传入数组, 但是运行时则会产生bug
  *  */

  render() {
    const { children } = this.props
    return (
      <div className={'nav-bar'}>
        <div className="left">{children[0]}</div>
        <div className="center">{children[1]}</div>
        <div className="right">{children[2]}</div>
      </div>
    )
  }
}

export default Index
