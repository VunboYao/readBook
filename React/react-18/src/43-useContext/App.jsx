import { memo, useState } from 'react'
// 导入Context, 祖先元素提供Provider
import { ThemeContext, UserContext } from './context'
import Home from './Home'

const App = memo(() => {
  const [user, setUser] = useState({ name: 'yao', age: 30 })
  const [theme, setTheme] = useState({ color: 'red', fontSize: '30px' })

  return (
    <div>
      {/* 传入Provider */}
      <UserContext.Provider value={user}>
        <ThemeContext.Provider value={theme}>
          <h2>Hooks</h2>

          {/* 更改Provider，useContext Hook会触发重新渲染 */}
          <button onClick={() => { setUser({ name: 'Vunbo', age: 32 }) }}>ChangeUser</button>
          <button onClick={() => { setTheme({ color: 'blue', fontSize: '40px' }) }}>ChangeTheme</button>
          <Home/>
        </ThemeContext.Provider>
      </UserContext.Provider>
    </div>
  )
})

export default App
