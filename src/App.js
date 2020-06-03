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
import ProtectedAdmin from './components/protected/admin';
import CheckRedirect from './components/protected/checkRedirect';
import Admin from './components/admin';
import ClientAdmin from './components/admin/client';

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
          <ProtectedAdmin exact path="/admin" >
            <Admin />
          </ProtectedAdmin>
          <ProtectedAdmin exact path="/admin/p" >
            <Admin />
          </ProtectedAdmin>
          <ProtectedAdmin path="/admin/p/:p" >
            <Admin />
          </ProtectedAdmin>
          <ProtectedAdmin exact path="/admin/client" >
            <ClientAdmin />
          </ProtectedAdmin>
          <ProtectedAdmin exact path="/admin/client/:uid" >
            <ClientAdmin />
          </ProtectedAdmin>
          <ProtectedAdmin exact path="/admin/client/:uid/p/:p" >
            <ClientAdmin />
          </ProtectedAdmin>
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
