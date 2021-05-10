import { createStore, applyMiddleware } from 'redux'
import CountReducer from './reducer'

// 获取redux异步action处理器
import thunk from 'redux-thunk'
export default createStore(CountReducer, applyMiddleware(thunk))