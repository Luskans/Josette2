import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    list: [],
    loaded: false
  },
  reducers: {
    setFavorites: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    },
  },
});

export const { setFavorites } = favoriteSlice.actions;

export const getFavorite = () => (dispatch, getState) => {
  const state = getState();
  if (!state.favorite.loaded) {
    const token = localStorage.getItem('token');
    // const token = state.auth.token;

    axios
      .get(`${apiURL}/favorites`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        // console.log('response', response.data);
        dispatch(setFavorites(response.data));
      })
      .catch(error => console.error('Erreur de chargement', error));
  }
};

export default favoriteSlice.reducer;