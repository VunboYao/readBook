import { memo, useEffect, useState } from 'react'

const App = memo(() => {
  const [count, setCounter] = useState(0)

  // !负责告知react, 在执行完当前组件渲染之后，要执行的副作用代码
  useEffect(() => {
    /*
    * 当前传入的回调函数会在组件被渲染完成后，自动执行
    * 可以在此执行：网络请求/DOM操作/事件监听等
    ! 在此可以执行任何带副作用操作
    * */

    // componentDidMount
    console.log('listening some change of data')

    // !返回值：回调函数 => 组件被重新渲染或组件卸载的时候执行
    return () => {
      // 约等于 componentWillUnmount
      console.log('cancel some thing, eg: event listening, timeout...')
    }
  })

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCounter(count + 1)}>+1</button>
    </div>
  )
})

export default App
