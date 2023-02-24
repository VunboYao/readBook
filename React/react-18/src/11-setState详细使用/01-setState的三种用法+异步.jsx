import { PureComponent } from 'react'

class App extends PureComponent {
  state = {
    message: 'Hello React',
    counter: 0,
  }

  handleClick() {
    // !1.传入对象的第一种方式: 异步批量更新
    /*
    const { counter } = this.state
    this.setState({
      counter: ++counter,
    })
    this.setState({
      counter: ++counter,
    })
    this.setState({
      counter: ++counter,
    })
    console.log(this.state.counter) */

    // !2.传入一个回调函数： 异步批量更新
    // 好处一：可以在回调函数中编写新的 state 的逻辑
    // 好处二：回调函数会将之前的state 和 props传递进来

    /*  this.setState((state, props) => {
      console.log(state, props)
      return {
        message: 'Hello Yao',
        counter: ++state.counter,
      }
    })
    this.setState((state) => {
      return {
        counter: ++state.counter,
      }
    })
    this.setState((state) => {
      return {
        counter: ++state.counter,
      }
    })
    console.log(this.state) */

    // !3.setState在React事件处理中是一个异步调用
    // 如果希望在数据更新之后(数据合并),获取到对应的结果后执行一些逻辑代码，可在第二个参数传入回调
    this.setState({
      message: 'Hello Vunbo',
    }, () => {
      console.log(this.state)
    })

    this.setState((state) => {
      return {
        counter: state.counter + 1,
      }
    }, () => {
      console.log(this.state)
    })
  }

  render() {
    const { message, counter } = this.state
    return (
      <div>
        <h2>{message}-{counter}</h2>
        <button onClick={e => this.handleClick(e)}>Click</button>
      </div>
    )
  }
}

export default App
