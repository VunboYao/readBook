import React, { Component } from 'react'
import store from '../../redux/store'
import { Button, Space, Select } from 'antd'
import 'antd/dist/antd.css'
import { createIncrementAction, createDecrementAction, createIncrementAsyncAction } from '../../redux/action'
const { Option } = Select

export default class Count extends Component {
  state = {
    select: 2,
  }

  add = () => {
    const { select } = this.state
    store.dispatch(createIncrementAction(select))
  }
  decrement = () => {
    const { select } = this.state
    store.dispatch(createDecrementAction(select))
  }

  addIfOdd = () => {
    const { select } = this.state
    const total = store.getState()
    if (total % 2 === 0) return
    store.dispatch(createIncrementAction(select))
  }

  addIfAsync = () => {
    const { select } = this.state
    store.dispatch(createIncrementAsyncAction(select, 500))
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
