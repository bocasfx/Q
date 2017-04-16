import React from 'react';
import './NodePanelHeader.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNodeName, setNodeDisabledStatus } from '../../actions/Nodes';
import { getSelectedElement } from '../../utils/utils';

class NodePanelHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNode: null
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onNodeToggle = this.onNodeToggle.bind(this);
  }

  componentDidMount() {
    this.setState({
      selectedNode: getSelectedElement(this.props.nodes)
    });
  }

  componentWillReceiveProps(nextProps) {
     this.setState({
      selectedNode: getSelectedElement(nextProps.nodes)
    });
  }

  onNameChange(event) {
    let name = event.target.value;
    this.props.setNodeName(this.state.selectedNode.id, name);
  }

  onNodeToggle() {
    this.props.setNodeDisabledStatus(this.state.selectedNode.id, !this.state.selectedNode.disabled);
  }

  render() {

    if (!this.state.selectedNode) {
      return null;
    }

    let toggleClass = 'synth-node-panel-on';
    if (this.state.selectedNode) {
      toggleClass += this.state.selectedNode.disabled ? ' synth-node-panel-off' : '';
    }

    return (
      <div className="node-panel-header-container">
        <div className="row-between">
          <input
            className="synth-node-panel-name"
            type="text"
            name="node-name"
            value={this.state.selectedNode.name}
            onChange={this.onNameChange}
            disabled={this.state.selectedNode.disabled}/>
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
