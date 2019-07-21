import React, { Component } from "react";

class Target extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const style = {
      left: `${this.props.target[0]}%`,
      top: `${this.props.target[1]}%`
    };
    return (
      <div>
        <div className="target" style={style} />
      </div>
    );
  }
}

export default Target;
