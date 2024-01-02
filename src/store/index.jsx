import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import storiesReducer from './storiesSlice';
import storyReducer from './storySlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        stories: storiesReducer,
        story: storyReducer
    }
})

export default store;