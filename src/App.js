import React, {Component} from 'react';
import axios from 'axios';
import PopupLogin from 'react-popup';
import LoginForm from './shared/LoginForm';
import Header from './shared/Header';

class App extends Component {

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
      .then(response => {

        this.setState({isLoggedIn: response.data.isLoggedIn});
        if (!this.state.isLoggedIn) {
          /** Call the plugin */

          PopupLogin
            .registerPlugin('prompt', function (defaultValue, placeholder, callback) {
              let promptValue = null;
              let promptChange = function (value) {
                promptValue = value;
              };

              this.create({
                title: 'LogIn', content: <LoginForm
                  onChange={promptChange}
                  placeholder={placeholder}
                  value={defaultValue}/>,
                buttons: {
                  left: ['cancel'],
                  right: [
                    {
                      text: 'Save',
                      className: 'success',
                      action: function () {
                        callback(promptValue);
                        PopupLogin.close();
                      }
                    }
                  ]
                }
              });
            });

          PopupLogin
            .plugins()
            .prompt('', '', function (value) {
              //  Popup.alert('You typed: ' + value);
            });
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
          <PopupLogin/>
        </div>
      </div>
    );
  }
}

export default App;