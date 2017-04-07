import React from 'react';
import './SynthNodePanel.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNodeOsc1Frequency, setNodeOsc2Frequency } from '../../actions/Nodes';
import OscillatorPanel from './OscillatorPanel';

class SynthNodePanel extends React.Component {

  render() {
    return (
      <div className="synth-node-panel-container">
        <div className="synth-node-panel-name">
          <input name="node-name" defaultValue={this.props.node.name}/>
        </div>
        <div className="synth-node-panel-row-between">
          <OscillatorPanel
            name="osc1"
            nodeId={this.props.node.id}
            oscillator={this.props.node.oscillator1}
            onFreqChange={this.props.setNodeOsc1Frequency}
            label="Osc. 1"/>
          <OscillatorPanel
            name="osc2"
            nodeId={this.props.node.id}
            oscillator={this.props.node.oscillator2}
            onFreqChange={this.props.setNodeOsc2Frequency}
            label="Osc. 2"/>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeOsc1Frequency: bindActionCreators(setNodeOsc1Frequency, dispatch),
    setNodeOsc2Frequency: bindActionCreators(setNodeOsc2Frequency, dispatch)
  };
};

module.exports = connect(null, mapDispatchToProps)(SynthNodePanel);
