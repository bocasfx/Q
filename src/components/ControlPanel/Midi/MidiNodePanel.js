import React from 'react';
import './MidiNodePanel.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NodePanelHeader from '../NodePanelHeader';
import Knob from '../../UI/Knob';
import noteConfig from '../../../config/frequencies';
import _ from 'lodash';
import {
  setNodeVelocity,
  setNodeNote } from '../../../actions/Nodes';

class MidiNodePanel extends React.Component {

  constructor(props) {
    super(props);
    this.onVelocityChange = this.onVelocityChange.bind(this);
    this.onNoteChange = this.onNoteChange.bind(this);
    this.onOctaveChange = this.onOctaveChange.bind(this);
    this.renderMidiNotesSelect = this.renderMidiNotesSelect.bind(this);
    this.renderMidiOutputSelect = this.renderMidiOutputSelect.bind(this);

    this.state = {
      note: 'C',
      octave: 0
    };
  }

  onVelocityChange(value) {
    this.props.setNodeVelocity(this.props.node.id, value);
  }

  onNoteChange(event) {
    let note = _.find(noteConfig.frequencies, (noteObj) => {
      return (noteObj.note === event.target.value && noteObj.octave === this.state.octave);
    });
    this.setState({
      note: note.note
    });
    console.log(note.midi);
    this.props.setNodeNote(this.props.node.id, note.midi);
  }

  onOctaveChange(event) {
    let note = _.find(noteConfig.frequencies, (noteObj) => {
      return (noteObj.note === this.state.note && noteObj.octave === parseInt(event.target.value, 10));
    });
    this.setState({
      octave: note.octave
    });
    console.log(note.midi);
    this.props.setNodeNote(this.props.node.id, note.midi);
  }

  renderMidiOutputSelect() {
    return <option value="test">test</option>;
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

  renderMidiNotesSelect() {
    let options = [];
    for (var i = 0; i < 128; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  }

  render() {
    return (
      <div className="midi-node-panel-container" disabled={this.props.node.disabled}>
        <NodePanelHeader node={this.props.node}/>
        <Knob
          label={'Velocity'}
          value={this.props.node.velocity}
          min={0}
          max={127}
          onChange={this.onVelocityChange}
          disabled={this.props.node.disabled}
          type={this.props.node.type}
          log={true}/>
        <div className="row">
          <div className="midi-node-selector">
            <label htmlFor="midiNote" disabled={this.props.node.disabled}>Note</label>
            <select name="midiNote" disabled={this.props.node.disabled} onChange={this.onNoteChange}>
              {this.renderNoteSelect()}
            </select>
          </div>

          <div className="midi-node-selector">
            <label htmlFor="midiOctave" disabled={this.props.node.disabled}>Octave</label>
            <select name="midiOctave" disabled={this.props.node.disabled} onChange={this.onOctaveChange}>
              {this.renderOctaveSelect()}
            </select>
          </div>
        </div>
        <div className="row midi-node-output-selector">
          <div>
            <label htmlFor="midiTest" disabled={this.props.node.disabled}>Output</label>
            <select name="midiTest" disabled={this.props.node.disabled}>
              {this.renderMidiOutputSelect()}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeVelocity: bindActionCreators(setNodeVelocity, dispatch),
    setNodeNote: bindActionCreators(setNodeNote, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(MidiNodePanel);
