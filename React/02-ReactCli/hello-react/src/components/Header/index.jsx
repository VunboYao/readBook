import React, { Component } from "react";
import {nanoid} from 'nanoid'
import "./index.css";
export default class Header extends Component {
  constructor(props) {
    super(props)
    this.addTodo = props.addTodo
  }
  addTask = (event) => {
    const {target, keyCode} = event
    if (keyCode !== 13) return
    if (target.value.trim() === '') return
    const task = target.value
    const todoObj = { id: nanoid(), msg: task, done: false}
    this.addTodo(todoObj)
    target.value = ''
  }
  render() {
    return (
      <div className="header">
        <input className="input" type="text" onKeyUp={this.addTask} />
      </div>
    );
  }
}
