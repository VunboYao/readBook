## 1. React开发的三个依赖包是什么？分别有什么作用？

- React: 包含react所必须的核心代码
- React-DOM: react渲染在不同平台所需要的核心代码
- Babel：将jsx转换成 react代码的工具

## 2. React如何封装组件，组件里面包含哪些内容？

- 函数组件：接收唯一带数据的props对象，并返回一个React元素
- class组件：类名大写，继承自React.Component，必须有一个render方法，返回一个React元素

## 3. 在进行函数绑定时，如何进行this关键字的绑定？

- 函数调用时，通过bind绑定this
- 函数声明时，使用箭头函数
- 通过在构造函数中，手动通过bind的方式来修改监听方法中的this
- 事件绑定时，手动绑定一个箭头函数，再通过箭头函数的函数体手动调用监听的方法

## 4. React如何进行列表数据的展示？回顾数组的常见高阶函数

- map、for方法拼接DOM
- map表达式

常见的高阶函数

- map
- filter
- some
- every
- forEach
- slice
- Splice

## 5. JSX如何绑定数据？如何绑定内容、属性，有哪些规则？

- `属性/内容=${value}`
- 规则
  - 定义虚拟DOM时，不要写引号
  - 标签中混入JS表达式时要用{}
  - 样式的类名指定用className
  - style内联样式，要用 style={{key:value}}的形式
  - 只有一个根标签
  - 标签语法必须闭合或者自闭和

## 6. JSX 绑定事件，this绑定有哪些规则？如何给函数传递参数？

- 普通绑定 - `onClick={this.btnClick}` - 在内部是独立函数调用,所以this为undefined

- 函数调用时，通过bind绑定this：`onClick={this.HandleClick.bind(this)}`
- 函数声明时，使用箭头函数:`onClick={this.HandleClick}`,`HandleClick=() => {}`
- 通过在构造函数中，手动通过bind的方式来修改this:`this.HandleClick=this.HandleClick.bind(this)`
- 事件绑定时，手动绑定一个箭头函数:`onClick={() => this.HandleClick()}`

如何传递参数：

- event参数的传递：`onClick={event => this.HandleClick(event)}`
- 额外参数的传递：`onClick={event => this.HandleClick(event, 'http', 18)}`

## 7. JSX的代码是如何被编译为React代码的？它的本质是进行什么操作？

- 通过babel进行转换
- 本质是React.createElement(component, props, ...children)函数的语法糖

## 8. 什么是虚拟DOM？虚拟DOM在React中起到什么作用？

以js对象的方式创建描述DOM树的结构，这个对象树称为虚拟DOM

- 虚拟DOM diff
- 跨平台渲染
- 声明式编程
  - 只需要告诉React希望让UI是什么状态
  - React来确保DOM和状态状态是匹配的
  - 不需要直接进行DOM操作，就可以从手动更改DOM、属性操作、事件处理中解放出来


## 9. React组件可以如何划分？分别有哪些不同的概念？

- 根据组件定义方式：函数组件和类组件
- 根据组件内部是否有状态需要维护：无状态组件和有状态组件
- 组件的不同职责：展示型组件和容器型组件

函数组件、无状态组件、展示型组件主要关注UI的展示

类组件、有状态组件、容器型组件主要关注数据逻辑

## 10. React 重要的生命周期有哪些？分别列出它们的作用

- componentDidMount:组件已经挂载
- componentDidUpdate: 组件已更新
- componentWillUnmount: 组件即将被移除
- Constructor: 初始化内部的state，为事件绑定this
- getDerivedStateFromProps: state的值源于props时使用，返回一个对象来更新state
- getSnapshotBeforeUpdate: React更新DOM之前回调的一个函数，可以获取DOM更新前的一些信息
- shouldComponentUpdate: 性能优化，是否需要更新

## 11. React 中如何实现组件间的通信？父传子？子传父？

