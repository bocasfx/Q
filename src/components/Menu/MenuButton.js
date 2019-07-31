import React from 'react';
import './MenuButton.css';
import PropTypes from 'prop-types';

class MenuButton extends React.Component {

  static propTypes = {
    active: PropTypes.bool,
    separator: PropTypes.bool,
    title: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.string,
  }

  render() {

    let menuClass = 'menu-button';
    menuClass += this.props.active ? ' menu-button-active' : '';
    
    return (
      <div className="menu-button-container" title={this.props.title}>
        <div className={menuClass} onClick={this.props.onClick}>
          <img className="menu-button-icon" src={this.props.icon} alt="icon" draggable={false}/>
        </div>
        {this.props.separator ? <div className="menu-button-separator"></div> : null }
      </div>
    );
  }
}

export default MenuButton;
