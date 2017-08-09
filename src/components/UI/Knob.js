import React from 'react';
import './Knob.css';
import { getNodeColor } from '../../utils/utils';

const _angle = 290;

class Knob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      angle: _angle,
      y: null,
      value: 0
    };

    this.precision = props.precision !== undefined ? props.precision : 2;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount() {
    let value = this.props.value;
    let angle = (value * _angle / this.props.max) + _angle;
    this.setState({
      value: parseFloat(value.toFixed(this.precision)),
      angle
    });
  }

  onMouseDown(event) {
    if (this.props.disabled) {
      return;
    }
    event.preventDefault();
    event.target.requestPointerLock();
    this.setState({
      dragging: true,
      y: event.pageY
    });
    window.onmousemove = this.onMouseMove.bind(this);
    window.onmouseup = this.onMouseUp.bind(this);
  }

  onMouseMove(event) {
    event.preventDefault();
    if (!this.state.dragging || !event.movementY) {
      return;
    }

    let angle = this.state.angle - event.movementY;
    angle = angle >= 2 * _angle ? 2 * _angle : angle;
    angle = angle <= _angle ? _angle : angle;

    let value = (((angle - _angle) / _angle) * this.props.max);
    value = parseFloat(value.toFixed(this.precision));

    this.setState({
      angle,
      y: event.pageY,
      value
    });

    this.props.onChange(parseFloat(value));
  }

  onMouseUp(event) {
    event.preventDefault();
    this.setState({ dragging: false });
    window.onmousemove = null;
    window.onmouseup = null;
    document.exitPointerLock();
  }

  render() {
    let dotStyle = {
      transform: 'rotate(' + this.state.angle + 'deg)',
      color: getNodeColor(this.props.type)
    };

    let disabled = this.props.disabled;

    return (
      <div className="knob-container" disabled={disabled}>
        <div className="knob-outer">
          <div className="knob-dot" style={dotStyle} onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}>&middot;</div>
          <div className="knob-dial"></div>
        </div>
        <div className="knob-label">{this.props.label}</div>
      </div>
    );
  }
}

module.exports = Knob;
