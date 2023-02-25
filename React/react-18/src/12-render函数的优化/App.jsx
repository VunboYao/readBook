import { PureComponent } from 'react'
import About from './About'
import FuncMemo from './FuncMemo'
import Home from './Home'

// !PureComponent 是浅层比较
/*
* 原理：
* 1.继承自 PureComponent 的 class 原型上会有 isPureReactComponent 属性
* 2.判断该属性，则内部会执行 shallowEqual 方法。 先state => 再内部属性
*  */
class App extends PureComponent {
  state = {
    message: 'Hello React',
    counter: 0,
  }

  changeText() {
    this.setState({ message: 'Hello World' })

    // ! Component下，设置相同的属性，触发state改变，依旧会触发render
    // this.setState({ message: 'Hello React' })
  }

  increment() {
    const { counter } = this.state
    this.setState({ counter: counter + 1 })
  }

  /* shouldComponentUpdate(nextProps, nextState) {
    // 手动拦截，数据如果没有更改，是否需要更新
    if (this.state.message !== nextState.message || this.state.counter !== nextState.counter) {
      return true
    } else {
      return false
    }
  } */

  render() {
    console.log('App Render')
    const { counter, message } = this.state
    return (
      <div>
        <h2>App-{message}-{counter}</h2>
        <button onClick={e => this.changeText(e)}>ChangeText</button>
        <button onClick={e => this.increment(e)}>Counter+1</button>
        <Home message={message}/>
        <About counter={counter}/>
        {/* func component */}
        <FuncMemo memo={message}/>
      </div>
    )
  }
}

export default App
