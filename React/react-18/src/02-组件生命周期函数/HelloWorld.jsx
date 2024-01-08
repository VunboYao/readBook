import React, { Component } from 'react'

export default class HelloWorld extends Component {
  // 1.构造方法： constructor
  constructor() {
    console.log('React Constructor')
    super()

    this.state = {
      message: 'Hello World',
    }
  }

  changeText() {
    this.setState({ message: 'Hello Vunbo' })
  }

  // 2. 执行render函数
  render() {
    console.log('React render')

    const { message } = this.state
    return (
      <div>
        <h2>{message}</h2>
        <p>{message} is the first code of IT!</p>
        <button onClick={e => this.changeText(e)}>ChangeText</button>
      </div>
    )
  }

  // 3.组件被渲染到DOM: 被挂载到DOM. 无参数
  componentDidMount() {
    console.log('React componentDidMount')
  }

  // 4.组件的DOM被更新完成: DOM changed
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('React componentDidUpdate =>', prevProps, prevState, snapshot)
  }

  // 5. clean up subscription before remove
  componentWillUnmount() {
    console.log('React componentWillUnmount =>', this.state)
  }

  // https://react.dev/reference/react/Component#shouldcomponentupdate
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('React shouldComponentUpdate =>', nextProps, nextState, nextContext)
    return true
  }

  getSnapshotBeforeUpdate() {
    console.log('getSnapshotBeforeUpdate')
    return {
      scrollPosition: 1000,
    }
  }
}
