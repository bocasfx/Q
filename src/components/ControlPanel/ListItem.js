import React from 'react';
import './ListItem.css';

class ListItem extends React.Component {
  render() {
    let selectedClass = this.props.item.selected ? 'list-item-name list-item-selected' : 'list-item-name';
    return (
      <div className="list-item-container" onClick={this.props.onClick}>
        <div>
          <span>{this.props.idx + 1}</span>
          <span className={selectedClass}>{this.props.item.name}</span>
        </div>
        <div className="list-item-close" onClick={this.props.onDelete}>&times;</div>
      </div>
    );
  }
}

module.exports = ListItem;
