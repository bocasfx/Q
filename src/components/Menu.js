import React from 'react';
import './Menu.css';
import StreamButton from './StreamButton';
import NodeButton from './NodeButton';

class Menu extends React.Component {
  render() {
    return (
      <div className="menu-container">
        <StreamButton/>
        <NodeButton/>
      </div>
    );
  }
}

module.exports = Menu;
