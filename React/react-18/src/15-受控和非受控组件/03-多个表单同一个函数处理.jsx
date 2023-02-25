import { PureComponent } from 'react'

class App extends PureComponent {
  state = {
    userName: 'VunboYao',
    password: '',
  }

  inputChange(e) {
    // 统一处理，获取name属性
    const name = e.target.name
    this.setState({ [name]: e.target.value })
  }

  handleSubmitClick(e) {
    // 阻止默认行为
    e.preventDefault()

    // 2.获取所有的表单数据，对数据进行组装
    console.log('Get User Input Data:', this.state)

    // 3.ajax/fetch/axios
  }

  render() {
    const { userName, password } = this.state

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

          <label htmlFor={'password'}>
            密码：
            <input
              type={'password'}
              id={'password'}
              name={'password'}
              value={password}
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
