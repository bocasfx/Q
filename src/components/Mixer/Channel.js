import React from 'react';
import './Channel.css';
import LED from './LED';
import Fader from './Fader';
import Knob from './Knob';

class Channel extends React.Component {
  render() {
    return (
      <div className="channel-container">
        <LED on={this.props.node.active} type={this.props.type}/>
        <Knob/>
        <Knob/>
        <Knob/>
        <Fader/>
      </div>
    );
  }
}

module.exports = Channel;
