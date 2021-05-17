import { createStore, applyMiddleware } from 'redux'

// 获取redux异步action处理器
import thunk from 'redux-thunk'
import reducer from './reducers'

export default createStore(reducer, applyMiddleware(thunk))
