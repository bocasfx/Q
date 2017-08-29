import React from 'react';
import './IconButton.css';

class IconButton extends React.Component {
  render() {
    let icon = 'fa fa-' + this.props.icon;
    let buttonStyle = {
      color: 'darkgray',
      textShadow: 'none'
    };

    buttonStyle = this.props.active ? {} : buttonStyle;

    return (
      <div className="icon-button-container">
        <button onClick={this.props.onClick} style={buttonStyle}>
          <i className={icon}></i>
        </button>
      </div>
    );
  }
}

module.exports = IconButton;
