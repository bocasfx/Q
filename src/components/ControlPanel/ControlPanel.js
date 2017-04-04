import React from 'react';
import './ControlPanel.css';
import SelectorPanel from './SelectorPanel';
import EditorPanel from './EditorPanel';

class ControlPanel extends React.Component {
  render() {
    return (
      <div className="control-panel-container">
        <EditorPanel/>
        <SelectorPanel/>
      </div>
    );
  }
}

module.exports = ControlPanel;
