import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CoreActions from '../../../store/core/actions';

/**
 * Component that signs out the user and redirects to the login screen
 * @param {Object} props
 * @param {Function} props.signout Redux action to signout 
 */
const SignOut = ({ signout }) => {
    signout();

    return (
        <Redirect to="/login" />
    )
};

const mapStateToProps = () => {
    return {};
}

export default connect(mapStateToProps, CoreActions)(SignOut);
