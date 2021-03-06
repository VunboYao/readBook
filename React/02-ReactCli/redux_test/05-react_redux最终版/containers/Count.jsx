// 引入核心库
import { Component } from 'react'
// 通过connect生成一个容器组件
import { connect } from 'react-redux'

// 引入actions
import { increment, decrement } from '../redux/actions/Count'

// antd组件库
import { Space, Select, Button } from 'antd'
import 'antd/dist/antd.css'
const { Option } = Select

// 创建UI组件
class Count extends Component {
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

  toggleSelect = val => {
    this.setState({ select: val * 1 })
  }
  render() {
    return (
      <div>
        <h2>
          now total is {this.props.Count}, persons of below:{' '}
          {this.props.Person.length}
        </h2>
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
        </Space>
      </div>
    )
  }
}

// 暴露方法
export default connect(
  // 映射状态 mapStateToProps
  state => ({ ...state }),
  // 映射操作方法 mapDispatchToProps
  {
    increment,
    decrement,
  }
)(Count)
