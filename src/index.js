import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import AppComponent from './components/AppComponent';


ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={AppComponent}>
      </Route>
    </Router>
  , document.querySelector('.container'));
