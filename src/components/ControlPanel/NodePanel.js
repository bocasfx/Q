import React from 'react';
import SynthNodePanel from './SynthNodePanel';
import AudioNodePanel from './AudioNodePanel';

class NodePanel extends React.Component {
  
  constructor(props) {
    super(props);
    this.renderNodePanel = this.renderNodePanel.bind(this);
  }

  renderNodePanel() {
    if (this.props.node.type === 'synth') {
      return <SynthNodePanel node={this.props.node}/>;
    } else if (this.props.node.type === 'audio') {
      return <AudioNodePanel node={this.props.node}/>;
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.renderNodePanel()}
      </div>
    );
  }
}

module.exports = NodePanel;
