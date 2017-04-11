import React from 'react';
import './MenuButton.css';

class MenuButton extends React.Component {
  render() {
    let opacity = this.props.active ? 1 : 0.5;
    let style = {
      backgroundImage: 'url("' + this.props.backgroundImage + '")',
      opacity
    };

    return (
      <div className="menu-button-container" onClick={this.props.onClick} style={style}>

      </div>
    );
  }
}

module.exports = MenuButton;
