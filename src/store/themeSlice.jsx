import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    list: [],
    loaded: false
  },
  reducers: {
    setThemes: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    },
  },
});

export const { setThemes } = themeSlice.actions;

export const fetchThemes = () => (dispatch, getState) => {
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

export default themeSlice.reducer;