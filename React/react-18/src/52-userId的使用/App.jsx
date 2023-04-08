import { memo, useId, useState } from 'react'

/* userId是一个用于生成横跨服务端和客户端的稳定的唯一 ID 的同时避免 hydration 不匹配的 hook */
const App = memo(() => {
  const [count, setCount] = useState(0)
  const id = useId()

  console.log(id)

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count + 1: {count}</button>

      <label htmlFor={id}>
        userName: <input id={id} type={'text'}/>
      </label>
    </div>
  )
})

export default App
