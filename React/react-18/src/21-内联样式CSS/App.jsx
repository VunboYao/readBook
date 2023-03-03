import { PureComponent } from 'react'

class App extends PureComponent {
  state = {
    titleSize: 30,
  }

  addTitleSize() {
    this.setState({
      titleSize: this.state.titleSize + 2,
    })
  }

  render() {
    const { titleSize } = this.state

    return (
      <div>
        <button onClick={e => this.addTitleSize(e)}>AddTitleSize</button>
        <h2 style={{ color: 'red', fontSize: `${titleSize}px` }}>Title</h2>
        <p style={{ color: 'blue', fontSize: '20px' }}>there are some content</p>
      </div>
    )
  }
}

export default App
