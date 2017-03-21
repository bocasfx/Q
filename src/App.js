import React, { Component } from 'react';
import './App.css';

const easingFactor = 0.1;

class App extends Component {
  constructor(props) {
    super(props);

    let streamSize = 100;
    let queue = [];
    for (let i=0; i<streamSize; i++) {
      queue.push([0, 0]);
    }

    this.state = {
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1,
      },
      stream: {
        queue,
        position: [0, 0],
        easing: [0, 0],
        path: [],
        leader: 'mouse',
        pathIdx: 0,
        streamSize,
        streamStep: 10,
        particleCount: 10,
        particles: [],
        colorIdx: 0
      }
    };

    this.onDrag = this.onDrag.bind(this);
  }

  componentDidMount() {
    const context = this.refs.canvas.getContext('2d');
    requestAnimationFrame(() => {
      this.draw(context);
    });
  }

  updatePosition(position) {
    let state = this.state;
    if (state.stream.leader === 'mouse') {
      state.stream.position = position;
      state.stream.path.push(position);
      this.setState(state);
    }
  }

  update() {
    let state = this.state;
    if (state.stream.leader === 'path') {
      state.stream.position = state.stream.path[state.stream.pathIdx];
      this.advancePathIdx();
      this.setState(state);
    }
  }

  advancePathIdx() {
    let state = this.state;
    state.stream.pathIdx += 1;
    if (state.stream.pathIdx >= (state.stream.path.length - 1)) {
      state.stream.pathIdx = 0;
    }
    this.setState(state);
  }

  reset() {
    let state = this.state;
    state.stream.path = [];
    state.stream.pathIdx = 0;
    this.setState(state);
  }

  draw(context) {
    let state = this.state;
    // Rotate the queue;
    state.stream.queue.push(state.stream.queue.shift());
    state.stream.easing = this.calculateEasing();
    state.stream.queue[state.stream.streamSize - 1] = state.stream.easing;

    let queue = state.stream.queue;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
    context.strokeStyle = '#df4b26';
    context.lineJoin = 'round';
    context.lineWidth = 2;

    for (let i=1; i<queue.length; i++) {
      context.beginPath();
      context.moveTo(queue[i-1][0], queue[i-1][1]);
      context.lineTo(queue[i][0], queue[i][1]);
      context.closePath();
      context.stroke();
    }
    requestAnimationFrame(() => {
      this.draw(context);
    });
  }

  calculateEasing() {
    let stream = this.state.stream;
    let dx = stream.position[0] - stream.easing[0];
    let dy = stream.position[1] - stream.easing[1];
    let easing = [stream.easing[0] + (dx * easingFactor), stream.easing[1] + (dy * easingFactor)];
    return easing;
  }

  onDrag(event) {
    event.preventDefault();
    var x = event.pageX;
    var y = event.pageY;

    this.updatePosition([x, y]);
  }

  render() {
    return (
      <div>
        <canvas
          draggable="true"
          ref="canvas"
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
          onDrag={this.onDrag}
        />
      </div>
    );
  }
}

export default App;
