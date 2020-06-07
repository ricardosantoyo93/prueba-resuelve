import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
