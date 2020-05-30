import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';

import combinedReducers from './reducer';
import initialState from './initial-state';

const logger = createLogger();

const currentStore = null;

const setStore = () => {
    if(currentStore !== null) {
        return currentStore;
    }
        
    return createStore(
        combinedReducers, 
        initialState, 
        compose(
            applyMiddleware(logger),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
}

export default setStore();
