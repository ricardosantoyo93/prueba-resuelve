import types from './action-types';

const CoreReducer = (state = {}, { type, payload }) => {
    switch(type) {
        case types.USER_AUTHENTICATE:
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    ...payload
                }
            }
        default:
            return state;
    }
};

export default CoreReducer;
