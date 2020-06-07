import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * Component that checks if the user is authenticated and it´s not an admin,
 * otherwise it will redirect to the login screen
 * @param {Object} props
 * @param {Boolean} props.isAuthenticated If the user is authenticated or not
 * @param {Boolean} props.isAdmin If the user is an admin or not
 * @param {Object} props.children The component's children to be rendered 
 */
const Protected = ({ isAuthenticated, isClient, children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated && isClient ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
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
        isClient: !core.user.admin
    };
}

export default connect(mapStateToProps)(Protected);
