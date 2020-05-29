import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Protected = ({ isAuthenticated, children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
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
        isAuthenticated: core.isAuthenticated
    };
}

export default connect(mapStateToProps)(Protected);
