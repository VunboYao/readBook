import { PureComponent } from 'react'
import homeStyle from './Home.module.css'
class Home extends PureComponent {
  render() {
    return (
      <div className={homeStyle.section}>
        <div className={homeStyle.title}>Home Title</div>
      </div>
    )
  }
}

export default Home
