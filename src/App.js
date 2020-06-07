import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { Menu } from './components';
import Login from './components/session/login';
import SignOut from './components/session/signout';
import Protected from './components/protected';
import ProtectedAdmin from './components/protected/admin';
import CheckRedirect from './components/protected/checkRedirect';
import CheckSession from './components/protected/checkSession';
import Admin from './components/admin';
import Client from './components/client';
import ClientAdmin from './components/admin/client';

import './App.scss';

const App = () => {
  return (
    <Router>
      <Menu />
      <div className="App">
        <Switch>
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
          
          <Protected exact path="/mymovements" >
            <Client />
          </Protected>
          <Protected exact path="/mymovements/p/:p" >
            <Client />
          </Protected>

          <CheckSession path="/admin/login">
            <Login admin={true} />
          </CheckSession>
          <CheckSession path="/login">
            <Login />
          </CheckSession>
          <Route path="/signout" >
            <SignOut />
          </Route>

          <Route exact path="/">
            <CheckRedirect />
          </Route>

          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
