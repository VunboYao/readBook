import { PureComponent } from 'react'
import EventBus from './utils/EventBus'

class HomeBanner extends PureComponent {
  prevClick() {
    EventBus.emit('PREV', 'Vunbo', 18, 30)
  }

  nextClick() {
    EventBus.emit('NEXT', { name: 'Yao', age: 30 })
  }

  render() {
    return (
      <div>
        <h2>HomeBanner</h2>
        <button onClick={e => this.prevClick(e)}>Prev</button>
        <button onClick={e => this.nextClick(e)}>Next</button>
      </div>
    )
  }
}

export default HomeBanner
