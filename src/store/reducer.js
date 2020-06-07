import CoreReducer from './core/reducer';
import CurrentReducer from './current/reducer'

/**
 * Divides the reducers and the scope of the state they can access to
 * @param {Object} state 
 * @param {Object} action 
 */
const reducer = (state = {}, action) => {
    return {
        core: CoreReducer(state.core, action),
        current: CurrentReducer(state.current, action)
    };
};

export default reducer;
