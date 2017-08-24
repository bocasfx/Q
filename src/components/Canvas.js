import React from 'react';
import './Canvas.css';
import _ from 'lodash';
import config from '../config/config';
import { connect } from 'react-redux';
import { addFreehandStream, addCircularStream, addLinearStream } from '../actions/Streams';
import { bindActionCreators } from 'redux';
import { calculateDistance, getPosition, calculateNodeBorderDistance, timestamp } from '../utils/utils';
import { addSynthNode,
  addMidiNode,
  addAudioNode,
  setNodePosition,
  selectNode,
  deselectNodes,
  cloneNode,
  linkNodes,
  unlinkNodes,
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
    this.selectNode = this.selectNode.bind(this);
    this.draw = this.draw.bind(this);
    this.flow = this.flow.bind(this);

    this.selectedNodeId = null;
    this.calculating = false;
    this.linkSrc = null;
    this.linkPosition = null;

    this.linkAnchorImg = new Image();
    this.linkAnchorImg.src = './icons/elements/link-anchor.png';

    this.now = null;
    this.dt = 0;
    this.last = timestamp();
    this.step = 1 / 60;

    this.state = {
      mouseDown: false
    };
  }
  
  componentDidMount() {
    this.canvasContext = this.refs.canvas.getContext('2d');
    this.executedAt = Date.now();
    this.draw();
    this.flow();
  }

  onMouseDown(event) {
    event.preventDefault();
    this.setState({mouseDown: true});

    let position = getPosition(event);

    if (this.props.devices.streams) {
      this.props.addFreehandStream(position, event);
    } else if (this.props.devices.circularStreams) {
      this.props.addCircularStream(position, event);
    } else if (this.props.devices.linearStreams) {
      this.props.addLinearStream(position, event);
    } else if (this.props.devices.link || this.props.devices.unlink) {
      this.linkPosition = position;
      this.initiateNodeLink(position);
    } else if (this.props.devices.synthNodes || this.props.devices.midiNodes || this.props.devices.audioNodes) {
      this.addNode(position);
      this.selectNode(position, event.metaKey);
    } else if (this.props.devices.grab) {
      this.selectNode(position, event.metaKey);
    } else if (this.props.devices.clone) {
      this.cloneNode(position);
    }
  }

  onMouseMove(event) {
    event.preventDefault();
    if (!this.state.mouseDown) {
      return;
    }
    if (this.props.devices.streams || this.props.devices.circularStreams || this.props.devices.linearStreams) {
      let streams = this.props.streams;
      if (!streams.length) {
        return;
      }
      let stream = streams[streams.length - 1];
      stream.onMouseMove(event);
    } else if (this.props.devices.link || this.props.devices.unlink) {
      this.linkPosition = getPosition(event);
    } else if (!this.props.devices.synthNodes && !this.props.devices.midiNodes && !this.props.devices.audioNodes) {
      let position = getPosition(event);
      this.props.setNodePosition(this.selectedNodeId, position);
    }
  }

  onMouseUp(event) {
    event.preventDefault();
    this.setState({mouseDown: false});
    this.selectedNodeId = null;
    if (this.props.devices.streams || this.props.devices.circularStreams || this.props.devices.linearStreams) {
      let streams = this.props.streams;
      let stream = streams[streams.length - 1];
      stream.onMouseUp(event);
    } else if (this.props.devices.link) {
      let position = getPosition(event);
      this.finalizeNodeLink(position);
      this.linkSrc = null;
      this.linkPosition = null;
    } else if (this.props.devices.unlink) {
      let position = getPosition(event);
      this.finalizeNodeLink(position, true);
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
          if (!metaKey) {
            this.props.deselectNodes();
          }
          this.props.selectNode(node.id);
        }
      });

      if (!selectedNodeId && !this.props.devices.streams) {
        this.props.deselectNodes();
        return;
      }
      
      this.selectedNodeId = selectedNodeId;
    }, 0);
  }

  cloneNode(position) {
    let selectedNodeId = null;
    this.props.nodes.forEach((node) => {
      let distance = calculateDistance(node.position, position);
      if (distance <= config.app.doubleClickDistance) {
        selectedNodeId = node.id;
        this.props.cloneNode(selectedNodeId);
      }
    });
  }

  initiateNodeLink(position) {
    this.props.nodes.forEach((node) => {
      let distance = calculateDistance(node.position, position);
      if (distance <= config.app.doubleClickDistance) {
        this.linkSrc = node;
      }
    });
  }

  finalizeNodeLink(position, unlink = false) {
    this.props.nodes.forEach((node) => {
      let distance = calculateDistance(node.position, position);
      if (distance <= config.app.doubleClickDistance) {
        if (this.linkSrc && this.linkSrc.id !== node.id) {
          if (unlink) {
            this.props.unlinkNodes(this.linkSrc.id, node.id);
          } else {
            this.props.linkNodes(this.linkSrc.id, node.id);
          }
        }
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
      }, link.lag);
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
      }, link.lag);
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
    if (!this.props.transport || !this.props.transport.playing) {
      // Transport is paused
      // Draw changes (new/delete nodes/streams)
      // Stop links
      this.draw();
      this.now = timestamp();
      this.last = this.now;
      this.props.nodes.forEach((node) => {
        this.props.streams.forEach((stream) => {
          stream.particles.forEach((particle) => {
            this.stopLinks(node, node.id, particle.id, false);
          });
        });
      });
      setTimeout(this.flow);
      return;
    }

    this.now = timestamp();
    this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000);

    while (this.dt > this.step) {
      this.dt = this.dt - this.step;

      this.props.streams.forEach((stream) => {
        stream.flow();
      });

      this.detectCollisions();
    }

    // No need to render when the mixer is visible.
    if (!this.props.devices.mixer) {
      this.draw();
    }

    this.last = this.now;

    setTimeout(this.flow);
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

      let startPoint = calculateNodeBorderDistance(node.position, destNode.position);
      let endPoint = calculateNodeBorderDistance(destNode.position, node.position);

      this.canvasContext.moveTo(startPoint[0], startPoint[1]);
      this.canvasContext.drawImage(this.linkAnchorImg, node.position[0] - 7.5, node.position[1] - 7.5);
      this.canvasContext.lineTo(endPoint[0], endPoint[1]);
      this.canvasContext.drawImage(this.linkAnchorImg, destNode.position[0] - 7.5, destNode.position[1] - 7.5);
    });

    this.canvasContext.stroke();
  }

  renderLinkHandle() {
    if (!this.linkSrc || !this.linkPosition) {
      return;
    }

    this.canvasContext.beginPath();
    this.canvasContext.strokeStyle = this.props.devices.link ? config.link.strokeStyle : config.unlink.strokeStyle;
    this.canvasContext.lineWidth = config.link.lineWidth;
    this.canvasContext.setLineDash(config.link.lineDash);

    let startPoint = calculateNodeBorderDistance(this.linkSrc.position, this.linkPosition);

    this.canvasContext.moveTo(startPoint[0], startPoint[1]);
    this.canvasContext.drawImage(this.linkAnchorImg, this.linkSrc.position[0] - 7, this.linkSrc.position[1] - 7);
    this.canvasContext.lineTo(this.linkPosition[0], this.linkPosition[1]);
    this.canvasContext.stroke();
  }

  draw() {
    this.canvasContext.fillStyle = config.canvas.backgroundColor;
    this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
    this.canvasContext.fillRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);

    this.props.nodes.forEach((node) => {
      this.renderLinks(node);
    });

    this.renderLinkHandle();

    this.props.streams.forEach((stream) => {
      stream.render(this.canvasContext);
    });

    this.props.nodes.forEach((node) => {
      node.render(this.canvasContext);
    });
  }

  render() {
    let cursorStyle = {
      cursor: 'crosshair'
    };

    if (this.props.devices.grab) {
      if (this.state.mouseDown) {
        cursorStyle = {
          cursor: '-webkit-grabbing'
        };
      } else {
        cursorStyle = {
          cursor: '-webkit-grab'
        };
      }
    }

    return (
      <canvas
        draggable="true"
        ref="canvas"
        width={window.innerWidth - config.controlPanel.width - config.menu.width}
        height={window.innerHeight}
        onMouseMove={this.onMouseMove}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        style={cursorStyle}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    devices: state.devices,
    nodes: state.nodes,
    streams: state.streams,
    collisions: state.Collisions,
    transport: state.transport
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
    addFreehandStream: bindActionCreators(addFreehandStream, dispatch),
    addCircularStream: bindActionCreators(addCircularStream, dispatch),
    addLinearStream: bindActionCreators(addLinearStream, dispatch),
    setNodePosition: bindActionCreators(setNodePosition, dispatch),
    linkNodes: bindActionCreators(linkNodes, dispatch),
    unlinkNodes: bindActionCreators(unlinkNodes, dispatch),
    enqueueParticle: bindActionCreators(enqueueParticle, dispatch),
    dequeueParticle: bindActionCreators(dequeueParticle, dispatch),
    playNode: bindActionCreators(playNode, dispatch),
    stopNode: bindActionCreators(stopNode, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Canvas);
