import React from 'react';
import './MidiNodePanel.css';
import { connect } from 'react-redux';
import NodePanelHeader from '../NodePanelHeader';

class MidiNodePanel extends React.Component {

  renderMidiOutputSelect() {
    return <option value="test">test</option>;
  }

  render() {
    return (
      <div className="midi-node-panel-container">
        <NodePanelHeader node={this.props.node}/>
        <div>
          <label htmlFor="midiTest">Output</label>
          <select name="midiTest">
            {this.renderMidiOutputSelect()}
          </select>
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

module.exports = connect(mapStateToProps)(MidiNodePanel);
