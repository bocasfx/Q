import React from 'react';
import './NodePanelHeader.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNodeLag, setNodeProbability } from '../../actions/Nodes';
import Knob from '../UI/Knob';

class NodePanelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.onLagChange = this.onLagChange.bind(this);
    this.onProbabilityChange = this.onProbabilityChange.bind(this);
  }

  onLagChange(value) {
    this.props.setNodeLag(this.props.node.id, value);
  }

  onProbabilityChange(value) {
    this.props.setNodeProbability(this.props.node.id, value);
  }

  render() {
    return (
      <div className="node-panel-header-container">
        <Knob
          label={'Lag'}
          value={this.props.node.lag}
          min={0}
          max={500}
          onChange={this.onLagChange}
          disabled={this.props.node.disabled}
          type={this.props.node.type}/>
        <Knob
          label={'Probability'}
          value={this.props.node.probability}
          min={0}
          max={1}
          onChange={this.onProbabilityChange}
          disabled={this.props.node.disabled}
          type={this.props.node.type}/>
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
    setNodeLag: bindActionCreators(setNodeLag, dispatch),
    setNodeProbability: bindActionCreators(setNodeProbability, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(NodePanelHeader);
