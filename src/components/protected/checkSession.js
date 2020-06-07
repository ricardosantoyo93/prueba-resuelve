import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

/**
 * Component that checks if the user is authenticated to redirect it to its main screen,
 * otherwise it will render the component's children
 * @param {Object} props
 * @param {Boolean} props.isAuthenticated If the user is authenticated or not
 * @param {Boolean} props.isAdmin If the user is an admin or not
 * @param {Object} props.children The component's children to be rendered 
 */
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
