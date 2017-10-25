import React, {Component} from 'react';
import './ChangePasswordLink.css';
import {Link} from 'react-router';

class ChangePasswordLink extends Component {
  render() {
    return (
      <div className="box">
        <Link className="box_link" to="/changePassword">
          <i className="fa fa-key">Change Password</i>
        </Link>
      </div>
    );
  }
}

export default ChangePasswordLink;