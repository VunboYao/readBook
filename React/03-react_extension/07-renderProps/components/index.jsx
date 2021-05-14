import React, { PureComponent } from 'react'
import './index.css'
export default class Demo extends PureComponent {
  render() {
    return (
      <div className="parent">
        <h2>我是父亲组件</h2>
        {/* 需要提供插槽的组件，传入子组件时，通过render返回一个函数调用。传入需要插入的组件和属性 */}
        <A age={2} render={data => <B name={data}/>}/>
      </div>
    )
  }
}


class A extends PureComponent {
  render() {
    const {age} = this.props
    const tip = age > 18 ? 'adult' : 'baby'
    return (
      <div className="son">
        <h3>我是子组件</h3>
        {/* 默认执行函数调用，传入暴露给子组件的参数 */}
        {this.props.render(tip)}
      </div>
    )
  }
}

class B extends PureComponent {
  render() {
    console.log(this);
    return (
      <div className='grandson'>
        {/* 接收props传入的参数 */}
        <h3>我是孙组件, i am {this.props.name}</h3>
      </div>
    )
  }
}
