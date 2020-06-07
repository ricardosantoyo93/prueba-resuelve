import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * Component that checks if the user is authenticated and it´s an admin,
 * otherwise it will redirect to the admin login screen
 * @param {Object} props
 * @param {Boolean} props.isAuthenticated If the user is authenticated or not
 * @param {Boolean} props.isAdmin If the user is an admin or not
 * @param {Object} props.children The component's children to be rendered 
 */
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
