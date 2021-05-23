import React, { Component } from 'react'
import { Button, Space, Select } from 'antd'
import 'antd/dist/antd.css'
const { Option } = Select

export default class Count extends Component {
  state = {
    select: 2,
  }

  add = () => {
    const { select } = this.state
    this.props.increment(select)
  }
  decrement = () => {
    const { select } = this.state
    this.props.decrement(select)
  }

  addIfOdd = () => {
    const { select } = this.state
    if (this.props.count % 2 === 0) return
    this.props.increment(select)
  }

  addIfAsync = () => {
    const { select } = this.state
    this.props.addOfAsync(select, 500)
  }

  toggleSelect = val => {
    this.setState({ select: val * 1 })
  }
  render() {
    console.log(this.props, '>>>>>>>>');
    return (
      <div>
        <h2>now total is {this.props.count}</h2>
        <Space>
          <Select defaultValue='2' style={{ width: 120 }} onChange={this.toggleSelect}>
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
