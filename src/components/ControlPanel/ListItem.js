import React from 'react';
import './ListItem.css';
import config from '../../config/config';

class ListItem extends React.Component {
  render() {
    let color;
    switch (this.props.item.type) {
      case 'synth':
        color = config.synthNode.color;
        break;
      case 'midi':
        color = config.midiNode.color;
        break;
      case 'audio':
        color = config.audioNode.color;
        break;
      default:
        color = config.stream.color;
    }

    let style = {
      backgroundColor: color
    };

    let itemClass = 'list-item-container';
    itemClass += this.props.item.selected ? ' list-item-selected' : '';

    return (
      <div className={itemClass} onClick={this.props.onClick}>
        <div>
          <span className="list-item-bullet" style={style}></span>
          <span className="list-item-name">{this.props.item.name}</span>
        </div>
        <div>
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
