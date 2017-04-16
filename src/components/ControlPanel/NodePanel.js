import React from 'react';
import SynthNodePanel from './SynthNodePanel';
import AudioNodePanel from './AudioNodePanel';
import MidiNodePanel from './MidiNodePanel';
import NodePanelHeader from './NodePanelHeader';
import { connect } from 'react-redux';

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
    } else if (this.props.node.type === 'midi') {
      return <MidiNodePanel node={this.props.node}/>;
    }
    return null;
  }

  render() {
    return (
      <div>
        <NodePanelHeader node={this.props.node}/>
        {this.renderNodePanel()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.Nodes
  };
};

module.exports = connect(mapStateToProps)(NodePanel);
