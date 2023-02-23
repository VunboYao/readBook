import React, { Component } from 'react'
// 1.导入声明的 Context
import { HasDefaultContext, UserContext } from './context'

class GrandchildClass extends Component {
  // 2.1 指定 context 的类型
  static contextType = HasDefaultContext

  render() {
    // 2.2.从 context 中获取数据
    const { color, size } = this.context

    return (
      <div>
        <h2>Class-this-Context: {color}-{size}</h2>
        <hr/>

        {/* !class 中可以使用 consumer 的方式使用不同的 provider */}
        <h2>Class-consumer-Context：</h2>
        <UserContext.Consumer>
          {
            (value) => {
              return <h3>Info: User: {value.nickName}</h3>
            }
          }
        </UserContext.Consumer>
      </div>
    )
  }
}

export default GrandchildClass
