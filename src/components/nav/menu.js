import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './menu.scss';

import LanguageSelector from './language-selector';

const Menu = () => {
    return (
      <>
        <Navbar bg='dark' sticky="top" id="main-menu">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav.Item>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
            </Nav.Item>
            <LanguageSelector />
          </Navbar.Collapse>
        </Navbar>
      </>
    );
};

export default Menu;
