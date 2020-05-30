import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import api from '../../../utils/api';
import coreActions from '../../../core/actions';

import './login.scss';

const Login = ({ admin, saveUserInfo }) => {
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const history = useHistory();

    const label = admin ? t('adminlogin.label') : t('clientlogin.label');
    const labelBottom = admin ? t('clientq.label') : t('adminq.label');
    const loginURL = admin ? "/login" : "/login/admin"; 

    let userRef, passRef = null;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        const user = userRef.value, pass = passRef.value;

        if(user !== '' && pass !== '') {
            setError(null);
            // TODO: create client login
            const userInfo = admin ? await api.adminLogin(user, pass) : false;
            if(userInfo) {
                saveUserInfo(userInfo);
                if(userInfo.admin) {
                    history.replace('/admin');
                } else {
                    history.replace('/client');
                }
            } else {
                setError(t('errorlogin2.label'));
            }
        } else {
            setError(t('errorlogin.label'));
        }
    }

    return(
        <Form.Group className="login">
            <h3>{ label }</h3>
            <Form.Control ref={input => userRef = input} onKeyDown={handleKeyDown} size="lg" type="text" autoComplete="off" placeholder={t('user.label')} />
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
    );
};

const mapStateToProps = ({ core }) => {
    return {
        core
    };
}

export default connect(mapStateToProps, coreActions)(Login);
