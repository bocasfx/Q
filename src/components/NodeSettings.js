import React from 'react';
import './NodeSettings.css';
import { connect } from 'react-redux';
import Settings from './Settings';
import noteConfig from '../config/frequencies';
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
    this.loadNodeSettings = this.loadNodeSettings.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.loadNodeSettings();
  }

  loadNodeSettings() {
    if (!this.props.nodes.length || !this.props.devices.nodeSettingsId) {
      return;
    }

    let currentNode = _.find(this.props.nodes, (node) => {
      return node.id === this.props.devices.nodeSettingsId;
    });

    let freqObj = _.find(noteConfig.frequencies, (freq) => {
      return (Math.abs(freq.frequency - currentNode.frequency) < 0.001);
    });

    this.setState({
      selectedNote: freqObj.note,
      selectedOctave: freqObj.octave
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
    let frequency = _.find(noteConfig.frequencies, (freq) => {
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
    devices: state.Devices,
    nodes: state.Nodes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeFrequency: bindActionCreators(setNodeFrequency, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(NodeSettings);
