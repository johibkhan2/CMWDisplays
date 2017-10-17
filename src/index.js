import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import HomeComponent from './components/home/HomeComponent';
import DisplayControllerComponent from './components/home/DisplayControllerComponent';
import LoginContainer from './shared/LoginContainer'


ReactDOM.render(
    <Router history={browserHistory}>
    <Route component={LoginContainer}>
      <Route path="/" component={HomeComponent}/>
      <Route path="/display" component={DisplayControllerComponent}/>
     </Route> 
    </Router>
  , document.querySelector('.container'));
