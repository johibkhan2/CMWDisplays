import React, {Component} from 'react';
import Header from '../shared/Header';


class AppComponent extends Component{

  constructor() {
    super();
    this.state = {
    };
  }


  render () {

    return (
      <div className='main'>
        <Header />
        {this.props.children}
      </div>
    );
  }
}



export default AppComponent;
