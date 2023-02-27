import { PureComponent } from 'react'
import AboutClass from './page/AboutClass'
import { Home, Profile } from './page/HomeFunc'

class App extends PureComponent {
  render() {
    return (
      <>
        <Home banners={['banner1', 'banner2']}/>
        <Profile/>
        <AboutClass/>
      </>
    )
  }
}

export default App
