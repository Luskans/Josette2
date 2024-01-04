import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import storiesReducer from './storiesSlice';
import storyReducer from './storySlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        stories: storiesReducer,
        story: storyReducer,
        user: userReducer
    }
})

export default store;