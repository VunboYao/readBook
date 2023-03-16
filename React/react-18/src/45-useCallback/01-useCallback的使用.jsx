import { memo, useCallback, useState } from 'react'
import PropTypes from 'prop-types'

// !useCallback性能优化的点
// 当需要将一个函数传递给子组件时，最好使用useCallback进行优化，将优化之后的函数传递给子组件

// 子组件
/*
! 当props中的属性发生变更时，组件本身会被重新渲染
* */
const MyHome = memo((props) => {
  const { increment } = props

  console.log('MyHome render')

  return (
    <div>
      <button onClick={increment}>Increment+1</button>
    </div>
  )
})
MyHome.propTypes = {
  increment: PropTypes.func,
}

const App = memo(() => {
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState('hello')

  // !普通的函数
  // const increment = () => { setCount(count + 1) }

  const increment = useCallback(() => {
    setCount(count + 1)
    /*
    ! 闭包陷阱 useCallback，这里是保持increment的引用不变
    * 1.第二个参数不传时，每次都会更新，同useEffect
    * 2.传入监听的state,数据变更时，increment函数的引用才会更新.(此时，当下边msg变更时，MyHome子组件不会再渲染）
    * */
  }, [count])

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+1</button>
      <MyHome increment={increment}/>

      <h2>msg: {msg}</h2>
      <button onClick={() => { setMsg(`${Math.random()}`) }}>ChangeMsg</button>
    </div>
  )
})

export default App
