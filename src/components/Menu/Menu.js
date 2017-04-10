import React from 'react';
import './Menu.css';
import StreamButton from './StreamButton';
import SynthNodeButton from './SynthNodeButton';
import MidiNodeButton from './MidiNodeButton';
import AudioNodeButton from './AudioNodeButton';
import MixerButton from './MixerButton';
import config from '../../config/config';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.style = {
      height: config.menu.height - 1
    };
    this.renderMidiButton = this.renderMidiButton.bind(this);
  }

  renderMidiButton() {
    if (!this.props.midi) {
      return null;
    }

    return <MidiNodeButton/>;
  }

  render() {
    return (
      <div className="menu-container" style={this.style}>
        <StreamButton/>
        <SynthNodeButton/>
        {this.renderMidiButton()}
        <AudioNodeButton/>
        <MixerButton/>
      </div>
    );
  }
}

module.exports = Menu;
