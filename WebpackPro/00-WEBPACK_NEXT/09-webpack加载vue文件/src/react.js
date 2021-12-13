import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "Hello React",
    };
  }

  render() {
    return <div>{this.state.msg}</div>;
  }
}

ReactDOM.render(<App/>, document.getElementById("api"));
