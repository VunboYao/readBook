import { memo, useEffect, useLayoutEffect, useState } from 'react'

const App = memo(() => {
  const [count, setCount] = useState(100)
  const [layoutCount, setLayoutCount] = useState(200)

  /* 数据渲染后更改值 */
  useEffect(() => {
    console.log('useEffect')
    if (count === 0) {
      setCount(Math.random() + 99)
    }
  })

  /* 数据渲染前更改值 */
  useLayoutEffect(() => {
    console.log('useLayoutEffect')
    if (layoutCount === 0) {
      setLayoutCount(Math.random() + 99)
    }
  })

  console.log('App render')

  return (
    <div>
      <h2>useEffect: {count}</h2>
      <button onClick={() => { setCount(0) }}>setting0</button>

      <h2>useLayoutEffect: {layoutCount}</h2>
      <button onClick={() => { setLayoutCount(0) }}>settingLayout0</button>
    </div>
  )
})

export default App
