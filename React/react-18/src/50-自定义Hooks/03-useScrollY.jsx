import { memo } from 'react'
import './style.css'
import useScrollY from './hooks/useScrollY'

const Home = memo(() => {
  // !从hooks中获取数据
  const scrollY = useScrollY()
  return <h2>Home: {scrollY}</h2>
})

const App = memo(() => {
  return (
    <div className={'wrapper'}>
      <Home/>
    </div>
  )
})

export default App
