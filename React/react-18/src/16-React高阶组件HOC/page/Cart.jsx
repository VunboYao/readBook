import { PureComponent } from 'react'
import loginAuth from '../hoc/LoginAuth'

class Cart extends PureComponent {
  render() {
    return (
      <div>
        <h2>Cart Page</h2>
      </div>
    )
  }
}

export default loginAuth(Cart)
