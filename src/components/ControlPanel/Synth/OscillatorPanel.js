import React from 'react';
import './OscillatorPanel.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Knob from '../../UI/Knob';
import Slider from '../../UI/Slider';
import noteConfig from '../../../config/frequencies';
import _ from 'lodash';
import { getSelectedElements } from '../../../utils/utils';
import {
  setNodeOsc1Frequency,
  setNodeOsc2Frequency,
  setNodeOsc1Gain,
  setNodeOsc2Gain,
  setNodeOsc1WaveType,
  setNodeOsc2WaveType } from '../../../actions/Nodes';

const waveTypes = {
  0: 'sine',
  1: 'sawtooth',
  2: 'square',
  3: 'triangle'
};

class OscillatorPanel extends React.Component {
  constructor(props) {
    super(props);
    this.onFreqChange = this.onFreqChange.bind(this);
    // this.onRadioChange = this.onRadioChange.bind(this);
    this.onWaveTypeChange = this.onWaveTypeChange.bind(this);
    this.onNoteChange = this.onNoteChange.bind(this);
    this.onOctaveChange = this.onOctaveChange.bind(this);
    this.onGainChange = this.onGainChange.bind(this);

    this.nodes = getSelectedElements(props.nodes);
    this.node = this.nodes[0];
    this.oscillator = this.props.name === 'osc1' ? this.node.oscillator1 : this.node.oscillator2;
    this.gain = this.props.name === 'osc1' ? this.node.osc1Gain : this.node.osc2Gain;

    let waveType = _.findKey(waveTypes, (type) => {
      return this.oscillator.waveType === type;
    });
    waveType = parseInt(waveType, 10);

    this.state = {
      checked: true,
      waveType,
      disabled: props.disabled,
      note: 'C',
      octave: 0
    };

    this.envelopeIcons = [
      './icons/control-panel/envelope/triangle.svg',
      './icons/control-panel/envelope/square.svg',
      './icons/control-panel/envelope/saw.svg',
      './icons/control-panel/envelope/sine.svg'
    ];
  }

  componentWillReceiveProps(nextProps) {
    this.nodes = getSelectedElements(nextProps.nodes);
    this.node = this.nodes[0];

    this.oscillator = nextProps.name === 'osc1' ? this.node.oscillator1 : this.node.oscillator2;

    let waveType = _.findKey(waveTypes, (type) => {
      return this.oscillator.waveType === type;
    });
    waveType = parseInt(waveType, 10);

    this.setState({
      waveType,
      disabled: this.node.disabled
    });
  }

  onFreqChange(frequency) {
    this.nodes.forEach((node) => {
      if (this.props.name === 'osc1') {
        this.props.setNodeOsc1Frequency(node.id, frequency);
      }else {
        this.props.setNodeOsc2Frequency(node.id, frequency);
      }
    });
  }

  renderNoteSelect() {
    return noteConfig.notes.map((note, idx) => {
      return <option key={idx} value={note}>{note}</option>;
    });
  }

  renderOctaveSelect() {
    return noteConfig.octaves.map((octave, idx) => {
      return <option key={idx} value={octave}>{octave}</option>;
    });
  }

  // onRadioChange(event) {
  //   this.setState({
  //     checked: event.target.value === 'continue'
  //   });
  // }

  onWaveTypeChange(value) {
    this.nodes.forEach((node) => {
      if (this.props.name === 'osc1') {
        this.props.setNodeOsc1WaveType(node.id, waveTypes[value]);
      } else {
        this.props.setNodeOsc2WaveType(node.id, waveTypes[value]);
      }
    });
    this.setState({
      waveType: value
    });
  }

  onNoteChange(event) {
    this.nodes.forEach((node) => {
      let note = _.find(noteConfig.frequencies, (noteObj) => {
        return (noteObj.note === event.target.value && noteObj.octave === this.state.octave);
      });
      this.setState({
        note: note.note
      });
      this.onFreqChange(node.id, note.frequency);
    });
  }

  onOctaveChange(event) {
    this.nodes.forEach((node) => {
      let note = _.find(noteConfig.frequencies, (noteObj) => {
        return (noteObj.note === this.state.note && noteObj.octave === parseInt(event.target.value, 10));
      });
      this.setState({
        octave: note.octave
      });
      this.onFreqChange(node.id, note.frequency);
    });
  }

  onGainChange(value) {
    this.nodes.forEach((node) => {
      if (this.props.name === 'osc1') {
        this.props.setNodeOsc1Gain(node.id, value);
      } else {
        this.props.setNodeOsc2Gain(node.id, value);
      }
    });
  }

  render() {

    // let forNote = this.props.name + '-note';
    // let forOctave = this.props.name + '-octave';

    return (
      <div className="oscillator-panel-container" disabled={this.state.disabled}>
        <div className="oscillator-panel-label">{this.props.label}</div>
        <Slider
          min={0}
          max={3}
          step={1}
          marks={0}
          value={this.state.waveType}
          onChange={this.onWaveTypeChange}
          icons={this.envelopeIcons}
          disabled={this.state.disabled}/>  

        <div className="oscillator-panel-freq">
          {/*<input
            name={this.props.name}
            type="radio"
            value="continue"
            onChange={this.onRadioChange}
            checked={this.state.checked}/>*/}
          <Knob
            label={'Frequency'}
            value={this.oscillator.frequency}
            min={20}
            max={2000}
            onChange={this.onFreqChange}
            disabled={!this.state.checked || this.state.disabled}
            type={this.props.type}/>
          <div className="oscillator-panel-gain">
            <Knob
              label={'Gain'}
              value={this.gain}
              min={0}
              max={1}
              onChange={this.onGainChange}
              disabled={!this.state.checked || this.state.disabled}
              type={this.props.type}
              log={true}/>
          </div>
        </div>

        {/*<div className="oscillator-panel-freq">
          <input
            name={this.props.name}
            type="radio"
            value="discrete"
            onChange={this.onRadioChange}
            checked={!this.state.checked}
            disabled={this.state.disabled}/>
          <div className="oscillator-panel-notes">
            <div>
              <label htmlFor={forNote} disabled={this.state.checked || this.state.disabled}>Note</label>
              <select name={forNote} onChange={this.onNoteChange} disabled={this.state.checked || this.state.disabled}>
                {this.renderNoteSelect()}
              </select>
            </div>

            <div>
              <label htmlFor={forOctave} disabled={this.state.checked || this.state.disabled}>Octave</label>
              <select name={forOctave} onChange={this.onOctaveChange} disabled={this.state.checked || this.state.disabled}>
                {this.renderOctaveSelect()}
              </select>
            </div>
          </div>
        </div>*/}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeOsc1Frequency: bindActionCreators(setNodeOsc1Frequency, dispatch),
    setNodeOsc2Frequency: bindActionCreators(setNodeOsc2Frequency, dispatch),
    setNodeOsc1Gain: bindActionCreators(setNodeOsc1Gain, dispatch),
    setNodeOsc2Gain: bindActionCreators(setNodeOsc2Gain, dispatch),
    setNodeOsc1WaveType: bindActionCreators(setNodeOsc1WaveType, dispatch),
    setNodeOsc2WaveType: bindActionCreators(setNodeOsc2WaveType, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(OscillatorPanel);
