import types from './action-types';

const saveUserInfo = (user) => {
    return {
        type: types.USER_AUTHENTICATE,
        payload: user
    };
}

const signout = () => {
    return {
        type: types.USER_SIGNOUT
    };
};

export default { saveUserInfo, signout };