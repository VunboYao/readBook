import { PureComponent } from 'react'

class CounterClass extends PureComponent {
  state = {
    counter: 0,
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1,
    })
  }

  decrement() {
    this.setState({
      counter: this.state.counter - 1,
    })
  }

  render() {
    const { counter } = this.state
    return (
      <div className={'inner'}>
        <h2>Class Counter: {counter}</h2>
        <button onClick={() => this.increment()}>+1</button>
        <button onClick={() => this.decrement()}>-1</button>
      </div>
    )
  }
}

export default CounterClass
