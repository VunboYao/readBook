import { useState } from 'react'

export default function CounterHook() {
  const [counter, setCounter] = useState(0)

  return (
    <div className={'inner'}>
      <h2>Hook Counter: {counter}</h2>
      <button onClick={() => setCounter(counter + 1)}>+1</button>
      <button onClick={() => setCounter(counter - 1)}>-1</button>
    </div>
  )
}
