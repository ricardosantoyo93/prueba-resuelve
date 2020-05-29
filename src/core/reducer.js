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
        case types.USER_SIGNOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            }
        default:
            return state;
    }
};

export default CoreReducer;
