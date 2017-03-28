import React from 'react';
import './Channel.css';
import LED from './LED';

class Channel extends React.Component {
  render() {
    return (
      <div className="channel-container">
        <LED on={this.props.node.active}/>
      </div>
    );
  }
}

module.exports = Channel;
