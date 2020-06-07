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
        
    const store = createStore(
        combinedReducers, 
        initialState,
        compose(
            applyMiddleware(logger)
        )
    );

    return store;
}

export default setStore();
