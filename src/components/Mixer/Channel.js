import React from 'react';
import './Channel.css';
import LED from './LED';

class Channel extends React.Component {
  render() {
    return (
      <div className="channel-container">
        <LED nodeId={this.props.node.id}/>
      </div>
    );
  }
}

module.exports = Channel;
