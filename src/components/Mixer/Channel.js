import React from 'react';
import './Channel.css';
import LED from './LED';
import Fader from './Fader';
import Knob from './Knob';
import FileButton from './FileButton';

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.renderKnobs = this.renderKnobs.bind(this);
  }

  renderKnobs() {
    if (this.props.type === 'synth') {
      return (
        <div>
          <Knob label="Distortion"/>
          <Knob label="Frequency"/>
          <Knob label="Attack"/>
        </div>
      );
    } else if (this.props.type === 'audio') {
      return <FileButton node={this.props.node}/>;
    }
  }
  render() {
    return (
      <div className="channel-container">
        <LED on={this.props.node.active} type={this.props.type}/>
        {this.renderKnobs()}
        <Fader node={this.props.node}/>
      </div>
    );
  }
}

module.exports = Channel;
