import React, {Component} from 'react';
import Header from '../../shared/Header';
import './home.css'


class HomeComponent extends Component{

  constructor() {
    super();
    this.state = {
    };
  }


  render () {

    return (
      <div className='main'>
        <Header />
      </div>
    );
  }
}



export default HomeComponent;
