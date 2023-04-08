import ReactDOM from 'react-dom/client'
// import { StrictMode, Suspense } from 'react'

/* !基础阶段 */
// import App from './01-类组件和函数组件/App_func'
// import App from './02-组件生命周期函数/App'
// import App from './03-组件开发嵌套关系/App'
// import App from './04-组件通信-父传子/App'
// import App from './05-组件通信-子传父/App'
// import App from './06-组件通信案例练习/App'
// import App from './07-组件的插槽实现/App'
// import App from './08-组件作用域插槽/App'
// import App from './09-非父子通信-Context/App'
// import App from './10-非父子组件通信-EventBus/App'
// import App from './11-setState详细使用/App'
// import App from './12-render函数的优化/App'
// import App from './13-数据不可变力量/App'
// import App from './14-ref获取DOM和组件/03-ref获取函数组件的DOM'
// import App from './15-受控和非受控组件/07-非受控组件的数据获取'
// import App from './16-React高阶组件HOC/05-高阶组件应用-生命周期'
// import App from './17-React的Portals/App'
// import App from './18-React的Fragments/App'
// import App from './19-React的严格模式/App'

/* ! css动画阶段 */
// import App from './20-React的动画实现/01-CSSTransition动画/App'
// import App from './20-React的动画实现/02-SwitchTransition/App'
// import App from './20-React的动画实现/03-TransitionGroup/App'
// import App from './21-内联样式CSS/App'
// import App from './22-普通的CSS写法/App'
// import App from './23-CSS_Modules/App'
// import App from './24-Less编写的方式/App'
// import App from './25-CSS-in-JS/App'
// import App from './26-classNames/App'

/* !redux阶段 */
// import { Provider } from 'react-redux'
// import App from './28-react_redux/App'
// import store from './28-react_redux/store' // !引入store挂载给子元素
// import App from './29-react_reduxToolkit/App'
// import store from './29-react_reduxToolkit/store'
// import App from './30-Connect的实现/App'
// import store from './30-Connect的实现/store'
// import { StoreContext } from './30-Connect的实现/HOC' // 自定义redux的store.Provider实现
// import App from './31-reduxHOC-log-thunk实现/App'
// import store from './31-reduxHOC-log-thunk实现/store'

/* !Router 阶段 */
// import { HashRouter } from 'react-router-dom'
// import App from './32-Router的基本使用/App'
// import App from './33-Router的NavLink/App'
// import App from './34-Router的Navigate/App'
// import App from './35-Router的404界面/App'
// import App from './36-Router的嵌套路由/App'
// import App from './37-Router的函数式跳转/App'
// import App from './38-Router传递参数的两种方式/App'
// import App from './39-Router的路由配置文件/App'
// import App from './40-router的异步加载路由/App'

/* !Hooks 阶段 */
// import App from './41-useState/App'
// import App from './42-useEffect/App'
// import App from './43-useContext/App'
// import App from './44-useReducer/App'
// import App from './45-useCallback/App'
// import App from './46-useMemo/App'
// import App from './47-useRef/App'
// import App from './48-useImperativeHandle/App'
// import App from './49-useLayoutEffect/App'
// import App from './50-自定义Hooks/App'
// import App from './52-userId的使用/App'
import UseDeferredValue from './53-useTransition与useDeferredValue/useDeferredValue'

/* !Redux Hooks */
// import { Provider } from 'react-redux'
// import App from './51-redux中的hooks/App'
// import store from './51-redux中的hooks/store'

// 严格模式
/* const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    {/!* <StoreContext.Provider value={store}> *!/}
    {/!* <Provider store={store}> *!/}
    <Suspense fallback={<div>loading</div>}>
      <HashRouter>
        <App />
      </HashRouter>
    </Suspense>

    {/!* </Provider> *!/}
    {/!* </StoreContext.Provider> *!/}
  </StrictMode>,
) */

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <Provider store={store}>
      <UseDeferredValue />,
  // </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
