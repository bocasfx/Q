import React from 'react';
import './MidiNodePanel.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NodePanelHeader from '../NodePanelHeader';
import Knob from '../../UI/Knob';
import noteConfig from '../../../config/frequencies';
import _ from 'lodash';
import { getSelectedElements } from '../../../utils/utils';
import {
  setNodeVelocity,
  setNodeNote } from '../../../actions/Nodes';

class MidiNodePanel extends React.Component {

  constructor(props) {
    super(props);
    this.onVelocityChange = this.onVelocityChange.bind(this);
    this.onNoteChange = this.onNoteChange.bind(this);
    this.onOctaveChange = this.onOctaveChange.bind(this);
    this.onDestinationChange = this.onDestinationChange.bind(this);
    this.renderMidiNotesSelect = this.renderMidiNotesSelect.bind(this);
    this.renderMidiDestinationSelect = this.renderMidiDestinationSelect.bind(this);

    this.nodes = getSelectedElements(props.nodes);
    this.node = this.nodes[0];

    this.note = 'C';
    this.octave = 0;
  }

  componentWillReceiveProps(nextProps) {
    this.nodes = getSelectedElements(nextProps.nodes);
    this.node = this.nodes[0];
  }

  onVelocityChange(value) {
    this.nodes.forEach((node) => {
      this.props.setNodeVelocity(node.id, value);
    });
  }

  onNoteChange(event) {
    this.nodes.forEach((node) => {
      let note = _.find(noteConfig.frequencies, (noteObj) => {
        return (noteObj.note === event.target.value && noteObj.octave === this.octave);
      });
      this.note = note.note;
      this.props.setNodeNote(node.id, note.midi);
    });
  }

  onOctaveChange(event) {
    this.nodes.forEach((node) => {
      let note = _.find(noteConfig.frequencies, (noteObj) => {
        return (noteObj.note === this.note && noteObj.octave === parseInt(event.target.value, 10));
      });
      this.octave = note.octave;
      this.props.setNodeNote(node.id, note.midi);
    });
  }

  onDestinationChange(event) {
    console.log(event.target.value);
  }

  renderMidiDestinationSelect() {
    if (!this.props.midi) {
      return null;
    }
    return this.props.midi.destinations.map((destination, idx) => {
      return <option key={idx} value={destination.id}>{destination.name}</option>;
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

  renderMidiNotesSelect() {
    let options = [];
    for (var i = 0; i < 128; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  }

  render() {
    return (
      <div className="midi-node-panel-container" disabled={this.node.disabled}>
        <NodePanelHeader/>
        <div className="midi-node-velocity">
          <Knob
            label={'Velocity'}
            value={this.node.velocity}
            min={0}
            max={127}
            onChange={this.onVelocityChange}
            disabled={this.node.disabled}
            type={this.node.type}
            log={false}/>
        </div>
        <div className="row">
          <div className="midi-node-selector">
            <label htmlFor="midiNote" disabled={this.node.disabled}>Note</label>
            <select name="midiNote" disabled={this.node.disabled} onChange={this.onNoteChange}>
              {this.renderNoteSelect()}
            </select>
          </div>

          <div className="midi-node-selector">
            <label htmlFor="midiOctave" disabled={this.node.disabled}>Octave</label>
            <select name="midiOctave" disabled={this.node.disabled} onChange={this.onOctaveChange}>
              {this.renderOctaveSelect()}
            </select>
          </div>
        </div>
        <div className="row midi-node-destination-selector">
          <div>
            <label htmlFor="midiTest" disabled={this.node.disabled}>Destination</label>
            <select name="midiTest" disabled={this.node.disabled} onChange={this.onDestinationChange}>
              {this.renderMidiDestinationSelect()}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes,
    midi: state.midi
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeVelocity: bindActionCreators(setNodeVelocity, dispatch),
    setNodeNote: bindActionCreators(setNodeNote, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MidiNodePanel);
