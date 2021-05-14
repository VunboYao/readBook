import React, { Component, Fragment } from 'react'
import Demo from './components';
export default class App extends Component {
  state = {
    hasError: ''
  }

  /* 捕获子组件生命周期错误，返回一个错误对象 */
  static getDerivedStateFromError(err) {
    return {
      hasError: err
    }
  }

  /* 捕获组件的错误，传递给后台 */
  componentDidCatch(error, info) {
    console.info(error, 'error');
    console.info(info, 'info')
  }
  render() {
    return (
      <Fragment>
        {this.state.hasError ? 'sorry, there has some error' : <Demo />}
      </Fragment>
    )
  }
}
