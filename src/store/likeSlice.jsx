import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

export const likeSlice = createSlice({
  name: 'like',
  initialState: {
    list: [],
    loaded: false
  },
  reducers: {
    setLikes: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    },
  },
});

export const { setLikes } = likeSlice.actions;

export const getLike = () => (dispatch, getState) => {
  const state = getState();
  if (!state.like.loaded) {
    const token = localStorage.getItem('token');
    // const token = state.auth.token;

    axios
      .get(`${apiURL}/likes`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        // console.log('response', response.data);
        dispatch(setLikes(response.data));
      })
      .catch(error => console.error('Erreur de chargement', error));
  }
};

export default likeSlice.reducer;