import { PureComponent } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './style.css'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'

class App extends PureComponent {
  render() {
    return (
      <>
        <h1>
          Hello React Router6
        </h1>

        {/* link：to属性设置跳转的路径 */}
        <nav>
          <Link to={'/home'}>首页</Link>
          <Link to={'/about'}>关于</Link>
          <Link to={'/login'}>登录</Link>
        </nav>
        <main>

          {/* 包裹所有的 Route */}
          <Routes>
            {/* path：设置匹配的路径 element：渲染的组件 */}
            <Route path="/home" element={<Home/>}/>
            <Route path={'/about'} element={<About/>}></Route>
            <Route path={'/login'} element={<Login/>}></Route>
          </Routes>
        </main>
      </>
    )
  }
}

export default App
