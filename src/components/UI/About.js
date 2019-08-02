import React from 'react';
import './About.css';
import { version } from '../../../package.json';

class About extends React.Component {
  state = {
    open: false,
  }

  onClick = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  formatVersion = () => {
    let formattedVersion = version.split('-');
    if (formattedVersion.length === 1) {
      return version;
    }

    return `${formattedVersion[0]} (${formattedVersion[1]})`;
  }

  renderPopup = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const style = {
      width,
      height,
    };

    return (
      <div className="about-popup-container" style={style} onClick={this.onClick}>
        <div className="about-popup-content">
          <img alt="logo" src="img/logo-white-big.png" />
          <h1>Q - Nodular sequencer</h1>
          <div>Version: {this.formatVersion()}</div>
          <div>License: Creative Commons (BY-NC-SA 4.0)</div>
          <a target="_blank" rel="noopener noreferrer" href='https://github.com/bocasfx/Q'>Github</a>
        </div>
      </div>
    );
  }

  render() {
    const { open } = this.state;
    return (
      <div className="about-container">
        <img alt="logo" src="img/logo-white.png" onClick={this.onClick} />
        { open && this.renderPopup() }
      </div>
    );
  }

}

export default About;
