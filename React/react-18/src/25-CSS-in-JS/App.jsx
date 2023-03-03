import { PureComponent } from 'react'
import { ThemeProvider } from 'styled-components'
import Home from './Home'
import { AppWrapper, SectionWrapper } from './style'

class App extends PureComponent {
  state = {
    size: 30,
    color: 'yellow',
  }

  changeColor() {
    this.setState({
      color: 'skyblue',
    })
  }

  render() {
    const { size, color } = this.state
    return (
      // theme setting 跨层级 Provider 数据
      <ThemeProvider theme={{ color: 'purple', size: '50px' }}>
        <AppWrapper>
          {/* 传递给样式内部的props数据 */}
          <SectionWrapper size={size} color={color}>
            <h2 className={'title'}>Title</h2>
            <p className="title">there are some content</p>
            <button onClick={event => this.changeColor(event)}>modify color</button>
          </SectionWrapper>

          {/* Home组件内部获取 Provider 的数据 */}
          <Home/>

          <div className="footer">
            <p>disclaimer</p>
            <p>copyright notice</p>
          </div>
        </AppWrapper>
      </ThemeProvider>
    )
  }
}

export default App
