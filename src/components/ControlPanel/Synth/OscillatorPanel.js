import React from 'react';
import './OscillatorPanel.css';
import Knob from '../../UI/Knob';
import Slider from '../../UI/Slider';
import noteConfig from '../../../config/frequencies';
import _ from 'lodash';

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
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onWaveTypeChange = this.onWaveTypeChange.bind(this);
    this.onNoteChange = this.onNoteChange.bind(this);
    this.onOctaveChange = this.onOctaveChange.bind(this);

    let waveType = _.findKey(waveTypes, (type) => {
      return props.oscillator.waveType === type;
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
    let waveType = _.findKey(waveTypes, (type) => {
      return nextProps.oscillator.waveType === type;
    });
    waveType = parseInt(waveType, 10);
    this.setState({
      waveType,
      disabled: nextProps.disabled
    });
  }

  onFreqChange(frequency) {
    this.props.onFreqChange(this.props.nodeId, frequency);
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

  onRadioChange(event) {
    this.setState({
      checked: event.target.value === 'continue'
    });
  }

  onWaveTypeChange(value) {
    this.props.onWaveTypeChange(this.props.nodeId, waveTypes[value]);
    this.setState({
      waveType: value
    });
  }

  onNoteChange(event) {
    let note = _.find(noteConfig.frequencies, (noteObj) => {
      return (noteObj.note === event.target.value && noteObj.octave === this.state.octave);
    });
    this.setState({
      note: note.note
    });
    this.props.onFreqChange(this.props.nodeId, note.frequency);
  }

  onOctaveChange(event) {
    let note = _.find(noteConfig.frequencies, (noteObj) => {
      return (noteObj.note === this.state.note && noteObj.octave === parseInt(event.target.value, 10));
    });
    this.setState({
      octave: note.octave
    });
    this.props.onFreqChange(this.props.nodeId, note.frequency);
  }

  render() {

    let forNote = this.props.name + '-note';
    let forOctave = this.props.name + '-octave';

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
          <input
            name={this.props.name}
            type="radio"
            value="continue"
            onChange={this.onRadioChange}
            checked={this.state.checked}/>
          <Knob
            label={'Frequency'}
            value={this.props.oscillator.frequency}
            min={20}
            max={2000}
            onChange={this.onFreqChange}
            disabled={!this.state.checked || this.state.disabled}/>
        </div>

        <div className="oscillator-panel-freq">
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
        </div>
      </div>
    );
  }
}

module.exports = OscillatorPanel;
