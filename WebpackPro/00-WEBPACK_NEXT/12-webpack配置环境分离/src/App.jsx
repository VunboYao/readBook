import React, {Component} from "react"
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			msg: "Hello React 20",
		};
	}

	render() {
		return <h1>{this.state.msg}</h1>;
	}
}

