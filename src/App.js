import React, {Component} from 'react';
import axios from 'axios';
import LoginForm from './auth/LoginForm';
import Header from './shared/Header';
import Modal from 'react-modal';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import ChangePasswordLink from './shared/ChangePasswordLink';
import ChangePassword from './auth/ChangePassword';
import { browserHistory } from 'react-router';

const customStyles = {
  
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '44vw',
    background            : '#eee'
  }
};

const labelStyles = { 
    marginBottom          : '16px',
    color                 : 'black'
};

class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      modalIsOpen: false,
      modalIsOpenChgPass: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModalChgPass = this.openModalChgPass.bind(this);
    this.closeModalChgPass = this.closeModalChgPass.bind(this);
  }

  componentDidMount() {
    this.openLoginPop();
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }


  closeModal() {
    this.setState({modalIsOpen: false});
  }

  openModalChgPass() {
    this.setState({modalIsOpenChgPass: true});
  }


  closeModalChgPass() {
    this.setState({modalIsOpenChgPass: false});
  }

  openLoginPop() {
    const isLoggedIn = localStorage.getItem('isLoggedIn')==null || localStorage.getItem('isLoggedIn')==false ? false: true ;
    this.setState({isLoggedIn: isLoggedIn});
    if (!isLoggedIn) {
      browserHistory.push('/');
      this.openModal();
    }
  }

  render() {
    return (
      <div>
        <Header isLoggedIn={this.state.isLoggedIn}/>
        <div>
          <main>
            {this.props.children}
          </main>
        </div> 
      <div>
      {this.state.isLoggedIn==false &&
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={false}
          style={customStyles}
          contentLabel="LogIn"
        >
        <label style={labelStyles}>LogIn</label>
        <LoginForm closeModal={this.closeModal}/>
        </Modal>
      }
      </div>
      <Alert stack={{limit: 3}}  html={true}  timeout={5000}  position= 'top-right' effect='jelly'/>
      {this.state.isLoggedIn==true &&
      <ChangePasswordLink openModalChgPass={this.openModalChgPass}/>
      }
      <div>
      {this.state.isLoggedIn==true &&
        <Modal
          isOpen={this.state.modalIsOpenChgPass}
          onRequestClose={this.closeModalChgPass}
          shouldCloseOnOverlayClick={false}
          style={customStyles}
          contentLabel="Change Password"
        >
        <label style={labelStyles}>Change Password</label>
        <ChangePassword closeModalChgPass={this.closeModalChgPass}/>
        </Modal>
      }
      </div>
      </div>
    );
  }
}

export default App;