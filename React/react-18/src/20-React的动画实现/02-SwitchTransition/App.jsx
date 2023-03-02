import { PureComponent, createRef } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import './style.css'

class App extends PureComponent {
  state = {
    isLogin: true,
  }

  nodeRef = createRef()

  handleClick() {
    this.setState({
      isLogin: !this.state.isLogin,
    })
  }

  render() {
    const { isLogin } = this.state

    return (
      <div>
        <SwitchTransition mode="out-in">
          {/* !key属性 */}
          <CSSTransition
            key={isLogin ? 'login' : 'exit'}
            timeout={1000}
            nodeRef={this.nodeRef}
            classNames={'login'}
          >
            <button
              ref={this.nodeRef}
              onClick={() => this.handleClick()}
            >
              {isLogin ? 'Login' : 'Sign out'}
            </button>
          </CSSTransition>
        </SwitchTransition>
      </div>
    )
  }
}

export default App
