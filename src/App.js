import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Menu } from './components';
import Login from './components/login';

import './App.scss';

const App = () => {
  return (
    <Router>
      <Menu />
      <div className="App">
        <Switch>
          <Route path="/login/admin">
            <Login admin={true} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
