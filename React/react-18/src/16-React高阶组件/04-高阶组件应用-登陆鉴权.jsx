import { PureComponent } from 'react'
import Cart from './page/Cart'

class App extends PureComponent {
  state = {
    isLogin: false,
  }

  login() {
    const { isLogin } = this.state
    if (isLogin) {
      localStorage.removeItem('token')
    } else {
      localStorage.setItem('token', 'random123')
    }

    this.setState({
      isLogin: !isLogin,
    })
  }

  render() {
    const { isLogin } = this.state
    return (
      <div>
        <h2>App:</h2>
        <button onClick={e => this.login(e)}>{isLogin ? 'SignOut' : 'Login'}</button>
        <Cart/>
      </div>
    )
  }
}

export default App
