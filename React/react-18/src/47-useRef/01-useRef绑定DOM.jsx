import { memo, useRef } from 'react'

const App = memo(() => {
  const titleRef = useRef()
  const inputRef = useRef()

  function showTitleDom() {
    console.log(titleRef.current)
    inputRef.current.focus()
  }

  return (
    <div>
      <h2 ref={titleRef}>Hello World</h2>
      <input type="text" ref={inputRef}/>
      <button onClick={showTitleDom}>ShowTitleDOM</button>
    </div>
  )
})

export default App
