import React, { Component } from "react";
var bodyLength = 0;
class BigTarget extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const style = {
      left: `${this.props.bigTarget[0]}%`,
      top: `${this.props.bigTarget[1]}%`
    };
    let bigTarget;

    bigTarget = <div className="bigtarget" style={style} />;

    return <div>{bigTarget}</div>;
  }
}
bodyLength += 10;
export default BigTarget;
