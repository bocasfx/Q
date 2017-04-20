import React from 'react';
import './Canvas.css';
import _ from 'lodash';
import config from '../config/config';
import { connect } from 'react-redux';
import { addStream } from '../actions/Streams';
import { bindActionCreators } from 'redux';
import { calculateDistance, getPosition } from '../utils/utils';
import {
  addSynthNode,
  addMidiNode,
  addAudioNode,
  detectCollisions,
  setNodePosition,
  selectNode,
  deselectNodes,
  cloneNode,
  linkNodes } from '../actions/Nodes';

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

    this.linkSrcId = '';
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
        this.props.devices.audioNodes ||
        this.props.devices.link) {
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
      let position = getPosition(event);
      this.props.setNodePosition(this.selectedNodeId, position);
    }
  }

  onMouseDown(event) {
    event.preventDefault();
    this.mouseDown = true;
    this.setCursorStyle();

    let position = getPosition(event);

    if (this.props.devices.streams) {
      this.props.addStream(position, event);
    } else if (this.props.devices.link) {
      this.initiateNodeLink(position);
    } else if (this.props.devices.synthNodes || this.props.devices.midiNodes || this.props.devices.audioNodes) {
      this.addNode(position);
      this.selectNode(position, event.metaKey);
    } else if (!event.metaKey) {
      this.selectNode(position, event.metaKey);
    }
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
    } else if (this.props.devices.link) {
      let position = getPosition(event);
      this.finalizeNodeLink(position);
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

  initiateNodeLink(position) {
    this.props.nodes.forEach((node) => {
      let distance = calculateDistance(node.position, position);
      if (distance <= config.app.doubleClickDistance) {
        this.linkSrcId = node.id;
      }
    });
  }

  finalizeNodeLink(position) {
    this.props.nodes.forEach((node) => {
      let distance = calculateDistance(node.position, position);
      if (distance <= config.app.doubleClickDistance) {
        this.props.linkNodes(this.linkSrcId, node.id);
      }
    });
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

  renderLinks(node) {

    this.canvasContext.beginPath();
    this.canvasContext.strokeStyle = config.link.strokeStyle;
    this.canvasContext.lineWidth = config.link.lineWidth;

    node.links.forEach((link) => {
      let destNode = _.find(this.props.nodes, (nodeObj) => {
        return nodeObj.id === link;
      });
      this.canvasContext.moveTo(node.position[0], node.position[1]);
      this.canvasContext.lineTo(destNode.position[0], destNode.position[1]);
    });

    this.canvasContext.stroke();
  }

  draw() {
    this.canvasContext.fillStyle = config.canvas.backgroundColor;
    this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
    this.canvasContext.fillRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);

    this.props.streams.forEach((stream) => {
      stream.render(this.canvasContext);
    });

    this.props.nodes.forEach((node) => {
      this.renderLinks(node);
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
        width={window.innerWidth - config.controlPanel.width - config.menu.width}
        height={window.innerHeight}
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
    setNodePosition: bindActionCreators(setNodePosition, dispatch),
    linkNodes: bindActionCreators(linkNodes, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Canvas);
