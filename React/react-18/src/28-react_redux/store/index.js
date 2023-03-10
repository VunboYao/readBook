// 中间件处理扩展, combineReducers合并reducer
import { applyMiddleware, combineReducers, createStore } from 'redux'
// 处理异步action
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'
import CountReducer from './reducer'
import InfoReducer from './reducerName'

// redux
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose

export default createStore(combineReducers({
  CountReducer,
  InfoReducer,
}), composeWithDevTools(applyMiddleware(thunk)))
