import { PureComponent } from 'react'
import ServerData from './pages/ServerData'
import store from './store'
import './style.css'
import ConnectAbout from './pages/ConnectAbout'
import Home from './pages/Home'
import Profile from './pages/Profile'

class App extends PureComponent {
  state = {
    // counter: store.getState().counter,
    counter: store.getState().CountReducer.counter, // 多个reducer
    age: store.getState().InfoReducer.age,
  }

  // 组件挂载后，执行store订阅，监听数据的改变
  componentDidMount() {
    store.subscribe(() => {
      // const { counter } = store.getState()
      const { counter } = store.getState().CountReducer
      const { age } = store.getState().InfoReducer
      this.setState({
        counter,
        age,
      })
    })
  }

  render() {
    const { counter, age } = this.state
    return (
      <>
        <h2>App Counter: {counter}</h2>
        <h2>App Age: {age}</h2>
        <div className={'pages'}>
          <Home/>
          <Profile/>
          <ConnectAbout/>
          <ServerData/>
        </div>
      </>
    )
  }
}

export default App
