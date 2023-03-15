import { PureComponent } from 'react'
import './style.css'
import CounterClass from './CounterClass'
import CounterHook from './CounterHook'

class App extends PureComponent {
  render() {
    return (
      <>
        <h1>React Hooks</h1>
        <div className={'container'}>
          <CounterClass/>
          <CounterHook/>
        </div>
      </>
    )
  }
}

export default App
