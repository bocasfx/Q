import React from 'react';
import { connect } from 'react-redux';
import './PlayButton.css';
import { toggleTransport } from '../../actions/Transport';
import { stopNodes, dequeueParticles } from '../../actions/Nodes';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import midiContext from '../../app/MIDIContext';

const PLAY = [0xF0, 0x7F, 0x7F, 0x06, 0x02, 0xF7];
const STOP = [0xF0, 0x7F, 0x7F, 0x06, 0x01, 0xF7];

class PlayButton extends React.Component {

  static propTypes = {
    transport: PropTypes.object,
    stopNodes: PropTypes.func,
    dequeueParticles: PropTypes.func,
    toggleTransport: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.midiOut = midiContext.outputs[0];
  }

  onClick() {
    const { playing } = this.props.transport;
    if (playing) {
      this.props.stopNodes();
      this.props.dequeueParticles();
      this.midiOut.send(STOP);
    } else {
      this.midiOut.send(PLAY);
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
    transport: state.transport,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTransport: bindActionCreators(toggleTransport, dispatch),
    stopNodes: bindActionCreators(stopNodes, dispatch),
    dequeueParticles: bindActionCreators(dequeueParticles, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);