- 父组件：**通过属性=值**的形式传递给子组件
- 子组件通过**props**参数来获取父组件传递过来的数据
- 父传子，通过props传递
- 子传父，**通过props传递一个函数给子组件，子组件调用传递过来的方法，并将参数传入**，实现子传父的功能。

## 12. React 中有插槽的概念吗？如果没有，如何实现插槽的效果？

- 组件通过props的children属性实现插槽，但如果只传递一个插槽，则不适用
- props属性传递React元素，通过将需要插入的元素转换为react元素，以props属性的方式传入

## 13. 非父子组件的通信有哪些方式？分别有什么作用？

- Context, 顶级标签赋值，后续子孙元素可以直接获取value
  - 创建context
  - 在需要使用的组件，导入context
  - 使用<context.Provider>包裹后代组件
  - 1.在需要使用的后代组件引入context
    - xxx.contextType = context
    - 在render方法中可以通过this.context拿到传递过来的值
  - 2.通过<context.Consumer>可以从不同的context中获取数据，函数中获取Provider的数据.通过**value**拿到值
- EventBus
- Redux

## 14. React 的 setState 是同步的还是异步的？ React18中是怎么样的？

- 异步，批量更新
- setTimeout和原生DOM事件中，是同步的
- React18中，是异步。如果希望同步拿到，需要使用flushSync操作

## 15. 什么是 SCU优化？类组件和函数组件分别如何进行SCU的优化？

- 通过shouldComponentUpdate生命周期监测，比对数据是否需要更新，进而触发render的重新渲染
- 类组件：PureComponent组件
- 函数组件：Memo高阶函数调用

## 16. React为什么要强调不可变的力量？如何实现不可变的力量？

- 保证setState赋值新数据时能够触发render的重新渲染
- 针对数组、对象等数据操作时，应该赋值一个新的对象来操作，不能保持引用地址相同
- 通常使用`...扩展运算符`拷贝，并在新的对象上进行操作

## 17. React中获取DOM的方式有哪些？

- ref字符串形式，已废弃

- createRef方法创建，**current**获取value

  ```jsx
  yaoRef = createRef()
  ...
  ...
  <h2 ref={this.yaoRef}>CreateRef</h2>
  ```

- 回调函数形式

  ```jsx
  callbackRef = null
  ...
  <h2 ref={el => { this.callbackRef = el }}>回调函数形式</h2>
  ```

- 函数中通过`forwardRef(props, ref)方法`

## 18. 什么是受控组件和非受控组件，如何使用？

- input类标签使用了state中的数据，则是受控组件，即唯一数据来源是state中的数据

- 数据来源非state中的数据时，则是非受控组件

## 19. 什么是高阶组件？高阶组件在React开发中起到什么作用？

高阶函数HOC

- 接受一个或多个函数作为输入
- 输出一个函数
- 即高阶组件是参数为组件，返回值为新组件的函数

作用

- 应用增强
- 统一管理公共部分数据

## 20. 什么是Fragment，有什么作用？

- 代码片段，包裹一段代码，无须每次使用div进行包括，减少一层代码嵌套
- 如果需要在Fragment中使用key, 那么就不能使用短语法`<></>`

## 21. 什么是React的严格模式，在开发中有什么作用？

严格模式

- 与Fragment一样，StrictMode不会渲染任何可见的UI
- 为其后代元素触发额外的检查和警告
- 严格模式检查仅在开发模式下运行，不会影响生产构建

作用

- 过期的API、生命周期检测
- 生命周期中逻辑错误检测
- 检测废弃的findDOMNode方法
- 检测过时的contextAPI

## 22. React中如何实现过渡动画？常见的过渡动画组件有哪些？

react-transition-group组件

- CSSTransition
- SwitchTransition
- TransitionGroup

## 23. React中编写CSS的方式有哪些？各自有什么优缺点？

