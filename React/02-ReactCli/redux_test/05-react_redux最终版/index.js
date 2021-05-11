import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import Store from './redux/store'

ReactDOM.render(
  /* 用Provider包裹App, 让App的所有后代容器组件都能接收到store */
  <Provider store={Store}>
    <App/>
  </Provider>
, document.getElementById('root'))
