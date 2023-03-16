import { memo, useEffect, useState } from 'react'

const App = memo(() => {
  const [count, setCounter] = useState(200)

  useEffect(() => {
    /*
    * 当前传入的回调函数会在组件被渲染完成后，自动执行
    * 可以在此执行：网络请求/DOM操作/事件监听等
    ! 在此可以执行任何带副作用操作
    * */
    document.title = count
  })

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCounter(count + 1)}>+1</button>
    </div>
  )
})

export default App
