import React, { Component } from 'react';
import './App.css';

const easingFactor = 0.08;
const streamSize = 100;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      easing: '',
      mouseState: 'up',
      headPosition: '',
      pathIndex: 0,
      path: []
    };

    this.draw = this.draw.bind(this);
    this.calculateEasing = this.calculateEasing.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount() {
    const context = this.refs.canvas.getContext('2d');
    requestAnimationFrame(() => {
      this.flow(context);
    });
  }

  draw(context) {
    this.initContext(context);

    let queue = this.state.queue;

    for (let i=1; i<queue.length; i++) {
      context.beginPath();
      context.moveTo(queue[i-1][0], queue[i-1][1]);
      context.lineTo(queue[i][0], queue[i][1]);
      context.closePath();
      context.stroke();
    }
    requestAnimationFrame(() => {
      this.flow(context);
    });
  }

  initContext(context) {
    context.fillStyle='papayawhip';
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  
    context.strokeStyle = 'lightseagreen';
    context.lineJoin = 'round';
    context.lineWidth = 2;
  }

  flow(context) {
    let state = this.state;
    if (state.headPosition !== '') {
      if (state.mouseState === 'up') {
        if (state.path.length) {
          state.headPosition = state.path[state.pathIndex];
          this.advancePathIndex();
        }
      } else {
        state.path.push(state.headPosition);
        if (state.queue.length < streamSize) {
          state.queue.push(state.headPosition);
        }
      }
      if (state.easing === '') {
        state.easing = state.headPosition;
      }
      state.easing = this.calculateEasing(state.headPosition, state.easing, easingFactor);
      state.queue[0] = state.easing;
      state.queue.push(state.queue.shift());
    }
    this.setState(state);
    this.draw(context);
  }

  advancePathIndex() {
    let state = this.state;
    state.pathIndex++;
    if (state.pathIndex > (state.path.length - 1)) {
      state.pathIndex = 0;
    }
    this.setState(state);
  }

  calculateEasing(position, easing) {
    let dx = position[0] - easing[0];
    easing = [easing[0] + (dx * easingFactor), easing[1]];

    let dy = position[1] - easing[1];
    easing = [easing[0], easing[1] + (dy * easingFactor)];

    return easing;
  }

  onMouseDown(event) {
    event.preventDefault();
    let state = this.state;
    var x = event.pageX;
    var y = event.pageY;

    state.headPosition = [x, y];
    state.path = [];
    state.pathIndex = 0;
    state.path.push(state.headPosition);
    state.mouseState = 'down';
    this.setState(state);
  }

  onMouseUp() {
    event.preventDefault();
    let state = this.state;
    state.mouseState = 'up';
    this.setState(state);
  }

  onMouseMove(event) {
    event.preventDefault();
    var x = event.pageX;
    var y = event.pageY;
    let state = this.state;
    state.headPosition = [x, y];
    this.setState(state);
  }

  render() {
    return (
      <div>
        <canvas
          draggable="true"
          ref="canvas"
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseMove={this.onMouseMove}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
        />
      </div>
    );
  }
}

export default App;