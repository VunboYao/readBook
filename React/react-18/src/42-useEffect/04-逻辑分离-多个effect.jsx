import { memo, useEffect, useState } from 'react'

const App = memo(() => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('mount: first')
  })

  useEffect(() => {
    console.log('mount: second')

    return () => {
      console.log('cancel: second')
    }
  })

  useEffect(() => {
    console.log('mount: third')
    return () => {
      console.log('cancel: third')
    }
  })

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => { setCount(count + 1) }}>+1</button>
    </div>
  )
})

export default App
