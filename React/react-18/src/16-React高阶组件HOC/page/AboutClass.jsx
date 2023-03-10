import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import enhancedUserInfo from '../hoc/enhanced_props'
class AboutClass extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
  }

  render() {
    return (
      <h2>
        About: {this.props.name}
      </h2>
    )
  }
}

// !导出增强
export default enhancedUserInfo(AboutClass)
