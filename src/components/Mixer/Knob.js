import React from 'react';
import './Knob.css';

class Knob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      angle: 300,
      y: null,
      value: 0,
      mounted: false
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.mounted = false;
  }

  componentDidMount() {
    let value = this.props.value;
    let angle = (value * 300.0 / this.props.max) + 300.0;
    this.setState({
      mounted: true,
      value: value.toFixed(1),
      angle
    });
  }

  onMouseDown(event) {
    if (this.props.disabled) {
      return;
    }
    event.preventDefault();
    this.setState({
      dragging: true,
      y: event.pageY
    });
    window.onmousemove = this.onMouseMove.bind(this);
    window.onmouseup = this.onMouseUp.bind(this);
  }

  onMouseMove(event) {
    event.preventDefault();
    if (!this.state.dragging) {
      return;
    }

    let angle = this.state.angle + (this.state.y - event.pageY);
    angle = angle >= 600 ? 600 : angle;
    angle = angle <= 300 ? 300 : angle;

    let value = (((angle - 300.0) / 300.0) * this.props.max);
    value = value.toFixed(1);

    this.setState({
      angle,
      y: event.pageY,
      value
    });
    this.props.onChange(value);
  }

  onMouseUp(event) {
    event.preventDefault();
    this.setState({ dragging: false });
    window.onmousemove = null;
    window.onmouseup = null;
  }

  render() {
    let angle = this.state.angle;
    let dotStyle = {
      transform: 'rotate(' + angle + 'deg)'
    };

    let disabled = this.props.disabled;

    return (
      <div className="knob-container" disabled={disabled}>
        <div className="knob-outer">
          <div className="knob-dot" style={dotStyle} onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}>&middot;</div>
          <div className="knob-dial">{this.state.value}</div>
        </div>
        <div className="knob-label">{this.props.label}</div>
      </div>
    );
  }
}

module.exports = Knob;
