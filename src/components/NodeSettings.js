import React from 'react';
import './NodeSettings.css';
import { connect } from 'react-redux';
import Settings from './Settings';
import frequencies from '../config/frequencies';
import { setNodeFrequency } from '../actions/Nodes';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

class NodeSettings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedNote: 'A',
      selectedOctave: 4
    };

    this.setNodeNote = this.setNodeNote.bind(this);
    this.setNodeOctave = this.setNodeOctave.bind(this);
  }

  renderNoteSelect() {
    return frequencies.notes.map((note, idx) => {
      return <option key={idx} value={note}>{note}</option>;
    });
  }

  renderOctaveSelect() {
    return frequencies.octaves.map((octave, idx) => {
      return <option key={idx} value={octave}>{octave}</option>;
    });
  }

  setNodeNote(event) {
    let octave = this.state.selectedOctave;
    let note = event.target.value;
    this.setState({
      selectedNote: note
    });
    this.setNodeFrequency(note, octave);
  }

  setNodeOctave(event) {
    let octave = parseInt(event.target.value, 10);
    let note = this.state.selectedNote;
    this.setState({
      selectedOctave: octave
    });
    this.setNodeFrequency(note, octave);
  }

  setNodeFrequency(note, octave) {
    let frequency = _.find(frequencies.frequencies, (freq) => {
      return freq.note === note && freq.octave === octave;
    });

    this.props.setNodeFrequency(this.props.devices.nodeSettingsId, frequency.frequency);
  }

  render() {
    return (
      <Settings>
        <div>
          <label htmlFor="node-id">ID</label>
          <input className="readonly" name="node-id" type="text" readOnly value={this.props.devices.nodeSettingsId || ''}/>
        </div>
        <div>
          <label htmlFor="node-note">Note</label>
          <select value={this.state.selectedNote} name="node-note" onChange={this.setNodeNote}>
            {this.renderNoteSelect()}
          </select>
        </div>
        <div>
          <label htmlFor="node-octave">Octave</label>
          <select value={this.state.selectedOctave} name="node-octave" onChange={this.setNodeOctave}>
            {this.renderOctaveSelect()}
          </select>
        </div>
      </Settings>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    devices: state.Devices
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeFrequency: bindActionCreators(setNodeFrequency, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(NodeSettings);
