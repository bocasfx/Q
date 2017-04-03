import React from 'react';
import './ControlPanel.css';
import NodesPanel from './NodesPanel';
import StreamsPanel from './StreamsPanel';

class ControlPanel extends React.Component {
  render() {
    return (
      <div className="control-panel-container">
        <NodesPanel/>
        <StreamsPanel/>
      </div>
    );
  }
}

module.exports = ControlPanel;
