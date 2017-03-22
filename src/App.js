import React, { Component } from 'react';
import './App.css';

const easingFactor = 0.1;
const streamSize = 100;

class App extends Component {
  constructor(props) {
    super(props);

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
        position: [],
        easing: [],
        path: [],
        leader: 'path',
        pathIdx: 0,
        streamSize,
        streamStep: 10,
        particleCount: 10,
        particles: [],
        colorIdx: 0
      }
    };

    this.updatePosition = this.updatePosition.bind(this);
    this.advancePathIdx = this.advancePathIdx.bind(this);
    this.reset = this.reset.bind(this);
    this.draw = this.draw.bind(this);
    this.calculateEasing = this.calculateEasing.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount() {
    const context = this.refs.canvas.getContext('2d');
    requestAnimationFrame(() => {
      this.draw(context);
    });
  }

  updatePosition(position) {
    let state = this.state;
    if (state.stream.leader === 'mouse' && position.length) {
      state.stream.position = position;
      state.stream.path.push(position);
    } else {
      state.stream.position = state.stream.path[state.stream.pathIdx];
      this.advancePathIdx();
    }
    this.setState(state);
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

  draw2(context) {
    let state = this.state;
    if (!state.stream.position) {
      if (state.stream.leader === 'path') {
        if (state.stream.path.length) {
          state.stream.position = state.stream.path[state.stream.path_index];
          this.advance_path_index();
        }
      } else {
        state.stream.path.push(self.position);
        if (state.stream.queue.length < streamSize) {
          state.stream.queue.push(state.stream.position);
        }
      }
      if (!state.stream.easing.length) {
        state.stream.easing = state.stream.position;
      }
      state.stream.easing = this.calculateEasing();
      state.stream.queue[0] = state.strea.easing;
    }
    
    state.stream.queue.push(state.stream.queue.shift());

    let queue = state.stream.queue;
    this.initContext(context);

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

    this.setState(state);
  }

  draw(context) {
    let state = this.state;

    // Rotate the queue;
    state.stream.queue.push(state.stream.queue.shift());
    
    if (state.stream.leader === 'mouse' && state.stream.easing.length) {
      state.stream.easing = this.calculateEasing();
      state.stream.queue[state.stream.streamSize - 1] = state.stream.easing;
    }
    state.stream.position = state.stream.queue[state.stream.pathIdx];

    let queue = state.stream.queue;
    this.initContext(context);

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

  initContext(context) {
    context.fillStyle='papayawhip';
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  
    context.strokeStyle = 'lightseagreen';
    context.lineJoin = 'round';
    context.lineWidth = 5;
  }

  calculateEasing() {
    let stream = this.state.stream;
    let dx = stream.position[0] - stream.easing[0];
    let dy = stream.position[1] - stream.easing[1];
    let easing = [stream.easing[0] + (dx * easingFactor), stream.easing[1] + (dy * easingFactor)];
    return easing;
  }

  onMouseDown(event) {
    let state = this.state;

    if (state.stream.leader === 'mouse') {
      return;
    }

    var x = event.pageX;
    var y = event.pageY;

    state.stream.leader = 'mouse';
    
    // for (let i=0; i<streamSize; i++) {
    //   state.stream.queue.push([x, y]);
    // }

    state.stream.easing = [x, y];
    state.stream.position = [x, y];

    // this.updatePosition([x, y]);
    this.setState(state);
  }

  onMouseMove(event) {
    event.preventDefault();

    if (this.state.stream.leader === 'mouse') {

      var x = event.pageX;
      var y = event.pageY;

      this.updatePosition([x, y]);
    }
  }

  onMouseUp(event) {
    let state = this.state;
    state.stream.leader = 'path';
    this.setState(state);
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
          onMouseMove={this.onMouseMove}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
        />
      </div>
    );
  }
}

export default App;
