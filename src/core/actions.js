import types from './action-types';
import LocalStorage from '../utils/localStorage';

const ls = new LocalStorage();

const saveUserInfo = (user) => {
    ls.saveToken(user.token);

    return {
        type: types.USER_AUTHENTICATE,
        payload: user
    };
}

const signout = () => {
    ls.deleteToken();

    return {
        type: types.USER_SIGNOUT
    };
};

export default { saveUserInfo, signout };
