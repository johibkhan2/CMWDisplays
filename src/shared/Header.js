import React, {Component} from 'react';
import './Header.css';
import {Link} from 'react-router';
import { browserHistory } from 'react-router';
import {logout} from '../auth/logout';

/**header of app */
const homeCenter = {
  marginLeft        :'29vw',
};
class Header extends Component {

  constructor() {
    super();
    this.state = {
    };

    this.logout = this.logout.bind(this);
  }

  //when click on logout
  logout(){
    logout();
  }


  render() {
    return (
      <div>
        <header>
          <nav className="navbar">
            <ul className="hd-ul">
            {this.props.isLoggedIn==false &&
                <li style={homeCenter}>
                <Link to="/" className="a-txt cmw-btn">
                  <i className="btn-hm-icn icn-fn-sz fa fa-home"></i>
                  <span className="txt">Home</span>
                </Link>
              </li>
              }
            {this.props.isLoggedIn==true &&
              <li>
                <Link to="/" className="a-txt cmw-btn">
                  <i className="btn-hm-icn icn-fn-sz fa fa-home"></i>
                  <span className="txt">Home</span>
                </Link>
              </li>
            }
              {this.props.isLoggedIn==true &&
              <li>
                <Link to="/displayController" className="a-txt cmw-btn">
                  <i className="btn-dn-icn icn-fn-sz fa fa-download"></i>
                  <span className="txt">Download Display Controller</span>
                </Link>
              </li>
              }
              {this.props.isLoggedIn==true &&
              <li>
                <a className="a-txt cmw-btn" onClick={this.logout}>
                  <i className="btn-ex-icn icn-fn-sz fa fa-sign-out"></i>
                  <span className="txt">Exit</span>
                </a>
              </li>
              }
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}

export default Header;