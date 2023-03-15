import { PureComponent } from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import PropTypes from 'prop-types'
import './style.css'
import Category from './pages/Category'
import Order from './pages/Order'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import NotFound404 from './pages/NotFound404'
import HomeRecommend from './pages/HomeRecommend'
import HomeRanking from './pages/HomeRanking'
import HomeSongList from './pages/HomeSongList'
import withRouter from './hooks/withRouter'

class App extends PureComponent {
  static propTypes = {
    router: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  }

  render() {
    const { navigate } = this.props.router
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

          <NavLink to={'/error-path'}>404界面</NavLink>

          <button onClick={() => navigate('/category')}>分类（func调用）</button>
          <button onClick={() => navigate('/order')}>订单(func调用)</button>
        </nav>
        <main>
          {/* 包裹所有的 Route */}
          <Routes>
            {/* !重定向到home */}
            <Route path="/" element={<Navigate to="/home"/>} />

            {/* path：设置匹配的路径 element：渲染的组件 */}
            <Route path="/home" element={<Home/>}>
              {/* !嵌套路由 */}
              {/* !重定向到子页面 */}
              <Route path={'/home'} element={<Navigate to={'recommend'}/>}/>
              <Route path={'recommend'} element={<HomeRecommend/>}/>
              <Route path={'ranking'} element={<HomeRanking/>}/>
              <Route path={'songList'} element={<HomeSongList/>}/>
            </Route>

            <Route path={'/about'} element={<About/>}/>

            {/* !登陆后重定向回 home */}
            <Route path={'/login'} element={<Login/>} />

            <Route path={'/category'} element={<Category/>}/>
            <Route path={'/order'} element={<Order/>}/>

            {/* !404 */}
            <Route path="*" element={<NotFound404/>}/>
          </Routes>
        </main>
      </>
    )
  }
}

/* !高阶组件，hooks只能在函数中使用 */
export default withRouter(App)
