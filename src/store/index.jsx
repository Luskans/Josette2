import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import storiesReducer from './storiesSlice';
import storyReducer from './storySlice';
import userReducer from './userSlice';
import themesReducer from './themesSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        stories: storiesReducer,
        story: storyReducer,
        user: userReducer,
        themes: themesReducer,
    }
})

export default store;