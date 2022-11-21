import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class TabControl extends Component {
  static propTypes = {
		titles: PropTypes.array,
		change: PropTypes.func
	}

	change(msg) {
		this.props.change(msg)
	}

  render() {
    const { titles } = this.props

    return (
			<div className="tab-control">
				{
					titles.map((item, index) => {
						return (
							<div
								className="item"
								key={index}
								onClick={() => this.change(item)}
							>{item}
							</div>
						)
					})
				}
			</div>
    )
  }
}

export default TabControl
