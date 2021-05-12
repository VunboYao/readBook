import React from 'react'
import ReactDOM from 'react-dom';
// 类式组件
/* export default class Demo extends React.Component {
  state = {
    count: 0,
  }
  myRef = React.createRef()

  Add = () => {
    this.setState(state => ({ count: state.count + 1 }))
  }

  // 组件挂载后
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(state => ({ count: state.count + 1 }))
    }, 1000)
  }

  unmount = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    console.log('组件卸载完成')
  }

  // 组件即将卸载
  componentWillUnmount() {
    // 清空定时器
    clearInterval(this.timer)
    console.log('组件即将卸载,清空定时器')
  }

  show = () => {
    alert(this.myRef.current.value)
  }

  render() {
    return (
      <div>
        <input type='text' ref={this.myRef} />
        <h2>Total is {this.state.count}</h2>
        <button onClick={this.Add}>Click Add</button>
        <button onClick={this.unmount}>unmount</button>
        <button onClick={this.show}>show</button>
      </div>
    )
  }
} */

// Hook函数式组件
function Demo() {
  // 1.useState
  const [count, setCount] = React.useState(0)

  // 2.useEffect
  React.useEffect(() => {
    // 执行任何副作用操作。挂载后执行
    const timer = setInterval(() => {
      Add()
    }, 1000)
    return () => {
      // 在此做一些收尾的工作，清除定时器、取消订阅等。
      clearInterval(timer)
    }
  }, []) // 如果指定的是[], 回调函数只会在第一次

  // 3.useRef
  const myRef = React.useRef()

  // 方法：添加
  function Add() {
    setCount(count => count + 1)
  }

  // 方法：注册卸载组件的方法
  function unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
  }

  // 方法：useRef使用
  function show() {
    alert(myRef.current.value)
  }
  return (
    <div>
      <input type="text" ref={myRef} />
      <h2>Total is {count}</h2>
      <button onClick={Add}>Click Add</button>
      <button onClick={unmount}>Unmount</button>
      <button onClick={show}>show</button>
    </div>
  )
}
export default Demo
