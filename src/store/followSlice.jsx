import { createSlice } from '@reduxjs/toolkit';
import axiosBase, { axiosSecu } from '@/utils/axios';

export const followSlice = createSlice({
  name: 'follow',
  initialState: {
    list: [],
    detail: [],
    loaded: false
  },
  reducers: {
    setFollows: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    },
    setFollow: (state, action) => {
      state.detail = action.payload;
      state.loaded = true;
    },
    resetFollow: (state) => {
      state.detail = [];
      state.loaded = false;
    },
  },
});

export const { setFollows, setFollow, resetFollow } = followSlice.actions;

export const getFollow = (followerId, followedId) => (dispatch) => {
  axiosBase
    .get(`/follows?follower.id[]=${followerId}&followed.id[]=${followedId}`)
    .then((response) => {
      dispatch(setFollow(response.data))
    })
    .catch(error => console.error('Erreur de chargement', error));
};

export const postFollow = (data) => (dispatch) => {
  axiosSecu
    .post(`/follows`, data, {
      headers: {
        'Content-Type': 'application/ld+json',
      },
    })
    .then((response) => {
      dispatch(setFollow(response.data))
    })
    .catch(error => console.error('Erreur de chargement', error));
};

export const deleteFollow = (followId) => (dispatch) => {
  axiosSecu
    .delete(`/follows/${followId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      dispatch(setFollow([]))
    })
    .catch(error => console.error('Erreur de chargement', error));
};

export default followSlice.reducer;