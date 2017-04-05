import React from 'react';
import Knob from '../Mixer/Knob';
import './SynthNodePanel.css';
import noteConfig from '../../config/frequencies';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNodeOsc1Frequency, setNodeOsc2Frequency } from '../../actions/Nodes';

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

  setOsc1Freq(frequency) {
    this.props.setNodeOsc1Frequency(this.props.node.id, frequency);
  }

  setOsc2Freq(frequency) {
    this.props.setNodeOsc2Frequency(this.props.node.id, frequency);
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

        <div className="synth-node-panel-row">
          <input defaultValue={this.props.node.name}/>
        </div>

        <input name="osc" type="radio" value="continue" onChange={this.onRadioChange} checked={this.state.checked}/>
        <div className="synth-node-panel-row">
          <Knob
            label="Osc. 1 Freq."
            value={this.props.node.osc1Freq}
            min={20}
            max={2000}
            onChange={this.setOsc1Freq}
            disabled={!this.state.checked}/>
          <Knob
            label="Osc. 2 Freq."
            value={this.props.node.osc2Freq}
            min={20}
            max={2000}
            onChange={this.setOsc2Freq}
            disabled={!this.state.checked}/>
        </div>

        <input name="osc" type="radio" value="discrete" onChange={this.onRadioChange} checked={!this.state.checked}/>
        <div className="synth-node-panel-row">
          <div className="synth-node-panel-column">
            <div>
              <label htmlFor="node-note" disabled={this.state.checked}>Note</label>
              <select name="node-note" onChange={this.setNodeNote} disabled={this.state.checked}>
                {this.renderNoteSelect()}
              </select>
            </div>

            <div>
              <label htmlFor="node-octave" disabled={this.state.checked}>Octave</label>
              <select name="node-octave" onChange={this.setNodeOctave} disabled={this.state.checked}>
                {this.renderOctaveSelect()}
              </select>
            </div>
          </div>

          <div className="synth-node-panel-column">
            <div>
              <label htmlFor="node-note" disabled={this.state.checked}>Note</label>
              <select name="node-note" onChange={this.setNodeNote} disabled={this.state.checked}>
                {this.renderNoteSelect()}
              </select>
            </div>

            <div>
              <label htmlFor="node-octave" disabled={this.state.checked}>Octave</label>
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

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeOsc1Frequency: bindActionCreators(setNodeOsc1Frequency, dispatch),
    setNodeOsc2Frequency: bindActionCreators(setNodeOsc2Frequency, dispatch)
  };
};

module.exports = connect(null, mapDispatchToProps)(SynthNodePanel);
