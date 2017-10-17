import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import HomeComponent from './components/home/HomeComponent';


ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={HomeComponent}>
      </Route>
    </Router>
  , document.querySelector('.container'));
