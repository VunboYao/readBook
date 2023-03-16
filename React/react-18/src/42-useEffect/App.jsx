import { memo, useEffect, useState } from 'react'

const App = memo(() => {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('Hello World')

  useEffect(() => {
    console.log('mount: change title')

    // !第二个参数，state数据变化时，才会重新执行该effect
  }, [count])

  useEffect(() => {
    console.log('mount: listening redux')

    return () => {}

    // !如果为[],则只会执行挂载时的一次：没有监听的state变化，则后续都不会执行
  }, [])

  useEffect(() => {
    console.log('mount: something')

    // !若省略第二个参数，每次都会执行
  })

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => { setCount(count + 1) }}>+1</button>
      <button onClick={() => { setMessage(`${Math.random()}`) }}>ChangeMessage({message})</button>
    </div>
  )
})

export default App
