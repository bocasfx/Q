import React from 'react';
import './Canvas.css';
import _ from 'lodash';
import config from '../config/config';
import { connect } from 'react-redux';
import { addStream } from '../actions/Streams';
import { bindActionCreators } from 'redux';
import { calculateDistance, getPosition } from '../utils/utils';
import { addSynthNode,
  addMidiNode,
  addAudioNode,
  setNodePosition,
  selectNode,
  deselectNodes,
  cloneNode,
  linkNodes,
  enqueueParticle,
  dequeueParticle,
  playNode,
  stopNode } from '../actions/Nodes';

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

    this.linkSrc = null;
    this.linkPosition = null;

    this.linkAnchorImg = new Image();
    this.linkAnchorImg.src = './icons/elements/link-anchor.png';
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
    } else if (this.props.devices.link) {
      this.linkPosition = getPosition(event);
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
      this.linkPosition = position;
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
      this.linkSrc = null;
      this.linkPosition = null;
    }
  }

  addNode(position) {
    // Synth Nodes
    if (this.props.devices.synthNodes) {
      this.props.addSynthNode(position);

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
        this.linkSrc = node;
      }
    });
  }

  finalizeNodeLink(position) {
    this.props.nodes.forEach((node) => {
      let distance = calculateDistance(node.position, position);
      if (distance <= config.app.doubleClickDistance) {
        this.props.linkNodes(this.linkSrc.id, node.id);
      }
    });
  }

  playLinks(node, rootId, particleId, checkForRoot) {
    if (!node.links.length) {
      return;
    }
    if (checkForRoot && node.id === rootId) {
      return;
    }
    node.links.forEach((link) => {
      setTimeout(() => {
        this.props.playNode(link.id);
        this.playLinks(link, rootId, particleId, true);
      }, link.linkDelay);
    });
  };

  stopLinks(node, rootId, particleId, checkForRoot) {
    if (!node.links.length) {
      return;
    }
    if (checkForRoot && node.id === rootId) {
      return;
    }
    node.links.forEach((link) => {
      setTimeout(() => {
        this.props.stopNode(link.id);
        this.stopLinks(link, rootId, particleId, true);
      }, link.linkDelay);
    });
  };

  detectCollisions() {
    if (!this.props.streams.length || !this.props.nodes.length) {
      return;
    }
    this.props.nodes.forEach((node) => {
      this.props.streams.forEach((stream) => {
        stream.particles.forEach((particle) => {
          let distance = calculateDistance(node.position, particle.position);
          if (distance <= config.app.collisionDistance) {
            if (!node.isParticleQueued(particle.id)) {
              this.props.enqueueParticle(node.id, particle.id);
              this.playLinks(node, node.id, particle.id, false);
            }
          } else {
            if (node.isParticleQueued(particle.id)) {
              this.props.dequeueParticle(node.id, particle.id);
              this.stopLinks(node, node.id, particle.id, false);
            }
          }
        });
      });
    });
  };

  flow() {
    this.props.streams.forEach((stream) => {
      stream.flow();
    });

    this.detectCollisions();

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
    this.canvasContext.setLineDash(config.link.lineDash);

    node.links.forEach((link) => {
      let destNode = _.find(this.props.nodes, (nodeObj) => {
        return nodeObj.id === link.id;
      });
      this.canvasContext.moveTo(node.position[0], node.position[1]);
      this.canvasContext.drawImage(this.linkAnchorImg, node.position[0] - 7.5, node.position[1] - 7.5);
      this.canvasContext.lineTo(destNode.position[0], destNode.position[1]);
      this.canvasContext.drawImage(this.linkAnchorImg, destNode.position[0] - 7.5, destNode.position[1] - 7.5);
    });

    this.canvasContext.stroke();
  }

  renderLinkHandle() {
    if (!this.linkSrc || !this.linkPosition) {
      return;
    }

    this.canvasContext.beginPath();
    this.canvasContext.strokeStyle = config.link.strokeStyle;
    this.canvasContext.lineWidth = config.link.lineWidth;
    this.canvasContext.setLineDash(config.link.lineDash);

    this.canvasContext.moveTo(this.linkSrc.position[0], this.linkSrc.position[1]);
    this.canvasContext.drawImage(this.linkAnchorImg, this.linkSrc.position[0] - 7.5, this.linkSrc.position[1] - 7.5);
    this.canvasContext.lineTo(this.linkPosition[0], this.linkPosition[1]);
    this.canvasContext.stroke();
  }

  draw() {
    this.canvasContext.fillStyle = config.canvas.backgroundColor;
    this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
    this.canvasContext.fillRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);

    this.props.streams.forEach((stream) => {
      stream.render(this.canvasContext);
    });

    this.renderLinkHandle();

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
    setNodePosition: bindActionCreators(setNodePosition, dispatch),
    linkNodes: bindActionCreators(linkNodes, dispatch),
    enqueueParticle: bindActionCreators(enqueueParticle, dispatch),
    dequeueParticle: bindActionCreators(dequeueParticle, dispatch),
    playNode: bindActionCreators(playNode, dispatch),
    stopNode: bindActionCreators(stopNode, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Canvas);
