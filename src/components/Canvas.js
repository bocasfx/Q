import React, { Component } from 'react';
import './Canvas.css';
import Stream from '../elements/Stream';
import Node from '../elements/Node';
import config from '../config/config';
import { connect } from 'react-redux';

class Canvas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      streamList: [],
      nodeList: []
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.draw = this.draw.bind(this);
  }
  
  componentDidMount() {
    this.ctx = this.refs.canvas.getContext('2d');
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  onMouseMove(event) {
    event.preventDefault();
    if (this.props.devices.streams) {
      let streams = this.state.streamList;
      if (!streams.length) {
        return;
      }
      let stream = streams[streams.length - 1];
      stream.onMouseMove(event);
    }
  }

  onMouseDown(event) {
    event.preventDefault();
    let state = this.state;

    if (this.props.devices.streams) {

      let stream = new Stream();
      stream.onMouseDown(event);
      state.streamList.push(stream);

    } else if (this.props.devices.nodes) {

      let node = new Node([event.pageX, event.pageY]);
      state.nodeList.push(node);
    }

    this.setState(state);
  }

  onMouseUp(event) {
    event.preventDefault();
    if (this.props.devices.streams) {
      let streams = this.state.streamList;
      let stream = streams[streams.length - 1];
      stream.onMouseUp(event);
    }
  }

  draw() {
    let state = this.state;
    this.ctx.fillStyle = config.canvas.backgroundColor;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    state.streamList.forEach((stream) => {
      stream.render(this.ctx);
    });
    state.nodeList.forEach((node) => {
      node.render(this.ctx);
    });
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  render() {
    return (
      <canvas
        draggable="true"
        ref="canvas"
        width={window.innerWidth}
        height={window.innerHeight - 50}
        onMouseMove={this.onMouseMove}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    devices: state.Devices
  };
};

module.exports = connect(mapStateToProps)(Canvas);
