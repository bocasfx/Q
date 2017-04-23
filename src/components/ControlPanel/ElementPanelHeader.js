import React from 'react';
import { connect } from 'react-redux';
import ActivityIndicator from '../UI/ActivityIndicator';
import './ElementPanelHeader.css';

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
    let toggleClass = 'element-panel-header-on';
    toggleClass += this.props.element.disabled ? ' element-panel-header-off' : '';

    return (
      <div className="element-panel-header-container">
        <div className="row-between">
          <ActivityIndicator item={this.props.element}/>
          <input
            className="element-panel-header-name"
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
    nodes: state.nodes
  };
};

module.exports = connect(mapStateToProps)(NodePanelHeader);
