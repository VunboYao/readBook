import { Component } from 'react'
import PropTypes from 'prop-types'

export default class MainBanner extends Component {
  /**
   *  props类型检测， array,bool,func,number,object,string,symbol
   *  isRequired: 必输
   */
  static propTypes = {
    banners: PropTypes.array,
    title: PropTypes.string.isRequired,
    name: PropTypes.string,
  }

  // props类型检测默认值
  static defaultProps = {
    banners: [],
    name: 'Hello',
  }

  render() {
    const { title, banners, name } = this.props
    return (
      <div>
        <h2>{name}-{title}</h2>
        <ul>
          {
            banners.map(item => <li key={item.acm}>{item.title}</li>)
          }
        </ul>
      </div>
    )
  }
}
