import React from 'react';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import './Toggle.css';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.renderIcons = this.renderIcons.bind(this);
  }

  renderIcons() {
    if (this.props.icons) {
      return this.props.icons.map((icon, idx) => {
        return <img src={icon} alt={icon} key={idx}/>;
      });
    }
  }

  render() {
    return (
      <div>
        <div className="toggle-icon-container">
          {this.renderIcons()}
        </div>
        <div className="toggle">
          <Slider
            vertical
            min={this.props.min}
            step={this.props.step}
            max={this.props.max}
            marks={this.props.marks}
            defaultValue={this.props.defaultValue}
            onChange={this.props.onChange}/>
        </div>
      </div>
    );
  }
}

module.exports = Toggle;
