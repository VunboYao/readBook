import ReactDOM from 'react-dom' // 引入DOM依赖库
import App from './App'
import { Provider } from 'react-redux' // 引入react-redux中核心方法，Provider
import Store from './redux/store'

ReactDOM.render(
  /* 用Provider包裹App, 让App的所有后代容器组件都能接收到store */
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
