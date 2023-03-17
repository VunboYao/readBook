import { memo } from 'react'
import useLocalStorage from './hooks/useLocalStorage'

const App = memo(() => {
  const [token, setToken] = useLocalStorage('token')
  const [url, setUrl] = useLocalStorage('url')

  return (
    <div>
      <h1>App Root: {token}</h1>
      <button onClick={() => setToken(`${Math.random()}`)}>settingToken</button>

      <h2>App Url: {url}</h2>
      <button onClick={() => { setUrl('http://www.baidu.com/') }}>setURL</button>
    </div>
  )
})

export default App
