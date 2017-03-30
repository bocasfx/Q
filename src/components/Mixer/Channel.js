import React from 'react';
import './Channel.css';
import LED from './LED';
import Fader from './Fader';
import Knob from './Knob';

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.renderKnobs = this.renderKnobs.bind(this);
  }

  renderKnobs() {
    if (this.props.type === 'audio') {
      return (
        <div>
          <Knob label="Distortion"/>
          <Knob label="Frequency"/>
          <Knob label="Attack"/>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="channel-container">
        <LED on={this.props.node.active} type={this.props.type}/>
        {this.renderKnobs()}
        <Fader/>
      </div>
    );
  }
}

module.exports = Channel;
