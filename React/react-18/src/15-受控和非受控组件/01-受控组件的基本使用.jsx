import { PureComponent } from 'react'

class App extends PureComponent {
  state = {
    userName: 'VunboYao',
  }

  inputChange(e) {
    this.setState({ userName: e.target.value })
  }

  render() {
    const { userName } = this.state

    return (
      <div>
        {/* 受控组件 state唯一数据来源，需要利用onChange来改变 */}
        <input type="text" value={userName} onChange={e => this.inputChange(e)}/>

        {/* 非受控组件 */}
        <input type="text"/>
        <h2>userName: {userName}</h2>
      </div>
    )
  }
}

export default App
