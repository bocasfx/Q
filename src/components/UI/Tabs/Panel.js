import React from 'react';
import './Panel.css';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(event) {
    if(event.keyCode === 0) {
      event.preventDefault();
    }
  }

  render() {
    return (
      <div className="panel-container" onKeyPress={this.onKeyPress} tabIndex="1">
        <div className="panel-list">
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = Panel;
