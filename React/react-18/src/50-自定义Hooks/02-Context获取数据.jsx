import { memo, useState } from 'react'
import { TokenContext, UserContext } from './context'

// hooks 的处理
import useUserToken from './hooks/useUserToken'

const Home = memo(() => {
  // !从hooks中获取数据
  const [user, token] = useUserToken()
  return <h1>Home Page: {user.name}-{token}</h1>
})

const About = memo(() => {
  const [user, token] = useUserToken()
  return <h1>About Page: {user.name}={token}</h1>
})

const App = memo(() => {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* Provider 的注册 */}
      <UserContext.Provider value={{ name: 'yao', level: 120 }}>
        <TokenContext.Provider value={'nice'}>
          <h1>App Root {count}</h1>
          <button onClick={() => { setCount(count + 1) }}>+1</button>
          <Home/>
          <About/>
        </TokenContext.Provider>
      </UserContext.Provider>
    </div>
  )
})

export default App
