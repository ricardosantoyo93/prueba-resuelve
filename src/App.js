import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Menu } from './components';
import Login from './components/session/login';
import SignOut from './components/session/signout';
import Protected from './components/protected';
import CheckRedirect from './components/protected/checkRedirect';
import Admin from './components/admin';

import './App.scss';

const App = () => {
  return (
    <Router>
      <Menu />
      <div className="App">
        <Switch>
          <Route path="/signout" >
            <SignOut />
          </Route>
          <Protected exact path="/admin" >
            <Admin />
          </Protected>
          <Protected exact path="/admin/p" >
            <Admin />
          </Protected>
          <Protected path="/admin/p/:p" >
            <Admin />
          </Protected>
          <Route path="/admin/login">
            <Login admin={true} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <CheckRedirect />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
