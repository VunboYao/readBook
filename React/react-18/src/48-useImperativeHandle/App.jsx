import { memo, useRef } from 'react'
import HelloWorld from './HelloWorld'

const App = memo(() => {
  const titleRef = useRef()
  const inputRef = useRef()

  function handleDOM() {
    inputRef.current.focus()

    // 错误操作。可以直接清空用户输入的值
    // inputRef.current.value = ''

    // 使用useImperativeHandler之后，只能使用暴露出来的方法
    inputRef.current.value = ''// !不会执行
    inputRef.current.setValue('Hello Vunbo') // *可以执行
  }
  return (
    <div>
      <h2 ref={titleRef}>Hello</h2>
      <HelloWorld ref={inputRef}/>
      <button onClick={handleDOM}>DOMOperation</button>
    </div>
  )
})

export default App
