import React from 'react';
import SynthNodePanel from './Synth/SynthNodePanel';
import AudioNodePanel from './Audio/AudioNodePanel';
import MidiNodePanel from './Midi/MidiNodePanel';
import ElementPanelHeader from './ElementPanelHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNodeName, setNodeDisabledStatus } from '../../actions/Nodes';

class NodePanel extends React.Component {
  
  constructor(props) {
    super(props);
    this.renderNodePanel = this.renderNodePanel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  renderNodePanel() {
    if (this.props.node.type === 'synth') {
      return <SynthNodePanel/>;
    } else if (this.props.node.type === 'audio') {
      return <AudioNodePanel/>;
    } else if (this.props.node.type === 'midi') {
      return <MidiNodePanel/>;
    }
    return null;
  }

  onChange(name) {
    this.props.setNodeName(this.props.node.id, name);
  }

  onToggle(disabled) {
    this.props.setNodeDisabledStatus(this.props.node.id, disabled);
  }

  render() {
    return (
      <div>
        <ElementPanelHeader
          onChange={this.onChange}
          onToggle={this.onToggle}
          element={this.props.node}/>
        {this.renderNodePanel()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeName: bindActionCreators(setNodeName, dispatch),
    setNodeDisabledStatus: bindActionCreators(setNodeDisabledStatus, dispatch)
  };
};

module.exports = connect(null, mapDispatchToProps)(NodePanel);