- 内联CSS：编写规则需要小驼峰；代码混乱
- 普通的CSS：全局混乱
- CSS_Modules：繁琐，命名不能使用连接符(-),必须是style.className的方式使用，不能动态修改某些样式
- CSS_in_JS: 便捷

## 24. styled-components 有哪些技术特点？可以完成哪些功能？

技术特点：

- 使用ES6模版字符串的语法
- 本质最终通过函数的调用，创建出一个组件，并自动添加一个不重复的class

功能

- 直接子代选择器或后代选择器，并且直接编写样式
- 可以通过&符号获取当前元素
- 直接编写伪类、伪元素等
- 可以传递props、attrs属性
- 支持样式的继承

## 25. 什么是 redux？ redux的核心思想是什么？核心的原则有哪些？

Redux是一个状态管理容器，帮助我们管理State的容器，提供了可预测的状态管理

**核心思想**

- store：

- action: 所有的数据变化，必须通过**派发(dispatch)action来更新**；action是一个普通的JavaScript对象，用来描述这次更新的**type和data**。action通常定义为一个函数，并返回一个action
- reducer: 将state与action联系在一起。reducer是一个纯函数，将传入的state和action结合起来生成一个新的state

**核心原则**

- 单一数据来源
- State是只读的，只能通过action来修改
- 纯函数，reducer将state与actions联系在一起，返回一个新的State

![image-20230317114913619](/Users/vunboyao/Desktop/Github/readBook/docs/React/React%E5%A4%8D%E4%B9%A0%E8%AE%B0%E5%BD%95%E7%82%B9.assets/image-20230317114913619.png)

## 26. redux如何命名文件，每个文件是什么作用？

- store/index.js，建立store

- Store/reducerjs，根据action，处理state，生成新的state

- Store/action.js，action管理

- store/constant.js，常量声明

  ![image-20230317115848097](/Users/vunboyao/Desktop/Github/readBook/docs/React/React%E5%A4%8D%E4%B9%A0%E8%AE%B0%E5%BD%95%E7%82%B9.assets/image-20230317115848097.png)

## 27. redux如何和react结合在一起？如何共享数据，如何进行action操作？

- `npm install react-redux`

- 入口文件index.js，注册store

  ```jsx
  import { Provider } from 'react-redux'
  import store from '../store'
  
  <Provider store={store}>
    <App/>
  </Provider>
  ```

- 创建store/index.js

  ```jsx
  // 中间件处理扩展, combineReducers合并reducer
  import { applyMiddleware, combineReducers, createStore } from 'redux'
  // 处理异步action
  import thunk from 'redux-thunk'
  
  import { composeWithDevTools } from 'redux-devtools-extension'
  import CountReducer from './reducer'
  import InfoReducer from './reducerName'
  
  // 合并reducer并创建store，应用异步action处理的中间件
  export default createStore(combineReducers({
    CountReducer,
    InfoReducer,
  }), composeWithDevTools(applyMiddleware(thunk)))
  ```

- 创建store/reducer.js

  ```js
  import { ADD_NUMBER, CHANGE_BANNERS, CHANGE_RECOMMENDS, SUB_NUMBER } from './constant'
  
  const initialState = {
    counter: 100,
  
    banners: [],
    recommends: [],
  }
  
  export default function(state = initialState, action) {
    const { type, data } = action
    switch (type) {
      case ADD_NUMBER:
        // ! action 传递过来的 data 是一个对象
        return { ...state, counter: state.counter + data.counter }
      case SUB_NUMBER:
        return { ...state, counter: state.counter - data.counter }
      case CHANGE_BANNERS:
        return { ...state, banners: data.banners }
      case CHANGE_RECOMMENDS:
        return { ...state, recommends: data.recommends }
      default:
        return state
    }
  }
  ```

