import React, { PureComponent } from 'react'
import { addObj } from '../redux/actions/Person'
import { connect } from 'react-redux'
import { nanoid } from 'nanoid'
class Person extends PureComponent {
  add = e => {
    let { value } = e.target
    if (e.keyCode !== 13 || !value) return
    const obj = {
      id: nanoid(),
      msg: value,
    }
    this.props.addObj(obj)
    e.target.value = ''
  }
  render() {
    return (
      <>
      <h2>i am Count Component, total is {this.props.Count}</h2>
        <input
          onKeyUp={e => this.add(e)}
          type='text'
          placeholder='请输入你的姓名'
        />
        <ul>
          {this.props.Person.map(item => {
            return <li key={item.id}>{item.msg}</li>
          })}
        </ul>
      </>
    )
  }
}

export default connect(state => ({ ...state }), {
  addObj,
})(Person)
