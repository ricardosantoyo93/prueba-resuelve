import types from './action-types';

const saveCurrentInfo = (info) => {
    return {
        type: types.SAVE_CURRENT_INFO,
        payload: info
    };
};

export default { saveCurrentInfo };
