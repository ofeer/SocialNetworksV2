import React from 'react';
import reduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers'

export default ({ children, initialState = {} }) => {
    const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

    return <Provider store={createStoreWithMiddleware(reducers, initialState)}>{children}</Provider>
}