- 创建store/action.js

  ```js
  import axios from 'axios'
  import { ADD_NUMBER, CHANGE_AGE, CHANGE_BANNERS, CHANGE_RECOMMENDS, SUB_NUMBER } from './constant'
  
  export const actionAdd = data => ({ type: ADD_NUMBER, data })
  export const actionSub = data => ({ type: SUB_NUMBER, data })
  
  export const actionBanner = data => ({ type: CHANGE_BANNERS, data })
  export const actionRecommend = data => ({ type: CHANGE_RECOMMENDS, data })
  
  export const actionAge = data => ({ type: CHANGE_AGE, data })
  
  // !异步 action
  export const actionAsync = () => {
    return function(dispatch, getState) {
      console.log('异步action的默认参数：', dispatch, getState())
  
      // 异步操作: 网络请求
      axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
        const banners = res.data.data.banner.list
        const recommends = res.data.data.recommend.list
  
        dispatch(actionBanner({ banners }))
        dispatch(actionRecommend({ recommends }))
      })
    }
  }
  ```

- 连接redux到page中

  ```jsx
  import {connect} from 'react-redux'
  
  // 映射state数据到props中
  const mapStateToProps = state => ({
    counter: state.CountReducer.counter,
  })
  
  // 映射action方法到props中
  const mapDispatchToProps = dispatch => ({
    ADD: counter => dispatch(actionAdd({ counter })),
    SUB: counter => dispatch(actionSub({ counter })),
  })
  
  // 通过高阶函数进行包裹
  export default connect(mapStateToProps, mapDispatchToProps)(ConnectAbout)
  ```

## 28.redux中如何进行异步的操作？和同步操作有什么区别？

- 通过中间件
  - redux-thunk
  - redux-sage

- redux中的同步操作
  - 执行dispatch函数之后，对应的reducer函数会在收到action对象后立即得到执行，reducer执行完成之后，state立即就改变了。此时 store.getState()能取到最新的值
- redux的异步操作
  - 通过第三方中间件处理
  - dispatch在派发一个异步函数时，目标state不会立即响应，需要监听异步函数内部的结果，待成功返回后，触发action，决定state的响应

## 29.redux中如何进行reducer的拆分？拆分的原理和本质是什么？

- 主要利用模块化的思想，将不同的数据拆分到不同的模块
- 每一个模块都有自己的目录结构
  - Reducer: 接收action对象，返回最新的state
  - Constants: 定义常量名称
  - action: 定义创建action对象的函数
  - index: 导出reducer
- store中的index文件
  - 导出reducer，导出store实例

- **combineReducers实现原理**

  ```jsx
  function reducer(state = {}, action) {
    // 返回一个对象，stroe的state
    return {
      counter: counterReducer(state.counter, action),
      home: homeReducer(state.home, action),
      user: userReducer(state.user, action)
    }
  }
  ```

## 30.什么是Redux Toolkit？核心的API有哪些？说出它们的作用？

**安装**
`npm install @reduxjs/toolkit react-redux`

- configureStore: 
  - 包装createStore以提供简化的配置选项和良好的默认值。
  - 可以自动组合你的sliceReducer,添加你提供的任何 Redux 中间件，
  - 默认包含 redux-thunk，以及启动了DevExtension
- createSlice: 
  - 接收reducer函数的对象
  - 名称
  - 初始状态值
  - 自动生成reducer，以及对应的actions
- createAsyncThunk：
  - 接收一个action的type字符串和一个返回Promise的函数。
  - 并生成一个pending/fulfilled/rejected派发的thunk函数

**使用步骤**

- 入口index.js中store的注册

  ```jsx
  import { Provider } from 'react-redux'
  import stroe from './reduxToolkit/store'
  
  <Provider store={store}>
    <App/>
  </Provider>
  ```

- store/index.js，根据configureStore配置reducer

  ```jsx
  import { configureStore } from '@reduxjs/toolkit'
  
  import counter from './features/counter'
  import home from './features/home'
  
  export default configureStore({
    reducer: {
      counter,
      home,
    },
  })
  ```

