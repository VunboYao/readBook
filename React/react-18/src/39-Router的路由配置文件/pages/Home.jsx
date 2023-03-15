import { PureComponent } from 'react'
import { Link, Outlet } from 'react-router-dom'

class Home extends PureComponent {
  render() {
    return (
      <div>
        <h2>Home Page</h2>
        <div className="nav">
          <Link to={'recommend'}>Recommend</Link>
          <Link to={'ranking'}>ranking</Link>
          <Link to={'songList'}>songList</Link>
        </div>

        {/* !router-view： 占位符 */}
        <div style={{ textAlign: 'center' }}>
          <h3>Home子页面</h3>
          <Outlet/>
        </div>
      </div>
    )
  }
}

export default Home
