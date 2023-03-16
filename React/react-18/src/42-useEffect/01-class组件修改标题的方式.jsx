import { PureComponent } from 'react'

class App extends PureComponent {
  state = {
    counter: 100,
  }

  componentDidMount() {
    document.title = this.state.counter
  }

  componentDidUpdate() {
    document.title = this.state.counter
  }

  render() {
    const { counter } = this.state
    return (
      <div>
        <h2>App Counter: {counter}</h2>
        <button onClick={() => { this.setState({ counter: counter + 1 }) }}>+1</button>
      </div>
    )
  }
}

export default App
