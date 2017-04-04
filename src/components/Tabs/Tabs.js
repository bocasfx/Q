import React from 'react';
import './Tabs.css';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };

    this.renderTitles = this.renderTitles.bind(this);
  }

  onClick(idx, event) {
    event.preventDefault();
    this.setState({
      selected: idx
    });
  }

  renderTitles() {
    return this.props.children.map((child, idx) => {
      let selectedClass = idx === this.state.selected ? 'tabs-selected' : null;
      return (
        <a href="#" onClick={this.onClick.bind(this, idx)} key={idx}>
          <div className={selectedClass}>
          
            {child.props.label}
          </div>
        </a>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="tabs-labels">
          {this.renderTitles()}
        </div>
        <div className="tabs-content">
          {this.props.children[this.state.selected]}
        </div>
      </div>
    );
  }
}

module.exports = Tabs;
