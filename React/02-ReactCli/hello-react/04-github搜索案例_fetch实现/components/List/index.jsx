import React, { Component } from "react";
import PubSub from 'pubsub-js'
import "./index.css";
export default class List extends Component {
  state = {
    users: [],
    isFirst: true,
    isLoading: false,
    err: ''
  }
  componentDidMount() {
    this.token = PubSub.subscribe('Search', (msg, data) => {
      this.setState(data)
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token)
  }
  render() {
    const { users, err, isLoading, isFirst } = this.state;
    return (
      <div className="wrap">
        {isFirst
          ? "请输入信息后搜索"
          : isLoading
          ? "loading..."
          : err
          ? err.message
          : users.map((userObj) => {
              return (
                <a target="_blank" rel="noreferrer" href={userObj.html_url} className="li" key={userObj.id}>
                  <img src={userObj.avatar_url} alt="" />
                  <span>{userObj.login}</span>
                </a>
              );
            })}
      </div>
    );
  }
}
