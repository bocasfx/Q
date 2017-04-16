import React from 'react';
import './NodePanelHeader.css';

class NodePanelHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      disabled: props.disabled
    };

    this.onChange = this.onChange.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  onChange(event) {
    let name = event.target.value;
    this.setState({
      name
    });
    this.props.onChange(name);
  }

  onToggle() {
    let disabled = !this.state.disabled;
    this.setState({
      disabled
    });
    this.props.onToggle(disabled);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      disabled: nextProps.disabled
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
            value={this.state.name}
            onChange={this.onChange}
            disabled={this.state.disabled}/>
          <div className={toggleClass} onClick={this.onToggle}>
            <i className="fa fa-power-off"></i>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = NodePanelHeader;
