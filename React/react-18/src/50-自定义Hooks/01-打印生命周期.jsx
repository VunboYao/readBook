import { memo, useEffect, useState } from 'react'

function useLogLife(who) {
  useEffect(() => {
    console.log(`${who} created`)
    return () => {
      console.log(`${who} removed`)
    }
    /* !只执行一次 */
  }, [])
}

const Home = memo(() => {
  useLogLife('home')
  return <h1>Home Page</h1>
})

const About = memo(() => {
  useLogLife('about')
  return <h1>About Page</h1>
})

const App = memo(() => {
  const [isShow, setShow] = useState(true)
  const [count, setCount] = useState(0)

  useLogLife('app')

  return (
    <div>
      <h1>App Root {count}</h1>
      <button onClick={() => { setCount(count + 1) }}>+1</button>
      <button onClick={() => { setShow(!isShow) }}>toggle</button>
      {isShow && <Home/>}
      {isShow && <About/>}
    </div>
  )
})

export default App
