import React, { Component } from 'react'
import './index.css'

const MyContext = React.createContext() // 声明上下文方法

export default class A extends Component {
  state = {
    name: 'Yao',
    age: 10,
  }
  render() {
    const { name, age } = this.state
    return (
      <div className='parent'>
        <h2>我是父组件，我的名字是{name}</h2>
        {/* 通过上下文，将数据传给孙子组件 */}
        <MyContext.Provider value={{ name, age }}>
          {/* 子组件通过props传值 */}
          <B name={name} />
        </MyContext.Provider>
      </div>
    )
  }
}

class B extends Component {
  render() {
    return (
      <div className='son'>
        <h2>我是子组件，我的父亲是{this.props.name}</h2>
        <C />
      </div>
    )
  }
}

// 类式：孙子组件
/* class C extends Component {
  // 孙子组件声明通过上下文对象获取contextType
  static contextType = MyContext
  render() {
    return (
      <div className='grandson'>
        <h2>我是孙子组件，我的爷爷是{this.context.name}, 年龄是{this.context.age}</h2>
      </div>
    )
  }
} */

class C extends Component {
  render() {
    return (
      <div className='grandson'>
        <h2>
          我是孙子组件，我的爷爷是
          <MyContext.Consumer>{value => `${value.name}, 年龄是${value.age}`}</MyContext.Consumer>
        </h2>
      </div>
    )
  }
}

/* function C() {
  return (
    <div className='grandson'>
      <h2>
        我是孙子组件，我的爷爷是
        <MyContext.Consumer>{value => `${value.name}, 年龄是${value.age}`}</MyContext.Consumer>
      </h2>
    </div>
  )
} */
