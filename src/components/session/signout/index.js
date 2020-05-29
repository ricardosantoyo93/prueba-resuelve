import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CoreActions from '../../../core/actions';

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
