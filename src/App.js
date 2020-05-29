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
          <Protected path="/admin" >
            <Admin />
          </Protected>
          <Route path="/login/admin">
            <Login admin={true} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
