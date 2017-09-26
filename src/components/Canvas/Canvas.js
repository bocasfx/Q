import React from 'react';
import './Canvas.css';
import _ from 'lodash';
import config from '../../config/config';
import { connect } from 'react-redux';
import { addFreehandStream, addCircularStream, addLinearStream, updateStreamPositionByDelta, deselectStreams } from '../../actions/Streams';
import { updateFPSCount } from '../../actions/Transport';
import { bindActionCreators } from 'redux';
import { calculateDistance, getPosition, calculateNodeBorderDistance, timestamp, getNodeById, getNodesWithinDistance } from '../../utils/utils';
import { addSynthNode,
  addMidiNode,
  addAudioNode,
  selectNode,
  deselectNodes,
  cloneNode,
  linkNodes,
  unlinkNodes,
  enqueueParticle,
  dequeueParticle,
  playNode,
  stopNode,
  updateSelectedNodePositionByDelta,
  updateNodePositionByDelta } from '../../actions/Nodes';

class Canvas extends React.Component {

  constructor(props) {
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseUpOrLeaveHandler = this.onMouseUpOrLeaveHandler.bind(this);
    this.selectNode = this.selectNode.bind(this);
    this.draw = this.draw.bind(this);
    this.flow = this.flow.bind(this);
    this.dummyFlow = this.dummyFlow.bind(this);

    this.calculating = false;
    this.linkSrc = null;
    this.linkPosition = null;

    this.linkAnchorImg = new Image();
    this.linkAnchorImg.src = './icons/elements/link-anchor.png';

    this.now = null;
    this.dt = 0;
    this.last = timestamp();
    this.fps = 60;
    this.step = 1 / this.fps;

    this.framesThisSecond = 0;
    this.lastFpsUpdate = 0;
    this.fpsCount = 60;

    this.canvasPosition = null;
    this.backgroundX = 0;
    this.backgroundY = 0;

    this.state = {
      mouseDown: false
    };
  }
  
  componentDidMount() {
    this.canvasContext = this.refs.canvas.getContext('2d');
    this.draw();
    this.flow();
  }

  onMouseDown(event) {
    event.preventDefault();
    this.setState({mouseDown: true});

    let position = getPosition(event);
    this.canvasPosition = position;

    if (this.props.devices.streams) {
      this.props.deselectStreams();
      this.props.addFreehandStream(position, event);
      this.props.deselectNodes();
    } else if (this.props.devices.circularStreams) {
      this.props.deselectStreams();
      this.props.addCircularStream(position, event);
      this.props.deselectNodes();
    } else if (this.props.devices.linearStreams) {
      this.props.deselectStreams();
      this.props.addLinearStream(position, event);
      this.props.deselectNodes();
    } else if (this.props.devices.link || this.props.devices.unlink) {
      this.linkPosition = position;
      this.initiateNodeLink(position);
    } else if (this.props.devices.synthNodes || this.props.devices.midiNodes || this.props.devices.audioNodes) {
      this.addNode(position);
      this.selectNode(position, event.metaKey);
      this.props.deselectStreams();
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
      let dx = position[0] - this.canvasPosition[0];
      let dy = position[1] - this.canvasPosition[1];
      if (this.getSelectedNodeCount()) {
        this.props.updateSelectedNodePositionByDelta(dx, dy);
      } else if (event.metaKey) {
        this.backgroundX += dx;
        this.backgroundY += dy;
        this.props.updateNodePositionByDelta(dx, dy);
        this.props.updateStreamPositionByDelta(dx, dy);
      }
      this.canvasPosition = position;
    }
  }

  onMouseUp(event) {
    event.preventDefault();
    this.onMouseUpOrLeaveHandler(event);
  }

  onMouseLeave(event) {
    if (this.state.mouseDown) {
      this.onMouseUpOrLeaveHandler(event);
    }
  }

