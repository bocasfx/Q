import React, { Component } from 'react';
import './App.css';
import Stream from './Stream';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      streams: []
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.draw = this.draw.bind(this);
  }
  
  componentDidMount() {
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  onMouseMove(event) {
    let streams = this.state.streams;
    if (!streams.length) {
      return;
    }
    let stream = streams[streams.length - 1];
    stream.onMouseMove(event);
  }

  onMouseDown(event) {
    let state = this.state;
    let stream = new Stream(event.pageX, event.pageY);
    stream.onMouseDown(event);
    state.streams.push(stream);
    this.setState(state);
  }

  onMouseUp(event) {
    let streams = this.state.streams;
    let stream = streams[streams.length - 1];
    stream.onMouseUp(event);
  }

  draw() {
    const context = this.refs.canvas.getContext('2d');
    let state = this.state;
    context.fillStyle='papayawhip';
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    state.streams.forEach((stream) => {
      stream.render(context);
    });
    requestAnimationFrame(() => {
      this.draw();
    });
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