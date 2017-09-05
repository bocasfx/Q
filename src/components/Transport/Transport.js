import React from 'react';
import './Transport.css';
import PlayButton from './PlayButton';
import { connect } from 'react-redux';

class Transport extends React.Component {
  render() {
    return (
      <div className="transport-container">
        <div className="transport-stats">
          <div>Nodes: {this.props.nodes.length}</div>
          <div>Streams: {this.props.streams.length}</div>
        </div>
        <PlayButton/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes,
    streams: state.streams
  };
};

module.exports = connect(mapStateToProps)(Transport);
