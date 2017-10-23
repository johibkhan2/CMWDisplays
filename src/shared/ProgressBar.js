import 'rc-progress/assets/index.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Line, Circle } from 'rc-progress';

class ProgressBar extends Component {
  constructor() {
    super();
    this.state = {
      percent: 30,
      color: '#3FC7FA',
    };
    this.changeState = this.changeState.bind(this);
  }



  changeState() {
    const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A'];
    const value = parseInt(Math.random() * 100, 10);
    this.setState({
      percent: value,
      color: colorMap[parseInt(Math.random() * 3, 10)],
    });
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
        <h3>Downloading... {this.state.percent}%</h3>
        <div style={circleContainerStyle}>
          <Circle
            percent={this.state.percent}
            strokeWidth="6"
            strokeLinecap="square"
            strokeColor={this.state.color}
          />
        </div>
        <div className="col-sm-10">
          <button className=".btn-default" onClick={this.props.closeModal}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default ProgressBar;