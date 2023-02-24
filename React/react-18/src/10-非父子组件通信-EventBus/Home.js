import React, { PureComponent } from 'react'
import HomeBanner from './HomeBanner'
import EventBus from './utils/EventBus'

class Home extends PureComponent {
  handlePrev(...args) {
    console.log(args, 'Prev', this)
  }

  handleNext(...args) {
    console.log(args, 'Next')
  }

  componentDidMount() {
    EventBus.on('PREV', this.handlePrev, this)
    EventBus.on('NEXT', this.handleNext, this)
  }

  componentWillUnmount() {
    EventBus.off('PREV', this.handlePrev)
    EventBus.off('NEXT', this.handleNext)
    console.log('componentWillUnmount')
  }

  render() {
    return (
      <div>
        <h1>Home Component</h1>
        <HomeBanner/>
      </div>
    )
  }
}

export default Home
