import React from 'react';
import './SynthNodePanel.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNodeOsc1Frequency, setNodeOsc2Frequency, setNodeOsc1WaveType, setNodeOsc2WaveType, setNodeVolume } from '../../actions/Nodes';
import OscillatorPanel from './OscillatorPanel';
import Toggle from '../UI/Toggle';
import config from '../../config/config';
import Knob from '../Mixer/Knob';

class SynthNodePanel extends React.Component {

  constructor(props) {
    super(props);
    this.onGainChange = this.onGainChange.bind(this);
    this.onAttackChange = this.onAttackChange.bind(this);
    this.onDecayChange = this.onDecayChange.bind(this);
    this.onSustainChange = this.onSustainChange.bind(this);
    this.onReleaseChange = this.onReleaseChange.bind(this);
  }

  onGainChange(value) {
    this.props.setNodeVolume(this.props.node.id, value);
  }

  onAttackChange(value) {

  }

  onDecayChange(value) {

  }

  onSustainChange(value) {

  }

  onReleaseChange(value) {

  }

  render() {
    return (
      <div className="synth-node-panel-container">
        <div className="synth-node-panel-name">
          <input name="node-name" defaultValue={this.props.node.name}/>
        </div>

        <div className="row synth-node-panel-gain">
          <Knob
            label={'Gain'}
            value={this.props.node.volume}
            min={0}
            max={1}
            onChange={this.onGainChange}/>
        </div>

        <div className="row">
          <div className="column">
            <div className="synth-node-panel-adsr-label">A</div>
            <Toggle
              vertical
              min={0}
              step={0.1}
              max={9}
              marks={config.controlPanel.adsr.marks}
              defaultValue={0}
              onChange={this.onAttackChange}/>
              <div className="synth-node-panel-adsr-icon">
                <img src="/icons/attack.svg" alt="attack"/>
              </div>
          </div>
          <div className="column">
            <div className="synth-node-panel-adsr-label">D</div>
            <Toggle
              vertical
              min={0}
              step={0.1}
              max={9}
              marks={config.controlPanel.adsr.marks}
              defaultValue={0}
              onChange={this.onDecayChange}/>
              <div className="synth-node-panel-adsr-icon">
                <img src="/icons/decay.svg" alt="decay"/>
              </div>
          </div>
          <div className="column">
            <div className="synth-node-panel-adsr-label">S</div>
            <Toggle
              vertical
              min={0}
              step={0.1}
              max={9}
              marks={config.controlPanel.adsr.marks}
              defaultValue={0}
              onChange={this.onSustainChange}/>
              <div className="synth-node-panel-adsr-icon">
                <img src="/icons/sustain.svg" alt="sustain"/>
              </div>
          </div>
          <div className="column">
            <div className="synth-node-panel-adsr-label">R</div>
            <Toggle
              vertical
              min={0}
              step={0.1}
              max={9}
              marks={config.controlPanel.adsr.marks}
              defaultValue={0}
              onChange={this.onReleaseChange}/>
              <div className="synth-node-panel-adsr-icon">
                <img src="/icons/release.svg" alt="release"/>
              </div>
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
    setNodeVolume: bindActionCreators(setNodeVolume, dispatch)
  };
};

module.exports = connect(null, mapDispatchToProps)(SynthNodePanel);
