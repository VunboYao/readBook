import React, { Component } from "react";
import "./index.css";
export default class Footer extends Component {
  render() {
    return (
      <div className="div">
        <input type="checkbox" />
        <span className="span">已完成 0 / 全部 0</span>
        <button className="close-all">清楚已完成任务</button>
      </div>
    );
  }
}
