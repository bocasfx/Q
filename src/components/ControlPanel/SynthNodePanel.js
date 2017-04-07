import React from 'react';
import './SynthNodePanel.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNodeOsc1Frequency, setNodeOsc2Frequency, setNodeOsc1WaveType, setNodeOsc2WaveType } from '../../actions/Nodes';
import OscillatorPanel from './OscillatorPanel';
import Toggle from '../UI/Toggle';
import config from '../../config/config';
import Knob from '../Mixer/Knob';

class SynthNodePanel extends React.Component {

  constructor(props) {
    super(props);
    this.onGainChange = this.onGainChange.bind(this);
  }

  onGainChange(value) {
    console.log('gain: ' + value);
  }

  render() {
    return (
      <div className="synth-node-panel-container">
        <div className="synth-node-panel-name">
          <input name="node-name" defaultValue={this.props.node.name}/>
        </div>

        <div className="row">
          <Knob
            label={'Gain'}
            value={this.props.node.gainValue}
            min={0}
            max={1}
            onChange={this.onGainChange}/>
        </div>

        <div className="row">
          <div className="column">        
            <Toggle
              vertical
              min={0}
              step={0.1}
              max={9}
              marks={config.adsr.marks}
              defaultValue={0}
              onChange={this.onWaveTypeChange}/>
              <div className="synth-node-panel-adsr-label">A</div>
          </div>
          <div className="column">            
            <Toggle
              vertical
              min={0}
              step={0.1}
              max={9}
              marks={config.adsr.marks}
              defaultValue={0}
              onChange={this.onWaveTypeChange}/>
              <div className="synth-node-panel-adsr-label">D</div>
          </div>
          <div className="column">            
            <Toggle
              vertical
              min={0}
              step={0.1}
              max={9}
              marks={config.adsr.marks}
              defaultValue={0}
              onChange={this.onWaveTypeChange}/>
              <div className="synth-node-panel-adsr-label">S</div>
          </div>
          <div className="column">            
            <Toggle
              vertical
              min={0}
              step={0.1}
              max={9}
              marks={config.adsr.marks}
              defaultValue={0}
              onChange={this.onWaveTypeChange}/>
              <div className="synth-node-panel-adsr-label">R</div>
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
    setNodeOsc2WaveType: bindActionCreators(setNodeOsc2WaveType, dispatch)
  };
};

module.exports = connect(null, mapDispatchToProps)(SynthNodePanel);
