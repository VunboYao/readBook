import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TabContent extends Component {
	static propTypes = {
		content: PropTypes.string,
	}
	render() {
		return (
			<div>{this.props.content}</div>
		)
	}
}
