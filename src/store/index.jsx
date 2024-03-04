import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import storyReducer from './storySlice';
import profilReducer from './profilSlice';
import themeReducer from './themeSlice';
import followReducer from './followSlice';
import commentReducer from './commentSlice';
import likeReducer from './likeSlice';
import favoriteReducer from './favoriteSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        story: storyReducer,
        profil: profilReducer,
        theme: themeReducer,
        follow: followReducer,
        comment: commentReducer,
        like: likeReducer,
        favorite: favoriteReducer
    }
})

export default store;