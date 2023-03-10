import { PureComponent } from 'react'
import ThemeContext from '../context/ThemeContext'

class ProductOld extends PureComponent {
  render() {
    return (
      <div>
        <ThemeContext.Consumer>
          {
            value => <h2>theme: {value.color}-{value.size}</h2>
          }
        </ThemeContext.Consumer>
      </div>
    )
  }
}

export default ProductOld
