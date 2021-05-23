import React, { Component } from 'react'

import { Button, Space, Select } from 'antd'
import 'antd/dist/antd.css'

const { Option } = Select

export default class Count extends Component {
  state = {
    total: 0,
    select: 2,
  }

  add = () => {
    const { total, select } = this.state
    this.setState({ total: total + select })
  }
  decrement = () => {
    const { total, select } = this.state
    this.setState({ total: total - select })
  }

  addIfOdd = () => {
    const { total, select } = this.state
    if (total % 2 === 0) return
    this.setState({ total: total + select })
  }

  addIfAsync = () => {
    const { total, select } = this.state
    setTimeout(() => {
      this.setState({ total: total + select })
    }, 500)
  }

  toggleSelect = val => {
    this.setState({ select: val * 1 })
  }
  render() {
    return (
      <div>
        <h2>now total is {this.state.total}</h2>
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
