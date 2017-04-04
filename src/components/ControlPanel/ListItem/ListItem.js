import React from 'react';
import './ListItem.css';

class ListItem extends React.Component {
  render() {
    return (
      <div className="list-item-container">
        <div>
          <span>{this.props.idx + 1}</span>
          <span className="list-item-name">{this.props.item.name}</span>
        </div>
        <div className="list-item-close" onClick={this.props.onClick}>&times;</div>
      </div>
    );
  }
}

module.exports = ListItem;

