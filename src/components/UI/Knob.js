import React from 'react';
import './Knob.css';
import { getNodeColor, toPolar, clip } from '../../utils/utils';

class Knob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      angle: 0,
      value: 0,
      anchor: 0
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
    let anchor = this.convertPositionToValue(event);
    this.setState({
      dragging: true,
      anchor: anchor
    });
    window.onmousemove = this.onMouseMove.bind(this);
    window.onmouseup = this.onMouseUp.bind(this);
  }

  onMouseMove(event) {
    event.preventDefault();
    if (!this.state.dragging) {
      return;
    }

    var increment = this.convertPositionToValue(event) - this.state.anchor;
    if (Math.abs(increment) > 0.5) {
      increment = 0;
    }

    let anchor = this.convertPositionToValue(event);
    let value = this.state.value / this.props.max + increment;
    value = clip(value, 0, 1);

    this.setState({
      angle: value * 360,
      anchor: anchor,
      value: value * this.props.max
    });

    this.props.onChange(parseFloat(value));
  }

  onMouseUp(event) {
    event.preventDefault();
    this.setState({
      dragging: false
    });
    window.onmousemove = null;
    window.onmouseup = null;
  }

  convertPositionToValue(event) {
    let x = event.clientX - this.refs.knobOuter.offsetLeft - 30;
    let y = event.clientY - this.refs.knobOuter.offsetTop - 30;

    let angle = toPolar(x, y).angle;
    angle /= (Math.PI * 2);
    angle = (angle - 0.25 + 1) % 1;

    return angle;
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
          <div className="knob-dial">{parseFloat(this.state.value.toFixed(this.precision))}</div>
        </div>
        <div className="knob-label">{this.props.label}</div>
      </div>
    );
  }
}

module.exports = Knob;
