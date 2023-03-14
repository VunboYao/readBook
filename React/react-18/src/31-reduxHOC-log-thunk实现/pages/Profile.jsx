import { PureComponent } from 'react'
import store from '../store'
import { actionSub } from '../store/actions'

class Profile extends PureComponent {
  state = {
    // counter: store.getState().counter,
    counter: store.getState().CountReducer.counter,
  }

  componentDidMount() {
    store.subscribe(() => {
      // const { counter } = store.getState()
      const { counter } = store.getState().CountReducer
      this.setState({
        counter,
      })
    })
  }

  subCounter(counter) {
    store.dispatch(actionSub({ counter }))
  }

  render() {
    const { counter } = this.state
    return (
      <div>
        <h3>Profile Counter: {counter}</h3>
        <button onClick={() => this.subCounter(10)}>-10</button>
        <button onClick={() => this.subCounter(20)}>-20</button>
        <button onClick={() => this.subCounter(30)}>-30</button>
      </div>
    )
  }
}

export default Profile
