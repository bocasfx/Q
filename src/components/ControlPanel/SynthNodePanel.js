import React from 'react';
import Knob from '../Mixer/Knob';
import './SynthNodePanel.css';
import noteConfig from '../../config/frequencies';

class SynthNodePanel extends React.Component {
  constructor(props) {
    super(props);
    this.setOsc1Freq = this.setOsc1Freq.bind(this);
    this.setOsc2Freq = this.setOsc2Freq.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);

    this.state = {
      checked: true
    };
  }

  setOsc1Freq(freq) {
    this.props.node.osc1freq = freq;
  }

  setOsc2Freq(freq) {
    this.props.node.osc2freq = freq;
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

  render() {
    return (
      <div className="synth-node-panel-container">

        <input name="osc" type="radio" value="continue" onChange={this.onRadioChange} checked={this.state.checked}/>
        <div className="synth-node-panel-row">
          <Knob
            label="Osc. 1 Freq."
            value={this.props.node.osc1freq}
            min={20}
            max={2000}
            onChange={this.setOsc1Freq}
            disabled={!this.state.checked}/>
          <Knob
            label="Osc. 2 Freq."
            value={this.props.node.osc2freq}
            min={20}
            max={2000}
            onChange={this.setOsc2Freq}
            disabled={!this.state.checked}/>
        </div>

        <input name="osc" type="radio" value="discrete" onChange={this.onRadioChange} checked={!this.state.checked}/>
        <div className="synth-node-panel-row">
          <div className="synth-node-panel-column">
            <div>
              <label htmlFor="node-note">Note</label>
              <select name="node-note" onChange={this.setNodeNote} disabled={this.state.checked}>
                {this.renderNoteSelect()}
              </select>
            </div>

            <div>
              <label htmlFor="node-octave">Octave</label>
              <select name="node-octave" onChange={this.setNodeOctave} disabled={this.state.checked}>
                {this.renderOctaveSelect()}
              </select>
            </div>
          </div>

          <div className="synth-node-panel-column">
            <div>
              <label htmlFor="node-note">Note</label>
              <select name="node-note" onChange={this.setNodeNote} disabled={this.state.checked}>
                {this.renderNoteSelect()}
              </select>
            </div>

            <div>
              <label htmlFor="node-octave">Octave</label>
              <select name="node-octave" onChange={this.setNodeOctave} disabled={this.state.checked}>
                {this.renderOctaveSelect()}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = SynthNodePanel;
