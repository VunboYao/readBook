import { PureComponent } from 'react'
import { Navigate } from 'react-router-dom'

class Login extends PureComponent {
  state = {
    isLogin: false,
  }

  login() {
    this.setState({
      isLogin: true,
    })
  }

  render() {
    const { isLogin } = this.state
    return (
      <div>
        <h2>Login Page</h2>
        {
          /*! 登录重定向 */
          isLogin ? <Navigate to={'/home'}/> : <button onClick={() => this.login()}>Login</button>
        }
      </div>
    )
  }
}

export default Login
