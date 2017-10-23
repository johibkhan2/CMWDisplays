import React, {Component} from 'react';
import axios from 'axios';
// import PopupLogin from 'react-popup';
import LoginForm from './shared/LoginForm';
import Header from './shared/Header';
import Modal from 'react-modal';

const customStyles = {
  
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '44vw'
  }
};

class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    //this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.openLoginPop();
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   this.subtitle.style.color = '#f00';
  // }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  openLoginPop() {
    axios.get('http://localhost:3001/0').then(response => {
        this.setState({isLoggedIn: response.data.isLoggedIn});
        if (!this.state.isLoggedIn) {
          this.openModal();
          // /** Call the plugin */
          // PopupLogin.registerPlugin('prompt', function (defaultValue, placeholder, callback) {
          //     let promptValue = null;
          //     let promptChange = function (value) {
          //       promptValue = value;
          //     };

          //     this.create({
          //       title: 'LogIn', content: <LoginForm
          //         onChange={promptChange}
          //         placeholder={placeholder}
          //         value={defaultValue}/>,
          //       buttons: {
          //         left: ['cancel'],
          //         right: [
          //           {
          //             text: 'Save',
          //             className: 'success',
          //             action: function () {
          //               callback(promptValue);
          //               PopupLogin.close();
          //             }
          //           }
          //         ]
          //       }
          //     });
          //   });

          // PopupLogin.plugins().prompt('', '', function (value) {
          //     //this is called when we save the login form ...make a back end call to authenicate
          //     PopupLogin.alert('You typed: ' + value);
          //   });
        }
      });
  }

  render() {
    return (
      <div>
        <Header/>
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
          style={customStyles}
          contentLabel="LogIn"
        >
        <LoginForm closeModal={this.closeModal}/>
        </Modal>
      }
      </div>
      </div>
    );
  }
}

export default App;