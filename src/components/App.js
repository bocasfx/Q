import React, { Component } from 'react';
import './App.css';
import Stream from '../elements/Stream';
import Menu from './Menu';
import config from '../config/config';

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
    this.context = this.refs.canvas.getContext('2d');
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
    
    let state = this.state;
    this.context.fillStyle = config.app.backgroundColor;
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    state.streams.forEach((stream) => {
      stream.render(this.context);
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
          height={window.innerHeight - 46}
          onMouseMove={this.onMouseMove}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
        />
        <Menu/>
      </div>
    );
  }
}

export default App;
