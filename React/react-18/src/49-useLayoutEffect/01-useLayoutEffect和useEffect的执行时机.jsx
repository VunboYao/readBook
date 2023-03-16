import { memo, useEffect, useLayoutEffect, useState } from 'react'

const App = memo(() => {
  const [count, setCount] = useState(0)

  // !dom挂载前执行，阻塞DOM的更新
  useLayoutEffect(() => {
    console.log('useLayoutEffect')
  })

  useEffect(() => {
    console.log('useEffect')
  })

  // 优先执行
  console.log('App render')

  return (
    <div>
      <h2>useLayoutEffect: {count}</h2>
      <button onClick={() => { setCount(count + 1) }}>+1</button>
    </div>
  )
})

export default App
