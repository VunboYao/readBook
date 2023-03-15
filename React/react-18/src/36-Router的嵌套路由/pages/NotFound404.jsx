import { PureComponent } from 'react'

class NotFound404 extends PureComponent {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h2>Oops! Some unknown Error</h2>
        <p>Page Not Found 404</p>
      </div>
    )
  }
}

export default NotFound404
