import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';

import combinedReducers from './reducer';
import initialState from './initial-state';

const logger = createLogger();

const currentStore = null;

/**
 * Creating Redux store with an instance of it so it can be called outside of Provider if needed
 */
const setStore = () => {
    // Checking for an instance of the store
    if(currentStore !== null) {
        return currentStore;
    }
        
    return createStore(
        combinedReducers, 
        initialState,
        compose(
            applyMiddleware(logger)
        )
    );
}

export default setStore();
