import { PureComponent } from 'react'
import appStyle from './App.module.css'
import Home from './Home/Home'
import Profile from './Profile/Profile'

class App extends PureComponent {
  render() {
    return (
      <div>
        <h2 className={appStyle.title}>App Title</h2>
        <p className={appStyle.content}>there are some content</p>

        <Home/>
        <Profile/>
      </div>
    )
  }
}

export default App
