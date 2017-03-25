import React from 'react';
import './Menu.css';
import StreamButton from './StreamButton';
import NodeButton from './NodeButton';
import MidiNodeButton from './MidiNodeButton';
import SettingsButton from './SettingsButton';

class Menu extends React.Component {
  render() {
    return (
      <div className="menu-container">
        <StreamButton/>
        <NodeButton/>
        <MidiNodeButton/>
        <SettingsButton/>
      </div>
    );
  }
}

module.exports = Menu;
