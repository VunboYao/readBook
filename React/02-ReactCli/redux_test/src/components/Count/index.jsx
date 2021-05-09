import React, { Component } from 'react'
import store from '../../redux/store'
import { Button, Space, Select } from 'antd'
import 'antd/dist/antd.css'

const { Option } = Select

export default class Count extends Component {
  state = {
    select: 2,
  }

  add = () => {
    const { select } = this.state
    store.dispatch({ type: 'add', data: select })
  }
  decrement = () => {
    const { select } = this.state
    store.dispatch({ type: 'down', data: select })
  }

  addIfOdd = () => {
    const { select } = this.state
    const total = store.getState()
    if (total % 2 === 0) return
    store.dispatch({ type: 'add', data: select })
  }

  addIfAsync = () => {
    const { select } = this.state
    setTimeout(() => {
      store.dispatch({ type: 'add', data: select })
    }, 500)
  }

  toggleSelect = val => {
    this.setState({ select: val * 1 })
  }
  render() {
    return (
      <div>
        <h2>now total is {store.getState()}</h2>
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
