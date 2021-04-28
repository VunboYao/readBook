import {Component} from 'react'
import './index.css'

import Header from './Header'
import Main from './main'
class TodoList extends Component {
  state = {
    taskList: [
      { id: 'a', msg: 'rich', done: false },
      { id: 'b', msg: 'sleep', done: false },
      { id: 'c', msg: 'biu biu biu ', done: false }
    ]
  }
  // 添加新的待办对象
  addTodo = (todoObj) => {
    const {taskList} = this.state
    const newTodo = [todoObj, ...taskList]
    this.setState({taskList: newTodo})
  }
  render() {
    return (
      <div className="box">
        <Header addTodo={this.addTodo}/>
        <Main todos={this.state.taskList}/>
      </div>
    )
  }
}

export default TodoList