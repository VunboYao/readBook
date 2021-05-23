import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import './index.css'
export default class Header extends Component {
  constructor(props) {
    super(props)
    this.addTodo = props.addTodo
  }
  // 必输校验
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  }
  addTask = event => {
    // 对象解构赋值
    const { target, keyCode } = event
    if (keyCode !== 13) return // 不是回车中断
    if (target.value.trim() === '') return // 空数据中断
    const task = target.value // 获取任务名称
    const todoObj = { id: nanoid(), msg: task, done: false } // 拼接数据
    this.addTodo(todoObj) // 调用父级方法，回调传入数据
    target.value = ''
  }
  render() {
    return (
      <div className='header'>
        <input className='input' type='text' onKeyUp={this.addTask} />
      </div>
    )
  }
}