  onMouseUpOrLeaveHandler(event) {
    this.setState({mouseDown: false});
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

  getSelectedNodeCount() {
    let selectedCount = 0;
    this.props.nodes.forEach((node) => {
      if (node.selected) {
        selectedCount++;
      }
    });
    return selectedCount;
  }

  addNode(position) {
    // Synth Nodes
    if (this.props.devices.synthNodes) {
      this.props.addSynthNode(position);

    // MIDI Nodes
    } else if (this.props.devices.midiNodes) {
      this.props.addMidiNode(position);

    // Audio Nodes
    } else if (this.props.devices.audioNodes) {
      this.props.addAudioNode(position);
    }
  }

  selectNode(position, metaKey) {
    setTimeout(() => {
      this.props.deselectStreams();
      let selectedNodes = this.getSelectedNodeCount();
      if (!metaKey && selectedNodes === 1) {
        this.props.deselectNodes();
      }
      let selectionChanged = false;
      let alreadySelected = false;

      let matches = getNodesWithinDistance(this.props.nodes, position);

      if (!matches.length) {
        this.props.deselectNodes();
        return;
      }

      let node = matches[0];

      if (node.selected) {
        alreadySelected = true;
      } else {
        this.props.selectNode(node.id);
        selectionChanged = true;
        selectedNodes++;
      }

      if (!selectionChanged && !alreadySelected) {
        this.props.deselectNodes();
      }
    }, 0);
  }

  cloneNode(position) {
    this.props.nodes.forEach((node) => {
      let distance = calculateDistance(node.position, position);
      if (distance <= config.app.doubleClickDistance) {
        this.props.cloneNode(node.id);
      }
    });
  }

  initiateNodeLink(position) {
    this.props.nodes.forEach((node) => {
      let distance = calculateDistance(node.position, position);
      if (distance <= config.app.doubleClickDistance) {
        this.linkSrc = node.id;
      }
    });
  }

  finalizeNodeLink(position, unlink = false) {
    this.props.nodes.forEach((node) => {
      let distance = calculateDistance(node.position, position);
      if (distance <= config.app.doubleClickDistance) {
        if (this.linkSrc !== node.id) {
          if (unlink) {
            this.props.unlinkNodes(this.linkSrc, node.id);
          } else {
            this.props.linkNodes(this.linkSrc, node.id);
          }
        }
      }
    });
  }

  playLinks(nodeId, rootId, particleId, checkForRoot) {
    let node = getNodeById(this.props.nodes, nodeId);
    if (!node.links.length) {
      return;
    }
    if (checkForRoot && node.id === rootId) {
      return;
    }
    node.links.forEach((linkId) => {
      let link = getNodeById(this.props.nodes, linkId);
      setTimeout(() => {
        this.props.playNode(linkId);
        this.playLinks(linkId, rootId, particleId, true);
      }, link.lag);
    });
  };

  stopLinks(nodeId, rootId, particleId, checkForRoot) {
    let node = getNodeById(this.props.nodes, nodeId);
    if (!node.links.length) {
      return;
    }
    if (checkForRoot && node.id === rootId) {
      return;
    }
    node.links.forEach((linkId) => {
      let link = getNodeById(this.props.nodes, linkId);
      setTimeout(() => {
        this.props.stopNode(link.id);
        this.stopLinks(linkId, rootId, particleId, true);
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
              this.playLinks(node.id, node.id, particle.id, false);
            }
          } else {
            if (node.isParticleQueued(particle.id)) {
              this.props.dequeueParticle(node.id, particle.id);
              this.stopLinks(node.id, node.id, particle.id, false);
            }
          }
        });
      });
    });
  };

  dummyFlow() {
    if (this.props && this.props.transport && this.props.transport.playing) {
      this.flow();
      return;
    }
    this.draw();

    // Freehand streams must flow when they are being created
    // even if the app is not currently playing.
    this.now = timestamp();
    this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000);
    while (this.dt > this.step) {
      this.dt = this.dt - this.step;
      this.props.streams.forEach((stream) => {
        if (stream.creating) {
          stream.flow();
        }
      });
    }
    this.last = this.now;
    setTimeout(this.dummyFlow);
  }

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
            this.stopLinks(node.id, node.id, particle.id, false);
          });
        });
      });
      setTimeout(this.dummyFlow);
      return;
    }

    if (this.now > this.lastFpsUpdate + 1000) { // update every second
        this.fpsCount = 0.25 * this.framesThisSecond + (1 - 0.25) * this.fps; // compute the new FPS
 
        this.lastFpsUpdate = this.now;
        this.framesThisSecond = 0;
    }
    this.framesThisSecond++;

    this.props.updateFPSCount(this.fpsCount);

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

    node.links.forEach((linkId) => {
      let destNode = getNodeById(this.props.nodes, linkId);

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

    let linkedNode = getNodeById(this.props.nodes, this.linkSrc);

    let startPoint = calculateNodeBorderDistance(linkedNode.position, this.linkPosition);

    this.canvasContext.moveTo(startPoint[0], startPoint[1]);
    this.canvasContext.drawImage(this.linkAnchorImg, linkedNode.position[0] - 7, linkedNode.position[1] - 7);
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
    let canvasStyle = {
      cursor: 'crosshair',
      backgroundPosition: this.backgroundX + 'px ' + this.backgroundY + 'px'
    };

    if (this.props.devices.grab) {
      if (this.state.mouseDown) {
        canvasStyle.cursor = '-webkit-grabbing';
      } else {
        canvasStyle.cursor = '-webkit-grab';
      }
    }

    return (
      <canvas
        draggable="true"
        ref="canvas"
        width={this.props.app.width - config.controlPanel.width - config.menu.width}
        height={this.props.app.height - config.fxPanel.height - config.transport.height}
        onMouseMove={this.onMouseMove}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseLeave={this.onMouseLeave}
        style={canvasStyle}
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
    transport: state.transport,
    app: state.app
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
    linkNodes: bindActionCreators(linkNodes, dispatch),
    unlinkNodes: bindActionCreators(unlinkNodes, dispatch),
    enqueueParticle: bindActionCreators(enqueueParticle, dispatch),
    dequeueParticle: bindActionCreators(dequeueParticle, dispatch),
    playNode: bindActionCreators(playNode, dispatch),
    stopNode: bindActionCreators(stopNode, dispatch),
    updateSelectedNodePositionByDelta: bindActionCreators(updateSelectedNodePositionByDelta, dispatch),
    updateNodePositionByDelta: bindActionCreators(updateNodePositionByDelta, dispatch),
    updateStreamPositionByDelta: bindActionCreators(updateStreamPositionByDelta, dispatch),
    updateFPSCount: bindActionCreators(updateFPSCount, dispatch),
    deselectStreams: bindActionCreators(deselectStreams, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Canvas);
