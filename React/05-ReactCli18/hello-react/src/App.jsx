import { Component } from 'react'
import { HelloWorld } from './HelloWorld'
import TabContent from './TabContent'
import TabControl from './TabControl'
class App extends Component {
  state = {
    msg: 'Hello React',
    show: true,
    titles: ['流行', '新款', '精选'],
    current: '流行'
  }

  remove() {
    this.setState({
      show: false,
    })
    console.log('remove')
  }

  change(msg) {
    this.setState({
      current: msg
    })
  }

  render() {
    const { titles, current } = this.state
    return (
      <>
        <button onClick={() => this.remove()}>Remove</button>
        {this.state.show && <HelloWorld />}
        <TabControl titles={titles} change={msg => this.change(msg)} />
        <TabContent content={ current } />
      </>
    )
  }
}

export default App
