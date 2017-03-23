import React from 'react';
import './MenuButton.css';

class MenuButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: true
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let state = this.state;
    state.active = !state.active;
    this.setState(state);
    console.log(state.active);
  }

  render() {
    let buttonClass = 'menu-button-container';

    if (this.state.active) {
      buttonClass += ' menu-button-active';
    }

    return (
      <div className={buttonClass} onClick={this.onClick}></div>
    );
  }
}

module.exports = MenuButton;
