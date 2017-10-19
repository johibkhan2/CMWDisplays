import React, {Component} from 'react';
import './Header.css';
import {Link} from 'react-router';

class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <nav className="navbar">
            <ul className="hd-ul">
              <li>
                <Link to="/" className="a-txt cmw-btn">
                  <i className="btn-hm-icn icn-fn-sz fa fa-home"></i>
                  <span className="txt">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/displayController" className="a-txt cmw-btn">
                  <i className="btn-dn-icn icn-fn-sz fa fa-download"></i>
                  <span className="txt">Download Display Controller</span>
                </Link>
              </li>
              <li>
                <a className="a-txt cmw-btn">
                  <i className="btn-ex-icn icn-fn-sz fa fa-sign-out"></i>
                  <span className="txt">Exit</span>
                </a>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}

export default Header;