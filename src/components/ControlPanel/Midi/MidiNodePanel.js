import React from 'react';
import './MidiNodePanel.css';
import { connect } from 'react-redux';
import NodePanelHeader from '../NodePanelHeader';

class MidiNodePanel extends React.Component {
  render() {
    return (
      <div className="midi-node-panel-container">
        <NodePanelHeader node={this.props.node}/>
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
