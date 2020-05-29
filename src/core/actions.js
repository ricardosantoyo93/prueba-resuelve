import types from './action-types';

const saveUserInfo = (user) => {
    return {
        type: types.USER_SAVE_INFO,
        payload: user
    };
}

export default { saveUserInfo };
