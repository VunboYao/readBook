import { memo, useState, useTransition } from 'react'
import namesArray from './namesArray'

const App = memo(() => {
  const [showNames, setShowNames] = useState(namesArray)
  // !返回一个bool值与一个延迟执行的函数
  const [isPending, startTransition] = useTransition()

  function valueChange(e) {
    // !将需要延迟执行的函数放入到该回调中
    startTransition(() => {
      const fileNames = namesArray.filter(item => item.includes(e.target.value))
      setShowNames(fileNames)
    })
  }
  return (
    <div>
      <input type="text" onChange={valueChange}/>
      {/* !useTransition 返回的bool值可以用来显示loading */}
      <h2>NamesList: {isPending && <span>loading...</span>}</h2>
      <ul>
        {
          showNames.map((item) => {
            return <li key={item}>{item}</li>
          })
        }
      </ul>
    </div>
  )
})

export default App
