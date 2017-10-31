import React, {Component} from 'react';
import './ChangePasswordLink.css';
import {Link} from 'react-router';

//it contains the bottom link for changing password pop up
class ChangePasswordLink extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.openModal = this.openModal.bind(this);
  }

  //open up the change password pop up
  openModal() {
      console.log("openModal");
      this.props.openModalChgPass();
  }

  render() {
    return (
      <div className="box">
        <a className="link-txt cng-pwd-btn box_link" onClick={this.openModal}>
          <i className="cng-pwd-icn cng-pwd-fn-sz fa fa-lock"></i>
          <span className="cng-pwd-txt">Change Password</span>
        </a>
      </div>
    );
  }
}

export default ChangePasswordLink;