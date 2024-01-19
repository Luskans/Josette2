import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

export const followSlice = createSlice({
  name: 'follow',
  initialState: {
    list: [],
    loaded: false
  },
  reducers: {
    setFollows: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    },
  },
});

export const { setFollows } = followSlice.actions;

export const getFollow = () => (dispatch, getState) => {
  const state = getState();
  if (!state.follow.loaded) {
    const token = localStorage.getItem('token');
    // const token = state.auth.token;

    axios
      .get(`${apiURL}/follows`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        // console.log('response', response.data);
        dispatch(setFollows(response.data));
      })
      .catch(error => console.error('Erreur de chargement', error));
  }
};

export const getImFollowing = () => (dispatch, getState) => {
  const state = getState();
  if (!state.themes.loaded) {
    const token = localStorage.getItem('token');
    // const token = state.auth.token;

    axios
      .get(`${apiURL}/themes`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('response', response.data);
        dispatch(setThemes(response.data));
      })
      .catch(error => console.error('Erreur de chargement', error));
  }
};

export const getWhoFollowMe = () => (dispatch, getState) => {
  const state = getState();
  if (!state.themes.loaded) {
    const token = localStorage.getItem('token');
    // const token = state.auth.token;

    axios
      .get(`${apiURL}/themes`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('response', response.data);
        dispatch(setThemes(response.data));
      })
      .catch(error => console.error('Erreur de chargement', error));
  }
};

export default followSlice.reducer;