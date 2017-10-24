import React, {Component} from 'react';
import axios from 'axios';
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
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  openLoginPop() {
    axios.get('http://localhost:3001/0').then(response => {
        this.setState({isLoggedIn: response.data.isLoggedIn});
        if (!this.state.isLoggedIn) {
          this.openModal();
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
          shouldCloseOnOverlayClick={false}
          style={customStyles}
          contentLabel="LogIn"
        >
        <label style={labelStyles}>LogIn</label>
        <LoginForm closeModal={this.closeModal}/>
        </Modal>
      }
      </div>
      </div>
    );
  }
}

export default App;