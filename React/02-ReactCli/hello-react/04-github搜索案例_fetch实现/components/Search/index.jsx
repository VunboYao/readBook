import React, { Component } from "react";
import PubSub from "pubsub-js";
// import Axios from "axios";
export default class Search extends Component {
  handleSearch = (params) => {
    PubSub.publish("Search", { isLoading: true, isFirst: false });
    fetch("/api2/search/users2").then(
      res => res.json()
    ).then(res => {
      PubSub.publish("Search", { isLoading: false, users: res.items });
    }).catch(err => {
      PubSub.publish("Search", { isLoading: false, err });
    })
  };
  render() {
    return (
      <div>
        <h2>Hello Github</h2>
        <input type="text" ref={(c) => (this.keywordElement = c)} />
        <button onClick={this.handleSearch}>search</button>
      </div>
    );
  }
}
