import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import storiesReducer from './storiesSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        stories: storiesReducer
    }
})

export default store;