- Store/reducer.js, 根据createSlice配置

  ```jsx
  import { createSlice } from '@reduxjs/toolkit'
  
  const counterSlice = createSlice({
    name: 'counter',
    initialState: {
      value: 888,
    },
    reducers: {
      addNumber(state, { payload }) {
        state.value = state.value + payload
      },
      subNumber(state, { payload }) {
        state.value = state.value - payload
      },
    },
  })
  
  // 默认导出 reducer
  export default counterSlice.reducer
  
  // 导出actions
  export const { addNumber, subNumber } = counterSlice.actions
  ```

- store/reducer.js, 异步action处理

  ```jsx
  import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
  import axios from 'axios'
  
  // !define async func
  export const asyncData = createAsyncThunk('home/asyncData', async() => {
    const res = await axios.get('http://123.207.32.32:8000/home/multidata')
    return res.data
  })
  
  export const homeReducer = createSlice({
    name: 'home',
    initialState: {
      banners: [],
      recommends: [],
    },
    reducers: {},
    // !2. async reducer define
    extraReducers: {
      /* [asyncData.pending](state, action) {
        console.log('pending', state, action)
      }, */
      [asyncData.fulfilled](state, action) {
        state.banners = action.payload.data.banner.list
        state.recommends = action.payload.data.recommend.list
      },
      /*  [asyncData.rejected](state, action) {
        console.log('rejected', state, action)
      }, */
    },
    // 链式调用
    /*  extraReducers: (builder) => {
      builder.addCase(asyncData.pending, (state, action) => {
        console.log('asyncData pending', action, state)
      }).addCase(asyncData.fulfilled, (state, { payload }) => {
        state.banners = payload.data.banner.list
        state.recommends = payload.data.recommend.list
      })
    }, */
  })
  
  export default homeReducer.reducer
  export const { changeBanners, changeRecommends } = homeReducer.actions
  
  // !func 内部提交
  /* export const asyncData = createAsyncThunk('home/asyncData', async(extraInfo, { dispatch }) => {
    console.log(extraInfo)
    const res = await axios.get('http://123.207.32.32:8000/home/multidata')
    const banners = res.data.data.banner.list
    const recommends = res.data.data.recommend.list
  
    dispatch(changeBanners(banners))
    dispatch(changeRecommends(recommends))
  }) */
  ```

- 页面注入同react-redux无变化，但action的引入需要从reducer.js中获取

## 31.React Router6的基本创建过程是什么？进行步骤总结

- `npm install react-router-dom`

- 入口文件index.js，选择路由模式：BrowserRouter, HashRouter

  ```jsx
  <HashRotuer>
    <App/>
  </HashRotuer>
  ```

- 通过Routes包裹所有的Route, 进行路由匹配
- Route用于路径的匹配
  - path属性：用于设置匹配到的路径
  - element属性：设置匹配到路径后，需要渲染的组件. Route5使用的是 component 属性
- 路由跳转
  - Link组件与NavLink组件
  - to属性，用于设置跳转到的路径
- 重定向组件： Navigate
- Not Found 页面配置 path=“*”

```jsx
<Link to="/home">首页</Link>
<Link to="/about">关于</Link>
<Routes>
    <Route path="/" element={<Navigate to="/home" />} />
    {/**Home页面*/}
    <Route path="/home" element={<Home />}>
      <Route path="/home" element={<Navigate to="/home/homebanner" />} />
      <Route path="/home/homebanner" element={<HomeBanner />} />
      <Route path="/home/homerecommend" element={<HomeRecommend />} />
    </Route>
    <Route path="/about" element={<About />}></Route>
    <Route path="*" element={<NotFount />}></Route>
</Routes>
```

## 32.React Router6的路由嵌套如何配置？Outlet的作用是什么？

```jsx
<div>
  <h2>Home Page</h2>
  <div className="nav">
    <Link to={'recommend'}>Recommend</Link>
    <Link to={'ranking'}>ranking</Link>
    <Link to={'songList'}>songList</Link>
  </div>

  {/* !router-view： 占位符 */}
  <div style={{ textAlign: 'center' }}>
    <h3>Home子页面</h3>
    <Outlet/>
  </div>
</div>
```

