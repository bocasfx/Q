import React from 'react';
import { connect } from 'react-redux';

class NodePanelHeader extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  onChange(event) {
    let name = event.target.value;
    this.props.onChange(name);
  }

  onToggle() {
    let disabled = !this.props.element.disabled;
    this.props.onToggle(disabled);
  }

  render() {
    let toggleClass = 'synth-node-panel-on';
    toggleClass += this.props.element.disabled ? ' synth-node-panel-off' : '';

    return (
      <div className="node-panel-header-container">
        <div className="row-between">
          <input
            className="synth-node-panel-name"
            type="text"
            name="node-name"
            value={this.props.element.name}
            onChange={this.onChange}
            disabled={this.props.element.disabled}/>
          <div className={toggleClass} onClick={this.onToggle}>
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

module.exports = connect(mapStateToProps)(NodePanelHeader);
