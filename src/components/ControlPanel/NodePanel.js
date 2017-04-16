import React from 'react';
import SynthNodePanel from './SynthNodePanel';
import AudioNodePanel from './AudioNodePanel';
import MidiNodePanel from './MidiNodePanel';
import NodePanelHeader from './NodePanelHeader';
import { connect } from 'react-redux';
import { getSelectedElement } from '../../utils/utils';

class NodePanel extends React.Component {
  
  constructor(props) {
    super(props);
    this.renderNodePanel = this.renderNodePanel.bind(this);
  }

  renderNodePanel() {
    let node = getSelectedElement(this.props.nodes);
    if (node.type === 'synth') {
      return <SynthNodePanel/>;
    } else if (node.type === 'audio') {
      return <AudioNodePanel/>;
    } else if (node.type === 'midi') {
      return <MidiNodePanel/>;
    }
    return null;
  }

  render() {
    return (
      <div>
        <NodePanelHeader/>
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
