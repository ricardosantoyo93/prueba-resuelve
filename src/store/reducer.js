const reducer = (state = {}, action) => {
    return {
        core: CoreReducer(state.core, action)
    };
};

const CoreReducer = (state = {}, { type }) => {
    switch(type) {
        default:
            return state;
    }
};

export default reducer;
