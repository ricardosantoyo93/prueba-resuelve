import jwt_decode from 'jwt-decode';

import ls from '../utils/localStorage';

/**
 * Returns the initial info of the user for the initial state
 */
const getInitialInfo = () => {
    const initialInfo = {
        user: ls.getUserInfo()
    }

    initialInfo.isAuthenticated = initialInfo.user !== null;

    return initialInfo;
};

const _pag = ls.getItem('_pag');
const _ct = ls.getItem('_ct');

/**
 * Returns the initial state, pulling info from localStorage
 */
export default {
    core: {
        ...getInitialInfo()
    },
    current: {
        pagination: _pag ? jwt_decode(_pag) : {},
        records: _ct ? jwt_decode(_ct) : {}
    }
};
