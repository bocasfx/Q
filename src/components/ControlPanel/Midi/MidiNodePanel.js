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
  setNodeNote,
  setNodeChannel,
  setNodeOctave,
  stopNode,
  setNodeMidiOutput } from '../../../actions/Nodes';
import PropTypes from 'prop-types';

class MidiNodePanel extends React.Component {

  static propTypes = {
    nodes: PropTypes.array,
    setNodeVelocity,
    stopNode: PropTypes.func,
    setNodeOctave: PropTypes.func,
    setNodeNote: PropTypes.func,
    setNodeChannel: PropTypes.func,
    setNodeMidiOutput: PropTypes.func,
    midi: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.onVelocityChange = this.onVelocityChange.bind(this);
    this.onNoteChange = this.onNoteChange.bind(this);
    this.onOctaveChange = this.onOctaveChange.bind(this);
    this.onChannelChange = this.onChannelChange.bind(this);
    this.onDestinationChange = this.onDestinationChange.bind(this);
    this.renderMidiDestinationSelect = this.renderMidiDestinationSelect.bind(this);
    this.renderChannelSelect = this.renderChannelSelect.bind(this);

    let nodes = getSelectedElements(props.nodes);
    let node = nodes[0];
    let note = _.find(noteConfig.frequencies, (noteObj) => {
      return noteObj.midi === node.note;
    });

    this.state = {
      nodes,
      note: note.note,
      octave: node.octave,
      channel: node.channel,
      velocity: node.velocity,
      disabled: node.disabled,
      type: node.type,
    };
  }

  componentWillReceiveProps(nextProps) {
    let nodes = getSelectedElements(nextProps.nodes);
    let node = nodes[0];

    let note = _.find(noteConfig.frequencies, (noteObj) => {
      return noteObj.midi === node.note;
    });

    this.setState({
      nodes,
      note: note.note,
      octave: node.octave,
      channel: node.channel,
      velocity: node.velocity,
      disabled: node.disabled,
      type: node.type,
    });
  }

  onVelocityChange(value) {
    this.state.nodes.forEach((node) => {
      this.props.setNodeVelocity(node.id, value);
    });
  }

  onNoteChange(event) {
    this.state.nodes.forEach((node) => {
      let note = _.find(noteConfig.frequencies, (noteObj) => {
        return (noteObj.note === event.target.value && noteObj.octave === this.state.octave);
      });
      this.props.stopNode(node.id);
      this.props.setNodeNote(node.id, note.midi);
    });
  }

  onOctaveChange(event) {
    this.state.nodes.forEach((node) => {
      let note = _.find(noteConfig.frequencies, (noteObj) => {
        return (noteObj.note === this.state.note && noteObj.octave === parseInt(event.target.value, 10));
      });
      this.props.stopNode(node.id);
      this.props.setNodeOctave(node.id, note.octave);
      this.props.setNodeNote(node.id, note.midi);
    });
  }

  onChannelChange(event) {
    this.state.nodes.forEach((node) => {
      this.props.stopNode(node.id);
      this.props.setNodeChannel(node.id, parseInt(event.target.value, 10));
    });
  }

  onDestinationChange(event) {
    this.state.nodes.forEach((node) => {
      this.props.stopNode(node.id);
      this.props.setNodeMidiOutput(node.id, event.target.value);
    });
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
    let notes = [];
    noteConfig.notes.forEach((note, idx) => {
      notes.push(<option key={idx} value={note}>{note}</option>);
    });
    return notes;
  }

  renderOctaveSelect() {
    return noteConfig.octaves.map((octave, idx) => {
      return <option key={idx} value={octave}>{octave}</option>;
    });
  }

  renderChannelSelect() {
    let options = [];
    for(let i=1; i<=16; i++) {
      options.push(<option key={i} value={i - 1}>{i}</option>);
    }
    return options;
  }

  render() {
    return (
      <div className="midi-node-panel-container" disabled={this.state.disabled}>
        <NodePanelHeader/>
        <div className="midi-node-velocity">
          <Knob
            label={'Velocity'}
            value={this.state.velocity}
            min={0}
            max={127}
            onChange={this.onVelocityChange}
            disabled={this.state.disabled}
            type={this.state.type}
            log={false}/>
        </div>
        <div className="row">
          <div className="midi-node-selector">
            <label htmlFor="midiNote" disabled={this.state.disabled}>Note</label>
            <select name="midiNote" disabled={this.state.disabled} onChange={this.onNoteChange} value={this.state.note}>
              {this.renderNoteSelect()}
            </select>
          </div>

          <div className="midi-node-selector">
            <label htmlFor="midiOctave" disabled={this.state.disabled}>Octave</label>
            <select name="midiOctave" disabled={this.state.disabled} onChange={this.onOctaveChange} value={this.state.octave}>
              {this.renderOctaveSelect()}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="midi-node-selector">
            <label htmlFor="midiChannel" disabled={this.state.disabled}>Channel</label>
            <select name="midiChannel" disabled={this.state.disabled} onChange={this.onChannelChange} value={this.state.channel}>
              {this.renderChannelSelect()}
            </select>
          </div>
        </div>
        <div className="row midi-node-destination-selector">
          <div>
            <label htmlFor="midiTest" disabled={this.state.disabled}>Destination</label>
            <select name="midiTest" disabled={this.state.disabled} onChange={this.onDestinationChange}>
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
    midi: state.midi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeVelocity: bindActionCreators(setNodeVelocity, dispatch),
    setNodeNote: bindActionCreators(setNodeNote, dispatch),
    setNodeOctave: bindActionCreators(setNodeOctave, dispatch),
    setNodeChannel: bindActionCreators(setNodeChannel, dispatch),
    stopNode: bindActionCreators(stopNode, dispatch),
    setNodeMidiOutput: bindActionCreators(setNodeMidiOutput, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MidiNodePanel);
