import React, { Component } from 'react'
import './style.css'
import PropTypes from 'prop-types'

class Index extends Component {
  static propTypes = {
    titles: PropTypes.array,
    index: PropTypes.number,
    changeIndex: PropTypes.func,
    // 标识是一个函数，父级传递给子级调用
    itemType: PropTypes.func,
  }

  tabClick(order) {
    // 子组件中直接调用父级的props里的方法，并将参数传递上去
    const { changeIndex } = this.props
    changeIndex(order)
  }

  render() {
    const { titles, index, itemType } = this.props
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
                {/* <span className="text">{item}</span> */}
                {/* 通过 props 的方式传递进来需要展示的元素，将数据传递给外层父级使用 */}
                { itemType(item) }
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Index
