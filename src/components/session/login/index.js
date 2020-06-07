import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';


import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import api from '../../../utils/api';
import coreActions from '../../../store/core/actions';

import './login.scss';

/**
 * Component to render the login form for clients or admins
 * @param {Object} props
 * @param {Boolean} props.admin To load the admin login or the client login
 * @param {Function} props.saveUserInfo Redux action to save the current user info in the state 
 */
const Login = ({ admin, saveUserInfo }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation();
    const history = useHistory();

    const label = admin ? t('adminlogin.label') : t('clientlogin.label');
    const labelBottom = admin ? t('clientq.label') : t('adminq.label');
    const loginURL = admin ? "/login" : "/admin/login"; 

    let userRef, passRef = null;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    /**
     * Calls the api with the given user and password, and then redirects to their proper screens
     * Otherwise it will display an error message
     */
    const handleSubmit = async () => {
        setLoading(true);
        const user = userRef.value, pass = passRef.value;

        if(user !== '' && pass !== '') {
            setError(null);
            const userInfo = admin ? await api.adminLogin(user, pass) : await api.userLogin(user, pass);
            
            if(userInfo) {
                saveUserInfo(userInfo);
                // Redirects to the admin dashboard if the user is an admin
                // or to mymovements page if it's a client
                if(userInfo.admin) {
                    history.replace('/admin');
                } else {
                    history.replace('/mymovements');
                }
            } else {
                setError(t('errorlogin2.label'));
            }
        } else {
            setError(t('errorlogin.label'));
        }

        setLoading(false);
    }

    return(
        <>
            <LoadingScreen
                loading={loading}
                bgColor='#282c34'
                spinnerColor='#9ee5f8'
                textColor='#fff'
                text={ t('wait.label') }
            /> 
            <Form.Group className="login">
                <h3>{ label }</h3>
                <Form.Control ref={input => userRef = input} onKeyDown={handleKeyDown} size="lg" type="text" autoComplete="off" placeholder={admin ? t('user.label') : "Email"} />
                <Form.Control ref={input => passRef = input} onKeyDown={handleKeyDown} size="lg" type="password" autoComplete="off" placeholder={t('password.label')} />
                <div className="error-message">
                    { error && 
                        <><FontAwesomeIcon icon={faExclamationCircle} /> {error}</>
                    }
                </div>
                <div className="login-bottom">
                    <Button variant="secondary" onClick={handleSubmit}>{ t('submit.label') }</Button>
                    <Link to={loginURL}>{ labelBottom }</Link>
                </div>
            </Form.Group>
        </>
    );
};

const mapStateToProps = ({ core }) => {
    return {
        core
    };
}

export default connect(mapStateToProps, coreActions)(Login);
