import React, {Component} from 'react';
import axios from 'axios';
import Popup from 'react-popup';
import LoginForm from './LoginForm'

class LoginContainer extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    this.openLoginPop();
  }

  openLoginPop() {
    axios
      .get('http://localhost:3001/0')
      .then(response => this.setState({isLoggedIn: response.data.isLoggedIn}));
  }

  render() {

    const isLoggedIn = this.state.isLoggedIn;
    let loginForm = null;
    if(!isLoggedIn){
      Popup.plugins().prompt('', 'Type your name', function (value) {
    //  Popup.alert('You typed: ' + value);
      });
    }

    return (
      <div>
      <div>
        <main>
          {this.props.children}
        </main>
      </div>
      <div>
        <Popup/>
      </div>
      </div>
    );
  }
}





/** Call the plugin */

Popup.registerPlugin('prompt', function (defaultValue, placeholder, callback) {
    let promptValue = null;
    let promptChange = function (value) {
        promptValue = value;
    };

    this.create({
        title: 'LogIn',
        content: <LoginForm onChange={promptChange} placeholder={placeholder} value={defaultValue} />,
        buttons: {
            left: ['cancel'],
            right: [{
                text: 'Save',
                className: 'success',
                action: function () {
                    callback(promptValue);
                    Popup.close();
                }
            }]
        }
    });
});


export default LoginContainer;