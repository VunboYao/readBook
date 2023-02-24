import React, { PureComponent } from 'react'
import Home from './Home'
import EventBus from './utils/EventBus'

class App extends PureComponent {
  state = {
    isShowHome: true,
  }

  // Emit Home's change
  toggleHome() {
    this.setState({ isShowHome: !this.state.isShowHome }, () => {
      console.log('Again Emit PREV', EventBus)

      // listen PREV event change, after home UI change
      EventBus.emit('PREV', 'Vunbo', 18, 30)
    })
  }

  render() {
    const { isShowHome } = this.state
    return (
      <div>
        <button onClick={e => this.toggleHome(e)}>Toggle</button>
        {isShowHome && <Home/>}
      </div>
    )
  }
}

export default App
