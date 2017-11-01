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
import * as authService from './services/authService';


/**pop up styles */

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

/**pop up header styles */

const labelStyles = { 
    marginBottom          : '16px',
    color                 : 'black'
};

/**top most component of application */
class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      modalIsOpen: false,
      modalIsOpenChgPass: false,
      dealers:[]
      //interval:60000,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModalChgPass = this.openModalChgPass.bind(this);
    this.closeModalChgPass = this.closeModalChgPass.bind(this);
    this.setIsLoggedIn = this.setIsLoggedIn.bind(this);
  }

  /**componentDidMount-check react doc */
  componentDidMount() {
    this.openLoginPop();
  }

  //open login pop up
  openModal() {
    this.setState({modalIsOpen: true});
  }

  //get dealers ID
  getDealers(){
    authService.getDealers().then(response=>{
      this.setState({dealers: response.dealers});
    });
  }


  //close login pop up
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  //open password pop up
 
  openModalChgPass() {
    this.setState({modalIsOpenChgPass: true});
  }


  closeModalChgPass() {
    this.setState({modalIsOpenChgPass: false});
  }

  //set property in flag
  setIsLoggedIn(){
    if(this.state.isLoggedIn==false){
    this.setState({isLoggedIn: true});
    }else{
      this.setState({isLoggedIn: false});
    }
  }



//checking isLoggedIn flag if not found/flase then opening up the login pop up
  openLoginPop() {
    const isLoggedIn = localStorage.getItem('isLoggedIn')==null || localStorage.getItem('isLoggedIn')==false ? false: true ;
    this.setState({isLoggedIn: isLoggedIn});
    if (!isLoggedIn) {
      this.getDealers();
      //if not logged in then redirecting to home page
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
             {/* login pop up...it will render when isLoggedIn false*/}
      {this.state.isLoggedIn==false &&
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={false}
          overlayClassName="ModalOverlayClass"
          style={customStyles}
          contentLabel="LogIn"
        >
        <label style={labelStyles}>LogIn</label>
        <LoginForm closeModal={this.closeModal} setIsLoggedIn={this.setIsLoggedIn} dealers={this.state.dealers}/>
        </Modal>
      }
      </div>
      <Alert stack={{limit: 3}}  html={true}  timeout={5000}  position= 'top-right' effect='jelly'/>
      {this.state.isLoggedIn==true &&
      <ChangePasswordLink openModalChgPass={this.openModalChgPass}/>
      }
      <div>
       {/* change password pop up...it will render when isLoggedIn true*/}
      {this.state.isLoggedIn==true &&
        <Modal
          isOpen={this.state.modalIsOpenChgPass}
          onRequestClose={this.closeModalChgPass}
          shouldCloseOnOverlayClick={false}
          overlayClassName="ModalOverlayClass"
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