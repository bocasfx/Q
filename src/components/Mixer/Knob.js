import React from 'react';
import './Knob.css';

class Knob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      angle: 300,
      y: null,
      value: 0
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount() {
    // this.props.min = this.props.min || 0;
    // this.props.max = this.props.max || 10.0;
  }

  onMouseDown(event) {
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

    let value = parseFloat((((angle - 300.0) / 300.0) * 10.0).toFixed(1), 10);
    this.setState({
      angle,
      y: event.pageY,
      value
    });
  }

  onMouseUp(event) {
    event.preventDefault();
    this.setState({ dragging: false });
    window.onMouseMove = null;
  }

  render() {
    let angle = this.state.angle;
    let dotStyle = {
      transform: 'rotate(' + angle + 'deg)'
    };

    return (
      <div className="knob-container">
        <div className="knob-label">{this.props.label}</div>
        <div className="knob-outer">
          <div className="knob-dot" style={dotStyle} onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}>&middot;</div>
          <div className="knob-dial">{this.state.value}</div>
        </div>
      </div>
    );
  }
}

module.exports = Knob;
