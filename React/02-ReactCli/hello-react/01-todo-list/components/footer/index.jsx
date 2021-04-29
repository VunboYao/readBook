import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'
export default class Footer extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    deleteList: PropTypes.func.isRequired,
    toggleAllSelected: PropTypes.func.isRequired,
  }
  // 监听全选框
  handleChange = event => {
    const bool = event.target.checked
    this.props.toggleAllSelected(bool)
  }
  render() {
    const { deleteList, todos } = this.props
    const completed = todos.filter(item => item.done).length
    const total = todos.length
    return (
      <div className='div'>
        <input
          type='checkbox'
          checked={total && total === completed}
          onChange={this.handleChange}
        />
        <span className='span'>
          已完成 {completed} / 全部 {total}
        </span>
        <button className='close-all' onClick={deleteList}>
          清楚已完成任务
        </button>
      </div>
    )
  }
}
