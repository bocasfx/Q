import React, { Component } from 'react';
import './Canvas.css';
import config from '../config/config';
import { connect } from 'react-redux';
import { addNode, detectCollisions } from '../actions/Nodes';
import { addStream } from '../actions/Streams';
import { bindActionCreators } from 'redux';

class Canvas extends Component {

  constructor(props) {
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.draw = this.draw.bind(this);
  }
  
  componentDidMount() {
    this.canvasContext = this.refs.canvas.getContext('2d');
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  onMouseMove(event) {
    event.preventDefault();
    if (this.props.devices.streams) {
      let streams = this.props.streams;
      if (!streams.length) {
        return;
      }
      let stream = streams[streams.length - 1];
      stream.onMouseMove(event);
    }
  }

  onMouseDown(event) {
    event.preventDefault();
    if (this.props.devices.streams) {
      this.props.addStream([event.pageX, event.pageY], event);
    } else if (this.props.devices.nodes) {
      this.props.addNode([event.pageX, event.pageY], this.audioContext);
    }
  }

  onMouseUp(event) {
    event.preventDefault();
    if (this.props.devices.streams) {
      let streams = this.props.streams;
      let stream = streams[streams.length - 1];
      stream.onMouseUp(event);
    }
  }

  draw() {
    this.canvasContext.fillStyle = config.canvas.backgroundColor;
    this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
    this.canvasContext.fillRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
    this.props.streams.forEach((stream) => {
      stream.render(this.canvasContext);
    });
    this.props.nodes.forEach((node) => {
      node.render(this.canvasContext);
    });
    this.props.detectCollisions(this.props.streams);
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
        height={window.innerHeight - 53}
        onMouseMove={this.onMouseMove}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    devices: state.Devices,
    nodes: state.Nodes,
    streams: state.Streams
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNode: bindActionCreators(addNode, dispatch),
    addStream: bindActionCreators(addStream, dispatch),
    detectCollisions: bindActionCreators(detectCollisions, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Canvas);
