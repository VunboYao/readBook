import React, { Component } from 'react'
import Child from './Child'
import { HasDefaultContext, UserContext } from './context'
import OtherUseProvider from './OtherUseProvider'

class App extends Component {
  state = {
    ancestorInfo: {
      nickName: 'VunboYao',
      age: 28,
    },
  }

  changeAncestorInfo() {
    this.setState({
      ancestorInfo: {
        nickName: 'Still',
        age: 29,
      },
    })
  }

  render() {
    const { ancestorInfo } = this.state
    return (
      <div>
        {/* 1.扩展运算符传递数据的方式 */}
        {/* <Child {...info}/> */}
        <hr/>

        <button onClick={() => this.changeAncestorInfo()}>Change</button>
        {/* 2.传递数据给后代子组件 */}
        <UserContext.Provider value={ancestorInfo}>
          <HasDefaultContext.Provider value={{ color: 'override-default-red', size: 56 }}>
            <Child/>
          </HasDefaultContext.Provider>
        </UserContext.Provider>

        <hr/>
        {/* 3.provider默认值的使用 */}
        <OtherUseProvider/>
      </div>
    )
  }
}

export default App
