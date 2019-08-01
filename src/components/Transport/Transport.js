import React from 'react';
import './Transport.css';
import PlayButton from './PlayButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Transport extends React.Component {
  static propTypes = {
    nodes: PropTypes.array,
    streams: PropTypes.array,
    transport: PropTypes.object,
  }

  render() {
    let fpsCount = this.props.transport.fpsCount || 0;
    fpsCount = parseFloat(fpsCount).toFixed(2);
    return (
      <div className="transport-container">
        <img alt="logo" src="img/logo-white.png" />
        <PlayButton />
        <div className="transport-stats">
          <div>Nodes: {this.props.nodes.length}</div>
          <div>Streams: {this.props.streams.length}</div>
          <div className="transport-fps-count">FPS: {fpsCount}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    nodes: state.nodes,
    streams: state.streams,
    transport: state.transport,
  };
};

export default connect(mapStateToProps)(Transport);
