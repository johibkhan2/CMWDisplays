import React, { Component } from 'react';
import Header from '../../shared/Header';
import './home.css'


class HomeComponent extends Component {

  constructor() {
    super();
    this.state = {
    };
  }


  render() {

    return (
      <div className='main'>
        <div className="display">
          <div className="hm">
            <hr className="line" />

            <div className="img-margin">
              <img className="cmw-img" src="/dist/images/earth.jpg" />
            </div>

            <div className="txt-margin">
              <span className="cmw-txt">CMW Display</span>
            </div>

            <hr className="line" />
          </div>

        </div>
      </div>
    );
  }
}



export default HomeComponent;
