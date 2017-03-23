import React from 'react';
import './Menu.css';
import MenuButton from './MenuButton';

class Menu extends React.Component {
  render() {
    return (
      <div className="menu-container">
        <MenuButton/>
      </div>
    );
  }
}

module.exports = Menu;
