import React from 'react';
import './Channel.css';
import LED from './LED';
import Fader from './Fader';

class Channel extends React.Component {
  render() {
    return (
      <div className="channel-container">
        <LED on={this.props.node.active} type={this.props.type}/>
        <Fader node={this.props.node}/>
      </div>
    );
  }
}

module.exports = Channel;
