import React from 'react';
import './SynthNodePanel.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OscillatorPanel from './OscillatorPanel';
import Knob from '../Mixer/Knob';
import Slider from '../UI/Slider';
import {
  setNodeOsc1Frequency,
  setNodeOsc2Frequency,
  setNodeOsc1WaveType,
  setNodeOsc2WaveType,
  setNodeVolume,
  setNodeAttack,
  setNodeRelease,
  setNodeName,
  setNodeDisabledStatus } from '../../actions/Nodes';

class SynthNodePanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nodeName: props.node.name,
      attack: props.node.attack,
      release: props.node.release,
      disabled: props.node.disabled
    };

    this.onGainChange = this.onGainChange.bind(this);
    this.onAttackChange = this.onAttackChange.bind(this);
    this.onReleaseChange = this.onReleaseChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onNodeToggle = this.onNodeToggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      nodeName: nextProps.node.name,
      attack: nextProps.node.attack,
      release: nextProps.node.release,
      disabled: nextProps.node.disabled
    });
  }

  onGainChange(value) {
    this.props.setNodeVolume(this.props.node.id, value);
  }

  onAttackChange(value) {
    this.props.setNodeAttack(this.props.node.id, value);
    this.setState({
      attack: value
    });
  }

  onReleaseChange(value) {
    this.props.setNodeRelease(this.props.node.id, value);
    this.setState({
      release: value
    });
  }

  onNameChange(event) {
    let name = event.target.value;
    this.props.setNodeName(this.props.node.id, name);
    this.setState({
      nodeName: name
    });
  }

  onNodeToggle() {
    this.props.setNodeDisabledStatus(this.props.node.id, !this.state.disabled);
    this.setState({
      disabled: !this.state.disabled
    });
  }

  render() {
    let toggleClass = 'synth-node-panel-on';
    toggleClass += this.state.disabled ? ' synth-node-panel-off' : '';

    return (
      <div className="synth-node-panel-container">
        <div className="row-between">
          <input
            className="synth-node-panel-name"
            type="text"
            name="node-name"
            value={this.state.nodeName}
            onChange={this.onNameChange}
            disabled={this.state.disabled}/>
          <div className={toggleClass} onClick={this.onNodeToggle}>
            <i className="fa fa-power-off"></i>
          </div>
        </div>

        <div className="row synth-node-panel-gain">
          <Knob
            label={'Gain'}
            value={this.props.node.volume}
            min={0}
            max={1}
            onChange={this.onGainChange}
            disabled={this.state.disabled}/>
          <div className="column">
            <Slider
              min={0}
              max={2}
              step={0.1}
              marks={5}
              value={this.state.attack}
              onChange={this.onAttackChange}
              disabled={this.state.disabled}/>
            <div className="synth-node-panel-adsr-icon">
              <img src="./icons/control-panel/adsr/attack.svg" alt="attack"/>
            </div>
          </div>
          <div className="column">
            <Slider
              min={0}
              max={2}
              step={0.1}
              marks={5}
              value={this.state.release}
              onChange={this.onReleaseChange}
              disabled={this.state.disabled}/>
            <div className="synth-node-panel-adsr-icon">
              <img src="./icons/control-panel/adsr/release.svg" alt="release"/>
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
            label="Osc. 1"
            disabled={this.state.disabled}/>
          <OscillatorPanel
            name="osc2"
            nodeId={this.props.node.id}
            oscillator={this.props.node.oscillator2}
            onFreqChange={this.props.setNodeOsc2Frequency}
            onWaveTypeChange={this.props.setNodeOsc2WaveType}
            label="Osc. 2"
            disabled={this.state.disabled}/>
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
    setNodeRelease: bindActionCreators(setNodeRelease, dispatch),
    setNodeName: bindActionCreators(setNodeName, dispatch),
    setNodeDisabledStatus: bindActionCreators(setNodeDisabledStatus, dispatch)
  };
};

module.exports = connect(null, mapDispatchToProps)(SynthNodePanel);
