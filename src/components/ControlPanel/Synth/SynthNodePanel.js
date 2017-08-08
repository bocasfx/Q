import React from 'react';
import './SynthNodePanel.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OscillatorPanel from './OscillatorPanel';
import Knob from '../../UI/Knob';
import Slider from '../../UI/Slider';
import NodePanelHeader from '../NodePanelHeader';
import {
  setNodeOsc1Frequency,
  setNodeOsc2Frequency,
  setNodeOsc1WaveType,
  setNodeOsc2WaveType,
  setNodeVolume,
  setNodeAttack,
  setNodeRelease,
  setNodePan,
  setNodeSendGain } from '../../../actions/Nodes';

class SynthNodePanel extends React.Component {

  constructor(props) {
    super(props);

    this.onGainChange = this.onGainChange.bind(this);
    this.onAttackChange = this.onAttackChange.bind(this);
    this.onReleaseChange = this.onReleaseChange.bind(this);
    this.onPanChange = this.onPanChange.bind(this);
    this.onSendGainChange = this.onSendGainChange.bind(this);
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

  onSendGainChange(value) {
    this.props.setNodeSendGain(this.props.node.id, value);
  }

  render() {
    return (
      <div className="synth-node-panel-container">

        <div className="row">
          <NodePanelHeader node={this.props.node}/>
        </div>

        <div className="row synth-node-panel-gain">
          <Knob
            label={'Gain'}
            value={this.props.node.volume}
            min={0}
            max={1}
            onChange={this.onGainChange}
            disabled={this.props.node.disabled}
            type={this.props.node.type}/>
          <Knob
            label={'FX Send'}
            value={this.props.node.sendGain}
            min={0}
            max={1}
            onChange={this.onSendGainChange}
            disabled={this.props.node.disabled}
            type={this.props.node.type}/>
        </div>
        <div className="row synth-node-panel-gain">
          <Knob
            label={'Attack'}
            value={this.props.node.attack}
            min={0}
            max={2}
            onChange={this.onAttackChange}
            disabled={this.props.node.disabled}
            type={this.props.node.type}/>
          <Knob
            label={'Release'}
            value={this.props.node.release}
            min={0}
            max={2}
            onChange={this.onReleaseChange}
            disabled={this.props.node.disabled}
            type={this.props.node.type}/>
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
            disabled={this.props.node.disabled}
            type={this.props.node.type}/>
          <OscillatorPanel
            name="osc2"
            nodeId={this.props.node.id}
            oscillator={this.props.node.oscillator2}
            onFreqChange={this.props.setNodeOsc2Frequency}
            onWaveTypeChange={this.props.setNodeOsc2WaveType}
            label="Osc. 2"
            disabled={this.props.node.disabled}
            type={this.props.node.type}/>
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
    setNodePan: bindActionCreators(setNodePan, dispatch),
    setNodeSendGain: bindActionCreators(setNodeSendGain, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(SynthNodePanel);
