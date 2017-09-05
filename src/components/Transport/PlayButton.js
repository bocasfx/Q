import React from 'react';
import { connect } from 'react-redux';
import './PlayButton.css';
import { toggleTransport } from '../../actions/Transport';
import { bindActionCreators } from 'redux';

class PlayButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.toggleTransport();
  }

  render() {
    let iconClass = 'fa';
    iconClass += this.props.transport.playing ? ' fa-pause' : ' fa-play';
    return (
      <div className="play-button-container" onClick={this.onClick}>
        <i className={iconClass}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    transport: state.transport
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTransport: bindActionCreators(toggleTransport, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(PlayButton);
