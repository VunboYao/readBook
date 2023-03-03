import { PureComponent } from 'react'
import classNames from 'classnames'

class App extends PureComponent {
  state = {
    isShow: true,
    isCanClick: true,
  }

  render() {
    const { isShow, isCanClick } = this.state

    return (
      <div>
        <h2 className={classNames('aaa', { show: isShow, click: isCanClick })}>Hey</h2>
        <h2 className={classNames(['aaa', { show: isShow, click: isCanClick }])}>Hello</h2>
      </div>
    )
  }
}

export default App
