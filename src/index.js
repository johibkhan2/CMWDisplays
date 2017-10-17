import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import HomeComponent from './components/home/HomeComponent';
import DisplayControllerComponent from './components/home/DisplayControllerComponent';


ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={HomeComponent}/>
      <Route path="/display" component={DisplayControllerComponent}/>
    </Router>
  , document.querySelector('.container'));
