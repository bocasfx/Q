import React from 'react';
import './Canvas.css';
import config from '../config/config';
import { connect } from 'react-redux';
import { addNode, addMidiNode, detectCollisions, setNodePosition } from '../actions/Nodes';
import { showNodeSettings } from '../actions/Devices';
import { addStream } from '../actions/Streams';
import { bindActionCreators } from 'redux';
import { calculateDistance } from '../utils/utils';
import { setDetectionStatus } from '../actions/Collisions';

class Canvas extends React.Component {

  constructor(props) {
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.draw = this.draw.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.mouseDown = false;
    this.selectedNodeId = null;
  }
  
  componentDidMount() {
    this.canvasContext = this.refs.canvas.getContext('2d');
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  onMouseMove(event) {
    event.preventDefault();
    if (!this.mouseDown) {
      return;
    }
    if (this.props.devices.streams) {
      let streams = this.props.streams;
      if (!streams.length) {
        return;
      }
      let stream = streams[streams.length - 1];
      stream.onMouseMove(event);
    } else if (!this.props.devices.nodes && !this.props.devices.midiNodes) {
      this.props.setNodePosition(this.selectedNodeId, [event.pageX, event.pageY]);
    }
  }

  onMouseDown(event) {
    event.preventDefault();
    this.mouseDown = true;

    // Streams
    if (this.props.devices.streams) {
      this.props.addStream([event.pageX, event.pageY], event);

    // Nodes
    } else if (this.props.devices.nodes) {
      this.props.addNode([event.pageX, event.pageY], this.props.audioContext);

    // MIDI Nodes
    } else if (this.props.devices.midiNodes) {
      this.props.addMidiNode([event.pageX, event.pageY], this.props.midiContext);

    // Select Node
    } else {
      this.props.nodes.forEach((node) => {
        let distance = calculateDistance(node.position, [event.pageX, event.pageY]);
        if (distance <= config.app.doubleClickDistance) {
          this.selectedNodeId = node.id;
        }
      });
    }
  }

  onMouseUp(event) {
    event.preventDefault();
    this.mouseDown = false;
    this.selectedNodeId = null;
    if (this.props.devices.streams) {
      let streams = this.props.streams;
      let stream = streams[streams.length - 1];
      stream.onMouseUp(event);
    }
  }

  onDoubleClick(event) {
    this.props.nodes.forEach((node) => {
      let distance = calculateDistance(node.position, [event.pageX, event.pageY]);
      if (distance <= config.app.doubleClickDistance) {
        this.props.showNodeSettings(node.id);
      }
    });
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

    if (!this.props.collisions.calculating) {
      this.props.setDetectionStatus(true);
      setTimeout(() => {
        this.props.detectCollisions(this.props.streams);
        this.props.setDetectionStatus(false);
      }, 0);
    }

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
        onDoubleClick={this.onDoubleClick}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    devices: state.Devices,
    nodes: state.Nodes,
    streams: state.Streams,
    collisions: state.Collisions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNode: bindActionCreators(addNode, dispatch),
    addMidiNode: bindActionCreators(addMidiNode, dispatch),
    addStream: bindActionCreators(addStream, dispatch),
    detectCollisions: bindActionCreators(detectCollisions, dispatch),
    showNodeSettings: bindActionCreators(showNodeSettings, dispatch),
    setNodePosition: bindActionCreators(setNodePosition, dispatch),
    setDetectionStatus: bindActionCreators(setDetectionStatus, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Canvas);
