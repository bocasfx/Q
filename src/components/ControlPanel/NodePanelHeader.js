import React from 'react';
import './NodePanelHeader.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNodeLag, setNodeProbability } from '../../actions/Nodes';
import Knob from '../UI/Knob';
import { getSelectedElements } from '../../utils/utils';

class NodePanelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.onLagChange = this.onLagChange.bind(this);
    this.onProbabilityChange = this.onProbabilityChange.bind(this);
    this.nodes = getSelectedElements(props.nodes);
  }

  componentWillReceiveProps(nextProps) {
    this.nodes = getSelectedElements(nextProps.nodes);
  }

  onLagChange(value) {
    this.nodes.forEach((node) => {
      this.props.setNodeLag(node.id, value);
    });
  }

  onProbabilityChange(value) {
    this.nodes.forEach((node) => {
      this.props.setNodeProbability(node.id, value);
    });
  }

  render() {
    return (
      <div className="node-panel-header-container">
        <Knob
          label={'Lag'}
          value={this.nodes[0].lag}
          min={0}
          max={5000}
          onChange={this.onLagChange}
          disabled={!this.nodes[0].parentIds.length}
          type={this.nodes[0].type}/>
        <Knob
          label={'Probability'}
          value={this.nodes[0].probability}
          min={0}
          max={1}
          onChange={this.onProbabilityChange}
          disabled={this.nodes[0].disabled}
          type={this.nodes[0].type}/>
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
