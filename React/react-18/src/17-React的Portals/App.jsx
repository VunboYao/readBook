import { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import Modal from './Modal'

class App extends PureComponent {
  state = {
    number: 0,
  }

  handleClick() {
    let { number } = this.state
    this.setState({
      number: ++number,
    })
  }

  render() {
    const { number } = this.state
    return (
      // !catch the event bubble of button
      <div onClick={e => this.handleClick(e)}>
        <h2>App root - {number}</h2>

        {/* 1.独立的调用 portal */}
        {
          createPortal(<h2>Yao root</h2>, document.querySelector('#yao'))
        }

        {/* !2.组件调用，尽管 portal 可以被放置在 DOM 树中的任何地方，但在其他方面，其行为和普通的 React 子节点行为一致 */}
        <Modal>
          <h2>modal root</h2>
          <p>there are some text...</p>
          {/* no event, will bubble to parent */}
          <button>ButtonAdd</button>
        </Modal>
      </div>
    )
  }
}

export default App
