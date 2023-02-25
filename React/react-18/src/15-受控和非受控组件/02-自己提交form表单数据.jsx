import { PureComponent } from 'react'

class App extends PureComponent {
  state = {
    userName: 'VunboYao',
  }

  inputChange(e) {
    this.setState({ userName: e.target.value })
  }

  handleSubmitClick(e) {
    // 阻止默认行为
    e.preventDefault()

    // 2.获取所有的表单数据，对数据进行组装
    console.log('Get User Input Data:', this.state.userName)

    // 3.ajax/fetch/axios
  }

  render() {
    const { userName } = this.state

    return (
      <div>
        {/* submit事件 */}
        <form onSubmit={e => this.handleSubmitClick(e)}>

          {/* for属性改为htmlFor */}
          <label htmlFor="userName">
            用户：
            <input
              type="text"
              id={'userName'}
              name={'userName'}
              value={userName}
              onChange={e => this.inputChange(e)}
            />
          </label>
          <button type="submit">SignIn</button>
        </form>
      </div>
    )
  }
}

export default App
