import React, { Component } from 'react';
import './Header.css'

class Header extends Component {
  render() {
    return (
      <div>
        <div className="container main-header">
          <div className="row mn-hd">
            <div className="col-md-12 col-md-offset-2">
              <header className="head">
                <nav className="navbar">
                  <button className="cmw-btn"><i className="btn-hm-icn fa fa-home"></i><span className="btn-text"> Home </span></button>
                  <button className="cmw-btn"><i className="btn-dn-icn fa fa-download"></i><span className="btn-text"> Download Display Controller </span></button>
                  <button className="cmw-btn"><i className="btn-ex-icn fa fa-sign-out"></i><span className="btn-text"> Exit </span></button>
                </nav>
              </header>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;