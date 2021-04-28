import React, { Component } from "react";
import "./index.css";
import Footer from "./../footer";

export default class Main extends Component {
  render() {
    const { todos } = this.props;
    return (
      <div className="main">
        <ul>
          {todos.map((item) => {
            return (
              <li key={item.id}>
                <input type="checkbox" defaultChecked={item.done} />
                {item.msg}
                <button className="button">delete</button>
              </li>
            );
          })}
        </ul>
        <Footer />
      </div>
    );
  }
}
