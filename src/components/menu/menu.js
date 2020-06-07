import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './menu.scss';

import LanguageSelector from './language-selector';

/**
 * Component to display the top menu and the language selector
 * @param {Object} props
 * @param {Boolean} props.isAuthenticated if the user is authenticated or not
 * @param {Boolean} props.isAdmin if the user is admin or not 
 */
const Menu = ({ isAuthenticated, isAdmin }) => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar bg='dark' sticky="top" id="main-menu">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Item>
            {
              isAuthenticated && isAdmin ? (
                <Nav.Link as={Link} to="/admin">{t('users.label')}</Nav.Link>
              ) : null
            }
          </Nav.Item>
          <Nav.Item>
            {
              isAuthenticated ? (
                <Nav.Link as={Link} to="/signout">{t('signout.label')}</Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">{t('login.label')}</Nav.Link>
              )
            }
          </Nav.Item>
          <LanguageSelector />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

const mapStateToProps = ({ core }) => {
  return {
    isAuthenticated: core.isAuthenticated,
    isAdmin: core.user ? core.user.admin : false
  }
}

export default connect(mapStateToProps)(Menu);
