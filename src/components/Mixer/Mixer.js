import React from 'react';
import './Mixer.css';
import { connect } from 'react-redux';
import { hideMixer } from '../../actions/Devices';
import { bindActionCreators } from 'redux';
import Channel from './Channel';

class Mixer extends React.Component {
  constructor(props) {
    super(props);

    this.renderChannels = this.renderChannels.bind(this);
  }

  renderChannels() {
    return this.props.nodes.map((node, idx) => {
      return <Channel node={node} key={idx} type={node.type}/>;
    });
  }

  render() {

    if (!this.props.devices.mixer) {
      return null;
    }

    return (
      <div className="mixer-container">
        <div className="mixer-background">
          <div className="mixer-inner-container">
            {this.renderChannels()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    devices: state.devices,
    nodes: state.nodes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideMixer: bindActionCreators(hideMixer, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mixer);
