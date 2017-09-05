import React from 'react';
import './Transport.css';
import PlayButton from './PlayButton';
import { connect } from 'react-redux';

class Transport extends React.Component {
  render() {
    let fpsCount = this.props.transport.fpsCount || 0;
    fpsCount = parseFloat(fpsCount).toFixed(2);
    return (
      <div className="transport-container">
        <div className="transport-stats">
          <div>Nodes: {this.props.nodes.length}</div>
          <div>Streams: {this.props.streams.length}</div>
        </div>
        <PlayButton/>
        <div className="transport-fps-count">
          FPS: {fpsCount}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes,
    streams: state.streams,
    transport: state.transport
  };
};

module.exports = connect(mapStateToProps)(Transport);
