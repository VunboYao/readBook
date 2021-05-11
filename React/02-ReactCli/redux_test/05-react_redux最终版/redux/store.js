// 引入redux中的核心方法
import { createStore, applyMiddleware } from 'redux'

// 获取redux异步action处理器
import thunk from 'redux-thunk'

// 引入redux-devtools-extension
import { composeWithDevTools } from 'redux-devtools-extension'

// 引入汇总后的reducer
import Reducer from './reducers'

export default createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)))
