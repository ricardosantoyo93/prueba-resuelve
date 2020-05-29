import types from './action-types';

const saveUserInfo = (user) => {
    return {
        type: types.USER_AUTHENTICATE,
        payload: user
    };
}

export default { saveUserInfo };
