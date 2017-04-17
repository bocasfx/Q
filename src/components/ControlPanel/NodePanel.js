import React from 'react';
import SynthNodePanel from './SynthNodePanel';
import AudioNodePanel from './AudioNodePanel';
import MidiNodePanel from './MidiNodePanel';
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
      return <SynthNodePanel node={this.props.node}/>;
    } else if (this.props.node.type === 'audio') {
      return <AudioNodePanel node={this.props.node}/>;
    } else if (this.props.node.type === 'midi') {
      return <MidiNodePanel node={this.props.node}/>;
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
          name={this.props.node.name}
          disabled={this.props.node.disabled}/>
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
