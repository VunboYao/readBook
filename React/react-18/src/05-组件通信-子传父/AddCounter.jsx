import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class AddCounter extends Component {
  static propTypes = {
    changeClick: PropTypes.func,
  }

  add(count) {
    // 通过props获取到父级的方法，调用并传递相应的参数
    const { changeClick } = this.props
    changeClick(count)
  }

  render() {
    return (
      <div>
        <button onClick={() => this.add(1)}>Add+1</button>
        <button onClick={() => this.add(3)}>Add+3</button>
        <button onClick={() => this.add(5)}>Add+5</button>
      </div>
    )
  }
}
