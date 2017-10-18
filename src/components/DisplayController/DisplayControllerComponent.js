import React, { Component } from 'react';
import Header from '../../shared/Header';
import './DisplayControllerComponent.css';
import FileDownloadComponent from '../DisplayController/FileDownloadComponent';




class DisplayControllerComponent extends Component {

  constructor() {
    super();
    this.state = {
    };
  }


  render() {

    return (
      <div className='main'>
          <div className="file-dwnld display">
            <span className="file-dwnld-txt">Display Controller File Download</span>
          </div>
          <div className="orange-brdr">
          </div>
          <div>
          <FileDownloadComponent/>
          </div>
      </div>
    );
  }
}



export default DisplayControllerComponent;
