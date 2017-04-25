import React from 'react';
import FileButton from '../UI/FileButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNodeDelay } from '../../actions/Nodes';
import Knob from '../UI/Knob';

class AudioNodePanel extends React.Component {
  constructor(props) {
    super(props);
    this.onDelayChange = this.onDelayChange.bind(this);
  }

  onDelayChange(value) {
    this.props.setNodeDelay(this.props.node.id, value);
  }

  render() {
    return (
      <div className="audio-node-panel-container">
        <FileButton node={this.props.node}/>
        <Knob
          label={'Delay'}
          value={this.props.node.delay}
          min={0}
          max={5000}
          onChange={this.onDelayChange}
          disabled={this.props.node.disabled}/>
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
    setNodeDelay: bindActionCreators(setNodeDelay, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(AudioNodePanel);
