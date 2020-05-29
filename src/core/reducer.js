import types from './action-types';

const CoreReducer = (state = {}, { type, payload }) => {
    switch(type) {
        case types.USER_SAVE_INFO:
            return {
                ...state,
                user: {
                    ...payload
                }
            }
        default:
            return state;
    }
};

export default CoreReducer;
