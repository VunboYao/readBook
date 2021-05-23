// 引入核心库
import React, { Component } from 'react'

// 引入connect用于连接UI组件与redux
import { connect } from 'react-redux'

// 引入常量
import { INCREMENT, DECREMENT } from '../../redux/constant'

// 引入action
import {
  createDecrementAction,
  createIncrementAsyncAction,
  createIncrementAction,
} from '../../redux/action'

// 引入AntD
import { Button, Space, Select } from 'antd'
import 'antd/dist/antd.css'
const { Option } = Select

// 注册UI组件
class Count extends Component {
  state = {
    select: 2,
  }

  add = () => {
    const { select } = this.state
    this.props[INCREMENT](select)
  }
  decrement = () => {
    const { select } = this.state
    this.props[DECREMENT](select)
  }

  addIfOdd = () => {
    const { select } = this.state
    if (this.props.count % 2 === 0) return
    this.props[INCREMENT](select)
  }

  addIfAsync = () => {
    const { select } = this.state
    this.props.addOfAsync(select, 500)
  }

  toggleSelect = val => {
    this.setState({ select: val * 1 })
  }
  render() {
    console.log(this.props, '>>>>>>>>')
    return (
      <div>
        <h2>now total is {this.props.count}</h2>
        <Space>
          <Select
            defaultValue='2'
            style={{ width: 120 }}
            onChange={this.toggleSelect}
          >
            <Option value='1'>1</Option>
            <Option value='2'>2</Option>
            <Option value='3'>3</Option>
          </Select>
          <Button onClick={this.add} type='primary'>
            +
          </Button>
          <Button onClick={this.decrement} type='primary'>
            -
          </Button>
          <Button onClick={this.addIfOdd} type='primary'>
            addIfOdd
          </Button>
          <Button onClick={this.addIfAsync} type='primary'>
            asyncOdd
          </Button>
        </Space>
      </div>
    )
  }
}

export default connect(
  // 映射状态
  state => ({ count: state }),
  // 映射操作状态方法
  {
    [INCREMENT]: createIncrementAction,
    [DECREMENT]: createDecrementAction,
    addOfAsync: createIncrementAsyncAction,
  }
)(Count)
