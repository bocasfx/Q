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
      color
    };


    return (
      <div className="list-item-container" onClick={this.props.onClick}>
        <div>
          <span>{this.props.idx + 1}</span>
          <span className="list-item-name" style={style}>{this.props.item.name}</span>
        </div>
        <div className="list-item-close" onClick={this.props.onDelete}>&times;</div>
      </div>
    );
  }
}

module.exports = ListItem;
