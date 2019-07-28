import React from "react";
import { Component } from "react";
import Snake from "./Snake";
import Target from "./Target";
import BigTarget from "./BigTarget";
var bestScore = 0;
var bodyLength = 0;
var initState = {
  targetLocation: [
    Math.floor((Math.random().toFixed(2) * 98) / 2) * 2,
    Math.floor((Math.random().toFixed(2) * 98) / 2) * 2
  ],
  bigTargetLocation: [
    Math.floor((Math.random().toFixed(2) * 98) / 2) * 2,
    Math.floor((Math.random().toFixed(2) * 98) / 2) * 2
  ],
  snakeBody: [[0, 0], [2, 0]],
  speed: 100,
  direction: "RIGHT",
  play_pause: true,
  gameState: "",
  score: 0
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  playPause = () => {
    let play_pause = this.state.play_pause;
    if (play_pause) {
      this.setState({
        gameState: setInterval(this.moveSnake, this.state.speed)
      });
    } else {
      clearInterval(this.state.gameState);
    }
    this.setState({
      play_pause: !play_pause
    });
  };

  componentDidMount() {
    document.onkeydown = this.changeSnakeDirection;
  }

  componentDidUpdate() {
    this.bitItself();
    this.ifEaten();
    // this.ifBigTargetIsEaten();
  }

  bitItself = () => {
    let body = [...this.state.snakeBody];
    let head = body[body.length - 1];
    body.pop();
    body.forEach(x => {
      if (head[0] == x[0] && head[1] == x[1]) {
        console.log(true);
        // console.log(body);
        // console.log(head);
        clearInterval(this.state.gameState);
        this.setState(initState);
      }
    });
  };
  showBigTarget = () => {
    this.setState({});
  };

  ifEaten = () => {
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    let target = this.state.targetLocation;
    let speed = this.state.speed;
    let score = this.state.score;
    let bigTarget = this.state.bigTargetLocation;
    if (head[0] == bigTarget[0] && head[1] == bigTarget[1]) {
      score = score + 10;
      if (score > bestScore) {
        bestScore = score;
      }
      this.setState({
        bigTargetLocation: [
          Math.floor((Math.random().toFixed(2) * 100) / 2) * 2,
          Math.floor((Math.random().toFixed(2) * 100) / 2) * 2
        ],
        score: score
      });
    }
    if (head[0] == target[0] && head[1] == target[1]) {
      bodyLength = this.state.snakeBody.length;
      console.log(bodyLength);
      let newBody = this.state.snakeBody;
      newBody.unshift([]);
      this.setState({
        snakeBody: newBody
      });
      speed = speed * 0.95;
      score = score + 1;
      if (score > bestScore) {
        bestScore = score;
      }
      if (speed < 50) {
        speed = 50;
      }
      clearInterval(this.state.gameState);

      if (score % 10 == 0 && score != 0) {
        this.showBigTarget();
      }

      this.setState({
        targetLocation: [
          Math.floor((Math.random().toFixed(2) * 100) / 2) * 2,
          Math.floor((Math.random().toFixed(2) * 100) / 2) * 2
        ],
        speed: speed,
        gameState: setInterval(this.moveSnake, speed),
        score: score
      });
    }
  };

  changeSnakeDirection = e => {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
    }
  };

  moveSnake = () => {
    let dots = [...this.state.snakeBody];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }
    if (head[0] > 99) {
      head = [0, head[1]];
    }
    if (head[0] < 0) {
      head = [98, head[1]];
    }
    if (head[1] > 99) {
      head = [head[0], 0];
    }
    if (head[1] < 0) {
      head = [head[0], 98];
    }

    dots.push(head);
    dots.shift();
    this.setState({
      snakeBody: dots
    });
  };

  render() {
    let bt;
    if (
      bodyLength != 0 &&
      bodyLength % 10 == 0 &&
      bodyLength != this.state.snakeBody.length
    ) {
      bt = <BigTarget bigTarget={this.state.bigTargetLocation} />;
    }
    return (
      <div>
        <div className="maze">
          <Snake snakeBody={this.state.snakeBody} />
          <Target target={this.state.targetLocation} />
          {bt}
        </div>
        <div>
          <button className="controlButtons" onClick={this.playPause}>
            Play/Pause
          </button>
          <p>Score:{this.state.score}</p>
          <p>Best Score:{bestScore}</p>
        </div>
      </div>
    );
  }
}
export default App;
