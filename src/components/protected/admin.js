import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedAdmin = ({ isAuthenticated, isAdmin, children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated && isAdmin ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: "/admin/login",
                        state: { from: location }
                    }}
                />
                )
            }
        />
    );
};

const mapStateToProps = ({ core }) => {
    return {
        isAuthenticated: core.isAuthenticated,
        isAdmin: core.user ? core.user.admin : false
    };
}

export default connect(mapStateToProps)(ProtectedAdmin);
