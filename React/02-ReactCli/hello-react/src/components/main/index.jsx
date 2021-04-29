import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'
import Footer from './../footer'

export default class Main extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    updateTodo: PropTypes.func.isRequired,
    toggleAllSelected: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    deleteList: PropTypes.func.isRequired,
  }
  // 子组件调用父组件传入的方法，回调更新数据
  changeChecked = id => {
    return e => {
      const { updateTodo } = this.props
      updateTodo(id, e.target.checked)
    }
  }

  render() {
    // 接收数据并渲染
    const { todos, toggleAllSelected, deleteTodo, deleteList } = this.props
    return (
      <div className='main'>
        <ul>
          {todos.map(item => {
            return (
              <li key={item.id}>
                <input
                  type='checkbox'
                  checked={item.done}
                  onChange={this.changeChecked(item.id)}
                />
                {item.msg}
                <button className='button' onClick={() => deleteTodo(item.id)}>
                  delete
                </button>
              </li>
            )
          })}
        </ul>
        <Footer
          todos={todos}
          deleteList={deleteList}
          toggleAllSelected={toggleAllSelected}
        />
      </div>
    )
  }
}
