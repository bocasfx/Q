import React from 'react';
import './Canvas.css';
import config from '../config/config';
import { connect } from 'react-redux';
import { addSynthNode, addMidiNode, addAudioNode, detectCollisions, setNodePosition, selectNode, deselectNodes, cloneNode } from '../actions/Nodes';
import { addStream } from '../actions/Streams';
import { bindActionCreators } from 'redux';
import { calculateDistance } from '../utils/utils';

class Canvas extends React.Component {

  constructor(props) {
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.setCursorStyle = this.setCursorStyle.bind(this);
    this.selectNode = this.selectNode.bind(this);

    this.draw = this.draw.bind(this);
    this.flow = this.flow.bind(this);
    this.mouseDown = false;
    this.selectedNodeId = null;
    this.calculating = false;
    this.cursorStyle = {
      cursor: 'crosshair'
    };
  }
  
  componentDidMount() {
    this.canvasContext = this.refs.canvas.getContext('2d');
    requestAnimationFrame(() => {
      this.flow();
    });
  }

  setCursorStyle() {

    if (this.props.devices.streams ||
        this.props.devices.synthNodes ||
        this.props.devices.midiNodes ||
        this.props.devices.audioNodes) {
      this.cursorStyle = {
        cursor: 'crosshair'
      };
    } else if (this.mouseDown) {
      this.cursorStyle = {
        cursor: '-webkit-grabbing'
      };
    } else {
      this.cursorStyle = {
        cursor: '-webkit-grab'
      };
    }
    
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
    } else if (!this.props.devices.synthNodes && !this.props.devices.midiNodes && !this.props.devices.audioNodes) {
      this.props.setNodePosition(this.selectedNodeId, [event.pageX, event.pageY]);
    }
  }

  onMouseDown(event) {
    event.preventDefault();
    this.mouseDown = true;
    this.setCursorStyle();

    let x = event.pageX;
    let y = event.pageY;

    let position = [x, y];

    if (this.props.devices.streams) {
      this.props.addStream(position, event);
    } else if (!event.metaKey) {
      this.addNode(position);
    }

    this.selectNode([x, y], event.metaKey);
  }

  onMouseUp(event) {
    event.preventDefault();
    this.mouseDown = false;
    this.selectedNodeId = null;
    this.setCursorStyle();
    if (this.props.devices.streams) {
      let streams = this.props.streams;
      let stream = streams[streams.length - 1];
      stream.onMouseUp(event);
    }
  }

  addNode(position) {
    // Synth Nodes
    if (this.props.devices.synthNodes) {
      this.props.addSynthNode(position, this.props.audioContext);

    // MIDI Nodes
    } else if (this.props.devices.midiNodes) {
      this.props.addMidiNode(position, this.props.midiContext);

    // Audio Nodes
    } else if (this.props.devices.audioNodes) {
      this.props.addAudioNode(position);
    }
  }

  selectNode(position, metaKey) {
    setTimeout(() => {
      let selectedNodeId = null;
      this.props.nodes.forEach((node) => {
        let distance = calculateDistance(node.position, position);
        if (distance <= config.app.doubleClickDistance) {
          selectedNodeId = node.id;
          if (!node.selected) {
            this.props.selectNode(node.id);
          }
        }
      });

      if (!selectedNodeId && !this.props.devices.streams) {
        this.props.deselectNodes();
        return;
      }

      if (metaKey) {
        this.props.cloneNode(selectedNodeId);
      }
      
      this.selectedNodeId = selectedNodeId;
    }, 0);
  }

  flow() {
    this.props.streams.forEach((stream) => {
      stream.flow();
    });
    if (!this.calculating) {
      this.calculating = true;
      setTimeout(() => {
        this.props.detectCollisions(this.props.streams);
        this.calculating = false;
      }, 0);
    }

    // No need to render when the mixer is visible.
    if (!this.props.devices.mixer) {
      this.draw();
    } else {
      requestAnimationFrame(() => {
        this.flow();
      });
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

    requestAnimationFrame(() => {
      this.flow();
    });
  }

  render() {
    this.setCursorStyle();
    return (
      <canvas
        draggable="true"
        ref="canvas"
        width={window.innerWidth - config.controlPanel.width}
        height={window.innerHeight - config.menu.height}
        onMouseMove={this.onMouseMove}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        style={this.cursorStyle}
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
    addSynthNode: bindActionCreators(addSynthNode, dispatch),
    addMidiNode: bindActionCreators(addMidiNode, dispatch),
    addAudioNode: bindActionCreators(addAudioNode, dispatch),
    selectNode: bindActionCreators(selectNode, dispatch),
    cloneNode: bindActionCreators(cloneNode, dispatch),
    deselectNodes: bindActionCreators(deselectNodes, dispatch),
    addStream: bindActionCreators(addStream, dispatch),
    detectCollisions: bindActionCreators(detectCollisions, dispatch),
    setNodePosition: bindActionCreators(setNodePosition, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Canvas);
