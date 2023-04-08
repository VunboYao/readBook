import { memo, useDeferredValue, useState } from 'react'
import namesArray from './namesArray'

const UseDeferredValue = memo(() => {
  const [showNames, setShowNames] = useState(namesArray)

  /* !useDeferredValue接受一个值，并返回该值的新副本，该副本将推迟到更紧急地更新之后。 即等待其他事务先执行。 */
  const deferredShowNames = useDeferredValue(showNames)

  function valueChange(e) {
    const fileNames = namesArray.filter(item => item.includes(e.target.value))
    setShowNames(fileNames)
  }
  return (
    <div>
      <input type="text" onChange={valueChange}/>
      <h2>NamesList: </h2>
      <ul>
        {
          deferredShowNames.map((item) => {
            return <li key={item}>{item}</li>
          })
        }
      </ul>
    </div>
  )
})

export default UseDeferredValue
