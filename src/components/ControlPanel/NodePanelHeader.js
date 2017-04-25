import React from 'react';
import './NodePanelHeader.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNodeDelay, setNodeProbability } from '../../actions/Nodes';
import Knob from '../UI/Knob';

class NodePanelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.onDelayChange = this.onDelayChange.bind(this);
    this.onProbabilityChange = this.onProbabilityChange.bind(this);
  }

  onDelayChange(value) {
    this.props.setNodeDelay(this.props.node.id, value);
  }

  onProbabilityChange(value) {
    this.props.setNodeProbability(this.props.node.id, value);
  }

  render() {
    return (
      <div className="node-panel-header-container">
        <Knob
          label={'Delay'}
          value={this.props.node.delay}
          min={0}
          max={5000}
          onChange={this.onDelayChange}
          disabled={this.props.node.disabled}/>
        <Knob
          label={'Probability'}
          value={this.props.node.probability}
          min={0}
          max={1}
          onChange={this.onProbabilityChange}
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
    setNodeDelay: bindActionCreators(setNodeDelay, dispatch),
    setNodeProbability: bindActionCreators(setNodeProbability, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(NodePanelHeader);
