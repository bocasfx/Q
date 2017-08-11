import React from 'react';
import './ListItem.css';
import ActivityIndicator from '../UI/ActivityIndicator';
import { getNodeColor } from '../../utils/utils';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      off: {},
      copy: {},
      trash: {}
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter(event) {
    let type = event.target.getAttribute('data-type');
    let newState = {};
    newState[type] = {
      color: getNodeColor(this.props.item.type)
    };
    this.setState(newState);
  }

  onMouseLeave() {
    this.setState({
      off: {
        color: 'darkgray'
      },
      copy: {
        color: 'darkgray'
      },
      trash: {
        color: 'darkgray'
      }
    });
  }

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
            <i data-type="off" className="fa fa-power-off" style={this.state.off} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}></i>
          </span>
          <span className="list-item-icon" onClick={this.props.onClone}>
            <i data-type="copy" className="fa fa-copy" style={this.state.copy} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}></i>
          </span>
          <span className="list-item-icon" onClick={this.props.onDelete}>
            <i data-type="trash" className="fa fa-trash" style={this.state.trash} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}></i>
          </span>
        </div>
      </div>
    );
  }
}

module.exports = ListItem;
