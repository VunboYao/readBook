import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'
export default class index extends Component {
  // TODO: 定义传入属性限制
  static propTypes = {
    name: PropTypes.string, // name是字符串
    age: PropTypes.number.isRequired, // number且必输
  }

  // TODO：子组件默认值。如果父组件不传值，则默认Header
  static defaultProps = {
    name: 'Header',
    age: 20,
  }

  btnClick() {
    const { fatherFn } = this.props
    fatherFn('msg', 'son')
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <h1 className={'header'}>
          {this.props.name}-{this.props.age}
        </h1>
        <button onClick={() => this.btnClick()}>SonCallFatherFn</button>
      </div>
    )
  }
}
