import React, { Component } from 'react'
import TabControl from './TabControl'

class App extends Component {
  state = {
    titles: ['music', 'soccer', 'football'],
    index: 0,
  }

  changeIndex(index) {
    this.setState({ index })
  }

  render() {
    const { titles, index } = this.state
    /*
    * 数据由父级组件管理
    * 1.父级方法传递给子组件调用。并将参数带回，实现更新
    *  */
    return (
      <div>
        <TabControl
          titles={titles}
          index={index}
          changeIndex={index => this.changeIndex(index)}
        />
        <h1>{titles[index]}</h1>
      </div>
    )
  }
}

export default App
