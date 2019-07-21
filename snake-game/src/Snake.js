import React, { Component } from "react";

class Snake extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.snakeBody.map((dot, i) => {
          const style = {
            left: `${dot[0]}%`,
            top: `${dot[1]}%`
          };
          return <div className="snake-dot" key={i} style={style} />;
        })}
      </div>
    );
  }
}

export default Snake;
