import { PureComponent } from 'react'
import './App.css'
import Home from './Home/Home'
import Profile from './Profile/Profile'

class App extends PureComponent {
  render() {
    return (
      <div>
        <h2 className="title">App Title</h2>
        <p className="content">there are some content</p>

        <Home/>
        <Profile/>
      </div>
    )
  }
}

export default App
