import React from 'react';
import './SynthNodePanel.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OscillatorPanel from './OscillatorPanel';
import Knob from '../UI/Knob';
import Slider from '../UI/Slider';
import { getSelectedElement } from '../../utils/utils';
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

    this.state = {
      selectedNode: null
    };

    this.onGainChange = this.onGainChange.bind(this);
    this.onAttackChange = this.onAttackChange.bind(this);
    this.onReleaseChange = this.onReleaseChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      selectedNode: getSelectedElement(this.props.nodes)
    });
  }

  componentWillReceiveProps(nextProps) {
     this.setState({
      selectedNode: getSelectedElement(nextProps.nodes)
    });
  }

  onGainChange(value) {
    this.props.setNodeVolume(this.state.selectedNode.id, value);
  }

  onAttackChange(value) {
    this.props.setNodeAttack(this.state.selectedNode.id, value);
  }

  onReleaseChange(value) {
    this.props.setNodeRelease(this.state.selectedNode.id, value);
  }

  render() {
    if (!this.state.selectedNode) {
      return null;
    }

    return (
      <div className="synth-node-panel-container">
        <div className="row synth-node-panel-gain">
          <Knob
            label={'Gain'}
            value={this.state.selectedNode.volume}
            min={0}
            max={1}
            onChange={this.onGainChange}
            disabled={this.state.selectedNode.disabled}/>
          <div className="column">
            <Slider
              min={0}
              max={2}
              step={0.1}
              marks={5}
              value={this.state.selectedNode.attack}
              onChange={this.onAttackChange}
              disabled={this.state.selectedNode.disabled}/>
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
              value={this.state.selectedNode.release}
              onChange={this.onReleaseChange}
              disabled={this.state.selectedNode.disabled}/>
            <div className="synth-node-panel-adsr-icon">
              <img src="./icons/control-panel/adsr/release.svg" alt="release"/>
            </div>
          </div>
        </div>

        <div className="row-between">
          <OscillatorPanel
            name="osc1"
            nodeId={this.state.selectedNode.id}
            oscillator={this.state.selectedNode.oscillator1}
            onFreqChange={this.props.setNodeOsc1Frequency}
            onWaveTypeChange={this.props.setNodeOsc1WaveType}
            label="Osc. 1"
            disabled={this.state.selectedNode.disabled}/>
          <OscillatorPanel
            name="osc2"
            nodeId={this.state.selectedNode.id}
            oscillator={this.state.selectedNode.oscillator2}
            onFreqChange={this.props.setNodeOsc2Frequency}
            onWaveTypeChange={this.props.setNodeOsc2WaveType}
            label="Osc. 2"
            disabled={this.state.selectedNode.disabled}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.Nodes
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
    setNodeRelease: bindActionCreators(setNodeRelease, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(SynthNodePanel);
