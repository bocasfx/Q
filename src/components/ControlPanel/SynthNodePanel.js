import React from 'react';
import './SynthNodePanel.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OscillatorPanel from './OscillatorPanel';
import Knob from '../UI/Knob';
import Slider from '../UI/Slider';
import {
  setNodeOsc1Frequency,
  setNodeOsc2Frequency,
  setNodeOsc1WaveType,
  setNodeOsc2WaveType,
  setNodeVolume,
  setNodeAttack,
  setNodeRelease,
  setNodePan } from '../../actions/Nodes';

class SynthNodePanel extends React.Component {

  constructor(props) {
    super(props);

    this.onGainChange = this.onGainChange.bind(this);
    this.onAttackChange = this.onAttackChange.bind(this);
    this.onReleaseChange = this.onReleaseChange.bind(this);
    this.onPanChange = this.onPanChange.bind(this);
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

  onPanChange(value) {
    this.props.setNodePan(this.props.node.id, value);
  }

  render() {
    return (
      <div className="synth-node-panel-container">
        <div className="row synth-node-panel-gain">
          <Knob
            label={'Gain'}
            value={this.props.node.volume}
            min={0}
            max={1}
            onChange={this.onGainChange}
            disabled={this.props.node.disabled}/>
          <div className="column">
            <Slider
              min={0}
              max={2}
              step={0.01}
              marks={5}
              value={this.props.node.attack}
              onChange={this.onAttackChange}
              disabled={this.props.node.disabled}/>
            <div className="synth-node-panel-adsr-icon">
              <img src="./icons/control-panel/adsr/attack.svg" alt="attack"/>
            </div>
          </div>
          <div className="column">
            <Slider
              min={0}
              max={2}
              step={0.01}
              marks={5}
              value={this.props.node.release}
              onChange={this.onReleaseChange}
              disabled={this.props.node.disabled}/>
            <div className="synth-node-panel-adsr-icon">
              <img src="./icons/control-panel/adsr/release.svg" alt="release"/>
            </div>
          </div>
        </div>
          
        <div className="row synth-node-panel-pan synth-node-panel-pan-labels">
          <div>L</div>
          <Slider
            min={-1}
            max={1}
            step={0.1}
            marks={0}
            value={this.props.node.pan}
            onChange={this.onPanChange}
            disabled={this.props.node.disabled}
            horizontal={true}/>
          <div>R</div>
        </div>

        <div className="row-between">
          <OscillatorPanel
            name="osc1"
            nodeId={this.props.node.id}
            oscillator={this.props.node.oscillator1}
            onFreqChange={this.props.setNodeOsc1Frequency}
            onWaveTypeChange={this.props.setNodeOsc1WaveType}
            label="Osc. 1"
            disabled={this.props.node.disabled}/>
          <OscillatorPanel
            name="osc2"
            nodeId={this.props.node.id}
            oscillator={this.props.node.oscillator2}
            onFreqChange={this.props.setNodeOsc2Frequency}
            onWaveTypeChange={this.props.setNodeOsc2WaveType}
            label="Osc. 2"
            disabled={this.props.node.disabled}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeOsc1Frequency: bindActionCreators(setNodeOsc1Frequency, dispatch),
    setNodeOsc2Frequency: bindActionCreators(setNodeOsc2Frequency, dispatch),
    setNodeOsc1WaveType: bindActionCreators(setNodeOsc1WaveType, dispatch),
    setNodeOsc2WaveType: bindActionCreators(setNodeOsc2WaveType, dispatch),
    setNodeVolume: bindActionCreators(setNodeVolume, dispatch),
    setNodeAttack: bindActionCreators(setNodeAttack, dispatch),
    setNodeRelease: bindActionCreators(setNodeRelease, dispatch),
    setNodePan: bindActionCreators(setNodePan, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(SynthNodePanel);
