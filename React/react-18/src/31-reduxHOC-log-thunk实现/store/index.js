// 中间件处理扩展, combineReducers合并reducer
import { combineReducers, createStore } from 'redux'
// 处理异步action
// import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'
import CountReducer from './reducer'
import InfoReducer from './reducerName'
// 自定义实现异步 action 中间件
import { applyMiddleware, log, thunk } from './middleware'

// redux
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose

// 中间件的底层实现
const store = createStore(combineReducers({
  CountReducer,
  InfoReducer,
}), composeWithDevTools())
applyMiddleware(store, log, thunk)

export default store
