import React from 'react';
import './Visualizer.css';
import config from '../../config/config';
import { connect } from 'react-redux';
import qAudioContext from '../../app/context/QAudioContext';

class Visualizer extends React.Component {

  constructor(props) {
    super(props);
    this.canvasContext = null;
    this.state = {
      width: props.app.width - config.controlPanel.width - config.menu.width - 20
    };

    this.draw = this.draw.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      width: nextProps.app.width - config.controlPanel.width - config.menu.width - 20
    });
    if (nextProps.app.visualizer !== 'visualizerOff') {
      requestAnimationFrame(this.draw);
    }
  }

  componentDidMount() {
    if (this.props.app.visualizer === 'visualizerOff') {
      return;
    }
    this.canvasContext = this.refs.visualizer.getContext('2d');
    requestAnimationFrame(this.draw);
  }

  draw() {
    if (!this.canvasContext) {
      this.canvasContext = this.refs.visualizer.getContext('2d');
    }
    this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
    qAudioContext.render(this.props.app.visualizer, this.canvasContext, this.state.width, 204);
    if (this.props.app.visualizer !== 'visualizerOff') {
      requestAnimationFrame(this.draw);
    }
  }

  render() {

    if (this.props.app.visualizer === 'visualizerOff') {
      return null;
    }

    return (
      <div className="visualizer-container">
        <div className="visualizer-frame">
          <canvas
            draggable="true"
            ref="visualizer"
            width={this.state.width}
            height="204"/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app
  };
};

export default connect(mapStateToProps)(Visualizer);
