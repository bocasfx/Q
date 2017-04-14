import React from 'react';
import './Slider.css';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.renderMarks = this.renderMarks.bind(this);
    this.renderIcons = this.renderIcons.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  renderMarks() {
    let marks = [];
    for (let i=0 ; i<this.props.marks; i++) {
      marks.push(<div className="slider-mark" key={i}>-</div>);
    }
    return marks;
  }

  renderIcons() {
    if (this.props.icons) {
      return this.props.icons.map((icon, idx) => {
        return <img src={icon} alt={icon} key={idx}/>;
      });
    }
  }

  onChange(event) {
    let value = event.target.value;
    this.props.onChange(parseFloat(value));
  }

  render() {
    return (
      <div className="slider-container">
        <div className="slider-icon-container">
          {this.renderIcons()}
        </div>
        <input
          className="slider"
          type="range"
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          value={this.props.value}
          onChange={this.onChange}/>
        <div className="slider-marks">
          {this.renderMarks()}
        </div>
      </div>
    );
  }
}

module.exports = Slider;
