import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const CheckSession = ({ isAuthenticated, isAdmin, children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    isAdmin ? (
                        <Redirect to="/admin" />
                    ) : (
                        <Redirect to="/mymovements" />
                    )
                ) : children
            }
        />
    );
};

const mapStateToProps = ({ core }) => {
    return {
        isAuthenticated: core.isAuthenticated,
        isAdmin: core.user ? core.user.admin : false
    }
};

export default connect(mapStateToProps)(CheckSession);
