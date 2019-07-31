import React from 'react';
import './IconButton.css';
import PropTypes from 'prop-types';

class IconButton extends React.Component {

  static propTypes = {
    icon: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func,
  }

  render() {
    let icon = 'fa fa-' + this.props.icon;
    let buttonStyle = {
      color: 'darkgray',
      textShadow: 'none',
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

export default IconButton;
