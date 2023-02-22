import React, { Component } from 'react'
import './style.css'
import PropTypes from 'prop-types'

class Index extends Component {
  static propTypes = {
    titles: PropTypes.array,
    index: PropTypes.number,
    changeIndex: PropTypes.func,
  }

  tabClick(order) {
    // 子组件中直接调用父级的props里的方法，并将参数传递上去
    const { changeIndex } = this.props
    changeIndex(order)
  }

  render() {
    const { titles, index } = this.props
    return (
      <div className="tab-control">
        {
          titles.map((item, order) => {
            return (
              <div
                className={`item ${index === order ? 'active' : ''}`}
                key={order}
                onClick={() => this.tabClick(order)}
              >
                <span className="text">{item}</span>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Index
