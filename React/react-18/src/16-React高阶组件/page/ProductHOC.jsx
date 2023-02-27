import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import WithTheme from '../hoc/WithTheme'

class ProductHoc extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
  }

  render() {
    const { color, size } = this.props
    return (
      <div>
        <h2>ProductHOC: {color}-{size}</h2>
      </div>
    )
  }
}

// !导出增强
export default WithTheme(ProductHoc)
