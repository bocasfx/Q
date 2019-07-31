import React from 'react';
import './ActivityIndicator.css';
import { connect } from 'react-redux';
import config from '../../config/config';
import PropTypes from 'prop-types';

const color = {
  midi: config.midi.color,
  stream: config.stream.color,
};

class ActivityIndicator extends React.Component {

  static propTypes = {
    nodes: PropTypes.array,
    streams: PropTypes.array,
    transport: PropTypes.object,
    item: PropTypes.object,
  }

  renderBullet() {
    let style = {
      color: color[this.props.item.type],
    };

    if (this.props.item.type === 'stream') {
      if (this.props.item.disabled) {
        return <span className="activity-indicator-bullet" style={style}><i className="fa fa-ban"></i></span>;
      } else if (this.props.transport.playing) {
        return <span className="activity-indicator-bullet" style={style}><i className="fa fa-circle"></i></span>;
      } else {
        return <span className="activity-indicator-bullet" style={style}><i className="fa fa-circle-o"></i></span>;
      }
      
    } else if (!this.props.item.disabled) {
      if (this.props.item.active) {
        return <span className="activity-indicator-bullet" style={style}><i className="fa fa-circle"></i></span>;
      }
      return <span className="activity-indicator-bullet" style={style}><i className="fa fa-circle-o"></i></span>;
    }
    
    return <span className="activity-indicator-bullet" style={style}><i className="fa fa-ban"></i></span>;
  }

  render() {
    return (
      <div className="activity-indicator-container">
        {this.renderBullet()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes,
    streams: state.streams,
    transport: state.transport,
  };
};

export default connect(mapStateToProps)(ActivityIndicator);
