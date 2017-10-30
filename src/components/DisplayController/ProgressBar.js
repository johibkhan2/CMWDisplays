import 'rc-progress/assets/index.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Line, Circle } from 'rc-progress';

const cancelStyles = { 
  marginBottom          : '-11px'
};

class ProgressBar extends Component {
  constructor() {
    super();
  }


  render() {
    const containerStyle = {
      width: '250px',
    };
    const circleContainerStyle = {
      width: '20vw',
      height: '20vh',
      display: 'inline-block',
    };
    return (
      <div>
        <h3>Downloading... {this.props.percent}%</h3>
        <div style={circleContainerStyle}>
          <Circle
            percent={this.props.percent}
            strokeWidth="6"
            strokeLinecap="square"
            strokeColor={this.props.color}
          />
        </div>
        <div className="col-lg-6"></div>
        <div className="col-lg-6">
        <div className="col-sm-6"></div>
        <div className="col-sm-6" style={cancelStyles}>
          <button className=".btn-default" onClick={this.props.closeModal}>Cancel</button>
        </div>
        </div>
      </div>
    );
  }
}

export default ProgressBar;