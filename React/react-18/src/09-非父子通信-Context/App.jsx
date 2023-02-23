import React, { Component } from 'react'
import Child from './Child'
import { HasDefaultContext, UserContext } from './context'
import OtherUseProvider from './OtherUseProvider'

class App extends Component {
  state = {
    info: { name: 'vunbo', age: 30 },
  }

  render() {
    const { info } = this.state

    return (
      <div>
        {/* 1.扩展运算符传递数据的方式 */}
        {/* <Child {...info}/> */}
        <hr/>

        {/* 2.传递数据给后代子组件 */}
        <UserContext.Provider value={{ nickName: 'bo', age: 20 }}>
          <HasDefaultContext.Provider value={{ color: 'red', size: 56 }}>
            <Child {...info}/>
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
