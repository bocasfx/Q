import React from 'react';
import './SynthNodePanel.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OscillatorPanel from './OscillatorPanel';
import Knob from '../Mixer/Knob';
import {
  setNodeOsc1Frequency,
  setNodeOsc2Frequency,
  setNodeOsc1WaveType,
  setNodeOsc2WaveType,
  setNodeVolume,
  setNodeAttack,
  setNodeRelease } from '../../actions/Nodes';

class SynthNodePanel extends React.Component {

  constructor(props) {
    super(props);
    this.onGainChange = this.onGainChange.bind(this);
    this.onAttackChange = this.onAttackChange.bind(this);
    this.onReleaseChange = this.onReleaseChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  onGainChange(value) {
    this.props.setNodeVolume(this.props.node.id, value);
  }

  onAttackChange(value) {
    this.props.setNodeAttack(this.props.node.id, value);
  }

  onReleaseChange(value) {
    this.props.setNodeRelease(this.props.node.id, value);
  }

  onNameChange(value) {
    console.log(value);
  }

  render() {
    return (
      <div className="synth-node-panel-container">
        <div className="synth-node-panel-name">
          <input name="node-name" value={this.props.node.name} onChange={this.onNameChange}/>
        </div>

        <div className="row synth-node-panel-gain">
          <Knob
            label={'Gain'}
            value={this.props.node.volume}
            min={0}
            max={1}
            onChange={this.onGainChange}/>
          <div className="column">
            <Knob
              label={'Attack'}
              value={this.props.node.attack}
              min={0}
              max={2.0}
              onChange={this.onAttackChange}/>
          </div>
          <div className="column">
            <Knob
              label={'Release'}
              value={this.props.node.release}
              min={0}
              max={2.0}
              onChange={this.onReleaseChange}/>
          </div>
        </div>

        <div className="row-between">
          <OscillatorPanel
            name="osc1"
            nodeId={this.props.node.id}
            oscillator={this.props.node.oscillator1}
            onFreqChange={this.props.setNodeOsc1Frequency}
            onWaveTypeChange={this.props.setNodeOsc1WaveType}
            label="Osc. 1"/>
          <OscillatorPanel
            name="osc2"
            nodeId={this.props.node.id}
            oscillator={this.props.node.oscillator2}
            onFreqChange={this.props.setNodeOsc2Frequency}
            onWaveTypeChange={this.props.setNodeOsc2WaveType}
            label="Osc. 2"/>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeOsc1Frequency: bindActionCreators(setNodeOsc1Frequency, dispatch),
    setNodeOsc2Frequency: bindActionCreators(setNodeOsc2Frequency, dispatch),
    setNodeOsc1WaveType: bindActionCreators(setNodeOsc1WaveType, dispatch),
    setNodeOsc2WaveType: bindActionCreators(setNodeOsc2WaveType, dispatch),
    setNodeVolume: bindActionCreators(setNodeVolume, dispatch),
    setNodeAttack: bindActionCreators(setNodeAttack, dispatch),
    setNodeRelease: bindActionCreators(setNodeRelease, dispatch)
  };
};

module.exports = connect(null, mapDispatchToProps)(SynthNodePanel);
