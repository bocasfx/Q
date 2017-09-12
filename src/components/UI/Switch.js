import React from 'react';
import './Switch.css';

class Switch extends React.Component {
  render() {
    return (
      <div className="switch-container">
        <label className="switch">
          <input type="checkbox" onChange={this.props.onChange} checked={this.props.checked}/>
          <span className="switch-slider switch-round"></span>
        </label>
      </div>
    );
  }
}

export default Switch;
