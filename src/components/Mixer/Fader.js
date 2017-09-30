import React from 'react';
import './Fader.css';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import { setNodeVolume } from '../../actions/Nodes';
import { hydrationStarted, hydrationComplete } from '../../actions/App';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNodeById } from '../../utils/utils';

class Fader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.node.volume
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let node = getNodeById(nextProps.nodes, this.props.node.id);
    this.setState({
      value: node.volume
    });
  }

  onChange(value) {
    this.setState({ 
      value: parseFloat((value), 10)
    });
    this.props.hydrationStarted();
    this.props.setNodeVolume(this.props.node.id, value);
    this.props.hydrationComplete();
  }

  render() {
    return (
      <div className="fader-container">
        <Slider
          vertical
          min={0}
          max={1}
          step={0.01}
          value={this.state.value}
          onChange={this.onChange}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeVolume: bindActionCreators(setNodeVolume, dispatch),
    hydrationStarted: bindActionCreators(hydrationStarted, dispatch),
    hydrationComplete: bindActionCreators(hydrationComplete, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Fader);
