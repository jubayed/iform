import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger'

import formReducer from './_redux/formSlice';
import codeReducer from './_redux/codeSlice';
import settingsReducer from './_redux/settingSlice';
import randerSlice from './_redux/randerSlice';

const reducer = {
    code: codeReducer,
    form: formReducer,
    settings: settingsReducer,
    rander: randerSlice
};

let middlewares = [];

if(process.env.NODE_ENV !== 'production'){
    // middlewares.push(logger);
}

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(), 
        ...middlewares 
    ],
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [],
})

// The store has been created with these options:
// - The slice reducers were automatically passed to combineReducers()
// - redux-thunk and redux-logger were added as middleware
// - The Redux DevTools Extension is disabled for production
// - The middleware, batched subscribe, and devtools enhancers were composed together