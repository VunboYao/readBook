import { Component } from 'react'
import { HelloWorld } from './HelloWorld'
class App extends Component {
  state = {
    msg: 'Hello React',
    show: true,
  }

  remove() {
    this.setState({
      show: false,
    })
    console.log('remove')
  }

  render() {
    return (
      <>
        <button onClick={() => this.remove()}>Remove</button>
        {this.state.show && <HelloWorld/>}
      </>
    )
  }
}

export default App
