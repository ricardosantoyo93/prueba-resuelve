import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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
