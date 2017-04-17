import React from 'react';
import './ListItem.css';
import config from '../../config/config';

const color = {
  synth: config.synthNode.color,
  midi: config.midiNode.color,
  audio: config.audioNode.color,
  stream: config.stream.color
};

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.renderBullet = this.renderBullet.bind(this);
  }

  renderBullet() {

    let style = {
      color: color[this.props.item.type]
    };

    if (!this.props.item.disabled) {
      return <span className="list-item-bullet" style={style}><i className="fa fa-circle"></i></span>;
    }
    
    return <span className="list-item-bullet" style={style}><i className="fa fa-times"></i></span>;
  }

  render() {

    let itemClass = 'list-item-container';
    itemClass += this.props.item.selected ? ' list-item-selected' : '';

    return (
      <div className={itemClass} onClick={this.props.onClick}>
        <div>
          {this.renderBullet()}
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
