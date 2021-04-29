import { Component } from 'react'
import './index.css'

import Header from './Header'
import Main from './main'
class TodoList extends Component {
  // 初始化状态
  state = {
    taskList: [
      { id: 'a', msg: 'rich', done: false },
      { id: 'b', msg: 'sleep', done: true },
      { id: 'c', msg: 'biu biu biu ', done: false },
    ],
  }

  // 父组件注册更新状态方法=> 传递给子组件
  updateTodo = (id, done) => {
    const { taskList } = this.state
    const newTodos = taskList.map(item => {
      if (item.id === id) return { ...item, done }
      else return item
    })
    this.setState({ taskList: newTodos })
  }

  // 添加新的待办对象
  addTodo = todoObj => {
    const { taskList } = this.state // 获取原始数据
    const newTodo = [todoObj, ...taskList] // 拼接数据
    this.setState({ taskList: newTodo }) // 更新数据
  }

  // 父组件更新全部状态
  toggleAllSelected = bool => {
    const { taskList } = this.state
    taskList.forEach(item => {
      item.done = bool
    })
    this.setState({ taskList })
  }

  // 删除单个元素
  deleteTodo = id => {
    if (window.confirm('confirm delete the task?')) {
      const { taskList } = this.state
      const newTodo = taskList.filter(item => item.id !== id)
      this.setState({ taskList: newTodo })
    }
  }

  // 批量删除元素
  deleteList = () => {
    const { taskList } = this.state
    const newTodo = taskList.filter(item => !item.done)
    this.setState({ taskList: newTodo })
  }

  // 渲染
  render() {
    return (
      <div className='box'>
        <Header addTodo={this.addTodo} />
        <Main
          todos={this.state.taskList}
          updateTodo={this.updateTodo}
          toggleAllSelected={this.toggleAllSelected}
          deleteTodo={this.deleteTodo}
          deleteList={this.deleteList}
        />
      </div>
    )
  }
}

export default TodoList
