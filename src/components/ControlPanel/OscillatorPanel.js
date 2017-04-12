import React from 'react';
import './OscillatorPanel.css';
import Knob from '../Mixer/Knob';
import config from '../../config/config';
import noteConfig from '../../config/frequencies';
import Toggle from '../UI/Toggle';

const waveTypes = {
  0: 'sine',
  1: 'square',
  2: 'sawtooth',
  3: 'triangle'
};

class OscillatorPanel extends React.Component {
  constructor(props) {
    super(props);
    this.onFreqChange = this.onFreqChange.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onWaveTypeChange = this.onWaveTypeChange.bind(this);

    this.state = {
      checked: true
    };

    this.envelopeIcons = [
      '/icons/control-panel/envelope/triangle.svg',
      '/icons/control-panel/envelope/square.svg',
      '/icons/control-panel/envelope/saw.svg',
      '/icons/control-panel/envelope/sine.svg'
    ];
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
  }

  render() {

    let forNote = this.props.name + '-note';
    let forOctave = this.props.name + '-octave';

    return (
      <div className="oscillator-panel-container">
        <div className="oscillator-panel-label">{this.props.label}</div>
        <div className="toggle">
          <Toggle
            vertical
            min={0}
            step={1}
            max={3}
            icons={this.envelopeIcons}
            marks={config.waveToggle.emptyMarks}
            defaultValue={0}
            onChange={this.onWaveTypeChange}/>
        </div>

        <div className="oscillator-panel-freq">
          <input name={this.props.name} type="radio" value="continue" onChange={this.onRadioChange} checked={this.state.checked}/>
          <Knob
            label={'Frequency'}
            value={this.props.oscillator.frequency}
            min={20}
            max={2000}
            onChange={this.onFreqChange}
            disabled={!this.state.checked}/>
        </div>

        <div className="oscillator-panel-freq">
          <input name={this.props.name} type="radio" value="discrete" onChange={this.onRadioChange} checked={!this.state.checked}/>
          <div className="oscillator-panel-notes">
            <div>
              <label htmlFor={forNote} disabled={this.state.checked}>Note</label>
              <select name={forNote} onChange={this.setNodeNote} disabled={this.state.checked}>
                {this.renderNoteSelect()}
              </select>
            </div>

            <div>
              <label htmlFor={forOctave} disabled={this.state.checked}>Octave</label>
              <select name={forOctave} onChange={this.setNodeOctave} disabled={this.state.checked}>
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
