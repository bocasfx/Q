import React from 'react';
import './ControlPanel.css';
import SelectorPanel from './SelectorPanel';
import EditorPanel from './EditorPanel';
import config from '../../config/config';

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.style = {
      width: config.controlPanel.width
    };
  }

  render() {
    return (
      <div className="control-panel-container" style={this.style}>
        <SelectorPanel/>
        <EditorPanel/>
      </div>
    );
  }
}

export default ControlPanel;
