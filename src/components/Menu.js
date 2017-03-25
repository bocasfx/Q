import React from 'react';
import './Menu.css';
import StreamButton from './StreamButton';
import NodeButton from './NodeButton';
import MidiNodeButton from './MidiNodeButton';
import SettingsButton from './SettingsButton';

class Menu extends React.Component {
  constructor(props) {
    super(props);
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
      <div className="menu-container">
        <StreamButton/>
        <NodeButton/>
        {this.renderMidiButton()}
        <SettingsButton/>
      </div>
    );
  }
}

module.exports = Menu;
