import React from 'react';
import './NodePanelHeader.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNodeName, setNodeDisabledStatus } from '../../actions/Nodes';

class NodePanelHeader extends React.Component {
  constructor(props) {
    super(props);

    this.onNameChange = this.onNameChange.bind(this);
    this.onNodeToggle = this.onNodeToggle.bind(this);
  }

  onNameChange(event) {
    let name = event.target.value;
    this.props.setNodeName(this.props.node.id, name);
  }

  onNodeToggle() {
    this.props.setNodeDisabledStatus(this.props.node.id, !this.props.node.disabled);
  }

  render() {

    let toggleClass = 'synth-node-panel-on';
    toggleClass += this.props.node.disabled ? ' synth-node-panel-off' : '';

    return (
      <div className="node-panel-header-container">
        <div className="row-between">
          <input
            className="synth-node-panel-name"
            type="text"
            name="node-name"
            value={this.props.node.name}
            onChange={this.onNameChange}
            disabled={this.props.node.disabled}/>
          <div className={toggleClass} onClick={this.onNodeToggle}>
            <i className="fa fa-power-off"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.Nodes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeName: bindActionCreators(setNodeName, dispatch),
    setNodeDisabledStatus: bindActionCreators(setNodeDisabledStatus, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(NodePanelHeader);
