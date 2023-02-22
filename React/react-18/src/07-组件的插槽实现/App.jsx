import React, { Component } from 'react'
import SlotChildren from './slot-children'
import SlotProps from './slot-props'
class App extends Component {
  render() {
    const btn = <button>Button2</button>

    return (
      <div>
      {/*  slot: children */}
        <SlotChildren>
          <button>Button</button>
          <h2>Hello</h2>
          <i>React</i>
        </SlotChildren>

      {/*   slot: props */}
      <SlotProps
        leftSlot={btn}
        centerSlot={<h2>Hey</h2>}
        rightSlot={<i>Boy</i>}
      />
      </div>
    )
  }
}

export default App
