import React from 'react';
import './NodePanelHeader.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNodeName, setNodeDisabledStatus } from '../../actions/Nodes';

class NodePanelHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: props.node.disabled,
      nodeName: props.node.name
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onNodeToggle = this.onNodeToggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      disabled: nextProps.node.disabled,
      nodeName: nextProps.node.name
    });
  }

  onNameChange(event) {
    let name = event.target.value;
    this.props.setNodeName(this.props.node.id, name);
    this.setState({
      nodeName: name
    });
  }

  onNodeToggle() {
    this.props.setNodeDisabledStatus(this.props.node.id, !this.state.disabled);
    this.setState({
      disabled: !this.state.disabled
    });
  }

  render() {

    let toggleClass = 'synth-node-panel-on';
    toggleClass += this.state.disabled ? ' synth-node-panel-off' : '';

    return (
      <div className="node-panel-header-container">
        <div className="row-between">
          <input
            className="synth-node-panel-name"
            type="text"
            name="node-name"
            value={this.state.nodeName}
            onChange={this.onNameChange}
            disabled={this.state.disabled}/>
          <div className={toggleClass} onClick={this.onNodeToggle}>
            <i className="fa fa-power-off"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeName: bindActionCreators(setNodeName, dispatch),
    setNodeDisabledStatus: bindActionCreators(setNodeDisabledStatus, dispatch)
  };
};

module.exports = connect(null, mapDispatchToProps)(NodePanelHeader);
