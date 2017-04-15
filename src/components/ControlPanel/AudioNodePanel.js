import React from 'react';
import FileButton from '../UI/FileButton';

class AudioNodePanel extends React.Component {
  render() {
    return (
      <div className="audio-node-panel-container">
        <FileButton node={this.props.node}/>
      </div>
    );
  }
}

module.exports = AudioNodePanel;
