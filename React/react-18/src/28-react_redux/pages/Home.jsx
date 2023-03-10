import { PureComponent } from 'react'
import store from '../store'
import { actionAdd } from '../store/actions'

class Home extends PureComponent {
  state = {
    // 从store中获取初始值
    // counter: store.getState().counter,
    counter: store.getState().CountReducer.counter,
  }

  // 组件挂载后，执行store订阅，监听数据的改变
  componentDidMount() {
    store.subscribe(() => {
      const { counter } = store.getState().CountReducer
      this.setState({
        counter,
      })
    })
  }

  addCounter(num) {
    // !触发store的action
    store.dispatch(actionAdd({ counter: num }))
  }

  render() {
    const { counter } = this.state

    return (
      <div>
        <h3>Home Counter: {counter}</h3>
        <button onClick={() => this.addCounter(1)}>+1</button>
        <button onClick={() => this.addCounter(5)}>+5</button>
        <button onClick={() => this.addCounter(10)}>+10</button>
      </div>
    )
  }
}

export default Home
