import { PureComponent } from 'react'
import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import './style.css'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import NotFound404 from './pages/NotFound404'

class App extends PureComponent {
  render() {
    return (
      <>
        <h1>
          Hello React Router6
        </h1>

        <nav>
          {/* !定义style：返回一个对象 */}
          <NavLink
            style={({ isActive }) => ({ color: isActive ? 'green' : '' })}
            to={'/home'}
          >首页</NavLink>

          {/* !自定义类名 */}
          <NavLink
            className={({ isActive }) => (isActive ? 'aboutState' : '')}
            to={'/about'}>关于</NavLink>

          {/* ! children的方式 */}
          <NavLink to={'/login'}>
            {
              ({ isActive }) => (
                <span className={isActive ? 'loginState' : ''}>Login</span>
              )
            }
          </NavLink>

          <Link to={'/error-path'}>404界面</Link>
        </nav>
        <main>

          {/* 包裹所有的 Route */}
          <Routes>
            {/* !重定向到home */}
            <Route path="/" element={<Navigate to="/home"/>} />

            {/* path：设置匹配的路径 element：渲染的组件 */}
            <Route path="/home" element={<Home/>}/>
            <Route path={'/about'} element={<About/>}/>

            {/* !登陆后重定向回 home */}
            <Route path={'/login'} element={<Login/>} />

            {/* !404 */}
            <Route path="*" element={<NotFound404/>}/>
          </Routes>
        </main>
      </>
    )
  }
}

export default App
