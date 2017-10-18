import React, { Component } from 'react';
import './Header.css'

class Header extends Component {
  render() {
    return (
      <div>
        <div className="main-header">
          <div className="mn-hd">
            
              <header className="head">
                <nav className="navbar">
                  <button className="btn-wd cmw-btn"><i className="btn-hm-icn icn-fn-sz fa fa-home"></i><span className="btn-text"> Home </span></button>
                  <button className="btn-wd-dc cmw-btn"><i className="btn-dn-icn icn-fn-sz fa fa-download"></i><span className="btn-text"> Download Display Controller </span></button>
                  <button className="btn-wd cmw-btn"><i className="btn-ex-icn icn-fn-sz fa fa-sign-out"></i><span className="btn-text"> Exit </span></button>
                </nav>
              </header>
            
          </div>
        </div>
      </div>
    );
  }
}

export default Header;