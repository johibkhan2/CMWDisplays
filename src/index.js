import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import HomeComponent from './components/home/HomeComponent';
import DisplayControllerComponent from './components/DisplayController/DisplayControllerComponent';
import App from './App';




ReactDOM.render(
    <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={HomeComponent}/>
      <Route path="/displayController" component={DisplayControllerComponent}/>
     </Route> 
    </Router>
  , document.querySelector('.container'));
