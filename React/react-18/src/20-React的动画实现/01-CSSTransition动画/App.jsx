import { PureComponent, createRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import './style.css'

class App extends PureComponent {
  state = {
    isShow: true,
  }

  nodeRef = createRef()

  handleToggle() {
    this.setState({
      isShow: !this.state.isShow,
    })
  }

  render() {
    const { isShow } = this.state

    return (
      <div>
        <button onClick={() => this.handleToggle()}>Toggle</button>

        <CSSTransition
          nodeRef={this.nodeRef}
          in={isShow}
          timeout={2000}
          classNames={'yao'}
          unmountOnExit={true}
          appear
          onEnter={() => console.log('animation Start')}
          onEntering={() => console.log('animation Entering')}
          onEntered={() => console.log('animation Entered')}
          onExit={() => console.log('animation Exit')}
          onExiting={() => console.log('animation Exiting')}
          onExited={() => console.log('animation Exited')}
        >
          <div ref={this.nodeRef}>
            <h2>App Page</h2>
            <p>there are some content</p>
          </div>
        </CSSTransition>
      </div>
    )
  }
}

export default App
