import React, { Component } from 'react'
import { addPerson } from '../redux/actions/Person'
import { connect } from 'react-redux' // 引入react-redux中的connect方法
import { Space } from 'antd'
import { nanoid } from 'nanoid'

// UI组件
class Person extends Component {
  addPerson = () => {
    const name = this.nameNode.value
    const age = this.ageNode.value
    this.props.addPerson({ id: nanoid(), name, age })
    this.nameNode.value = this.ageNode.value = ''
  }
  render() {
    return (
      <div>
        <h2>I am Person, total of Up: {this.props.Count}</h2>
        <Space>
          <input
            ref={c => (this.nameNode = c)}
            type='text'
            placeholder='please input your name'
          />
          <input
            ref={c => (this.ageNode = c)}
            type='text'
            placeholder='please input your age'
          />
          <button onClick={this.addPerson}>添加</button>
        </Space>
        <ul>
          {
            this.props.Person.map(item => {
              return <li key={item.id}>{item.name}--{item.age}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default connect(
  // 映射store中的所有状态 mapStateToProps
  state => ({ ...state }),
  // 映射store中的操作状态的方法 mapDispatchToProps、
  {
    addPerson,
  }
)(Person)