## 33.React Router6如何传递参数？如何在组件中获取参数？

- 动态路由的方式

  ```jsx
  <Link to="/user/9978">用户</Link>
  <Route path="/user/:id" element={<User />}></Route>
  ```

- search传递参数

  ```jsx
  <Link to="/user?name=大大怪将军&age=19"">用户</Link>
  ```

- 路由参数的获取, 高阶组件包装

  ```jsx
  import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
  
  export default function withRouter(WrapperComponent) {
    /* !函数组件,参数是 props */
    return (props) => {
      /* Hooks必须在函数内部声明 */
      const navigate = useNavigate()
  
      /* 动态路由获取参数 */
      const params = useParams()
  
      // 当前路径的相关信息
      const location = useLocation()
  
      /* 查询字符串的参数获取 */
      const [searchParams] = useSearchParams()
      const query = Object.fromEntries(searchParams)
  
      /* !通过 router属性将导航方法传递到组件props的router上 */
      return <WrapperComponent {...props} router={{ navigate, params, query, location }}/>
    }
  }
  ```

## 34.类组件无法直接使用navigate,location等参数，应该如何进行操作？

```jsx
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'

export default function withRouter(WrapperComponent) {
  /* !函数组件,参数是 props */
  return (props) => {
    /* Hooks必须在函数内部声明 */
    const navigate = useNavigate()

    /* 动态路由获取参数 */
    const params = useParams()

    // 当前路径的相关信息
    const location = useLocation()

    /* 查询字符串的参数获取 */
    const [searchParams] = useSearchParams()
    const query = Object.fromEntries(searchParams)

    /* !通过 router属性将导航方法传递到组件props的router上 */
    return <WrapperComponent {...props} router={{ navigate, params, query, location }}/>
  }
}
```

将相关route信息传递到子组件props的router上，可以通过对象获取

## 35.React Router6如何进行路由配置？如何配置路由的懒加载？

- router/index.js文件中配置

  ```jsx
  import { Navigate } from 'react-router-dom'
  import Home from '../pages/Home'
  import HomeRecommend from '../pages/HomeRecommend'
  import HomeRanking from '../pages/HomeRanking'
  import HomeSongList from '../pages/HomeSongList'
  // import About from '../pages/About'
  // import Login from '../pages/Login'
  import Category from '../pages/Category'
  import Order from '../pages/Order'
  import NotFound404 from '../pages/NotFound404'
  
  // ！异步加载, 需要加载loading,需要用到 Suspense 组件
  const About = lazy(() => import('../pages/About'))
  const Login = lazy(() => import('../pages/Login'))
  const routes = [
    {
      path: '/',
      element: <Navigate to={'/home'}/>,
    },
    {
      path: '/home',
      element: <Home/>,
      children: [
        { path: '/home', element: <Navigate to={'recommend'}/> },
        { path: 'recommend', element: <HomeRecommend/> },
        { path: 'ranking', element: <HomeRanking/> },
        { path: 'songList', element: <HomeSongList/> },
      ],
    },
    {
      path: '/about',
      element: <About/>,
    },
    {
      path: '/login',
      element: <Login/>,
    },
    {
      path: '/category/:id',
      element: <Category/>,
    },
    {
      path: '/order',
      element: <Order/>,
    },
    {
      path: '*',
      element: <NotFound404/>,
    },
  ]
  
  export default routes
  
  ```

- 入口文件index.js

  ```jsx
  <HashRouter>
    <Suspense fallback={<h4>Loading~~~~</h4>}>
      <App />
    </Suspense>
  </HashRouter>
  ```

## 36.什么是Hooks？和传统的函数式组件有什么区别？和类组件有什么区别（面试）

