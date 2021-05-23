import React, { Component } from "react";
import PubSub from "pubsub-js";
import Axios from "axios";
export default class Search extends Component {
  handleSearch = (params) => {
    const { value: keyword } = this.keywordElement;
    PubSub.publish("Search", { isLoading: true, isFirst: false });
    Axios.get("https://api.github.com/search/users?q=" + keyword).then(
      (res) => {
        PubSub.publish("Search", { isLoading: false, users: res.data.items });
      },
      (error) => {
        PubSub.publish("Search", { isLoading: false, err: error });
      }
    );
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
