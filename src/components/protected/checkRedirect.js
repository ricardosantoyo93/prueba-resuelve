import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/**
 * Component that checks if the user is authenticated to redirect it to its main screen,
 * otherwise it will redirect to the login screen
 * @param {Object} props
 * @param {Boolean} props.isAuthenticated If the user is authenticated or not
 * @param {Boolean} props.isAdmin If the user is an admin or not
 */
const CheckRedirect = ({ isAuthenticated, isAdmin }) => {
    return (
        isAuthenticated ? (
            isAdmin ? (
                <Redirect to="/admin" />
            ) : (
                <Redirect to="/mymovements" />
            )
        ) : <Redirect to="/login" />
    );
};

const mapStateToProps = ({ core }) => {
    return {
        isAuthenticated: core.isAuthenticated,
        isAdmin: core.user ? core.user.admin : false
    }
};

export default connect(mapStateToProps)(CheckRedirect);
