import CoreReducer from '../core/reducer';

const reducer = (state = {}, action) => {
    return {
        core: CoreReducer(state.core, action)
    };
};

export default reducer;
