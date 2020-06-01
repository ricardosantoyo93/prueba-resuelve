import CoreReducer from './core/reducer';
import CurrentReducer from './current/reducer'

const reducer = (state = {}, action) => {
    return {
        core: CoreReducer(state.core, action),
        current: CurrentReducer(state.current, action)
    };
};

export default reducer;
