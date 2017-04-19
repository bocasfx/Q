import React from 'react';
import './ListItem.css';
import ActivityIndicator from '../UI/ActivityIndicator';

class ListItem extends React.Component {
  render() {

    let itemClass = 'list-item-container';
    itemClass += this.props.item.selected ? ' list-item-selected' : '';

    return (
      <div className={itemClass} onClick={this.props.onClick}>
        <div>
          <ActivityIndicator item={this.props.item}/>
          <span className="list-item-name">{this.props.item.name}</span>
        </div>
        <div>
          <span className="list-item-icon" onClick={this.props.onToggle}>
            <i className="fa fa-power-off"></i>
          </span>
          <span className="list-item-icon" onClick={this.props.onClone}>
            <i className="fa fa-copy"></i>
          </span>
          <span className="list-item-icon" onClick={this.props.onDelete}>
            <i className="fa fa-trash"></i>
          </span>
        </div>
      </div>
    );
  }
}

module.exports = ListItem;
