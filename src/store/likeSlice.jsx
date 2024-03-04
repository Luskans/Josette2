import { createSlice } from '@reduxjs/toolkit';
import axiosBase, { axiosSecu } from '@/utils/axios';

export const likeSlice = createSlice({
  name: 'like',
  initialState: {
    detail: [],
    loaded: false
  },
  reducers: {
    setLike: (state, action) => {
      state.detail = action.payload;
      state.loaded = true;
    },
    resetLike: (state) => {
      state.detail = [];
      state.loaded = false;
    },
  },
});

export const { resetLike, setLike } = likeSlice.actions;

export const getLike = (userId, storyId) => (dispatch) => {
  axiosBase
    .get(`/likes?user.id[]=${userId}&story.id[]=${storyId}`)
    .then((response) => {
      dispatch(setLike(response.data))
    })
    .catch(error => console.error('Erreur de chargement', error));
};

export const postLike = (data) => (dispatch) => {
  axiosSecu
    .post(`/likes`, data, {
      headers: {
        'Content-Type': 'application/ld+json',
      },
    })
    .then((response) => {
      dispatch(setLike(response.data))
    })
    .catch(error => console.error('Erreur de chargement', error));
};

export const deleteLike = (likeId) => (dispatch) => {
  axiosSecu
    .delete(`/likes/${likeId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('likes response', response)
      dispatch(setLike([]))
    })
    .catch(error => console.error('Erreur de chargement', error));
};

export default likeSlice.reducer;