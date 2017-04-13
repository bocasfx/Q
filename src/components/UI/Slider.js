import React from 'react';
import './Slider.css';

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.travel = 71;

    this.state = {
      dragging: false,
      y: null,
      position: this.travel,
      value: 0
    };

    this.renderMarks = this.renderMarks.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  renderMarks() {
    let markCount = (this.props.max - this.props.min) / this.props.step;
    let marks = [];
    for (let i=0 ; i<markCount; i++) {
      marks.push(<div className="slider-mark" key={i}>-</div>);
    }
    return marks;
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

    let position = this.state.position - (this.state.y - event.pageY);
    position = position >= this.travel ? this.travel : position;
    position = position <= 3 ? 3 : position;

    let value = this.props.max - (this.props.max - this.props.min) / (this.travel - 3) * (position - 3) + this.props.min;

    this.setState({
      y: event.pageY,
      value,
      position
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
    let handleStyle = {
      top: this.state.position + 'px'
    };

    return (
      <div className="slider-container">
        <div className="slider-track">
          <div className="slider-handle" style={handleStyle} onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}></div>
        </div>
        <div className="slider-marks">
          {this.renderMarks()}
        </div>
      </div>
    );
  }
}

module.exports = Slider;
