import React from 'react';
import './Knob.css';
import { getNodeColor, toPolar } from '../../utils/utils';

class Knob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      angle: 0,
      value: 0,
      mouseDownAngle: 0
    };

    this.precision = props.precision !== undefined ? props.precision : 1;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount() {
    let value = this.props.value;
    this.setState({
      value: parseFloat(value.toFixed(this.precision))
    });
  }

  componentWillReceiveProps(nextProps) {

    if (this.state.dragging) {
      return;
    }

    this.setState({
      value: parseFloat(nextProps.value.toFixed(this.precision))
    });
  }

  onMouseDown(event) {
    if (this.props.disabled) {
      return;
    }
    event.preventDefault();
    let mouseDownAngle = this.getAngle(event);
    this.setState({
      dragging: true,
      mouseDownAngle: mouseDownAngle
    });
    window.onmousemove = this.onMouseMove.bind(this);
    window.onmouseup = this.onMouseUp.bind(this);
  }

  onMouseMove(event) {
    event.preventDefault();
    if (!this.state.dragging) {
      return;
    }

    let newAngle = this.getAngle(event);
    let angleDiff = newAngle - this.state.mouseDownAngle;

    let angle = this.state.angle + angleDiff;
    angle = (angle + 360) % 360;

    let value = ((angle / 360.0) * this.props.max);
    value = parseFloat(value.toFixed(this.precision));

    this.setState({
      angle: angle,
      mouseDownAngle: newAngle,
      value
    });

    this.props.onChange(parseFloat(value));
  }

  onMouseUp(event) {
    event.preventDefault();
    this.setState({
      dragging: false,
      initialAngle: this.state.angle
    });
    window.onmousemove = null;
    window.onmouseup = null;
  }

  getAngle(event) {
    let x = event.clientX - this.refs.knobOuter.offsetLeft - 30;
    let y = event.clientY - this.refs.knobOuter.offsetTop - 30;
    return toPolar(x, y).angle;
  }

  render() {
    let dotStyle = {
      transform: 'rotate(' + this.state.angle + 'deg)',
      color: getNodeColor(this.props.type)
    };

    let disabled = this.props.disabled;

    return (
      <div className="knob-container" disabled={disabled}>
        <div className="knob-outer" ref="knobOuter">
          <div className="knob-dot" style={dotStyle} onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}>&middot;</div>
          <div className="knob-dial">{this.state.value}</div>
        </div>
        <div className="knob-label">{this.props.label}</div>
      </div>
    );
  }
}

module.exports = Knob;
