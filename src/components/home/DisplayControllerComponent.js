import React, { Component } from 'react';
import Header from '../../shared/Header';
import './home.css'


class DisplayControllerComponent extends Component {

  constructor() {
    super();
    this.state = {
    };
  }


  render() {

    return (
      <div className='main'>
        <Header />
        <div className="display">
          <div className="file-dwnld">
            <span className="file-dwnld-txt">Display Controller File Download</span>
          </div>
          <div className="orange-brdr">
          </div>
          <div className="blank-div">
          </div>
        </div>
      </div>
    );
  }
}



export default DisplayControllerComponent;
