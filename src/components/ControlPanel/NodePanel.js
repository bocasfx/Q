import React from 'react';
import MidiNodePanel from './Midi/MidiNodePanel';
import ElementPanelHeader from './ElementPanelHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNodeName, setNodeDisabledStatus } from '../../actions/Nodes';

class NodePanel extends React.Component {

  onChange = (name) => {
    this.props.setNodeName(this.props.node.id, name);
  }

  onToggle = (disabled) => {
    this.props.setNodeDisabledStatus(this.props.node.id, disabled);
  }

  render() {
    return (
      <div>
        <ElementPanelHeader
          onChange={this.onChange}
          onToggle={this.onToggle}
          element={this.props.node}/>
        <MidiNodePanel/>
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

export default connect(null, mapDispatchToProps)(NodePanel);
