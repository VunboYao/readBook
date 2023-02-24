import { PureComponent } from 'react'
import { flushSync } from 'react-dom'

class App extends PureComponent {
  state = {
    message: 'Hello React',
    counter: 0,
  }

  componentDidMount() {
    /*
    *
    * 1.网络请求1：banners
    * 2.网络请求2：recommends
    * 3.网络请求3: productList
    *
    * 若批量请求，会导致UI的反复 render
    *  */
  }

  handleClick() {
    /*
    * 在 react18 之前， setTimeOut 中 setState操作，是同步处理
    * 在 react18 之后， setTimeout 中 setState 是异步操作（批量处理）
    *
    * 如果希望在 setTimeout 中是同步处理，需要 react-dom 中的 flushSync 方法
    *  */
    setTimeout(() => {
      flushSync(() => {
        this.setState({
          message: 'Hello Yao',
        })
      })
      // !在外层，只有setState在 flushSync 内部
      console.log(this.state)
    }, 0)
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
