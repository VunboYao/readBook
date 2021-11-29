// babel parser reactJSX => @babel/preset-react -D
// react react-dom

import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			msg: 'Hello React'
		}
	}

	render() {
		return (
				<div>
					<h2>{this.state.msg}</h2>
				</div>
		)
	}
}

ReactDOM.render(<Hello/>, document.getElementById('root'))
