import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const CheckRedirect = ({ isAuthenticated, user }) => {
    return (
        isAuthenticated ? (
            user.admin ? (
                <Redirect to="/admin" />
            ) : (
                <Redirect to="/client" />
            )
        ) : <Redirect to="/login" />
    );
};

const mapStateToProps = ({ core }) => {
    return {
        isAuthenticated: core.isAuthenticated,
        user: core.user
    }
};

export default connect(mapStateToProps)(CheckRedirect);
