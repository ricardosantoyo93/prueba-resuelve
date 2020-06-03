import types from './action-types';
import ls from '../../utils/localStorage';

const saveUserInfo = (user) => {
    ls.saveToken(user.token);

    return {
        type: types.USER_AUTHENTICATE,
        payload: user
    };
}

const signout = () => {
    ls.deleteToken();
    ls.removeItem('_ct');
    ls.removeItem('_pag');

    return {
        type: types.USER_SIGNOUT
    };
};

export default { saveUserInfo, signout };
