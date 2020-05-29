import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './menu.scss';

import LanguageSelector from './language-selector';

const Menu = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar bg='dark' sticky="top" id="main-menu">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Item>
            <Nav.Link as={Link} to="/login">{t('login.label')}</Nav.Link>
          </Nav.Item>
          <LanguageSelector />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Menu;
