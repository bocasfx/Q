import React from 'react';
import { connect } from 'react-redux';
import './PlayButton.css';
import { toggleTransport } from '../../actions/Transport';
import { stopNodes, dequeueParticles } from '../../actions/Nodes';
import { bindActionCreators } from 'redux';

class PlayButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.props.transport.playing) {
      this.props.stopNodes();
      this.props.dequeueParticles();
    }
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
    toggleTransport: bindActionCreators(toggleTransport, dispatch),
    stopNodes: bindActionCreators(stopNodes, dispatch),
    dequeueParticles: bindActionCreators(dequeueParticles, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);
