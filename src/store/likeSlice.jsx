import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
import axiosBase, { axiosSecu } from '../utils/axios';

// const apiURL = import.meta.env.VITE_API_URL;
// const token = localStorage.getItem('token');

export const likeSlice = createSlice({
  name: 'like',
  initialState: {
    list: [],
    detail: [],
    loaded: false
  },
  reducers: {
    setLikes: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    },
    setLike: (state, action) => {
      state.detail = action.payload;
      state.loaded = true;
    },
  },
});

export const { setLikes, setLike } = likeSlice.actions;

export const getLike = (userId, storyId) => (dispatch, getState) => {
  axiosSecu
    // .get(`${apiURL}/likes?user.id[]=${userId}&story.id[]=${storyId}`, {
    .get(`/likes?user.id[]=${userId}&story.id[]=${storyId}`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
    })
    .then((response) => {
      // console.log('likes response', response)
      dispatch(setLike(response.data))
    })
    .catch((error) => {
      // toast.error("Une erreur est survenue.", { duration: 9000 });
    });
};

export const postLike = (data) => (dispatch, getState) => {
  axiosSecu
    // .post(`${apiURL}/likes`, data, {
    .post(`/likes`, data, {
      headers: {
        'Content-Type': 'application/ld+json',
        // 'Authorization': `Bearer ${token}`
      },
    })
    .then((response) => {
      console.log('likes response', response)
      dispatch(setLike(response.data))
    })
    .catch((error) => {
      // toast.error("Une erreur est survenue.", { duration: 9000 });
    });
};

export const deleteLike = (likeId) => (dispatch, getState) => {
  axiosSecu
    // .delete(`${apiURL}/likes/${likeId}`, {
    .delete(`/likes/${likeId}`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
    })
    .then((response) => {
      console.log('likes response', response)
      dispatch(setLike([]))
    })
    .catch((error) => {
      // toast.error("Une erreur est survenue.", { duration: 9000 });
    });
};

export default likeSlice.reducer;