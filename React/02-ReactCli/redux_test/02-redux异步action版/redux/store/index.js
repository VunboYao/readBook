// 从redux中引入初始化的创建store方法与中间件应用器
import { createStore, applyMiddleware } from 'redux'

// 获取 reducer
import Count from '../reducer/count'

// 获取redux异步action处理器
import thunk from 'redux-thunk'

export default createStore(Count, applyMiddleware(thunk))
