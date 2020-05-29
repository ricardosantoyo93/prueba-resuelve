import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useTranslation } from 'react-i18next'

import { Nav } from './components';

import logo from './logo.svg';
import './App.scss';

const App = () => {
  const { t } = useTranslation();

  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/about">
          <div className="App">
            <header className="App-header">
              <p>
                This is About page
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </Route>
        <Route path="/">
          <div className="App">
            <header className="App-header">
              <p>
                { t('hello.label') }
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
              { t('thankyou.label') }
              </a>
            </header>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
