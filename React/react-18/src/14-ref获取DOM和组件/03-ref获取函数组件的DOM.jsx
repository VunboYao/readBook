import { PureComponent, createRef } from 'react'
import AcceptClassRef from './ClassAcceptRefFromFunc'
import ClassAcceptRefFromFunc from './FuncAcceptRefFromFunc'

// App组件
class App extends PureComponent {
  funcRef = createRef()
  classRef = createRef()

  getComponent() {
    console.log('函数refs转发：', this.funcRef.current)
    console.log('class refs转发：', this.classRef.current)

    // 调用class 组件方法获取node
    this.classRef.current.getText()
  }

  render() {
    return (
      <div>
        {/* refs转发 */}
        <ClassAcceptRefFromFunc ref={this.funcRef}/>
        <AcceptClassRef ref={this.classRef}/>
        <button onClick={e => this.getComponent(e)}>GetAppInstance</button>
      </div>
    )
  }
}

export default App
