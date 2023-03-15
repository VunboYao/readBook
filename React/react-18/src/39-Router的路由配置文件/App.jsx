import { NavLink, useRoutes } from 'react-router-dom'
import PropTypes from 'prop-types'
import './style.css'
import withRouter from './hoc/withRouter'
import router from './router'

function App(props) {
  const { navigate } = props.router

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

          {/* !动态路由与Search方式传递参数 函数的方式调用路由跳转 */}
          <button onClick={() => navigate('/category/123')}>分类（func调用）</button>
          <button onClick={() => navigate('/order?name=yao&age=20')}>订单(func调用)</button>
        </nav>

        <main>
          {/* ! router配置表加载 */}
          <h4>路由配置表模式</h4>
          {useRoutes(router)}
        </main>
      </>
  )
}

App.propTypes = {
  router: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

/* !高阶组件，hooks只能在函数中使用 */
export default withRouter(App)
