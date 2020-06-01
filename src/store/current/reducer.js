import types from './action-types';

const CurrentReducer = (state = {}, { type, payload }) => {
    switch(type) {
        case types.SAVE_CURRENT_INFO:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
};

export default CurrentReducer;