- Hook指类似于useState,useEffect这样的函数，Hooks是统称
- 首先需要了解函数组件和类组件的优缺点
  - 优点：
    - 类组件可以定义自己的state,并且可以保存自己的内部状态
    - 类组件有自己的生命周期
    - 类组件在状态改变时，会重新执行render函数
  - 缺点：
    - 函数组件不能定义自己的状态，每次函数调用都会产生新的临时变量
    - 函数组件没有
    - 函数组件不会重新渲染，如果重新渲染，整个函数会重新被执行，相应的状态也会被重新赋值

- 类组件缺点

  - 随着业务的增多，类组件会变得越来越负责
  - 复用代码状态较麻烦，需要通过高阶组件来实现

- Hooks可以让在不编写class的情况下，使用state以及其他的React特性

  - Hook只能在函数组件中使用，不能在类组件，必须是函数的顶层作用域
  - 通过Hook可以在函数组件中：定义自己的状态，完成类似于class组件中的生命周期功能

  ```jsx
  import { useState } from 'react'
  
  export default function CounterHook() {
    const [counter, setCounter] = useState(0)
  
    return (
      <div className={'inner'}>
        <h2>Hook Counter: {counter}</h2>
        <button onClick={() => setCounter(counter + 1)}>+1</button>
        <button onClick={() => setCounter(counter - 1)}>-1</button>
      </div>
    )
  }
  ```

## 37.总结常见的Hooks, 以及说明它们的作用。（useState,useEffect)

- useState
  - 参数：初始化值
  - 返回值：数组，包含两个元素。
    - 当前状态的值
    - 设置状态值的函数
- useEffect：完成类似class组件的生命周期功能。如网络请求、DOM更新、事件监听等
  - 参数一：回调函数。在没有第二个参数的情况下，每次更新都会执行这个函数
    - 返回值：如果返回一个函数，完成清除功能。如定时器销毁，组件数据销毁，事件监听移除等
    - `type EffectCallback = () => (void | (() => void | undefined))`

  - 参数二：定义当前useEffect在哪些state变化时才会重新执行。`[state1, state2]`


## 38.useEffect在使用上有哪些方式和注意事项？

- useEffect 要求传入一个回调函数，在react执行完更新Dom操作之后，就会回调这个函数。也等价compontDidMount/componeDidUpdate

- 默认情况下，无论是第一次渲染之后，还是每次更新之后，都会执行这个回调函数
- 没有第二个参数时，第一次挂载后，每次更新都会重新执行
- 第二个参数是空数组，则只会执行一次
- 第二个参数传入特定的state，则只在state变化时才执行

## 39.useMemo和useCallback有什么区别？

- useCallback针对的是函数的引用地址唯一性，优化如**传递给子组件的函数**，防止子组件的重复渲染
  - 使用useCallback的目的是不希望子组件进行多次渲染，并不是为了函数进行缓存
- useMemo针对的是值的引用，防止如**对象类型的数值变化**时，导致的子组件重复渲染
  - 进行大量的计算时，减少不必要的每次渲染时都重新计算
  - 对子组件传递相同内容的对象时，使用useMemo进行性能优化

## 40.什么是闭包陷阱？如何解决出现的闭包陷阱？

```jsx
const increment = useCallback(() => {
  setCount(count + 1)
  /*
    ! 闭包陷阱 useCallback，这里是保持increment的引用不变
    * 1.第二个参数不传时，每次都会更新，同useEffect
    * 2.传入监听的state,数据变更时，increment函数的引用才会更新.(此时，当下边msg变更时，MyHome子组件不会再渲染）
    * */
}, [count])
```

- 由于使用了useCallback，每次更新时，函数都会重新声明，但是绑定的count利用的还是之前的旧值，导致页面视图不会更新。因此，应该使用第二个参数，监听count的改变，对increment的引用地址进行更新。解决闭包陷阱问题

## 41.Redux中有哪些Hooks? 如何使用对应的Hooks?

## 42.React18新增哪些Hooks，这些Hooks有什么作用？