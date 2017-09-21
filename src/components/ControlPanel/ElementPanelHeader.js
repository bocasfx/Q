import React from 'react';
import { connect } from 'react-redux';
import ActivityIndicator from '../UI/ActivityIndicator';
import './ElementPanelHeader.css';
import { getNodeColor } from '../../utils/utils';

class ElementPanelHeader extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
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

  onKeyPress(event) {
    event.stopPropagation();
  }

  onKeyDown(event) {
    event.stopPropagation();
  }

  render() {
    let toggleClass = 'element-panel-header-on';
    toggleClass += this.props.element.disabled ? ' element-panel-header-off' : '';

    let color = getNodeColor(this.props.element.type);
    let style = this.props.element.disabled ? {} : {color: color, textShadow: '0 0 10px ' + color};

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
            disabled={this.props.element.disabled}
            onKeyPress={this.onKeyPress}
            onKeyDown={this.onKeyDown}/>
          <div className={toggleClass} style={style} onClick={this.onToggle}>
            <i className="fa fa-power-off"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes,
    streams: state.streams
  };
};

module.exports = connect(mapStateToProps)(ElementPanelHeader);
